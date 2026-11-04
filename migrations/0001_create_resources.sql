CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  class_no INTEGER NOT NULL,
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  questions_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resources_class_type
ON resources(class_no, type);
