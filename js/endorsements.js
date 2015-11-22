//Reads endorsements from localstorage, creates table and puts endorsements in
//table, assigns table to proper div tag in DOM. made with tiny crying
 
//localStorage.clear();
function showTable(){
    var endorsementTable = document.getElementById('endorsements');
    var replacementTable = '<tr>'+
                                '<th>Date</th>'+
                                '<th>Name</th>'+
                                '<th>Endorsement</th>'+
                           '</tr>';
    
    if (localStorage.endorsementList === undefined){
        
        endorsementTable.innerHTML = replacementTable;
    }
    else{
        var endorsements_list = JSON.parse(localStorage.getItem('endorsementList'));
        for(var index in endorsements_list){
            var myDate = new Date(endorsements_list[index].date);
            replacementTable += '<tr>'+
                                    '<td>' + myDate.toLocaleString() + '</td>' +
                                    '<td>' + endorsements_list[index].name + '</td>' +
                                    '<td>' + endorsements_list[index].endorsement + '</td>'+
                                '</tr>';
        }
        endorsementTable.innerHTML = replacementTable;
    }
}


var endorsementElement= document.getElementById("endorsements");
var nameForm = document.getElementById('nameinput');
var endorsementForm = document.getElementById('endorsementinput');
loadEndorsement();
nameForm.addEventListener('keyup', function(){window.localStorage.storedName = nameForm.value;});
    showTable();
    nameForm.addEventListener('keyup', function(){console.log('I ran!'); window.localStorage.storedName = nameForm.nameinput.value;});
    endorsementForm.addEventListener('keyup', function(){console.log('Me too!!'); window.localStorage.storedEndorsement = endorsementForm.value;});

function endorsementSubmit (form) {
    var timeNow = new Date().getTime();
    var nameSubmitted = form.nameinput.value;
    var endorsementSubmitted = form.endorsementinput.value;
    
    var endorsement = {date: timeNow, name: nameSubmitted, endorsement: endorsementSubmitted};
    if (localStorage.getItem('endorsementList') === null){
        localStorage.setItem('endorsementList', JSON.stringify([endorsement]));
    }
    else{
        var updatedEndorsements = JSON.parse(localStorage.getItem('endorsementList'));
        updatedEndorsements.push(endorsement);
        localStorage.setItem('endorsementList', JSON.stringify(updatedEndorsements));
    }
    
    alert ("date" + timeNow +"Name Submitted: " + nameSubmitted + " Endorsement Submitted:" + endorsementSubmitted);
    showTable();
}

function sortbyDate(){
    if (localStorage.getItem('endorsementList') === undefined){
        return 0;
    }
    else{
        var dateSortList = JSON.parse(localStorage.getItem('endorsementList'));
        console.log(typeof dateSortList);
        console.log(dateSortList);
        dateSortList = dateSortList.sort(function(a,b){return a.date - b.date;});
        localStorage.setItem('endorsementList', JSON.stringify(dateSortList));
        showTable();
    }    
}

function sortbyName(){
    if (localStorage.getItem('endorsementList') === undefined){
        return 0;
    }
    else{
        var nameSortList = JSON.parse(localStorage.getItem('endorsementList'));
        nameSortList = nameSortList.sort(function (a,b){return a.name.localeCompare(b.name)});
        console.log(nameSortList);
        localStorage.setItem('endorsementList', JSON.stringify(nameSortList));
        showTable();
    }
}


function loadEndorsement(){
    if(window.localStorage.storedName){
       nameForm.value = window.localStorage.storedName;
    }
    if(window.localStorage.storedEndorsement){
        endorsementForm.value = window.localStorage.storedEndorsement;
    }
}







