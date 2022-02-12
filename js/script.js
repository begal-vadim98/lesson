'use strict'
const documentTitle = document.getElementsByTagName('h1')[0],

  calculateStartBtn = document.getElementsByClassName('handler_btn')[0],
  calculateReseteBtn = document.getElementsByClassName('handler_btn')[1],

  addScreenBtn = document.querySelector('.screen-btn'),

  otherItemsPercent = document.querySelectorAll('.other-items.percent'),
  otherItemsNumber = document.querySelectorAll('.other-items.number'),

  inputTypeRange = document.querySelector('.rollback > .main-controls__range > input[type="range"]'),
  rangeValue = document.querySelector('.rollback > .main-controls__range > .range-value'),

  totalInput = document.getElementsByClassName('total-input')[0],
  totalCount = document.getElementsByClassName('total-input')[1],
  totalCountOuther = document.getElementsByClassName('total-input')[2],
  totalFullCount = document.getElementsByClassName('total-input')[3],
  totalCountRollback = document.getElementsByClassName('total-input')[4];

let screenBlock = Array.from(document.querySelectorAll('.screen'));


const appData = {
  rollback: 10,
  title: '',
  screens: [],
  allCount: 0,
  screenPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  adaptive: true,
  fullPrice: 0,
  servicePercentPrice: 0,
  additionalServicePercent: {},
  additionalServiceNumber: {},
  init: function () {
    appData.baseSettings();
    inputTypeRange.addEventListener('input', appData.addRange);
    addScreenBtn.addEventListener('click', appData.addScreenBlock);
    calculateStartBtn.addEventListener('click', appData.resutlAddScreen);
    inputTypeRange.addEventListener('input', appData.showResultRange);

  },

  baseSettings: function () {
    appData.addTitle();
    appData.rollback = inputTypeRange.value;
  },

  addTitle: function () {
    document.title = documentTitle.textContent;
  },


  addRange: function () {
    rangeValue.textContent = inputTypeRange.value + "%";
    appData.rollback = inputTypeRange.value;
  },

  resutlAddScreen: function () {
    if (appData.addScreens() !== true) {
      alert("Не выбран тип экрана или их колличество");
    } else appData.start();
  },

  start: function () {
    appData.addServices();
    appData.addPrice();

    // appData.loger();

    appData.showResult()

    console.log(appData.screens)
  },

  showResult: function () {
    totalInput.value = appData.screenPrice;
    totalCount.value = appData.allCount;
    totalCountOuther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  showResultRange: function () {
    appData.rollback = inputTypeRange.value;
    appData.servicePercentPrice = (appData.fullPrice) - Math.ceil((appData.fullPrice * (appData.rollback / 100)));
    totalCountRollback.value = appData.servicePercentPrice;
  },


  addScreens: function () {

    appData.screens = [];

    screenBlock.forEach(function (screen, index) {
      const select = screen.querySelector('select'),
        input = screen.querySelector('input'),
        selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });

    if (appData.screens.find(item => item.price === 0)) return false;
    else return true;
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) appData.additionalServicePercent[label.textContent] = +input.value;

    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) appData.additionalServiceNumber[label.textContent] = +input.value;

    });
  },

  addScreenBlock: function () {
    const cloneScreen = screenBlock[0].cloneNode(true);
    screenBlock[screenBlock.length - 1].after(cloneScreen);
    screenBlock.push(cloneScreen);
  },

  addPrice: function () {

    appData.screenPrice = appData.screens.reduce(function (num, current) {
      return num + current.price;
    }, appData.screenPrice);

    appData.allCount = appData.screens.reduce(function (num, current) {
      return num + current.count;
    }, appData.allCount);


    for (let key in appData.additionalServiceNumber) {
      appData.servicePricesNumber += appData.additionalServiceNumber[key];
    };

    for (let key in appData.additionalServicePercent) {
      appData.servicePricesPercent += Math.ceil((appData.screenPrice * (appData.additionalServicePercent[key] / 100)));
    };

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicePercentPrice = (appData.fullPrice) - Math.ceil((appData.fullPrice * (appData.rollback / 100)));
  },

  loger: function () {
   
  }

}
appData.init();
