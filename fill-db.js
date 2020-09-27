'use strict';

const users = [
{
  firstname: 'Lucia',
  lastname: 'Hill',
  email: 'caneddorrofu-2720@gmail.com',
  password: 'bcR02bhrnpc9M2kfyyHe',
  avatar: 'avatar02.jpg',
  },
{
  firstname: 'Lucia',
  lastname: 'Hill',
  email: 'eqywepaf-9732@gmail.com',
  password: 'xMiTphgQo7zs5AC9vd25',
  avatar: 'avatar03.jpg',
  },
];

const types = [
{
  name: 'куплю',
},
{
  name: 'продам',
}
];

const tickets = [
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Даю недельную гарантию. Таких предложений больше нет! Товар в отличном состоянии. Бонусом отдам все аксессуары.',
  picture: 'item08.jpg',
  price: 7795,
  typeId: 1,
  authorId: 1,
},
{
  title: 'Куплю слона',
  descr: 'Это настоящая находка для коллекционера! Продаю с болью в сердце... Даю недельную гарантию. Если товар не понравится — верну всё до последней копейки.',
  picture: 'item03.jpg',
  price: 67702,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Куплю слона',
  descr: 'Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города.',
  picture: 'item09.jpg',
  price: 86006,
  typeId: 1,
  authorId: 1,
},
{
  title: 'Продам новую приставку Sony Playstation 5',
  descr: 'При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Пользовались бережно и только по большим праздникам. Товар в отличном состоянии.',
  picture: 'item02.jpg',
  price: 86086,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Куплю антиквариат',
  descr: 'Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки.',
  picture: 'item02.jpg',
  price: 40182,
  typeId: 1,
  authorId: 1,
},
{
  title: 'Куплю антиквариат',
  descr: 'Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет! Даю недельную гарантию.',
  picture: 'item16.jpg',
  price: 71757,
  typeId: 1,
  authorId: 1,
},
{
  title: 'Продам отличную подборку фильмов на VHS',
  descr: 'Даю недельную гарантию. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Товар в отличном состоянии.',
  picture: 'item13.jpg',
  price: 71623,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Продам новую приставку Sony Playstation 5',
  descr: 'При покупке с меня бесплатная доставка в черте города. Таких предложений больше нет! Продаю с болью в сердце... Бонусом отдам все аксессуары.',
  picture: 'item07.jpg',
  price: 36994,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Продам новую приставку Sony Playstation 5',
  descr: 'Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии.',
  picture: 'item14.jpg',
  price: 42823,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену.',
  picture: 'item15.jpg',
  price: 92460,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.',
  picture: 'item14.jpg',
  price: 42006,
  typeId: 1,
  authorId: 2,
},
{
  title: 'Куплю слона',
  descr: 'Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце... Таких предложений больше нет! Бонусом отдам все аксессуары.',
  picture: 'item15.jpg',
  price: 28687,
  typeId: 1,
  authorId: 2,
},
{
  title: 'Куплю антиквариат',
  descr: 'При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам. Продаю с болью в сердце...',
  picture: 'item16.jpg',
  price: 61943,
  typeId: 2,
  authorId: 2,
},
];

const categories = [
{
  name: 'Книги',
},
{
  name: 'Разное',
},
{
  name: 'Посуда',
},
{
  name: 'Игры',
},
{
  name: 'Животные',
},
{
  name: 'Журналы',
},
{
  name: 'Цветы',
},
{
  name: 'Марки',
},
];

const ticketsCategories = [
{
  ticketId: 1,
  categoryId: 6,
},
{
  ticketId: 1,
  categoryId: 7,
},
{
  ticketId: 2,
  categoryId: 7,
},
{
  ticketId: 2,
  categoryId: 5,
},
{
  ticketId: 2,
  categoryId: 6,
},
{
  ticketId: 3,
  categoryId: 8,
},
{
  ticketId: 4,
  categoryId: 3,
},
{
  ticketId: 4,
  categoryId: 5,
},
{
  ticketId: 5,
  categoryId: 5,
},
{
  ticketId: 6,
  categoryId: 4,
},
{
  ticketId: 6,
  categoryId: 5,
},
{
  ticketId: 6,
  categoryId: 2,
},
{
  ticketId: 7,
  categoryId: 7,
},
{
  ticketId: 7,
  categoryId: 6,
},
{
  ticketId: 7,
  categoryId: 4,
},
{
  ticketId: 7,
  categoryId: 3,
},
{
  ticketId: 8,
  categoryId: 3,
},
{
  ticketId: 9,
  categoryId: 5,
},
{
  ticketId: 10,
  categoryId: 7,
},
{
  ticketId: 11,
  categoryId: 8,
},
{
  ticketId: 12,
  categoryId: 6,
},
{
  ticketId: 12,
  categoryId: 5,
},
{
  ticketId: 12,
  categoryId: 3,
},
{
  ticketId: 13,
  categoryId: 1,
},
{
  ticketId: 13,
  categoryId: 3,
},
{
  ticketId: 13,
  categoryId: 6,
},
{
  ticketId: 13,
  categoryId: 4,
},
];

