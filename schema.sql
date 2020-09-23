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
	id BIGSERIAL PRIMARY KEY NOT NULL,
  email varchar(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	user_password varchar(100) NOT NULL,
	avatar varchar(100) NOT NULL
);
CREATE UNIQUE INDEX users_email_index ON users (email);
CREATE INDEX users_firstname_index ON users (firstname);
CREATE INDEX users_lastname_index ON users (lastname);

CREATE TABLE types (
	id SERIAL NOT NULL PRIMARY KEY,
	name varchar(4) NOT NULL
);

CREATE TABLE tickets (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	title varchar(100) NOT NULL,
	descr varchar(1000) NOT NULL,
  picture varchar(100) NOT NULL,
	price INTEGER NOT NULL,
	type_id INTEGER NOT NULL,
  author_id BIGINT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES types (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE INDEX tickets_title_index ON tickets (title);
CREATE INDEX tickets_descr_index ON tickets (descr);
CREATE INDEX tickets_price_index ON tickets (price);
CREATE INDEX tickets_type_id_index ON tickets (type_id);

CREATE TABLE categories (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name varchar(100) NOT NULL
);
CREATE INDEX categories_name_index ON categories (name);

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
CREATE INDEX tickets_categories_ticket_id_index ON tickets_categories (ticket_id);
CREATE INDEX tickets_categories_category_id_index ON tickets_categories (category_id);

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
CREATE INDEX comments_content_index ON comments (content);
CREATE INDEX comments_author_id_index ON comments (author_id);
CREATE INDEX comments_ticket_id_index ON comments (ticket_id);