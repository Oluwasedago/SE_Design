// src/renderer/components/ConnectionCanvas/ConnectionCanvas.tsx
// Main canvas component with React Flow for visual wiring diagrams
// ═══════════════════════════════════════════════════════════════════════════

import React, { 
  useState, 
  useCallback, 
  useMemo, 
  useRef,
  useEffect,
} from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  NodeTypes,
  EdgeTypes,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
  ReactFlowInstance,
  XYPosition,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import type { 
  DeviceInstance, 
  SignalConnection, 
  SignalPoint,
  UDTTemplate,
} from '../../../core/types';
import { 
  ConnectionStatus, 
  SignalDirection,
  WireType,
} from '../../../core/types';
import { SIGNAL_CATEGORY_MAP } from '../../../core/types/signalCategories';

import { DeviceNode } from './DeviceNode';
import type { DeviceNodeData } from './DeviceNode';
import { ConnectionEdge } from './ConnectionEdge';
import type { ConnectionEdgeData } from './ConnectionEdge';
import {
  validateConnection,
  parseHandleId,
  inferWireTypeFromSignal,
  SIGNAL_CATEGORY_COLORS,
  CONNECTION_STATUS_COLORS,
} from './connectionUtils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ConnectionCanvasProps {
  devices: Map<string, DeviceInstance>;
  connections: Map<string, SignalConnection>;
  udtLibrary: Map<string, UDTTemplate>;
  onDeviceAdd?: (device: DeviceInstance) => void;
  onDeviceUpdate?: (deviceId: string, updates: Partial<DeviceInstance>) => void;
  onDeviceDelete?: (deviceId: string) => void;
  onConnectionAdd?: (connection: SignalConnection) => void;
  onConnectionUpdate?: (connectionId: string, updates: Partial<SignalConnection>) => void;
  onConnectionDelete?: (connectionId: string) => void;
  onSelectionChange?: (nodeIds: string[], edgeIds: string[]) => void;
  currentUserId: string;
  readOnly?: boolean;
}

interface CanvasState {
  selectedNodeIds: Set<string>;
  selectedEdgeIds: Set<string>;
  connectingFrom: {
    deviceId: string;
    signalId: string;
    signal: SignalPoint;
  } | null;
  hoveredSignal: {
    deviceId: string;
    signalId: string;
  } | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// NODE & EDGE TYPE REGISTRATION
// ═══════════════════════════════════════════════════════════════════════════

const nodeTypes: NodeTypes = {
  device: DeviceNode,
};

const edgeTypes: EdgeTypes = {
  connection: ConnectionEdge,
};

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT EDGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════

const defaultEdgeOptions = {
  type: 'connection',
  animated: false,
};

// ═══════════════════════════════════════════════════════════════════════════
// MINIMAP STYLES
// ═══════════════════════════════════════════════════════════════════════════

const minimapStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ConnectionCanvas: React.FC<ConnectionCanvasProps> = ({
  devices,
  connections,
  udtLibrary,
  onDeviceAdd,
  onDeviceUpdate,
  onDeviceDelete,
  onConnectionAdd,
  onConnectionUpdate,
  onConnectionDelete,
  onSelectionChange,
  currentUserId,
  readOnly = false,
}) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // REFS & STATE
  // ═══════════════════════════════════════════════════════════════════════════
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    selectedNodeIds: new Set(),
    selectedEdgeIds: new Set(),
    connectingFrom: null,
    hoveredSignal: null,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SIGNAL HOVER HANDLER
  // ═══════════════════════════════════════════════════════════════════════════

  const handleSignalHover = useCallback((deviceId: string, signalId: string | null) => {
    setCanvasState(prev => ({
      ...prev,
      hoveredSignal: signalId ? { deviceId, signalId } : null,
    }));
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // DEVICE CLICK HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleDeviceClick = useCallback((deviceId: string) => {
    setCanvasState(prev => ({
      ...prev,
      selectedNodeIds: new Set([deviceId]),
      selectedEdgeIds: new Set(),
    }));
    onSelectionChange?.([deviceId], []);
  }, [onSelectionChange]);

  const handleDeviceDoubleClick = useCallback((deviceId: string) => {
    // Could open device properties panel
    console.log('Device double-clicked:', deviceId);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // EDGE CLICK HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleEdgeClick = useCallback((connectionId: string) => {
    setCanvasState(prev => ({
      ...prev,
      selectedNodeIds: new Set(),
      selectedEdgeIds: new Set([connectionId]),
    }));
    onSelectionChange?.([], [connectionId]);
  }, [onSelectionChange]);

