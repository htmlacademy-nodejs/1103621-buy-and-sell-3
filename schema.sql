CREATE DATABASE buy_and_sell WITH
    OWNER = nikmas
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
		TEMPLATE template0
    CONNECTION LIMIT = -1;

\c buy_and_sell;

DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS tickets_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
  email varchar(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	user_password varchar(100) NOT NULL,
	avatar varchar(100) NOT NULL
);

CREATE TABLE types (
	id SERIAL NOT NULL PRIMARY KEY,
	name varchar(4) NOT NULL
);

CREATE TABLE tickets (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	title varchar(100) NOT NULL,
	descr varchar(1000) NOT NULL,
	price INTEGER NOT NULL,
	type_id INTEGER NOT NULL,
  FOREIGN KEY (type_id) REFERENCES types (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE categories (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name varchar(100) NOT NULL
);

CREATE TABLE tickets_categories (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	ticket_id bigint NOT NULL,
	category_id bigint NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES tickets (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE comments (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	content text NOT NULL,
	author_id bigint NOT NULL,
  ticket_id bigint NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES tickets (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);