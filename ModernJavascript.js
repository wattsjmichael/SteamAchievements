let apiKey = "74309911294BB2AB3F8F455ECFB7FF24";
let appId = "924980";



const fetch = require("node-fetch");

let url = "http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=730";

class Achievement {
    constructor(name, percent){
        this.name = name;
        this.percent = percent;
    }
    printValues(){
        if (this.percent <= 10) {
            console.log(`${this.name} achievement is pretty tough!`);
        } else if (this.percent >= 85) {
            console.log(`${this.name} is a pretty easy achievement!`);
        } else {
        console.log(`${this.name} achievement has been completed by ${this.percent}% of people.`);
        }
    }
}

async function fetchData(url){
    let response = await fetch(url);
    let jsonResponse = await response.json();
    printData(jsonResponse);
}
function printData(jsonData){
    let achievementsArray = [];
    let jsonObject = jsonData["achievementpercentages"];
    let allAchievements = jsonObject["achievements"];

    for (let achievement of allAchievements){
        let name = achievement["name"];
        let percent = achievement["percent"];
        let newAchievement = new Achievement(name, percent);
        newAchievement.printValues();
        achievementsArray.push(newAchievement);
    }
    console.log(achievementsArray.length);
}

fetchData(url).catch(function() {
    console.log("Could not fetch data!")
});