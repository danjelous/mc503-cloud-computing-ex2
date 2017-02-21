DROP DATABASE IF EXISTS fleamarket;
CREATE DATABASE fleamarket;

\c fleamarket;

CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  picture_path VARCHAR,
  name VARCHAR,
  description VARCHAR,
  price DECIMAL,
  retailer VARCHAR,
  retailer_email VARCHAR
);

INSERT INTO articles (picture_path, name, description, price, retailer, retailer_email) VALUES 
  ('images/1.jpg', 'TV', 'Get back to your youth - instantly.', 99.99, 'Ricarda', 'ricarda.schagerl@gmail.com'),
  ('images/2.jpg', 'iHipster Phonemaster 2000', 'As the titleSpo suggests you can never miss a single call with this badboy.', 421.05, 'Ricarda', 'ricarda.schagerl@gmail.com'),
  ('images/3.jpg', 'Leica Retrospect', 'If you do not really like the future, just look at some pictures from the past. Good ol days.', 1010.01, 'Ricarda', 'ricarda.schagerl@gmail.com'),
  ('images/4.jpg', 'Garden Expander', '10/10 germans would buy.', 0.99, 'Daniel', 'daniel.brunner@live.at'),
  ('images/5.jpg', 'iHipster Typerider', 'Typing like back then. Must buy if you own the Phonemaster 2000.', 812.12, 'Daniel', 'daniel.brunner@live.at');
