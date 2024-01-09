
teams = {
    "bruins": "BOS",
    "sabres": "BUF",
    "hurricanes": "CAR",
    "wings": "DET",
    "panthers": "FLO",
    "canadiens": "MTL",
    "devils": "NJ",
    "islanders": "NYI",
    "rangers": "NYR",
    "senators": "OTT",
    "flyers": "PHI",
    "penguins": "PIT",
    "lightning": "TB",
    "leafs": "TOR",
    "capitals": "WSH",
    "ducks": "ANA",
    "coyotes": "ARI",
    "flames": "CGY",
    "blackhawks": "CHI",
    "avalanche": "COL",
    "stars": "DAL",
    "oilers": "EDM",
    "kings": "LA",
    "wild": "MIN",
    "predators": "NSH",
    "kraken": "SEA",
    "sharks": "SJ",
    "blues": "STL",
    "canucks": "VAN",
    "knights": "VGK",
    "jets":  "WPG"
};
async function validate(){
    elems = ["#statCount", "#gameCount", "#i_t", "#nhlTeam"];
    error = false;
    integer = parseInt($(elems[0]).val());
    if ($(elems[0]).val() == '' || !(Number.isInteger(integer))){
        $(elems[0]).css('background-color','rgb(230, 105, 105, 0.281)');
        error = true;
    }
    statCount = integer;
    integer = parseInt($(elems[1]).val());
    if ($(elems[1]).val() == '' || !(Number.isInteger(integer))){
        $(elems[1]).css('background-color','rgb(230, 105, 105, 0.281)');
        error = true;
    }
    if ($(elems[3]).val() == ""){
        $(elems[3]).css('background-color','rgb(230, 105, 105, 0.281)');
        error = true;
    }
    if (error){
        return;
    }
    team = checkTeams($(elems[3]).val());
    if (team == ""){
        $(elems[3]).css('background-color','rgb(230, 105, 105, 0.281)');
        return
    }
    it = "";
    buttons = document.getElementsByName("i_t");
        
    if (buttons[0].checked){            
        it = 't';
    }  


    else {
        it = 'i';
    }
    var statType = $("#statSelect").val().toLowerCase();
    await callAPIsetup(team, it);
    insertPlayerStats(statCount, integer, it, statType);


}


function insertPlayerStats(stat, games, it, statType){
    if (it == i){
        s = "You have " + stat + " " + statType + " in " + games + "games with an average of " + Math.round((stat/games) * 10) / 10 + " " + statType + " per game";
        document.getElementById("myData").innerHTML = s;


        x = Math.round((stat/games) * 10) / 10;
        document.getElementById("yourFinalStat").innerHTML = x + " " + statType + " per game";
    }
    else {
        s = "Your team has " + stat + " " + statType + " in " + games + " games with an average of " + Math.round((stat/games) * 10) / 10 + " " + statType + " per game";
        document.getElementById("myData").innerHTML = s;


        x = Math.round((stat/games) * 10) / 10;
        document.getElementById("yourFinalStat").innerHTML = x + " " + statType + " per game";
    }
}


function checkTeams(input){
    if(input.length != 3){
        linput = input.toLowerCase();
        let splitted = linput.split(" ");
        team = splitted[splitted.length - 1];
        console.log(team);
        for (t in teams){
            if (team == t){
                console.log(teams[t]);
                return teams[t];
            }
        }
        return "";
    }
    else {
        team = input.toUpperCase();
        for (t in teams){
            if (team == teams[t]){
                console.log(teams[t]);
                return teams[t];
            }
        }
        return "";
    }
}


async function callAPIsetup(team, it){
    console.log('here')
    url = "https://api.codetabs.com/v1/proxy?quest=https://api-web.nhle.com/v1/club-stats/" + team + "/now";
    url2 = "https://api.codetabs.com/v1/proxy?quest=https://api-web.nhle.com/v1/standings/now"
    
    var stat = 0;
    var statType = $("#statSelect").val().toLowerCase();
    console.log(it);
    games = await call2(url2, team);
    stat = await call(url, statType, it, games);
}


