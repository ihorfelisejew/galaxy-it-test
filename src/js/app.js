console.log("Hello!")

//імпорт файлів використовуючи ES6
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

//підключення плагінів використовуючи ES6
import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();