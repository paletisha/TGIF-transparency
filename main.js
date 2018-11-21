//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);


//function createTable () {
// for (i=0; i< data.results[0].members.length; i++) {
// var newTr = document.createElement("tr");
// var newTd = document.createElement("td");
//  var firstName = data.results[0].members[i].first_name;
//  newTr.append(firstName);
//  var tablecontent = document.getElementById("tbody");
//  tablecontent.append(newTr);
//  console.log(firstName);




/*
function memberstable(arr) {
for (i=0; i<data.results[0].members.length; i++) {
    var newTd1 = document.createElement("td");
    var newTd2 = document.createElement("td");
    var newTd3 = document.createElement("td");
    var newTd4 = document.createElement("td");
    var newTd5 = document.createElement("td");
    var newTr = document.createElement("tr");
    var lastName = data.results[0].members[i].last_name;
    var middleName = data.results[0].members[i].middle_name;
    if (data.results[0].members[i].middle_name = "null") {
        middleName = ""
    };
    var firstName = data.results[0].members[i].first_name;
    var party = data.results[0].members[i].party;
    var state = data.results[0].members[i].state;
    var seniority = data.results[0].members[i].seniority;
    var votes = data.results[0].members[i].votes_with_party_pct;
    newTd1.append(lastName + " " + middleName + " " + firstName);
    newTr.append(newTd1);
    newTd2.append(party);
    newTr.append(newTd2);
    newTd3.append(state);
    newTr.append(newTd3);
    newTd4.append(seniority);
    newTr.append(newTd4);
    newTd5.append(votes + "%");
    newTr.append(newTd5);
    var tablebody = document.getElementById("tbody");
    tablebody.append(newTr);
}
}

memberstable();
*/

/*
// Funcio de la taula que funciona pero guardo per seguretat
function memberstable() {
    for (var i = 0; i < data.results[0].members.length; i++) {
        var newTd1 = document.createElement("td");
        var newTd2 = document.createElement("td");
        var newTd3 = document.createElement("td");
        var newTd4 = document.createElement("td");
        var newTd5 = document.createElement("td");
        var newTr = document.createElement("tr");
        var a = document.createElement("a");
        var url = data.results[0].members[i].url;
        a.setAttribute("href", url);
        a.setAttribute("target", "blank");
        var lastName = data.results[0].members[i].last_name;
        var middleName = data.results[0].members[i].middle_name;
        if (data.results[0].members[i].middle_name = "null") {
            middleName = ""
        };
        var firstName = data.results[0].members[i].first_name;
        var party = data.results[0].members[i].party;
        var state = data.results[0].members[i].state;
        var seniority = data.results[0].members[i].seniority;
        var votes = data.results[0].members[i].votes_with_party_pct;

        a.append(lastName + " " + middleName + " " + firstName);
        newTd1.append(a);
        newTr.append(newTd1);
        newTd2.append(party);
        newTr.append(newTd2);
        newTd3.append(state);
        newTr.append(newTd3);
        newTd4.append(seniority);
        newTr.append(newTd4);
        newTd5.append(votes + "%");
        newTr.append(newTd5);
        var tablebody = document.getElementById("tbody");
        tablebody.append(newTr);
    }
}

memberstable();

*/
/*
Filters for the Party
*/
var data;

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: {
        "X-API-Key": "wfmlVe2BL2c6Yblh4bKxr1PkBzxb1rOHSlRvLZMP"
    }
}).then(function (result) {
    return result.json()
}).then(function (myData) {
    console.log(myData);
    data = myData;
    memberstable(data.results[0].members);
    states();
    activateListeners();
})

function activateListeners() {
    document.getElementById("democrat").addEventListener("click", partyFilter);
    document.getElementById("republican").addEventListener("click", partyFilter);
    document.getElementById("independent").addEventListener("click", partyFilter);
    document.getElementById("selectbody").addEventListener("change", partyFilter);
}

function partyFilter() {
    var partyArray = [];
    var checkParty = [];
    var partyNodes = document.querySelectorAll('input[name=party]:checked');
    console.log(partyNodes);
    for (var i = 0; i < partyNodes.length; i++) {
        checkParty.push(partyNodes[i].value);
    }

    //var checkedBoxes = Array.from(partyNodes);




    addFilter(checkParty)
}

//partyFilter();





function addFilter(checkparty) {
    var statevalue = document.querySelector('#selectbody').value;
    console.log(checkparty, ['f', 'd']);
    console.log(data.results[0].members)
    var filterArray = [];

    if (checkparty.length == 0 && statevalue == "All") {
        filterArray = data.results[0].members;

    } else if (checkparty.length == 0 && statevalue !== "All") {
        for (var i = 0; i < data.results[0].members.length; i++) {
            if (statevalue == data.results[0].members[i].state) {
                filterArray.push(data.results[0].members[i]);
            }
        }

    } else if (checkparty.length !== 0 && statevalue == "All") {
        for (var i = 0; i < data.results[0].members.length; i++) {
            for (var j = 0; j < checkparty.length; j++) {
                if (checkparty[j] == data.results[0].members[i].party) {
                    filterArray.push(data.results[0].members[i]);
                }

            }

        }
    } else {

        for (var i = 0; i < data.results[0].members.length; i++) {
            for (var j = 0; j < checkparty.length; j++) {
                if (checkparty[j] == data.results[0].members[i].party && statevalue == data.results[0].members[i].state) {
                    filterArray.push(data.results[0].members[i]);

                }


            }
        }

    }
    memberstable(filterArray);

}

