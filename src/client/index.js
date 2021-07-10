import "core-js/stable";
import "regenerator-runtime/runtime";
import { getTravelInsights } from './js/app';


document.getElementById('submit').addEventListener('click', getTravelInsights);


import dummy from './asset/images/dummy.jpg';

document.getElementById('card-image').src = dummy;

import './styles/resets.css'
import './styles/header.scss'
import './styles/form.scss'
import './styles/result.scss'



//export {}