'use strict'

const appData = {
  rollback: 10,
  title: '',
  screens: [],
  screenPrice: 0,
  allServicePrices: 0,
  adaptive: true,
  fullPrice: 0,
  servicePercentPrice: 0,
  additionalService: {},
  start: function () {
    appData.asking();
    appData.addPrice();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.loger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && !num.includes(" ");
  },

  isString: function (string) {

    return !isNaN(string) && !Number.isFinite(string) || string[0] === " " || string[string.length - 1] === " "; // Делаю такую проверку, т.к названия могут быть с пробелом
  },

  asking: function () {

    do {
      appData.title = prompt("Как называется ваш проект?", "Lesson");
    } while (appData.isString(appData.title));




    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;

      do {
        name = prompt("Какие типы экранов нужно разработать??");
      } while (appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      price = parseFloat(price);

      appData.screens.push({
        id: i,
        name: name,
        price: price
      });
    }


    for (let i = 0; i < 2; i++) {
      let name = "";
      let sum = 0;

      do {
        name = prompt("Какой дополнительный тип услуги необходим", `Услуга`);
      } while (appData.isString(name));



      do {
        sum = prompt("Сколько это будет стоить?", "1000");

      } while (!appData.isNumber(sum));

      sum = parseFloat(sum);


      appData.additionalService[name + `: ${i}`] = sum;

    }


    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

  },

  addPrice: function () {

    appData.screenPrice = appData.screens.reduce(function (num, current) {
      return num + current.price
    }, appData.screenPrice);


    for (let key in appData.additionalService) {
      appData.allServicePrices += appData.additionalService[key];
    };
  },

  getFullPrice: function () {

    appData.fullPrice = appData.screenPrice + appData.allServicePrices;

  },

  getServicePercentPrices: function () {

    appData.servicePercentPrice = (appData.fullPrice) - Math.ceil((appData.fullPrice * (appData.rollback / 100)));

  },

  getTitle: function () {

    const removingSpaces = appData.title.trim(),
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
    console.log(appData.screens)
    console.log(appData.title)
    console.log(appData.additionalService);
    console.log(`${appData.fullPrice} Стоимость разработки`);
    console.log(`Стоимость разработки сайта c учетом вычета отката: ${appData.servicePercentPrice} рублей`);

    // for (let key in appData) {
    //   if (typeof appData[key] === "function") console.log(`Метод обьекта ${appData[key]} %c Тип ${typeof appData[key]}`, "color: red;");
    //   else console.log(`Свойства обьекта ${key} Тип: ${typeof key}`);
    // }

  }



}
appData.start();;
