-- sql
-- src/core/database/schema/schema.sql
-- Industrial Signal Platform Database Schema
-- Version: 1.0.0

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ═══════════════════════════════════════════════════════════════════════════
-- PROJECT METADATA
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS project (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    number TEXT NOT NULL,
    description TEXT,
    client TEXT,
    contractor TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT',
    revision TEXT NOT NULL DEFAULT 'A',
    version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS project_settings (
    project_id TEXT PRIMARY KEY REFERENCES project(id) ON DELETE CASCADE,
    tag_delimiter TEXT DEFAULT '-',
    use_area_codes INTEGER DEFAULT 1,
    use_system_codes INTEGER DEFAULT 1,
    default_wire_type TEXT DEFAULT 'HARDWIRED',
    default_cable_type TEXT DEFAULT 'INST-2C-16AWG',
    allow_multiple_sources INTEGER DEFAULT 0,
    enforce_naming_convention INTEGER DEFAULT 1,
    show_connection_labels INTEGER DEFAULT 1,
    show_signal_types INTEGER DEFAULT 1,
    grid_size INTEGER DEFAULT 10,
    snap_to_grid INTEGER DEFAULT 1
);

-- ═══════════════════════════════════════════════════════════════════════════
-- UDT TEMPLATES (Device Library)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS udt_template (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model_number TEXT,
    category TEXT NOT NULL,
    is_generic INTEGER DEFAULT 0,
    icon TEXT,
    color TEXT,
    width INTEGER DEFAULT 200,
    height INTEGER DEFAULT 160,
    description TEXT,
    protocols TEXT DEFAULT '[]',
    version TEXT DEFAULT '1.0.0',
    tags TEXT DEFAULT '[]',
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS template_signal (
    id TEXT PRIMARY KEY,
    template_id TEXT NOT NULL REFERENCES udt_template(id) ON DELETE CASCADE,
    tag_name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    direction TEXT NOT NULL,
    engineering_unit TEXT,
    range_min REAL,
    range_max REAL,
    sort_order INTEGER DEFAULT 0,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_template_signal_template ON template_signal(template_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- CABINET TEMPLATES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS cabinet_template (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    width INTEGER DEFAULT 800,
    height INTEGER DEFAULT 2000,
    depth INTEGER DEFAULT 600,
    default_properties TEXT DEFAULT '{}',
    max_devices INTEGER,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

-- ═══════════════════════════════════════════════════════════════════════════
-- CABINET INSTANCES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS cabinet (
    instance_id TEXT PRIMARY KEY,
    template_id TEXT NOT NULL REFERENCES cabinet_template(id),
    tag_name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    area TEXT,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    rotation REAL DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE',
    properties TEXT DEFAULT '{}',
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_cabinet_tag ON cabinet(tag_name);
CREATE INDEX idx_cabinet_location ON cabinet(location);

-- ═══════════════════════════════════════════════════════════════════════════
-- DEVICE INSTANCES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS device (
    instance_id TEXT PRIMARY KEY,
    template_id TEXT NOT NULL REFERENCES udt_template(id),
    cabinet_id TEXT REFERENCES cabinet(instance_id) ON DELETE SET NULL,
    tag_name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    rotation REAL DEFAULT 0,
    scale REAL DEFAULT 1,
    z_index INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_device_tag ON device(tag_name);
CREATE INDEX idx_device_cabinet ON device(cabinet_id);
CREATE INDEX idx_device_template ON device(template_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- DEVICE SIGNALS (Instance-level overrides)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS device_signal (
    id TEXT PRIMARY KEY,
    device_id TEXT NOT NULL REFERENCES device(instance_id) ON DELETE CASCADE,
    tag_name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    direction TEXT NOT NULL,
    engineering_unit TEXT,
    range_min REAL,
    range_max REAL,
    iec_address TEXT,
    modbus_address INTEGER,
    plc_address TEXT,
    is_connected INTEGER DEFAULT 0,
    connected_to_signal_id TEXT,
    connected_to_device_id TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_signal_device ON device_signal(device_id);
CREATE INDEX idx_signal_connected ON device_signal(connected_to_device_id, connected_to_signal_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- CONNECTIONS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS connection (
    id TEXT PRIMARY KEY,
    source_device_id TEXT NOT NULL REFERENCES device(instance_id) ON DELETE CASCADE,
    source_signal_id TEXT NOT NULL,
    destination_device_id TEXT NOT NULL REFERENCES device(instance_id) ON DELETE CASCADE,
    destination_signal_id TEXT NOT NULL,
    wire_type TEXT NOT NULL DEFAULT 'HARDWIRED',
    cable_tag TEXT,
    cable_spec_id TEXT,
    wire_number TEXT,
    waypoints TEXT DEFAULT '[]',
    status TEXT DEFAULT 'PENDING',
    validation_errors TEXT DEFAULT '[]',
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_connection_source ON connection(source_device_id, source_signal_id);
CREATE INDEX idx_connection_dest ON connection(destination_device_id, destination_signal_id);
CREATE INDEX idx_connection_cable ON connection(cable_tag);

-- ═══════════════════════════════════════════════════════════════════════════
-- AUDIT LOG
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    severity TEXT DEFAULT 'INFO',
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    entity_name TEXT,
    description TEXT,
    previous_value TEXT,
    new_value TEXT,
    project_id TEXT,
    project_name TEXT,
    metadata TEXT DEFAULT '{}'
);

CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_log(action);

-- ═══════════════════════════════════════════════════════════════════════════
-- SCHEMA VERSION (for migrations)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL,
    description TEXT
);

INSERT OR IGNORE INTO schema_version (version, applied_at, description)
VALUES (1, datetime('now'), 'Initial schema');