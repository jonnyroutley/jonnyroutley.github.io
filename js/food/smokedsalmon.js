
class Cure {
    constructor(salmonWeight) {
        this.salmonWeight = salmonWeight;
    }
}

function CFL(string) {
    //capitalize first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
function calculateCure(salmonWeight) {
    let c = new Cure(salmonWeight);
    c.salt = Math.ceil(100/1.650*c.salmonWeight/5) * 5 + " grams";
    c.sugar = Math.ceil(100/1.650*c.salmonWeight/5) * 5 + " grams";
    c.pepper = Math.ceil(15/1.650*c.salmonWeight) + " grams";
    c.orange = Math.ceil(2/1.650*c.salmonWeight/0.5) * 0.5 + " oranges";
    c.lemon = Math.ceil(2/1.650*c.salmonWeight/0.5) * 0.5 + " lemons";
    c.fennel = Math.ceil(2/1.650*c.salmonWeight/0.5) * 0.5 + " tsp";
    c.juniper = Math.ceil(8/1.650*c.salmonWeight) + " berries";

    // console.log(Object.keys(c));
    let entries = Object.entries(c).slice(1,)
    var arrLength = entries.length;
    for (var i = 0; i < arrLength; i++) {
        let name = CFL(entries[i][0]);
        let value = entries[i][1];
        let elementId = "replace" + name; 
        document.getElementById(elementId).innerText = value;
    }

    // document.getElementById('replaceSalt').innerText = "Salt: " + salt + " grams";
}

function getCure() {
    let inputVal = document.getElementById("salmonWeight").value;
    calculateCure(inputVal)
}


window.addEventListener("load", calculateCure(1.65))