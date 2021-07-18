import "core-js/stable";
import "regenerator-runtime/runtime";
import { getTravelInsights } from './js/app';
import { setMinDate } from './js/date';

let newMinDate = setMinDate();

document.getElementById('arrivalDate').setAttribute('min', newMinDate);
document.getElementById('submit').addEventListener('click', getTravelInsights);


import dummy from './asset/images/dummy.jpg';

document.getElementById('card-image').src = dummy;

// index.js
//import 'simple-css-reset/reset.css';
//import 'reset-css'
import './styles/header.scss'
import './styles/form.scss'
import './styles/result.scss'



//export {}