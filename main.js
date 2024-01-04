let day=document.getElementById('day');
let date=document.getElementById('date');
let town=document.querySelector('.location');
let temp=document.querySelector('.num');
let custom=document.querySelector('.custom')
let icon=document.querySelector('.icon');
let searchterm=document.getElementById('search');

let nextDay=document.getElementsByClassName('nextDay');
let nextDayIcon=document.getElementsByClassName('nextDayIcon');
let maxDgree=document.getElementsByClassName('maxDgree');
let minDgree=document.getElementsByClassName('minDgree');
let nextDayDesc=document.getElementsByClassName('nextDayDesc');


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];


async function getData(searchterm){
     data=await fetch("https://api.weatherapi.com/v1/forecast.json?key=11eac4cd15084e0299e132311233112&days=3&aqi=no&alerts=no&q="+searchterm)
     fdata= await data.json();
    console.log(fdata);
    getCurrentWeather();
    getNextDayWeather();
    
   
}

function getCurrentWeather(){
  let dates=new Date();
  town.innerHTML=fdata.location.name;
  temp.innerHTML=fdata.current.temp_c+`<sup>o</sup>C`;
  icon.innerHTML=`<img src="http:${fdata.current.condition.icon}" alt="" width="90">`
  custom.innerHTML=fdata.current.condition.text;
  day.innerHTML=days[dates.getDay()];
  date.innerHTML=`${dates.getDate()} ${months[dates.getMonth()]}`;
}

function getNextDayWeather(){
  for(let i=0;i<nextDay.length;i++){
   nextDay[i].innerHTML=days[new Date(fdata.forecast.forecastday[i+1].date).getDay()];
   nextDayIcon[i].innerHTML=`<img src="http:${fdata.forecast.forecastday[i+1].day.condition.icon}" alt="" width="48">`;
   maxDgree[i].innerHTML=fdata.forecast.forecastday[i+1].day.maxtemp_c+`<sup>o</sup>C`;
   minDgree[i].innerHTML=fdata.forecast.forecastday[i+1].day.mintemp_c+`<sup>o</sup>C`;
   nextDayDesc[i].innerHTML=fdata.forecast.forecastday[i+1].day.condition.text;
  }
}

searchterm.addEventListener('keyup',()=>{
  getData(searchterm.value)
})
getData("cairo")

let contact=document.getElementById('contact');
contact.onclick=function(){
  let home=document.querySelector('.home');
  let contact=document.querySelector('.contact');
  let section=document.querySelector('.section');
  home.classList.replace("d-block" ,"d-none");
  contact.classList.replace("d-none" ,"d-block");
  section.classList.remove("section")
}


navigator.geolocation.getCurrentPosition((position)=>{
  let {latitude,longitude} =position.coords;
  var map = L.map('map').setView([latitude,longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    minzoom:1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([latitude,longitude]).addTo(map)
})