/* Global Variables */

/*GeoName Declarations*/
const geoNameURL = 'http://api.geonames.org/searchJSON?q=';

/*API Key Declarations*/
// const geoUserName = process.env.GEO_NAME;
const geoUserName = process.env.GEO_NAME;
const geoKey = process.env.GEO_KEY;
const bitKey = process.env.BIT_KEY;
const pixaKey = process.env.PIXA_KEY;


// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
let arrivalDate = document.getElementById('arrivalDate').value;

const diffTime = Math.abs(currentDate - arrivalDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));



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
async function getCountryInfo(longitude, latitude) {
    const bitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${bitKey}`;
    try {
        const resBit = await fetch(bitURL);
        const weatherBitInfo = await resBit.json();
        console.log(weatherBitInfo);
        const info = weatherBitInfo.data[0];
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
const updateUI = async(countryInfoData, countryImageData, locationInfo, countryName) => {
    try {
        const city = document.getElementById('location').value;
        document.getElementById('city').innerHTML = city;
        document.getElementById('country').innerHTML = countryName;
        document.getElementById('card-image').src = countryImageData;

        // document.getElementById('longitude').innerHTML = ["longitude"];
        // document.getElementById('latitude').innerHTML = ["latitude"];
        // document.getElementById('country').innerHTML = ["country"];
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
    const countryInfo = await getCountryInfo(lng, lat);
    const countryImage = await getCountryImage(countryName);
    updateUI(countryInfo, countryImage, location, countryName);
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
export { getCountryInfo }
export { getCountryImage }
export { getTravelInsights }