/*
function check (){
    var arrayParty =[];
    var demoArray = [];
    var repuArray = [];
    
    var republican =document.getElementbyId("republican");
    var 
}


*/
/*
Filters for the States
*/


//document.getElementById("selectbody").addEventListener("change", statefilter);




/*
function statefilter() {

    var statevalue = document.querySelector('#selectbody').value;
    console.log(statevalue);
    addFilterState(statevalue);


}

/*
function addFilterState(statevalue) {
    var filterStateArray = [];
    for (i = 0; i < data.results[0].members.length; i++) {
        if (statevalue == data.results[0].members[i].state) {
            filterStateArray.push(data.results[0].members[i]);

        }
    }

    memberstable(filterStateArray);
}
*/
/*
var filterStateArray = [];
 var filterArray = [];

function union () {
var finalAyyar=[];
for (i=0;) {
for (i=O...) {
if filterStateArray[i]=filterArray[i] {
finalArray.push(filterArray[i]);
}
}
}
memberstable(finalArray);
}

*/

/*
Table Creation
*/

function memberstable(arrayToBuild) {
    var tablebody = document.getElementById("tbody");
    tablebody.innerHTML = '';

    console.log("NEW TABLW", arrayToBuild)
    for (var i = 0; i < arrayToBuild.length; i++) {
        var newTd1 = document.createElement("td");
        var newTd2 = document.createElement("td");
        var newTd3 = document.createElement("td");
        var newTd4 = document.createElement("td");
        var newTd5 = document.createElement("td");
        var newTr = document.createElement("tr");
        var a = document.createElement("a");
        var url = arrayToBuild[i].url;
        a.setAttribute("href", url);
        a.setAttribute("target", "blank");
        var lastName = arrayToBuild[i].last_name;
        var middleName = arrayToBuild[i].middle_name;
        if (arrayToBuild[i].middle_name = "null") {
            middleName = ""
        };
        var firstName = arrayToBuild[i].first_name;
        var party = arrayToBuild[i].party;
        var state = arrayToBuild[i].state;
        var seniority = arrayToBuild[i].seniority;
        var votes = arrayToBuild[i].votes_with_party_pct;

        a.append(lastName + " " + middleName + " " + firstName);
        newTd1.append(a);
        newTr.append(newTd1);
        newTd2.append(party);
        newTr.append(newTd2);
        newTd3.append(state);
        newTr.append(newTd3);
        newTd4.append(seniority);
        newTr.append(newTd4);
        newTd5.append(votes + "%");
        newTr.append(newTd5);

        var tablebody = document.getElementById("tbody");

        tablebody.append(newTr);

        console.log(party);

    }




}
//memberstable(data.results[0].members);

//memberstable();


/*
States DropDown Menu
*/

function states() {
    let statesArray = [];
    let select = document.getElementById("selectbody");
    //let removedDupli = [];
    for (var a = 0; a < data.results[0].members.length; a++) {
        var state = data.results[0].members[a].state;
        statesArray.push(state);

        var repeatedValues = [];

        for (var i = 0; i < statesArray.length; i++) {

            for (var j = i + 1; j < statesArray.length; j++) {

                if (statesArray[i] == statesArray[j]) {

                    if (!repeatedValues.includes(statesArray[i])) {
                        repeatedValues.push(statesArray[i]);
                    }
                }
            }
        }
    }

    for (var ll = 0; ll < repeatedValues.length; ll++) {
        let option = document.createElement("option");
        option.append(repeatedValues[ll]);
        selectbody.append(option);
    }


    //option.append(itsShit);
    //let itsShit = repeatedValues;

}
//states();
/*
function newFunction(){
    
    return Array.from(new Set(data.results[0].members.map((member) =>{ member.state}).sort()));
    
}
*/


// Query selector

/* Funcio que va be per crear l'array dels checkboxes però que no se si es pot fer funcionar amb la creacio de la taula.

function partyFilter() {
var partyArray = [];
var checkParty = [];
var partyNodes = document.querySelectorAll('input[name=party]:checked');
    console.log(partyNodes);
    for(var i=0; i<partyNodes.length; i++){
        checkParty.push(partyNodes[i].value);
    }
    console.log(checkParty);
//var checkedBoxes = Array.from(partyNodes);
var checkedBoxes = [];



}

partyFilter();

*/
