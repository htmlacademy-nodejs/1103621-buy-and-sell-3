-- Get the list of the all categories
SELECT 
  categories.id,
  categories.name AS "Name"
FROM categories;

-- Get the list of the categories, for which more than 1 ticket was created
SELECT 
  categories.id,
  categories.name AS "Name"
FROM categories
INNER JOIN tickets_categories
  ON categories.id = tickets_categories.category_id
GROUP BY 
  categories.id, categories.name
HAVING 
  count(tickets_categories.ticket_id) >= 1;

-- Get the list of categories with the ammount of tickets
SELECT 
  categories.id,
  categories.name AS "Name",
  count(tickets_categories.ticket_id)
FROM categories
INNER JOIN tickets_categories
  ON categories.id = tickets_categories.category_id
GROUP BY 
  categories.id, categories.name
ORDER BY
  count(tickets_categories.ticket_id) DESC;

-- Get the list of all tickets (the newest firstly)
SELECT
  tickets.id AS "Id",
  tickets.title AS "Title",
  tickets.price AS "Price",
  types.name AS "Type",
  tickets.descr AS "Text",
  to_char(tickets.creation_date, 'DD-MM-YYYY, HH24:MI') AS "Creation date",
  concat(users.firstname, ' ', users.lastname) AS "Author",
  users.email AS "Author email",
  count(comments.id),
  string_agg(distinct categories.category_name, ', ')
FROM tickets
INNER JOIN types
  ON tickets.type_id = types.id
INNER JOIN users
  ON tickets.author_id = users.id
INNER JOIN comments
  ON comments.ticket_id = tickets.id
INNER JOIN
(
  SELECT 
    tickets_categories.ticket_id AS ticket_id,
    categories.name AS category_name
  FROM tickets_categories
  INNER JOIN categories
    ON tickets_categories.category_id = categories.id
) categories
ON tickets.id = categories.ticket_id
GROUP BY 
  tickets.id, tickets.title, tickets.price, 
  types.name, tickets.descr, users.firstname,
  users.lastname, users.email
ORDER BY
  tickets.creation_date DESC;

-- Get the info of the particular ticket
SELECT
  tickets.id AS "Id",
  tickets.title AS "Title",
  tickets.price AS "Price",
  types.name AS "Type",
  tickets.descr AS "Text",
  to_char(tickets.creation_date, 'DD-MM-YYYY, HH24:MI') AS "Creation date",
  concat(users.firstname, ' ', users.lastname) AS "Author",
  users.email AS "Author email",
  count(comments.id),
  string_agg(distinct categories.category_name, ', ')
FROM tickets
INNER JOIN types
  ON tickets.type_id = types.id
INNER JOIN users
  ON tickets.author_id = users.id
INNER JOIN comments
  ON comments.ticket_id = tickets.id
INNER JOIN
(
  SELECT 
    tickets_categories.ticket_id AS ticket_id,
    categories.name AS category_name
  FROM tickets_categories
  INNER JOIN categories
    ON tickets_categories.category_id = categories.id
) categories
ON tickets.id = categories.ticket_id
GROUP BY 
  tickets.id, tickets.title, tickets.price, 
  types.name, tickets.descr, users.firstname,
  users.lastname, users.email
HAVING -- conditions of the search
  tickets.id = 3; 

-- Get the list of 5 newest comments
SELECT
  comments.id AS "Id",
  comments.ticket_id AS "Ticket id",
  concat(users.firstname, ' ', users.lastname) AS "Author",
  comments.content AS "Text"
FROM comments
INNER JOIN users
  ON comments.author_id = users.id
ORDER BY 
  comments.creation_date DESC
LIMIT 5;

-- Get the list of comments for the particular ticket (the newest firstly)
SELECT
  comments.id AS "Id",
  comments.ticket_id AS "Ticket id",
  concat(users.firstname, ' ', users.lastname) AS "Author",
  comments.content AS "Text"
FROM comments
INNER JOIN users
  ON comments.author_id = users.id
WHERE
  comments.ticket_id = 3
ORDER BY
  comments.creation_date DESC

-- Get 2 tickets with the type "куплю"
SELECT
  tickets.id AS "Id"
FROM tickets
INNER JOIN types
  ON tickets.type_id = types.id
WHERE
  types.name = 'куплю'
LIMIT 2;

-- Update the title of the particular ticket
UPDATE tickets
  set title = 'Уникальное предложение!'
WHERE
  tickets.id = 3













