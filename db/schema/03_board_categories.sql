DROP TABLE IF EXISTS board_categories CASCADE;

CREATE TABLE board_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) NOT NULL,
  board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE
);