  const handleEdgeDoubleClick = useCallback((connectionId: string) => {
    // Could open connection properties panel
    console.log('Edge double-clicked:', connectionId);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // CONVERT DEVICES TO REACT FLOW NODES
  // ═══════════════════════════════════════════════════════════════════════════
  
  const initialNodes = useMemo((): Node<DeviceNodeData>[] => {
    return Array.from(devices.values()).map((device) => ({
      id: device.instanceId,
      type: 'device',
      position: device.position,
      data: {
        device,
        isSelected: canvasState.selectedNodeIds.has(device.instanceId),
        isValidConnectionTarget: false,
        validSignalIds: new Set<string>(),
        onSignalHover: handleSignalHover,
        onDeviceClick: handleDeviceClick,
        onDeviceDoubleClick: handleDeviceDoubleClick,
      },
      draggable: !readOnly,
      selectable: true,
    }));
  }, [devices, canvasState.selectedNodeIds, readOnly, handleSignalHover, handleDeviceClick, handleDeviceDoubleClick]);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CONVERT CONNECTIONS TO REACT FLOW EDGES
  // ═══════════════════════════════════════════════════════════════════════════
  
  const initialEdges = useMemo((): Edge<ConnectionEdgeData>[] => {
    return Array.from(connections.values()).map((conn) => {
      // Find source and target signals to get handle IDs
      const sourceDevice = devices.get(conn.sourceDeviceId);
      const targetDevice = devices.get(conn.destinationDeviceId);
      
      const sourceSignal = sourceDevice?.signals.find(s => s.id === conn.sourceSignalId);
      const targetSignal = targetDevice?.signals.find(s => s.id === conn.destinationSignalId);
      
      const sourceHandle = sourceSignal 
        ? `${conn.sourceDeviceId}__${conn.sourceSignalId}__${sourceSignal.direction}`
        : undefined;
      const targetHandle = targetSignal
        ? `${conn.destinationDeviceId}__${conn.destinationSignalId}__${targetSignal.direction}`
        : undefined;
      
      return {
        id: conn.id,
        type: 'connection',
        source: conn.sourceDeviceId,
        target: conn.destinationDeviceId,
        sourceHandle,
        targetHandle,
        data: {
          connection: conn,
          isSelected: canvasState.selectedEdgeIds.has(conn.id),
          onEdgeClick: handleEdgeClick,
          onEdgeDoubleClick: handleEdgeDoubleClick,
        },
        animated: conn.status === ConnectionStatus.VALID && 
                  (conn.wireType === WireType.ETHERNET || conn.wireType === WireType.FIBER),
      };
    });
  }, [connections, devices, canvasState.selectedEdgeIds, handleEdgeClick, handleEdgeDoubleClick]);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // REACT FLOW STATE
  // ═══════════════════════════════════════════════════════════════════════════

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update nodes when devices change
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);
  
  // Update edges when connections change
  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // ═══════════════════════════════════════════════════════════════════════════
  // NODE POSITION CHANGE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════

  const handleNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    
    // Update device positions when dragged
    changes.forEach((change) => {
      if (change.type === 'position' && change.position && change.dragging === false) {
        const deviceId = change.id;
        onDeviceUpdate?.(deviceId, { position: change.position });
      }
    });
  }, [onNodesChange, onDeviceUpdate]);

  // ═══════════════════════════════════════════════════════════════════════════
  // EDGE CHANGE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════

  const handleEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    
    // Handle edge deletions
    changes.forEach((change) => {
      if (change.type === 'remove') {
        onConnectionDelete?.(change.id);
      }
    });
  }, [onEdgesChange, onConnectionDelete]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CONNECTION HANDLER (when user draws a new connection)
  // ═══════════════════════════════════════════════════════════════════════════

  const handleConnect: OnConnect = useCallback((params: Connection) => {
    if (readOnly) return;
    
    const { source, target, sourceHandle, targetHandle } = params;
    
    if (!source || !target || !sourceHandle || !targetHandle) {
      console.warn('Invalid connection params:', params);
      return;
    }
    
    // Parse handle IDs to get signal info
    const sourceInfo = parseHandleId(sourceHandle);
    const targetInfo = parseHandleId(targetHandle);
    
    if (!sourceInfo || !targetInfo) {
      console.warn('Could not parse handle IDs:', sourceHandle, targetHandle);
      return;
    }
    
    // Get devices and signals
    const sourceDevice = devices.get(source);
    const targetDevice = devices.get(target);
    
    if (!sourceDevice || !targetDevice) {
      console.warn('Devices not found:', source, target);
      return;
    }
    
    const sourceSignal = sourceDevice.signals.find(s => s.id === sourceInfo.signalId);
    const targetSignal = targetDevice.signals.find(s => s.id === targetInfo.signalId);
    
    if (!sourceSignal || !targetSignal) {
      console.warn('Signals not found:', sourceInfo.signalId, targetInfo.signalId);
      return;
    }
    
    // Validate the connection
    const validationResult = validateConnection(
      sourceDevice,
      sourceSignal,
      targetDevice,
      targetSignal
    );
    
    // Create the connection object
    const now = new Date();
    const newConnection: SignalConnection = {
      id: uuidv4(),
      sourceDeviceId: source,
      sourceSignalId: sourceInfo.signalId,
      destinationDeviceId: target,
      destinationSignalId: targetInfo.signalId,
      wireType: validationResult.suggestedWireType,
      waypoints: [],
      status: validationResult.status,
      validationErrors: validationResult.errors,
      createdAt: now,
      createdBy: currentUserId,
      updatedAt: now,
      updatedBy: currentUserId,
      metadata: {
        warnings: validationResult.warnings,
      },
    };
    
    // Notify parent component
    onConnectionAdd?.(newConnection);
    
    // Add edge to local state (will be synced from props)
    setEdges((eds) => addEdge({
      ...params,
      id: newConnection.id,
      type: 'connection',
      data: {
        connection: newConnection,
        isSelected: false,
        onEdgeClick: handleEdgeClick,
        onEdgeDoubleClick: handleEdgeDoubleClick,
      },
    }, eds));
    
  }, [
    readOnly, 
    devices, 
    currentUserId, 
    onConnectionAdd, 
    setEdges, 
    handleEdgeClick, 
    handleEdgeDoubleClick
  ]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CONNECTION VALIDATION (highlight valid targets while dragging)
  // ═══════════════════════════════════════════════════════════════════════════

  const isValidConnection = useCallback((connection: Connection): boolean => {
    const { source, target, sourceHandle, targetHandle } = connection;
    
    if (!source || !target || !sourceHandle || !targetHandle) return false;
    if (source === target) return false; // Can't connect to self
    
    const sourceInfo = parseHandleId(sourceHandle);
    const targetInfo = parseHandleId(targetHandle);
    
    if (!sourceInfo || !targetInfo) return false;
    
    const sourceDevice = devices.get(source);
    const targetDevice = devices.get(target);
    
    if (!sourceDevice || !targetDevice) return false;
    
    const sourceSignal = sourceDevice.signals.find(s => s.id === sourceInfo.signalId);
    const targetSignal = targetDevice.signals.find(s => s.id === targetInfo.signalId);
    
    if (!sourceSignal || !targetSignal) return false;
    
    const result = validateConnection(sourceDevice, sourceSignal, targetDevice, targetSignal);
    
    return result.status !== ConnectionStatus.INVALID;
  }, [devices]);

  // ═══════════════════════════════════════════════════════════════════════════
  // DRAG AND DROP (for adding devices from library)
  // ═══════════════════════════════════════════════════════════════════════════

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    
    if (readOnly || !reactFlowInstance || !reactFlowWrapper.current) return;
    
    const templateId = event.dataTransfer.getData('application/reactflow-template');
    if (!templateId) return;
    
    const template = udtLibrary.get(templateId);
    if (!template) {
      console.warn('Template not found:', templateId);
      return;
    }
    
    // Get drop position in flow coordinates
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    
    // Create new device instance
    const now = new Date();
        const newDevice: DeviceInstance = {
      instanceId: uuidv4(),
      templateId: template.id,
      template: template,
      tagName: `${template.name.substring(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      description: template.description,
      location: '',
      position,
      rotation: 0,
      scale: 1,
      zIndex: devices.size,
      signals: template.signals.map(sig => ({
        ...sig,
        id: uuidv4(),
        isConnected: false,
        connectedToSignalId: undefined,
        connectedToDeviceId: undefined,
        createdAt: now,
        updatedAt: now,
      })),
      connectionIds: [],
      createdAt: now,
      createdBy: currentUserId,
      updatedAt: now,
      updatedBy: currentUserId,
      metadata: {},
    };
    
    onDeviceAdd?.(newDevice);
    
    }, [readOnly, reactFlowInstance, udtLibrary, devices.size, onDeviceAdd, currentUserId]);

  // ═══════════════════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════════════════

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (readOnly) return;
    
    // Delete selected nodes/edges
    if (event.key === 'Delete' || event.key === 'Backspace') {
      canvasState.selectedNodeIds.forEach(nodeId => {
        onDeviceDelete?.(nodeId);
      });
      canvasState.selectedEdgeIds.forEach(edgeId => {
        onConnectionDelete?.(edgeId);
      });
      
      setCanvasState(prev => ({
        ...prev,
        selectedNodeIds: new Set(),
        selectedEdgeIds: new Set(),
      }));
    }
    
    // Escape to clear selection
    if (event.key === 'Escape') {
      setCanvasState(prev => ({
        ...prev,
        selectedNodeIds: new Set(),
        selectedEdgeIds: new Set(),
        connectingFrom: null,
      }));
      onSelectionChange?.([], []);
    }
  }, [readOnly, canvasState, onDeviceDelete, onConnectionDelete, onSelectionChange]);

  // ═══════════════════════════════════════════════════════════════════════════
  // SELECTION CHANGE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════

  const onSelectionChangeInternal = useCallback(({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
    const nodeIds = nodes.map(n => n.id);
    const edgeIds = edges.map(e => e.id);
    
    setCanvasState(prev => ({
      ...prev,
      selectedNodeIds: new Set(nodeIds),
      selectedEdgeIds: new Set(edgeIds),
    }));
    
    onSelectionChange?.(nodeIds, edgeIds);
  }, [onSelectionChange]);

  // ═══════════════════════════════════════════════════════════════════════════
  // MINIMAP NODE COLOR
  // ═══════════════════════════════════════════════════════════════════════════

  const nodeColor = useCallback((node: Node<DeviceNodeData>): string => {
    return node.data?.device?.template?.color || '#6b7280';
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div 
      ref={reactFlowWrapper} 
      style={{ width: '100%', height: '100%' }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onSelectionChange={onSelectionChangeInternal}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
        snapToGrid
        snapGrid={[10, 10]}
        deleteKeyCode={readOnly ? null : ['Delete', 'Backspace']}
        multiSelectionKeyCode="Shift"
        selectionOnDrag={!readOnly}
        panOnDrag={[1, 2]} // Middle mouse or right mouse to pan
        selectNodesOnDrag={false}
        attributionPosition="bottom-left"
      >
        {/* Background grid */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#e2e8f0"
        />
        
        {/* Zoom/pan controls */}
        <Controls 
          showZoom
          showFitView
          showInteractive={!readOnly}
          position="bottom-right"
        />
        
        {/* Overview minimap */}
        <MiniMap 
          nodeColor={nodeColor}
          nodeStrokeWidth={3}
          zoomable
          pannable
          style={minimapStyle}
          position="top-right"
        />
        
        {/* Top-left info panel */}
        <Panel position="top-left">
          <div style={{
            background: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '12px',
            color: '#374151',
          }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
              Connection Canvas
            </div>
            <div style={{ color: '#6b7280' }}>
              Devices: {devices.size} • Connections: {connections.size}
            </div>
            {canvasState.selectedNodeIds.size > 0 && (
              <div style={{ marginTop: '4px', color: '#3b82f6' }}>
                Selected: {canvasState.selectedNodeIds.size} device(s)
              </div>
            )}
            {canvasState.selectedEdgeIds.size > 0 && (
              <div style={{ marginTop: '4px', color: '#3b82f6' }}>
                Selected: {canvasState.selectedEdgeIds.size} connection(s)
              </div>
            )}
            {readOnly && (
              <div style={{ marginTop: '8px', color: '#f59e0b', fontWeight: 500 }}>
                🔒 Read-only mode
              </div>
            )}
          </div>
        </Panel>
        
        {/* Legend panel */}
        <Panel position="bottom-left">
          <div style={{
            background: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '11px',
          }}>
            <div style={{ fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
              Connection Status
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(CONNECTION_STATUS_COLORS).map(([status, color]) => (
                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color,
                  }} />
                  <span style={{ color: '#6b7280' }}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ConnectionCanvas;