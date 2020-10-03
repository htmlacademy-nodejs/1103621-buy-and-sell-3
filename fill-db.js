'use strict';

const users = [
{
  firstname: 'Lily',
  lastname: 'Harris',
  email: 'tumexalla-5490@gmail.com',
  password: 'sr4bUZ7UeZGYFx1Wu0FL',
  avatar: 'avatar04.jpg',
  },
{
  firstname: 'Lucia',
  lastname: 'Williams',
  email: 'kamammyllu-9622@gmail.com',
  password: 'xMiTphgQo7zs5AC9vd25',
  avatar: 'avatar01.jpg',
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

const offers = [
{
  title: 'Куплю слона',
  descr: 'Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену.',
  picture: 'item13.jpg',
  price: 73148,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Продам слона',
  descr: 'Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Таких предложений больше нет!',
  picture: 'item01.jpg',
  price: 98094,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Продаю с болью в сердце... Бонусом отдам все аксессуары. Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города.',
  picture: 'item11.jpg',
  price: 44069,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Куплю антиквариат',
  descr: 'Товар в отличном состоянии. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки.',
  picture: 'item02.jpg',
  price: 64686,
  typeId: 1,
  authorId: 1,
},
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Даю недельную гарантию. Товар в отличном состоянии. Пользовались бережно и только по большим праздникам. Бонусом отдам все аксессуары.',
  picture: 'item11.jpg',
  price: 8991,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Продам слона',
  descr: 'Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. Если найдёте дешевле — сброшу цену. Продаю с болью в сердце...',
  picture: 'item01.jpg',
  price: 43538,
  typeId: 2,
  authorId: 1,
},
{
  title: 'Продам книги Стивена Кинга',
  descr: 'Таких предложений больше нет! Товар в отличном состоянии. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки.',
  picture: 'item06.jpg',
  price: 63429,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Куплю антиквариат',
  descr: 'Пользовались бережно и только по большим праздникам. При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера!',
  picture: 'item10.jpg',
  price: 82248,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Куплю антиквариат',
  descr: 'Даю недельную гарантию. Продаю с болью в сердце... Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.',
  picture: 'item13.jpg',
  price: 24942,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Куплю породистого кота',
  descr: 'При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Таких предложений больше нет! Продаю с болью в сердце...',
  picture: 'item10.jpg',
  price: 43259,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Куплю антиквариат',
  descr: 'Это настоящая находка для коллекционера! Таких предложений больше нет! Даю недельную гарантию. При покупке с меня бесплатная доставка в черте города.',
  picture: 'item10.jpg',
  price: 63635,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Продам новую приставку Sony Playstation 5',
  descr: 'Бонусом отдам все аксессуары. Товар в отличном состоянии. Таких предложений больше нет! Если найдёте дешевле — сброшу цену.',
  picture: 'item07.jpg',
  price: 14151,
  typeId: 2,
  authorId: 2,
},
{
  title: 'Куплю слона',
  descr: 'Пользовались бережно и только по большим праздникам. Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки.',
  picture: 'item01.jpg',
  price: 18240,
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

const offersCategories = [
{
  offerId: 1,
  categoryId: 7,
},
{
  offerId: 1,
  categoryId: 8,
},
{
  offerId: 1,
  categoryId: 4,
},
{
  offerId: 2,
  categoryId: 5,
},
{
  offerId: 2,
  categoryId: 2,
},
{
  offerId: 2,
  categoryId: 8,
},
{
  offerId: 3,
  categoryId: 1,
},
{
  offerId: 3,
  categoryId: 8,
},
{
  offerId: 4,
  categoryId: 2,
},
{
  offerId: 4,
  categoryId: 6,
},
{
  offerId: 5,
  categoryId: 6,
},
{
  offerId: 5,
  categoryId: 8,
},
{
  offerId: 5,
  categoryId: 2,
},
{
  offerId: 6,
  categoryId: 5,
},
{
  offerId: 7,
  categoryId: 8,
},
{
  offerId: 7,
  categoryId: 4,
},
{
  offerId: 7,
  categoryId: 7,
},
{
  offerId: 7,
  categoryId: 1,
},
{
  offerId: 8,
  categoryId: 6,
},
{
  offerId: 8,
  categoryId: 7,
},
{
  offerId: 9,
  categoryId: 5,
},
{
  offerId: 9,
  categoryId: 8,
},
{
  offerId: 10,
  categoryId: 1,
},
{
  offerId: 10,
  categoryId: 4,
},
{
  offerId: 10,
  categoryId: 3,
},
{
  offerId: 11,
  categoryId: 5,
},
{
  offerId: 11,
  categoryId: 7,
},
{
  offerId: 11,
  categoryId: 6,
},
{
  offerId: 11,
  categoryId: 8,
},
{
  offerId: 12,
  categoryId: 4,
},
{
  offerId: 12,
  categoryId: 6,
},
{
  offerId: 12,
  categoryId: 1,
},
{
  offerId: 13,
  categoryId: 8,
},
{
  offerId: 13,
  categoryId: 5,
},
];

const comments = [
{
  content: 'Неплохо, но дорого. Почему в таком ужасном состоянии?',
  authorId: 1,
  offerId: 1,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Совсем немного...',
  authorId: 1,
  offerId: 1,
},
{
  content: 'Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.',
  authorId: 2,
  offerId: 2,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 2,
  offerId: 2,
},
{
  content: 'Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?',
  authorId: 2,
  offerId: 2,
},
{
  content: 'Неплохо, но дорого. Совсем немного...',
  authorId: 1,
  offerId: 2,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Неплохо, но дорого.',
  authorId: 1,
  offerId: 3,
},
{
  content: 'Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.',
  authorId: 2,
  offerId: 3,
},
{
  content: 'А сколько игр в комплекте? Оплата наличными или перевод на карту?',
  authorId: 2,
  offerId: 3,
},
{
  content: 'А где блок питания?',
  authorId: 2,
  offerId: 3,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 1,
  offerId: 4,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 2,
  offerId: 4,
},
{
  content: 'Совсем немного... Неплохо, но дорого.',
  authorId: 2,
  offerId: 5,
},
{
  content: 'Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? А сколько игр в комплекте?',
  authorId: 2,
  offerId: 5,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 2,
  offerId: 5,
},
{
  content: 'Совсем немного... Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.',
  authorId: 1,
  offerId: 6,
},
{
  content: 'Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? А где блок питания?',
  authorId: 2,
  offerId: 6,
},
{
  content: 'Совсем немного... С чем связана продажа? Почему так дешёво? Неплохо, но дорого.',
  authorId: 2,
  offerId: 7,
},
{
  content: 'Неплохо, но дорого.',
  authorId: 2,
  offerId: 7,
},
{
  content: 'Совсем немного...',
  authorId: 2,
  offerId: 7,
},
{
  content: 'Почему в таком ужасном состоянии? Совсем немного... Оплата наличными или перевод на карту?',
  authorId: 1,
  offerId: 8,
},
{
  content: 'Неплохо, но дорого.',
  authorId: 2,
  offerId: 8,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Неплохо, но дорого. Оплата наличными или перевод на карту?',
  authorId: 2,
  offerId: 8,
},
{
  content: 'А сколько игр в комплекте? Почему в таком ужасном состоянии?',
  authorId: 2,
  offerId: 9,
},
{
  content: 'А где блок питания? Неплохо, но дорого. Вы что?! В магазине дешевле.',
  authorId: 2,
  offerId: 9,
},
{
  content: 'Оплата наличными или перевод на карту?',
  authorId: 1,
  offerId: 10,
},
{
  content: 'Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?',
  authorId: 1,
  offerId: 10,
},
{
  content: 'Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.',
  authorId: 2,
  offerId: 10,
},
{
  content: 'А где блок питания? Вы что?! В магазине дешевле.',
  authorId: 2,
  offerId: 11,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 1,
  offerId: 11,
},
{
  content: 'Оплата наличными или перевод на карту? А сколько игр в комплекте?',
  authorId: 2,
  offerId: 11,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?',
  authorId: 2,
  offerId: 11,
},
{
  content: 'А сколько игр в комплекте? А где блок питания?',
  authorId: 2,
  offerId: 12,
},
{
  content: 'Почему в таком ужасном состоянии?',
  authorId: 1,
  offerId: 12,
},
{
  content: 'Вы что?! В магазине дешевле.',
  authorId: 2,
  offerId: 12,
},
{
  content: 'С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту?',
  authorId: 1,
  offerId: 12,
},
];

module.exports = {
  users,
  types,
  offers,
  categories,
  offersCategories,
  comments,
};