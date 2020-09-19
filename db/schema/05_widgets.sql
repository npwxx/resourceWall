-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  board_id INTEGER REFERENCES boards(id),
  title VARCHAR(255) NOT NULL,
  resource_url VARCHAR (255) NOT NULL,
  description TEXT,
  --I've left off the photo/video row here as I'm not sure we need it, think we can access the resource url to get a preview/embed
);
