const  title = prompt("Как называется ваш проект?"),
  screens = prompt("Какие типы экранов нужно разработать??", "Простые, Сложные, Интерактивные"),
  screenPrice = +prompt("Сколько будет стоить данная работа?", 12000),
  adaptive = !!confirm("Нужен ли адаптив на сайте?"),
  additionalServiceOne = prompt("Какой дополнительный тип услуги нужен?"),
  priceServiceOne = +prompt("Сколько это будет стоить?"),
  additionalServiceTwo = prompt("Какой дополнительный тип услуги нужен?"),
  priceServiceTwo = +prompt("Сколько это будет стоить?"),
  rollback = 10,
  fullPrice = screenPrice + priceServiceOne + priceServiceTwo,
  servicePercentPrice = fullPrice -  Math.ceil((fullPrice * (rollback / 100)));

// Конструкция условий
  switch (true) {

    case fullPrice > 30000:
      console.log("Даем скидку в 10%");
      break;

    case 15000 < fullPrice && fullPrice < 30000:
      console.log("Даем скидку в 5%");
      break;

    case 0 < fullPrice && fullPrice < 15000:
      console.log("Скидка не предусмотрена!");
      break;

    case fullPrice === 0:
      console.log("Стоимость равна 0");
      break;

    case fullPrice === 15000:
      console.log("Скидка 4.9%");
      break;

    case fullPrice === 30000:
      console.log("Скидка практически увелицилась больше 10%");
      break;

    case fullPrice < 0:
      console.log("Что то пошло не так");
      break;
    default:
      console.log("default");
  }

console.log(`Типы данных: ${typeof title}, ${typeof fullPrice}, ${typeof adaptive}`);
console.log(`Длина строки: ${screens.length}`);
console.log(`Стоимость верстки экранов: ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта: ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(/\s* \s*/));
console.log(`Процент отката посреднику за работу: ${Math.ceil((fullPrice * (rollback / 100)))}`);