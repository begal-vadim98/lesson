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

  const cmsOpen = document.querySelector('#cms-open'),
    cmsVariants = document.querySelector('.hidden-cms-variants'),
    cmsSelect = cmsVariants.querySelector('#cms-select'),
    cmsvariantInput = cmsVariants.querySelector('.main-controls__input ');

let screenBlock = Array.from(document.querySelectorAll('.screen'));


const appData = {
  rollback: 10,
  title: '',
  screens: [],
  allCount: 0,
  screenPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  cmsPercent: 0,
  adaptive: true,
  fullPrice: 0,
  servicePercentPrice: 0,
  additionalServicePercent: {},
  additionalServiceNumber: {},
  init: function () {

    for (let key in appData) {
      if (typeof appData[key] == 'function') {
        appData[key] = appData[key].bind(appData);
      }
    };

    this.baseSettings();
    inputTypeRange.addEventListener('input', this.addRange);
    cmsOpen.addEventListener('input', this.cmsOpen);

    addScreenBtn.addEventListener('click', this.addScreenBlock);
    calculateStartBtn.addEventListener('click', this.resutlAddScreen);
    inputTypeRange.addEventListener('input', this.showResultRange);
    calculateReseteBtn.addEventListener('click', this.reset);

  },

  baseSettings: function () {
    this.addTitle();
    this.rollback = inputTypeRange.value;
  },

  addTitle: function () {
    document.title = documentTitle.textContent;
  },


  addRange: function () {
    rangeValue.textContent = inputTypeRange.value + "%";
    this.rollback = inputTypeRange.value;
  },

  resutlAddScreen: function () {

    if (this.addScreens() !== true) {
      alert("Не выбран тип экрана или их колличество");
    } else this.start();

  },

  start: function () {

    this.addServices();
    this.addPrice();

    // appData.loger();

    this.showResult();
    this.disabled();
  },

  showResult: function () {
    totalInput.value = this.screenPrice;
    totalCount.value = this.allCount;
    totalCountOuther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  showResultRange: function () {
    this.rollback = inputTypeRange.value;
    this.servicePercentPrice = (this.fullPrice) - Math.ceil((this.fullPrice * (this.rollback / 100)));
    totalCountRollback.value = this.servicePercentPrice;
  },


  addScreens: function () {
    this.screens = [];

    screenBlock.forEach((screen, index) => {
      const select = screen.querySelector('select'),
        input = screen.querySelector('input'),
        selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });

    if (this.screens.find(item => item.price === 0)) return false;
    else return true;
  },

  addServices: function () {
    otherItemsPercent.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) this.additionalServicePercent[label.textContent] = +input.value;

    });

    otherItemsNumber.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) this.additionalServiceNumber[label.textContent] = +input.value;

    });
  },

  addScreenBlock: function () {
    const cloneScreen = screenBlock[0].cloneNode(true);

    cloneScreen.querySelector('input').value = "";

    screenBlock[screenBlock.length - 1].after(cloneScreen);
    screenBlock.push(cloneScreen);
  },

  addPrice: function () {


    this.screenPrice = this.screens.reduce(function (num, current) {
      return num + current.price;
    }, this.screenPrice);

    this.allCount = this.screens.reduce(function (num, current) {
      return num + current.count;
    }, this.allCount);


    for (let key in this.additionalServiceNumber) {
      this.servicePricesNumber += this.additionalServiceNumber[key];
    };

    for (let key in this.additionalServicePercent) {
      this.servicePricesPercent += Math.ceil((this.screenPrice * (this.additionalServicePercent[key] / 100)));
    };

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.fullPrice +=  (this.fullPrice * (this.cmsPercent/100));

    this.servicePercentPrice = (this.fullPrice) - Math.ceil((this.fullPrice * (this.rollback / 100)));
  },

  cmsOpen: function () {
    if(cmsOpen.checked) cmsVariants.style.display = 'flex';
    else cmsVariants.style.display = 'none';

    cmsVariants.addEventListener('input', () => {

      switch(true) {
        case cmsSelect.value === 'other':
          cmsvariantInput.style.display = 'flex';
          break;
        case cmsSelect.value === '50':
          cmsvariantInput.style.display = 'none';
          this.cmsPercent = cmsSelect.value;
          break;
      }
      
    })
  },

  reset: function () {
    this.removeServices();
    this.enabled();

  },

  enabled: function () {
    const enabledElements = [addScreenBtn, ...document.querySelectorAll('.main-controls input[type=text]'), ...document.querySelectorAll('.main-controls select'),
      ...document.querySelectorAll('.main-controls input[type=checkbox]')
    ];
    enabledElements.forEach(element => {
      element.disabled = false;
    });
    calculateStartBtn.style.display = 'block';
    calculateReseteBtn.style.display = 'none';

  },

  disabled: function () {

    const disabledElements = [addScreenBtn, ...document.querySelectorAll('.main-controls input[type=text]'), ...document.querySelectorAll('.main-controls select'),
      ...document.querySelectorAll('.main-controls input[type=checkbox]')
    ];

    disabledElements.forEach(element => {
      element.disabled = true;
    });

    calculateStartBtn.style.display = 'none';
    calculateReseteBtn.style.display = 'block';
  },

  removeServices: function () {
    const [resetCount, resetChecbox, resetSelect, resetSelectInput] = [
      [totalInput, totalCount, totalCountOuther, totalFullCount, totalCountRollback],
      ...[document.querySelectorAll('input[type=checkbox]')],
      document.querySelector('select'),
      document.querySelector('.main-controls__input input')
    ];


    resetCount.forEach(element => element.value = 0);
    resetChecbox.forEach(element => element.checked = false);

    cmsVariants.style.display = 'none';
    cmsSelect.value = "";
    resetSelect.value = "";
    resetSelectInput.value = "";

    this.cmsPercent = 0;
    this.allCount = 0;
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.additionalServicePercent = {},
    this.additionalServiceNumber = {},
    

    screenBlock.forEach((item, index) => {
      if (index !== 0) item.remove();
    })

    screenBlock = screenBlock.slice(0, 1);
  },

  loger: function () {

  }

}
appData.init();