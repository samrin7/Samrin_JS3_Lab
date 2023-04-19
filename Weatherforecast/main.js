//Information about server and public key
const api={
    base: "https://api.openweathermap.org/data/2.5/",
    key: "41dff48a480237f71d0556ddffa3fa0a"
}

//fetch data from weather api according to search

function getResults (query){
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather =>{

        //weather object contains information in string format which we require to convert json
        return weather.json();
    }).then((response)=>{
        console.log(response)

        //function to display all information on html page
        displayResults(response)});
    }

    //add key event on search Box.on pressing enter it will call getresults
    const searchbox=document.querySelector('.search-box');
    searchbox.addEventListener('keypress',setQuery);

    function setQuery(evt){
        if(evt.keyCode==13){
          getResults(searchbox.value);
        }
       } 


    function displayResults(weather){
        let city= document.querySelector(".location .city");
        city.innerText=`${weather.name},${weather.sys.country}`;
        
        let now= new Date();
        let date=document.querySelector(".location .date");
        date.innerText=dateBuilder(now);

        let temp=document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = weather.weather[0].main;

        let hilow = document.querySelector('.hi-low');
        hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
       }


     function dateBuilder(d){
        let months = ["January", "Febrauary", "March","April", "May","June", "July","August","September","October","November","December"];
        let days = ["Sunday", "Monaday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

       let day=days[d.getDay()]; 
       let date=d.getDate();
       let month=months[d.getMonth()];
       let year=d.getFullYear();

       return `${day} ${date} ${month} ${year}`;
       }