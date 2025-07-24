
async function getWeather(cityName="cairo") {
    var startAp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ef4164724f149db881180650251307&q=${cityName}&days=3`);
    var data = await startAp.json();

    console.log(data)
    let box = ""
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        const todayDate = new Date(data.forecast.forecastday[i].date);
        const todayName = todayDate.toLocaleDateString("en-US", { weekday: "long" });

        box += `
     <div class="col-md-4 ">
                    <div class="itemm px-1 py-3 mt-4  text-white">
                        <div class="leaderDivs">
                            <div class="headdiv d-flex justify-content-between">
                                <p class="mt-2 px-3">${todayName}</p>
                                <p class="mt-2 px-3">${todayDate.toLocaleDateString()}</p>
                            </div>
                            <div class="bodydiv d-flex flex-column justify-content-center">
                                <p class="mt-3 px-3 fs-4">${data.location.name}</p>
                                <h1 class="my-2 px-3">${data.forecast.forecastday[i].day.avgtemp_c}&degC</h1>
                                <p class="px-3"><img src="https:${data.forecast.forecastday[i].day.condition.icon}"
                                        alt="icon"></p>
                                <p class="px-3 text-primary mt-3">${data.forecast.forecastday[i].day.condition.text}</p>
                            </div>
                            <div class="footdiv d-flex px-3 mt-4">
                                <img src="images/icon-umberella.png" alt="">
                                <p class="mx-2">20%</p>
                                <img src="images/icon-wind.png" alt="">
                                <p class="mx-2">18km/h</p>
                                <img src="images/icon-compass.png" alt="">
                                <p class="mx-2">East</p>
                            </div>
                        </div>

                    </div>
                </div>
    
    
   `
    }
    document.querySelector(".row").innerHTML = box;
}
function searchWeather(){
    let cityName=document.querySelector("#searchInput").value.trim();
    if(cityName!=""){
        getWeather(cityName);
    }
    
}

getWeather();

document.querySelector("#searchInput").addEventListener("input",searchWeather);
let userName =localStorage.getItem("name");
document.querySelector("#headOfName").innerHTML= `Welcome ${userName}`;
let logOutBtn =document.querySelector("#logOutBtn");

logOutBtn.addEventListener("click",function(){
   setTimeout(() => {
         window.location.replace("./login.html");
   }, 600);
})