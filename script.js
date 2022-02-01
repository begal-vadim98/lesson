'use strict'

const title = prompt("Как называется ваш проект?"),
  screens = prompt("Какие типы экранов нужно разработать??", "Простые, Сложные, Интерактивные"),
  screenPrice = +prompt("Сколько будет стоить данная работа?", 12000),
  adaptive = confirm("Нужен ли адаптив на сайте?"),
  additionalServiceOne = prompt("Какой дополнительный тип услуги нужен?"),
  priceServiceOne = +prompt("Сколько это будет стоить?"),
  additionalServiceTwo = prompt("Какой дополнительный тип услуги нужен?"),
  priceServiceTwo = +prompt("Сколько это будет стоить?"),
  rollback = 10;

// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function(expressionOne, expressionTwo) {
  return expressionOne + expressionTwo;
}
const allServicePrices = getAllServicePrices(priceServiceOne,priceServiceTwo);

// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг 
function getFullPrice(priceWork, amountServices) {
  return priceWork + amountServices;
}
const fullPrice = getFullPrice(screenPrice, allServicePrices);

// Функция возвращает title меняя его 
const getTitle = function(documentTitle) {

  const removingSpaces = documentTitle.trim(),
    OneLetter = removingSpaces[0].toUpperCase();
    
  return OneLetter + removingSpaces.slice(1).toLowerCase();
    
}

// getServicePercentPrices
const getServicePercentPrices = function(amount, percent) {

  return amount -  Math.ceil((amount * (percent / 100)));

}

const showTypeOf = function(variables) {

  return `${variables} : ${typeof variables}`

}

const getRollbackMessage = function(amount) {

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
  
}
console.log(`Типы данных: ${showTypeOf(getTitle(title))}, ${showTypeOf(fullPrice)}, ${showTypeOf(adaptive)}`);
console.log(screens.toLowerCase().split(/\s* \s*/));
console.log(getRollbackMessage(fullPrice));
console.log(`Стоимость разработки сайта c учетом вычета отката: ${getServicePercentPrices(fullPrice, rollback)} рублей`);