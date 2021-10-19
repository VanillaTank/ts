"use strict";
//компиляция tsc index.ts
//  tsc должен быть установлен глобально
//  tsc --init создаст tsconfig.json
//  там находим "outDir" и "rootDir", убираем коммент и пишем пути
//  вызываем просто tsc
//  tsc -w - следит за изменениями в "rootDir" (как nodemon)
//------------------------------------------------------------
// одновременная компиляция и запуск кода
//   npm install nodemon concurrently --save
//   пишем скрипты в package,json
//   "scripts": {
//       "start:build": "tsc -w",
//       "start:run": "nodemon build/index.js",
//       "start": "concrrently npm:start:*"
//     },
//   npm run start запустиит оба скрипта одновременно
//------------------------------------------------------------
//простой сортирующий механизм (пузырьком)
//  последовательно сравнивает 2 соседних элемента и меняет местами, большее в право
//  крайнее правое число после каждой итерации самое большое и не вкл в следующую итерацию
//  максимальное число итерация (количество элементов - 1)
var Sorter = /** @class */ (function () {
    //public позволяет не писать вот так:
    //  collection: number[];
    //  constructor(collection: number[]) {
    //       this.collection = collection
    //   }
    function Sorter(collection) {
        this.collection = collection;
    }
    // сама сортировка (работает только для массива, тк строка разрешает только чтение. и буквы не будут сравниваться таким образом. JS может сравнить только коды символов, например, "A".charCodeAt(0) > "a".charCodeAt(0)) 
    // sort(): void {
    //     const { length } = this.collection;
    //     for (let i = 0; i < length; i++) {
    //         for (let j = 0; j < length - i - 1; j++) {
    //             if (this.collection[j] > this.collection[j + 1]) {
    //                 // меняем местами элементы коллекции
    //                 const leftHand = this.collection[j];
    //                 this.collection[j] = this.collection[j + 1];
    //                 this.collection[j + 1] = leftHand;
    //             }
    //         }
    //     }
    Sorter.prototype.sort = function () {
        var length = this.collection.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                // используем охрану типов, чтобы прояснять, с каким типом переменной мы работаем. Доступ к методам массива разрешен.
                if (this.collection instanceof Array) {
                    if (this.collection[j] > this.collection[j + 1]) {
                        // меняем местами элементы коллекции
                        var leftHand = this.collection[j];
                        this.collection[j] = this.collection[j + 1];
                        this.collection[j + 1] = leftHand;
                    }
                }
                // а вот здесь разрешен доступ к методам строки
                if (typeof this.collection === 'string') {
                    this.collection;
                }
            }
        }
    };
    return Sorter;
}());
var sorter = new Sorter([4, -3, 11, 2]);
sorter.sort();
console.log(sorter.collection);
//11-9 08:00
