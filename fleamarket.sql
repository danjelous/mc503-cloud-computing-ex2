DROP DATABASE IF EXISTS fleamarket;
CREATE DATABASE fleamarket;

\c fleamarket;

CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  picture_path VARCHAR,
  name VARCHAR,
  description VARCHAR,
  price DECIMAL
);

INSERT INTO articles (picture_path, name, description, price)
  VALUES ('images/dummy.jpg', 'Demo', 'Demo desc', 9.99);