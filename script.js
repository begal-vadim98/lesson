'use strict'

const appData = {
  rollback: 10,
  title: '',
  screens: '',
  screenPrice: 0,
  allServicePrices: 0,
  adaptive: true,
  fullPrice: 0,
  servicePercentPrice: 0,
  additionalServiceOne: '',
  additionalServiceTwo: '',

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && !num.includes(" ");
  },

  getAllServicePrices: function () {
    let sum = 0,
      sumNumber;

    for (let i = 0; i < 2; i++) {

      if (i === 0) appData.additionalServiceOne = prompt("Какой дополнительный тип услуги необходим", `Услуга ${i + 1}`);

      if (i === 1) appData.additionalServiceTwo = prompt("Какой дополнительный тип услуги необходим", `Услуга ${i + 1}`);

      do {
        sumNumber = prompt("Сколько это будет стоить?", "1000");

      } while (!appData.isNumber(sumNumber));

      sumNumber = parseFloat(sumNumber);


      sum += sumNumber;

    }

    return sum;

  },

  getFullPrice: function (priceWork, amountServices) {

    return priceWork + amountServices;

  },

  getServicePercentPrices: function (amount, percent) {

    return (amount) - Math.ceil((amount * (percent / 100)));

  },

  getTitle: function (documentTitle) {

    const removingSpaces = documentTitle.trim(),
      OneLetter = removingSpaces[0].toUpperCase();

    return OneLetter + removingSpaces.slice(1).toLowerCase();

  },

  getRollbackMessage: function (amount) {

    switch (true) {

      case amount > 30000:
        return "Даем скидку в 10%";
        break;

      case 15000 < amount && amount <= 30000:
        return "Даем скидку в 5%";
        break;

      case 0 <= amount && amount <= 15000:
        return "Скидка не предусмотрена!";
        break;

      default:
        return "Что то пошло не так";
    }

  },

  loger: function () {
    console.log(appData.additionalServiceOne, appData.additionalServiceTwo);;
    console.log(appData.screens.toLowerCase().split(/\s* \s*/));
    console.log(`${appData.fullPrice} Стоимость разработки`);
    console.log(`Стоимость разработки сайта c учетом вычета отката: ${appData.servicePercentPrice} рублей`);

    for (let key in appData) {
      if (typeof appData[key] === "function") console.log(`Метод обьекта ${appData[key]} %c Тип ${typeof appData[key]}`, "color: red;");
      else console.log(`Свойства обьекта ${key} Тип: ${typeof key}`);
    }

  },

  start: function () {
    appData.title = prompt("Как называется ваш проект?", "Lesson"),
      appData.screens = prompt("Какие типы экранов нужно разработать??", "Простые, Сложные, Интерактивные");

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = parseFloat(appData.screenPrice);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);

    appData.loger();
  }


}
appData.start();;