const comments = [
{
  content: 'Вы что?! В магазине дешевле.',
  authorId: 1,
  ticketId: 1,
},
{
  content: 'Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. Совсем немного...',
  authorId: 1,
  ticketId: 1,
},
{
  content: 'Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?',
  authorId: 2,
  ticketId: 1,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 1,
},
{
  content: 'Совсем немного... Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?',
  authorId: 1,
  ticketId: 2,
},
{
  content: 'А сколько игр в комплекте?',
  authorId: 1,
  ticketId: 2,
},
{
  content: 'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого.',
  authorId: 1,
  ticketId: 2,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.',
  authorId: 2,
  ticketId: 3,
},
{
  content: 'А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?',
  authorId: 1,
  ticketId: 3,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 3,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 2,
  ticketId: 3,
},
{
  content: 'Совсем немного... А где блок питания?',
  authorId: 1,
  ticketId: 4,
},
{
  content: 'Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?',
  authorId: 2,
  ticketId: 4,
},
{
  content: 'Совсем немного... А сколько игр в комплекте?',
  authorId: 1,
  ticketId: 4,
},
{
  content: 'Неплохо, но дорого. А где блок питания? Оплата наличными или перевод на карту?',
  authorId: 2,
  ticketId: 5,
},
{
  content: 'Совсем немного... А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?',
  authorId: 2,
  ticketId: 5,
},
{
  content: 'Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.',
  authorId: 2,
  ticketId: 5,
},
{
  content: 'А где блок питания? Неплохо, но дорого.',
  authorId: 2,
  ticketId: 6,
},
{
  content: 'Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого.',
  authorId: 1,
  ticketId: 6,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 6,
},
{
  content: 'С чем связана продажа? Почему так дешёво?',
  authorId: 2,
  ticketId: 7,
},
{
  content: 'А где блок питания? С чем связана продажа? Почему так дешёво? Неплохо, но дорого.',
  authorId: 2,
  ticketId: 7,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. А где блок питания?',
  authorId: 1,
  ticketId: 7,
},
{
  content: 'А сколько игр в комплекте?',
  authorId: 1,
  ticketId: 7,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?',
  authorId: 2,
  ticketId: 8,
},
{
  content: 'Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?',
  authorId: 2,
  ticketId: 8,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 2,
  ticketId: 8,
},
{
  content: 'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого.',
  authorId: 2,
  ticketId: 8,
},
{
  content: 'Совсем немного... Почему в таком ужасном состоянии?',
  authorId: 2,
  ticketId: 9,
},
{
  content: 'А сколько игр в комплекте?',
  authorId: 2,
  ticketId: 9,
},
{
  content: 'Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца.',
  authorId: 1,
  ticketId: 9,
},
{
  content: 'А сколько игр в комплекте?',
  authorId: 1,
  ticketId: 9,
},
{
  content: 'Вы что?! В магазине дешевле.',
  authorId: 2,
  ticketId: 10,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 10,
},
{
  content: 'Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. Совсем немного...',
  authorId: 2,
  ticketId: 11,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 11,
},
{
  content: 'С чем связана продажа? Почему так дешёво?',
  authorId: 2,
  ticketId: 11,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  ticketId: 12,
},
{
  content: 'А сколько игр в комплекте?',
  authorId: 1,
  ticketId: 12,
},
{
  content: 'Совсем немного...',
  authorId: 1,
  ticketId: 12,
},
{
  content: 'Неплохо, но дорого. Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.',
  authorId: 1,
  ticketId: 12,
},
];

module.exports = {
  users,
  types,
  tickets,
  categories,
  ticketsCategories,
  comments,
};