var data;



if (window.location.pathname == ("/senateAttendance.html")) {
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "GET",
        headers: {
            "X-API-Key": "wfmlVe2BL2c6Yblh4bKxr1PkBzxb1rOHSlRvLZMP"
        }
    }).then(function (result) {
        return result.json()
    }).then(function (myData) {
        console.log(myData);
        members = myData.results[0].members;
        calculations();
        TableAttOne();
        tableAttTwo();
        tableAttThree();
        document.getElementById("spin1").style.display="none";
        document.getElementById("spin2").style.display="none";
        document.getElementById("spin3").style.display="none";
        

    })
} else if (window.location.pathname == ("/senateLoyalty.html")) {
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "GET",
        headers: {
            "X-API-Key": "wfmlVe2BL2c6Yblh4bKxr1PkBzxb1rOHSlRvLZMP"
        }
    }).then(function (result) {
        return result.json()
    }).then(function (myData) {

        members = myData.results[0].members;
        calculations();
        TableAttFour();
        TableAttFive();
        TableAttSix();
        document.getElementById("spin1").style.display="none";
        document.getElementById("spin2").style.display="none";
        document.getElementById("spin3").style.display="none";
    })
} else if (window.location.pathname == ("/houseAttendance.html")) {
    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: "GET",
        headers: {
            "X-API-Key": "wfmlVe2BL2c6Yblh4bKxr1PkBzxb1rOHSlRvLZMP"
        }
    }).then(function (result) {
        return result.json()
    }).then(function (myData) {

        members = myData.results[0].members;
        calculations();
        TableAttOne();
        tableAttTwo();
        tableAttThree();
        document.getElementById("spin1").style.display="none";
        document.getElementById("spin2").style.display="none";
        document.getElementById("spin3").style.display="none";
    })
} else if (window.location.pathname == ("/houseLoyalty.html")) {
    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: "GET",
        headers: {
            "X-API-Key": "wfmlVe2BL2c6Yblh4bKxr1PkBzxb1rOHSlRvLZMP"
        }
    }).then(function (result) {
        return result.json()
    }).then(function (myData) {

        members = myData.results[0].members;
        calculations();
        TableAttFour();
        TableAttFive();
        TableAttSix();
        document.getElementById("spin1").style.display="none";
        document.getElementById("spin2").style.display="none";
        document.getElementById("spin3").style.display="none";
    })
}

var stats = {
    "party": [
        {
            "name": "Democrats",
            "numVotes": 0,
            "avgVotes": 0,
        },
        {
            "name": "Republicans",
            "numVotes": 0,
            "avgVotes": 0,
         },
        {
            "name": "Independents",
            "numVotes": 0,
            "avgVotes": 0,
        },
        {
            "name": "Total",
            "numVotes": 0,
            "avgVotes": 0,
        },


  ],


    "missVotepct": 0, //top attendance
    "botmissVotepct": 0,

    "topPartyVotepct": 0,

    "botPartyVotepct": 0,

    "avgTotal": 0,
}