async function call(url, statType, i_t, team){
    console.log(i_t);
    var low = 1000;
    var high = 0;
    var total = 0;
    var avg = 0;
    console.log("gamesplayed" + games);
    if(i_t == 'i'){
        filter = $("#filter").val();
        res = await fetch(url)
        .then(res => res.json())
        .then(data => {
        
        var lIndex = 0;
        var hIndex = 0;
        //store high and low values for stat as well as total(for avg calc)
        for (i = 0; i < data.skaters.length; i++){
            total += data.skaters[i][statType];
            if (low > data.skaters[i][statType]){
                hIndex = i;
                low = data.skaters[i][statType];
            }
            if (high < data.skaters[i][statType]){
                lIndex = i;
                high = data.skaters[i][statType];
            }
        }
        if (filter == 'high'){
            s = "The team high in " + statType + " was " + data.skaters[hIndex].firstName.default + " " + data.skaters[hIndex].lastName.default + "with " + high +" " + statType + " in " + games + " games for an average of <strong>" + Math.round((high/games) * 10) / 10 + "</strong> " + statType + " per game";
            document.getElementById("nhlData").innerHTML = s;
            x = Math.round((high/games) * 10) / 10;
            document.getElementById("nhlFinalStat").innerHTML = x + " " + statType + " per game";
        }
        else if (filter == 'low'){
            s = "The team low in " + statType + " was " + data.skaters[lIndex].firstName.default + " " + data.skaters[hIndex].lastName.default + "with " + low +" " + statType + " in " + games + " games for an average of <strong>" + Math.round((low/games) * 10) / 10 + "</strong> " + statType + " per game";
            document.getElementById("nhlData").innerHTML = s;
            x = Math.round((low/games) * 10) / 10;
            document.getElementById("nhlFinalStat").innerHTML = x + " " + statType + " per game";
        }
        else {
            skatersWithStats = data.skaters.length;
            for (i = 0; i < data.skaters.length; i++){
                if (data.skaters[i][statType] == 0){
                    skatersWithStats - 1;
                }
            }
            avg = total / data.skaters.length;
        }
        });
        if (filter == 'high'){
            return high;
        }
        else if (filter == "low"){
            return low;
        }
        else {
            newAvg = Math.round(avg * 100) / 100;
            s = "The average skater on the " + getTeamFromABR(url.substr(79,3)) + " has " + newAvg + " " + statType + " in " + games + "games for an average of <strong>" + Math.round((newAvg/games) * 10) / 10 + "</strong>" + " " + statType + " per game";
            document.getElementById("nhlData").innerHTML = s;
            x = Math.round((newAvg/games) * 10) / 10;
            document.getElementById("nhlFinalStat").innerHTML = x + " " + statType + " per game";
            return avg;
        }
        }
    else {
        console.log('in here');
        var total = 0;
        res = await fetch(url)
            .then(res => res.json())
            .then(data => {
            console.log(statType === "goals");
                for (i = 0; i < data.skaters.length; i++){
                        total += data.skaters[i][statType];
                    
                }
                s = "The " + getTeamFromABR(url.substr(79,3)) + " have " + total + " " + statType + " in " + games + " " + "games for an average of <strong>" + Math.round((total/games) * 10) / 10 + "</strong> " + " " + statType + " per game";
                document.getElementById("nhlData").innerHTML = s;
                x = Math.round((total/games) * 10) / 10;
                document.getElementById("nhlFinalStat").innerHTML = x + " " + statType + " per game";
            })
            .catch(error=> console.log('err'));
            return total;  
    }
}


async function call2(url, team){
    var games = 0;
    res = await fetch(url)
        .then(res => res.json())
        .then(data => {
            for (i = 0; data.standings.length; i++){
                console.log(data.standings[i].teamAbbrev.default == team);
                if (data.standings[i].teamAbbrev.default == team){
                    games = data.standings[i].gamesPlayed;
                }
            }
        })
        .catch(error=> err = "")
        return games;
}


function showFilter(){
    $("#filterDiv").css("visibility", "visible");
}


function hideFilter(){
    $("#filterDiv").css("visibility", "hidden");
}

function changeStat(){
    stat = $("#statSelect").val();
    buttons = document.getElementsByName("i_t");
    if (buttons[0].checked){            
        it = 'your team has';
    }  


    else {
        it = 'you have';
    }
    s = "Enter the number of " + stat.toLowerCase() + " " + it;
    document.getElementById('l1').innerHTML = s;
}


function getTeamFromABR(abr){
    team = "";
    for (t in teams){
        if (teams[t] == abr){
            team = t;
        }
    }
    s = team[0].toUpperCase();
    ph = team.substr(1,50);
    team = s + ph;
    console.log(team);
    if (team == "Wings"){
        team = "Red Wings";
    }
    if (team == "Leafs"){
        team = "Maple Leafs";
    }
    if (team == "Jackets"){
        team = "Blue Jackets";
    }
    if (team == "Knights"){
        team = "Golden Knights";
    }
    return team;
}

