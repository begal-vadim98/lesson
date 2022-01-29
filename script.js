const  title = "Lesson #2",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 100,
  rollback = 70,
  fullPrice = 3000,
  adaptive = false;

console.log(`Типы данных: ${typeof title}, ${typeof fullPrice}, ${typeof adaptive}`);

console.log(`Длина строки: ${screens.length}`);

console.log(`Стоимость верстки экранов: ${screenPrice} рублей`);

console.log(`Стоимость разработки сайта: ${fullPrice} рублей`);

console.log(screens.toLowerCase().split(/\s*,\s*/));

console.log(`Процент отката посреднику за работу: ${fullPrice * (rollback / 100)}`);