function calculations() {


    var demoArray = [];
    var repuArray = [];
    var indeArray = [];
    var demoNum = demoArray.length;






    function demoLength() {

        for (i = 0; i < members.length; i++) {
            if (members[i].party == "D") {
                demoArray.push(members[i]);
            }

        }

        for (i = 0; i < members.length; i++) {
            if (members[i].party == "R") {
                repuArray.push(members[i]);
            }
        }

        for (i = 0; i < members.length; i++) {
            if (members[i].party == "I") {
                indeArray.push(members[i]);
            }
        }

    }

    demoLength();


    stats.party[0].numVotes = demoArray.length;
    stats.party[1].numVotes = repuArray.length;
    stats.party[2].numVotes = indeArray.length;
    stats.party[3].numVotes = members.length;

    var demoVotes = [];
    var repuVotes = [];
    var indeVotes = [];




    function voteArray() {
        for (i = 0; i < members.length; i++) {
            if (members[i].party == "D") {
                demoVotes.push(members[i].votes_with_party_pct)
            }
        }
        for (i = 0; i < members.length; i++) {
            if (members[i].party == "R") {
                repuVotes.push(members[i].votes_with_party_pct)
            }
        }
        for (i = 0; i < members.length; i++) {
            if (members[i].party == "I") {
                indeVotes.push(members[i].votes_with_party_pct)
            }
        }
    }

    voteArray();



    var x = 0;
    var y = 0;
    var z = 0;
    var l = 0;

    function average() {

        for (n = 0; n < demoVotes.length; n++) {
            x = demoVotes[n] + x;

        }

        for (j = 0; j < repuVotes.length; j++) {
            y = repuVotes[j] + y;
        }
        for (k = 0; k < indeVotes.length; k++) {
            z = indeVotes[k] + z;
        }
        for (i = 0; i < members.length; i++) {
            l = members[i].votes_with_party_pct + l;
        }
    }

    average();

    console.log(x);

    var x = x / demoVotes.length;
    console.log(x);
    var y = y / repuVotes.length;
    console.log(y);
    var z = z / indeVotes.length;
    var l = l / members.length;
    console.log(l);

    stats.party[0].avgVotes = x.toFixed(2) + "%";
    stats.party[1].avgVotes = y.toFixed(2) + "%";
    stats.party[2].avgVotes = z.toFixed(2) + "%";
    if (stats.party[2].numVotes == 0) {
        stats.party[2].avgVotes = 0 + "%"
    };

    stats.party[3].avgVotes = l.toFixed(2) + "%";
    //Calculate the total average



    console.log(z);
    console.log(indeVotes);
    var MissNum = [];
    var MissPer = [];

    // Calculate 10% top attendance members

    var Attmembers = members.sort(function (obj1, obj2) {
        return obj1.missed_votes_pct - obj2.missed_votes_pct;
    });



    var sortlength = (Attmembers.length) * 10 / 100;
    console.log(sortlength)

    var topAttendance = [];

    function topAtt() {
        for (i = 0; i < Attmembers.length; i++) {
            //topAttendance.push(Attmembers[i]);
            if (topAttendance.length < sortlength) {
                topAttendance.push(Attmembers[i]);
                
            }
            
            if (topAttendance.length >= sortlength) {
                if (Attmembers[i].missed_votes_pct == members[i+1].missed_votes_pct) {
                    topAttendance.push(Attmembers[i+1]);
                    
                }
                else {
                    break;
                }
            }
        }
        
    }

    topAtt();



    stats.missVotepct = topAttendance;
    console.log(stats.missVotepct);

    // Calculate 10% Bottom Attendance members

    var botAttMembers = Attmembers.reverse();
    var botAttendance = [];

    function botAtt() {
        for (i = 0; i < sortlength; i++) {
            botAttendance.push(botAttMembers[i]);
        }
    }

    botAtt();


    stats.botmissVotepct = botAttendance;




    // calculate party loyalty

    // top votes pct



    var loyMembers = members.sort(function (obj1, obj2) {
        return obj1.votes_with_party_pct - obj2.votes_with_party_pct;
    });

    var botLoyalty = [];

    console.log(loyMembers);

    function topLoy() {
        for (i = 0; i < sortlength; i++) {
            botLoyalty.push(loyMembers[i]);
        }
    }

    topLoy();

    console.log(botLoyalty);

    stats.botPartyVotepct = botLoyalty;

    // bot votes pct

    var topLoyal = loyMembers.reverse();
    var topLoyalty = [];
    console.log(topLoyal);

    function botLoy() {
        for (i = 0; i < sortlength; i++) {
            topLoyalty.push(topLoyal[i]);

        }
    }

    botLoy();

    console.log(topLoyalty);

    stats.topPartyVotepct = topLoyalty;
}

// Create Table

function TableAttOne() {

    var tableOne = document.getElementById("tbody");
    for (var i = 0; i < stats.party.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.party[i].name;
        row.insertCell().innerHTML = stats.party[i].numVotes;
        row.insertCell().innerHTML = stats.party[i].avgVotes;
        tableOne.append(row);
        

    }


}

//TableAttOne();

function tableAttTwo() {

    var tableTwo = document.getElementById("tbody2");
    for (var i = 0; i < stats.missVotepct.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.missVotepct[i].first_name + " " + stats.missVotepct[i].last_name;
        row.insertCell().innerHTML = stats.missVotepct[i].missed_votes;
        row.insertCell().innerHTML = stats.missVotepct[i].missed_votes_pct;
        tableTwo.append(row);






    }
}
//tableAttTwo();



function tableAttThree() {
    var tableThree = document.getElementById("tbody3");

    for (var i = 0; i < stats.botmissVotepct.length; i++) {
        var row = document.createElement("tr");

        row.insertCell().innerHTML = stats.botmissVotepct[i].first_name + " " + stats.botmissVotepct[i].last_name;
        row.insertCell().innerHTML = stats.botmissVotepct[i].missed_votes;
        row.insertCell().innerHTML = stats.botmissVotepct[i].missed_votes_pct;
        tableThree.append(row);








    }
}

//tableAttThree();

function TableAttFour() {

    var tableFour = document.getElementById("tbody4");
    for (var i = 0; i < stats.party.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.party[i].name;
        row.insertCell().innerHTML = stats.party[i].numVotes;
        row.insertCell().innerHTML = stats.party[i].avgVotes;
        tableFour.append(row);


    }
}

function TableAttFive() {
    var tableFive = document.getElementById("tbody5");
    for (var i = 0; i < stats.topPartyVotepct.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.topPartyVotepct[i].first_name + " " + stats.topPartyVotepct[i].last_name;
        row.insertCell().innerHTML = stats.topPartyVotepct[i].total_votes;
        row.insertCell().innerHTML = stats.topPartyVotepct[i].votes_with_party_pct;
        tableFive.append(row);

    }
}


console.log(stats.topPartyVotepct);


function TableAttSix() {
    var tableSix = document.getElementById("tbody6");
    for (var i = 0; i < stats.botPartyVotepct.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = stats.botPartyVotepct[i].first_name + " " + stats.botPartyVotepct[i].last_name;
        row.insertCell().innerHTML = stats.botPartyVotepct[i].total_votes;
        row.insertCell().innerHTML = stats.botPartyVotepct[i].votes_with_party_pct;
        tableSix.append(row);

    }
}

console.log(stats.botPartyVotepct);

function readMore () {
    var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}



