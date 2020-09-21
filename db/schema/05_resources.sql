
DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  resource_url VARCHAR (255) NOT NULL,
  description TEXT,
  date_posted DATETIME NOT NULL,
  ancestor_id INT
);
