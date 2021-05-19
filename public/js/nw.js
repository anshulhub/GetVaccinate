const cityName = document.getElementById('cityName');
const cityname = document.getElementById('cityname');
const address = document.getElementById('address');
const dose = document.getElementById('dose');
const datahide = document.querySelector('.middle_layer');
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const time = document.getElementById("time");
const checkbox = document.getElementById("age")

const audio = new Audio("audioo.mp3");
function go() {
    audio.play();
}
function stop(){
    audio.pause();
}

const getInfo = async () => {
    // event.preventDefault();

    // let cityVal;
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Enter the city Pincode first...`;
        datahide.classList.add("data_hide");
    } else {

        try {


            let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${cityVal}&date=${b}%2F${a.getMonth() + 1}%2F2021`
            const response = await fetch(url);

            const data = await response.json();

            const arrData = [data];

            const feed = arrData[0].sessions;
            // const lat = arrData[0];
            if ((feed[0].vaccine == "COVISHIELD" || feed[0].vaccine == "COVAXIN") && feed[0].min_age_limit == "18") {
                city_name.innerText = `Total Centers: ${feed.length}  `
                address.innerText = `Address: ${feed[0].address}  `
                dose.innerText = `Doses: ${feed[0].available_capacity}`
                console.log(`Total number of Centers Available - ${feed.length}`)
                console.log(`Name: ${feed[0].name}   `)
                console.log(`Address: ${feed[0].address} `)
                console.log(`Doses Available: ${feed[0].available_capacity} `)
                console.log("=====================================================================")
                go();
            }
            else if (checkbox.checked == true && feed[0].min_age_limit == "45") {
                city_name.innerText = `Total Centers: ${feed.length}  `
                address.innerText = `Address: ${feed[0].address}  `
                dose.innerText = `Doses: ${feed[0].available_capacity}`
                console.log(`Total number of Centers Available - ${feed.length}`)
                console.log(`Name: ${feed[0].name}   `)
                console.log(`Address: ${feed[0].address} `)
                console.log(`Doses Available: ${feed[0].available_capacity} `)
                console.log("=====================================================================")
                go();
            }
            else {
                console.log("No Center Available now!!!!!!");
                city_name.innerText = `Checking for Age 18+ `;
                address.innerText = `No Center Available now!!!! `;
                dose.innerText = ``;
                stop();
            }
            datahide.classList.remove('data_hide');
            cityVal = "";


        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `No Center Available now!!!! `;
            console.log("Not Available")
            stop();
        }
    }
}

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
day.innerText = n;

const date = new Date();
var b = date.getDate();
// console.log();

var a = new Date();
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
var p = month[a.getMonth()];

const r = `${b} ${p}`
today_date.innerText = r

const ti = new Date();
var hou = ti.getHours()
var tim = ti.getMinutes()
if (tim > 59) {
    tim = tim - 60;
}
if (tim < 10) {
    tim = "0" + tim
}


var hou = `${hou}:${tim}`;
time.innerText = hou



setInterval(() => getInfo(), 5000);
