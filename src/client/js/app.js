/* Global Variables */

/*GeoName Declarations*/
const geoNameURL = 'http://api.geonames.org/searchJSON?q=';

/*API Key Declarations*/
// const geoUserName = process.env.GEO_NAME;
const geoUserName = process.env.GEO_NAME;
const geoKey = process.env.GEO_KEY;
const bitKey = process.env.BIT_KEY;
const pixaKey = process.env.PIXA_KEY;

import { setMinDate } from './date';

// Create a new date instance dynamically with JS
function getDateDifference() {
    const curDate = setMinDate(); //new Date();
    const currentDate = new Date(curDate);
    let arrivalDate = document.getElementById('arrivalDate').value;
    const arrDate = new Date(arrivalDate);

    const diffTime = Math.abs(arrDate - currentDate) //
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}




// Event listener to add function to existing HTML DOM element

// async function getData(url) {
//     const response = await fetch(url);
//     const responseInfo = await response.json();
//     return responseInfo;
// }


/**
 * 
 * @param {*} location
 * @returns
 * 
 */
const getGeoNameData = async(location) => {
    const geoURL = `http://api.geonames.org/searchJSON?q=${location}&password=${geoKey}&username=${geoUserName}`
    try {
        //getData(geoURL)
        const res = await fetch(geoURL);
        const geoNameInfo = res.json();
        console.log(geoNameInfo);
        return geoNameInfo;
        //handle error
    } catch (error) {
        console.log('error', error);
    }
}


/**
 *
 * @param {*} longitude
 * @param {*} latitude
 * @returns sample as shown below
 * ```
 * {
    "icon":"c03d",
    "code": 803,
    "description":"Broken clouds"
    }
 ```
 */
async function getWeatherForecast(longitude, latitude) {
    const noOfDays = getDateDifference();
    const bitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${bitKey}&days=${noOfDays}`;
    try {
        const resBit = await fetch(bitURL);
        const weatherBitInfo = await resBit.json();
        console.log(weatherBitInfo);
        const info = weatherBitInfo.data;
        return info.weather;
    } catch (error) {
        console.log('error', error);
    }
}


/**
 *
 * @param {*} countryName
 * @returns sample as shown below
 * ```
 * hits[0].webformatURL
 * ```
 */
const getCountryImage = async(countryName) => {
    const pixaURL = `https://pixabay.com/api/?q=${countryName}&image_type=photo&key=${pixaKey}`;
    try {
        const resPix = await fetch(pixaURL);
        const pixaBayImage = await resPix.json();
        console.log(pixaBayImage);
        return pixaBayImage.hits[0].webformatURL;
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to update UI */
const updateUI = async(weatherForecastData, countryImageData, locationInfo, countryName) => {
    try {
        document.getElementById('departure').innerHTML = document.getElementById('arrivalDate').value;
        document.getElementById('daysAway').innerHTML = getDateDifference();
        document.getElementById('city').innerHTML = document.getElementById('location').value;
        //console.log(weatherForecastData.data);
        if (weatherForecastData == null) {
            console.log(weatherForecastData);
            document.getElementById("temp-display").innerHTML = "The requested weather information is not available";
        }
        //else {
        //     document.getElementById("temp-display").innerHTML = `Low Temp: ` + weatherForecastData[0].low_temp + `High Temp: ` + weatherForecastData[0].high_temp;
        // }

        document.getElementById('country').innerHTML = countryName;
        document.getElementById('card-image').src = countryImageData;
    } catch (error) {
        console.log('error', error);
    }
};


/* Function called by event listener */
async function getTravelInsights(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const geoNameInfo = await getGeoNameData(location);
    console.log(geoNameInfo.geonames);
    const { lng, lat, countryName } = geoNameInfo.geonames[0];

    const tripInDays = getDateDifference();

    let weatherForecast = null;

    if (tripInDays <= 16) {
        weatherForecast = await getWeatherForecast(lng, lat);
    };

    const countryImage = await getCountryImage(countryName);
    updateUI(weatherForecast, countryImage, location, countryName);
}


/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        //boilerplate
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //Body data type must match Content-Type
        body: JSON.stringify(data),
    });
    try {
        const newlocationData = await res.json();
        console.log(newlocationData);
        return newlocationData;
    } catch (error) {
        console.log('error', error);
    };
}

export { getGeoNameData }
export { getWeatherForecast }
export { getCountryImage }
export { getTravelInsights }