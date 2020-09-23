SET client_encoding = 'UTF8';

INSERT INTO users VALUES
(DEFAULT, 'eqywepaf-9732@gmail.com', 'Lucia', 'Anderson', 'sr4bUZ7UeZGYFx1Wu0FL', 'avatar03.jpg'),
(DEFAULT, 'caneddorrofu-2720@gmail.com', 'Harry', 'Harris', 'sr4bUZ7UeZGYFx1Wu0FL', 'avatar03.jpg');

INSERT INTO types VALUES
(DEFAULT, 'SALE'),
(DEFAULT, 'BUY');

INSERT INTO tickets VALUES 
(DEFAULT, 'Куплю породистого кота', 'Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Товар в отличном состоянии. Если товар не понравится — верну всё до последней копейки.', 'item11.jpg', 56652, 2, 1),
(DEFAULT, 'Куплю породистого кота', 'При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Таких предложений больше нет! Это настоящая находка для коллекционера!', 'item05.jpg', 69727, 2, 1),
(DEFAULT, 'Куплю породистого кота', 'Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам. Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары.', 'item09.jpg', 18786, 2, 1),
(DEFAULT, 'Куплю слона', 'При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Продаю с болью в сердце... Если найдёте дешевле — сброшу цену.', 'item08.jpg', 51306, 1, 1),
(DEFAULT, 'Продам слона', 'Если найдёте дешевле — сброшу цену. Таких предложений больше нет! Товар в отличном состоянии. Это настоящая находка для коллекционера!', 'item02.jpg', 95292, 1, 1),
(DEFAULT, 'Куплю слона', 'Товар в отличном состоянии. Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам.', 'item14.jpg', 57803, 2, 1),
(DEFAULT, 'Продам книги Стивена Кинга', 'Продаю с болью в сердце... Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Таких предложений больше нет!', 'item10.jpg', 65364, 1, 2),
(DEFAULT, 'Куплю антиквариат', 'Пользовались бережно и только по большим праздникам. Даю недельную гарантию. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера!', 'item10.jpg', 68673, 1, 2),
(DEFAULT, 'Продам отличную подборку фильмов на VHS', 'При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам.', 'item02.jpg', 71934, 2, 2),
(DEFAULT, 'Куплю слона', 'Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки. Бонусом отдам все аксессуары. Таких предложений больше нет!', 'item01.jpg', 37149, 1, 2),
(DEFAULT, 'Куплю породистого кота', 'Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию.', 'item12.jpg', 43078, 1, 2),
(DEFAULT, 'Продам слона', 'Товар в отличном состоянии. Даю недельную гарантию. Таких предложений больше нет! Если найдёте дешевле — сброшу цену.', 'item07.jpg', 76625, 1, 2),
(DEFAULT, 'Куплю антиквариат', 'Продаю с болью в сердце... Таких предложений больше нет! Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам.', 'item12.jpg', 91186, 1, 2);

INSERT INTO categories VALUES
(DEFAULT, 'Книги'),
(DEFAULT, 'Разное'),
(DEFAULT, 'Посуда'),
(DEFAULT, 'Игры'),
(DEFAULT, 'Животные'),
(DEFAULT, 'Журналы'),
(DEFAULT, 'Цветы'),
(DEFAULT, 'Марки');

INSERT INTO tickets_categories VALUES
(DEFAULT, 1, 8),
(DEFAULT, 1, 5),
(DEFAULT, 2, 4),
(DEFAULT, 2, 8),
(DEFAULT, 2, 5),
(DEFAULT, 2, 2),
(DEFAULT, 3, 8),
(DEFAULT, 3, 5),
(DEFAULT, 3, 6),
(DEFAULT, 3, 3),
(DEFAULT, 4, 6),
(DEFAULT, 5, 8),
(DEFAULT, 5, 4),
(DEFAULT, 5, 2),
(DEFAULT, 5, 6),
(DEFAULT, 6, 3),
(DEFAULT, 6, 7),
(DEFAULT, 7, 7),
(DEFAULT, 8, 3),
(DEFAULT, 9, 6),
(DEFAULT, 9, 4),
(DEFAULT, 9, 8),
(DEFAULT, 9, 3),
(DEFAULT, 10, 2),
(DEFAULT, 10, 1),
(DEFAULT, 10, 3),
(DEFAULT, 11, 8),
(DEFAULT, 11, 6),
(DEFAULT, 11, 7),
(DEFAULT, 11, 1),
(DEFAULT, 12, 4),
(DEFAULT, 12, 1),
(DEFAULT, 12, 5),
(DEFAULT, 13, 1),
(DEFAULT, 13, 5),
(DEFAULT, 13, 7),
(DEFAULT, 13, 2);

INSERT INTO comments VALUES
(DEFAULT, 'С чем связана продажа? Почему так дешёво?', 1, 1),
(DEFAULT, 'Совсем немного...', 2, 1),
(DEFAULT, 'Оплата наличными или перевод на карту?', 1, 1),
(DEFAULT, 'Совсем немного... С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?', 1, 2),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Совсем немного...', 1, 2),
(DEFAULT, 'Неплохо, но дорого.', 1, 2),
(DEFAULT, 'А где блок питания? Вы что?! В магазине дешевле.', 1, 2),
(DEFAULT, 'Неплохо, но дорого. Оплата наличными или перевод на карту?', 1, 3),
(DEFAULT, 'Совсем немного...', 2, 3),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?', 2, 3),
(DEFAULT, 'Почему в таком ужасном состоянии?', 2, 4),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 2, 4),
(DEFAULT, 'А где блок питания?', 1, 4),
(DEFAULT, 'Вы что?! В магазине дешевле. А сколько игр в комплекте?', 1, 5),
(DEFAULT, 'Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво? Неплохо, но дорого.', 1, 5),
(DEFAULT, 'А где блок питания? А сколько игр в комплекте?', 2, 5),
(DEFAULT, 'Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?', 2, 5),
(DEFAULT, 'А где блок питания? А сколько игр в комплекте? Оплата наличными или перевод на карту?', 1, 6),
(DEFAULT, 'С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?', 2, 6),
(DEFAULT, 'А где блок питания?', 1, 7),
(DEFAULT, 'Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.', 1, 7),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца.', 2, 7),
(DEFAULT, 'А сколько игр в комплекте? Оплата наличными или перевод на карту? А где блок питания?', 2, 7),
(DEFAULT, 'С чем связана продажа? Почему так дешёво?', 1, 8),
(DEFAULT, 'А сколько игр в комплекте? Вы что?! В магазине дешевле.', 2, 8),
(DEFAULT, 'Оплата наличными или перевод на карту?', 1, 9),
(DEFAULT, 'Неплохо, но дорого. Вы что?! В магазине дешевле.', 1, 9),
(DEFAULT, 'Продаю в связи с переездом. Отрываю от сердца. А где блок питания?', 1, 10),
(DEFAULT, 'А где блок питания? Неплохо, но дорого.', 2, 10),
(DEFAULT, 'Вы что?! В магазине дешевле.', 2, 10),
(DEFAULT, 'Неплохо, но дорого. А сколько игр в комплекте? Почему в таком ужасном состоянии?', 2, 11),
(DEFAULT, 'Совсем немного... Неплохо, но дорого.', 2, 11),
(DEFAULT, 'Оплата наличными или перевод на карту?', 2, 12),
(DEFAULT, 'С чем связана продажа? Почему так дешёво?', 1, 12),
(DEFAULT, 'Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.', 2, 12);
