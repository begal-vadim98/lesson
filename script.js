'use strict'

let  rollback = 10,
  title,
  screens,
  screenPrice,
  allServicePrices,
  adaptive,
  fullPrice,
  servicePercentPrice,
  additionalServiceOne,
  additionalServiceTwo;

const isNumber = function(num) {
  return !isNaN(parseFloat(num))  && isFinite(num) && !num.includes(" ");
}

const asking = function () {
  title = prompt("Как называется ваш проект?", "Lesson"),
  screens = prompt("Какие типы экранов нужно разработать??", "Простые, Сложные, Интерактивные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
  } while (!isNumber(screenPrice));

  screenPrice = parseFloat(screenPrice);

  adaptive = confirm("Нужен ли адаптив на сайте?");

}


// Функция возвращает сумму всех дополнительных услуг
const getAllServicePrices = function() {
  let sum = 0,
    sumNumber;

  for (let i = 0; i < 2; i++) {

      if(i === 0) additionalServiceOne = prompt("Какой дополнительный тип услуги необходим", `Услуга ${i + 1}`);

      if(i === 1) additionalServiceTwo = prompt("Какой дополнительный тип услуги необходим", `Услуга ${i + 1}`);
      
      do {
        sumNumber = prompt("Сколько это будет стоить?", "1000");

      } while(!isNumber(sumNumber));
      
      sumNumber = parseFloat(sumNumber);


      sum += sumNumber;

  } 

  return sum;

}

const showTypeOf = function(variables) {

  return `${variables} : ${typeof variables}`

}
// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг 
const getFullPrice = function (priceWork, amountServices) {
  
  return priceWork + amountServices;

}

// getServicePercentPrices
const getServicePercentPrices = function(amount, percent) {

  return (amount) -  Math.ceil((amount * (percent / 100)));

}

// Функция возвращает title меняя его 
const getTitle = function(documentTitle) {

  const removingSpaces = documentTitle.trim(),
    OneLetter = removingSpaces[0].toUpperCase();
    
  return OneLetter + removingSpaces.slice(1).toLowerCase();
    
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
// Переопределение переменных
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);


console.log(additionalServiceOne, additionalServiceTwo);

console.log(`Типы данных: ${showTypeOf(getTitle(title))}, ${showTypeOf(fullPrice)}, ${showTypeOf(adaptive)}`);
console.log(screens.toLowerCase().split(/\s* \s*/));
console.log(getRollbackMessage(fullPrice));
console.log(`Стоимость разработки сайта c учетом вычета отката: ${getServicePercentPrices(fullPrice, rollback)} рублей`);
