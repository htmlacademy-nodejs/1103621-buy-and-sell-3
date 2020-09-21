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

