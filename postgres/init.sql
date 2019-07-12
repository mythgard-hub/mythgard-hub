CREATE SCHEMA mythgard;
CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  type varchar (255),
  atk integer,
  def integer
);

INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (1, 'Furball', 'rules', 'cat', '1', '2');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (2, 'Imp', 'rules', 'devil', '2', '1');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (3, 'Grizzly Bear', 'rules', 'bear', '2', '2');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (4, 'Dragon', 'flying', 'dragon', '5', '5');

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer
);


CREATE TABLE mythgard.card_deck (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  card_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id),
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id)
);
-- CREATE TABLE your_schema.parent_table (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     description TEXT,
--     created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- COMMENT ON TABLE your_schema.parent_table IS
-- 'Provide a description for your parent table.';
-- CREATE TABLE your_schema.child_table (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     description TEXT,
--     created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     parent_table_id INTEGER NOT NULL REFERENCES your_schema.parent_table(id)
-- );
-- COMMENT ON TABLE your_schema.child_table IS
-- 'Provide a description for your child table.';
-- 
-- INSERT INTO your_schema.parent_table (name, description) VALUES
-- ('Parent name 1', 'Parent description 1'),
-- ('Parent name 2', 'Parent description 2'),
-- ('Parent name 3', 'Parent description 3');
-- INSERT INTO your_schema.child_table (name, description, parent_table_id) VALUES
-- ('Child name 1', 'Child description 1', 1),
-- ('Child name 2', 'Child description 2', 2),
-- ('Child name 3', 'Child description 3', 3);
