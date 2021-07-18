# My capstone project: travel_app
 
# Project Description

The app allows users to get weather information for cities they intend to travel to on a particular day. The user needs to enter a city and date and submit the form to get this information displayed.

# Project Requirements

GeoNames API to fetch location data

Pixabay API to fetch images of city and country

Weatherbit.io to fetch weather for certain dates

use webpack for development and production builds

use jest to test

install and use service workers

# Weatherbit fetching options

The weatherbit API returns weather results for trips that are not more than 16 days away

if user enters a date more than 16 days away, show forecast as unavailable

# Project Extensions

Future modications to this project will allow users the ability to do the following:

1. Utilise other API's to prvide more detailed information about the country you wish to visit e.g restcountries.eu to fetch additional info about the country

2. Allow user to save/remove trip by pressing the save/remove button

# Starting Instructions

git clone this repo

run npm install

obtain API keys for Weatherbit, Pixabay and GeoNames with your own accounts and place them in .env file matching api keys in server.js

run npm run local

go to http://localhost:8082/