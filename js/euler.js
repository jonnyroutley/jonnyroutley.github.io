function isPrime(num) {
    if (num === 2) {
        return true
    } else if (num > 1) {
        for (let i = 3; i <= Math.sqrt(num) + 1; i += 2) {
            if (!(num % 2) || !(num % i)) {
                return false 
            } 
        }
        return true
    } else {
        console.log(num + ' can not be prime (number more negative than 2)')
        return false
    }

}

function primePosition(position) {
    let counter = 1;
    let num = 2;
    while (counter <= position) {
        // console.log(num, counter)
        if (isPrime(num)) {
            counter ++;
            num ++;
        } else {
            num ++;
        }
    
    }
    return num - 1
}


function largestProductinGrid(gridArray) {
    let gridMultiArray = []
    while (gridArray.length) {
        gridMultiArray.push(gridArray.splice(0,20));
    }

    let greatestProduct = [0]

    for (let row = 0; row < gridMultiArray.length; row++) {
        for (let column = 0; column < gridMultiArray.length; column ++) {
            // Horizontal
            if (column < gridMultiArray.length - 3) {
                let product = gridMultiArray[row][column]
                for (let i = 1; i <= 3; i++) {
                    product *= gridMultiArray[row][column + i]
                }
                if (product > greatestProduct[0]) {
                    greatestProduct = [product, "horizontal", row, column]
                    // console.log(greatestProduct, "horizontal", row, column)
                }
            }

            // Vertical
            if (row < gridMultiArray.length - 3) {
                let product = gridMultiArray[row][column]
                for (let i = 1; i <= 3; i++) {
                    product *= gridMultiArray[row + i][column]
                }
                if (product > greatestProduct[0]) {
                    greatestProduct = [product, "vertical", row, column]
                    // console.log(greatestProduct, "vertical", row, column)
                }

                // Diagonal Right
                if (column < gridMultiArray.length - 3) {
                    let product = gridMultiArray[row][column]
                    for (let i = 1; i <= 3; i++) {
                        product *= gridMultiArray[row + i][column + i]
                    }
                    if (product > greatestProduct[0]) {
                        greatestProduct = [product, "diagonal right", row, column]
                        // console.log(greatestProduct, "diagonal right", row, column)
                    }
                }

                // Diagonal Left
                if (column >= 3) {
                    let product = gridMultiArray[row][column]
                    for (let i = 1; i <= 3; i++) {
                        product *= gridMultiArray[row + i][column - i]
                    }
                    if (product > greatestProduct[0]) {
                        greatestProduct = [product, "diagonal left", row, column]
                        // console.log(greatestProduct, "diagonal left", row, column)
                    }
                }
            }          

        }
    }

    return greatestProduct
}


// console.log(largestProductinGrid())



// for (let i = 1; i <= 500; i++) {
// console.log(primePosition(1000000));
// }

function getIsPrime() {
    let inputVal = document.getElementById("isPrime").value;
    if (isPrime(inputVal)) {
        document.getElementById('replaceIsPrime').innerText = "Result: " + inputVal + " is a prime number !"
    } else {
        document.getElementById('replaceIsPrime').innerText = "Result: " + inputVal + " is not a prime number !"
    }
}

function getPrimePos() {
    let inputVal = document.getElementById("primePos").value;
    let ending;
    switch (inputVal % 10) {
        case 3:
            ending = 'rd';
            break;
        case 2:
            ending = 'nd';
            break;
        case 1:
            ending = 'st';
            break;
        default:
            ending = 'th';
    }

    if (inputVal === '13' || inputVal === '12' || inputVal === '11') ending = 'th';

    document.getElementById('replacePrimePos').innerText = "The " + inputVal + ending + " prime number is: " + primePosition(inputVal)
}

function getLargestProductInGrid() {
    let gridArray = generateRandomGrid()

    let perrow = 20,
        count = 0,
        table = document.createElement("table"),
        row = table.insertRow();

    for (let i of gridArray) {
        let cell = row.insertCell();
        cell.innerHTML = i;

        count ++;
        if (!(count % perrow)) {
            row = table.insertRow();
        }
    }

    document.getElementById("gridContainer").innerHTML = '';
    table.id = 'gridTable'
    document.getElementById("gridContainer").appendChild(table);

    let largestProduct = largestProductinGrid(gridArray)
    let rowPos = largestProduct[2]
    let colPos = largestProduct[3]

    document.getElementById('replaceLargestProductInGrid').innerText = "The largest product in this 20x20 grid is: " + largestProduct[0]
    switch (largestProduct[1]) {
        case "horizontal":
            for (let i = 0; i < 4; i++) {
                document.getElementById("gridTable").rows[rowPos].cells[colPos + i].classList.add('cellHighlight');
            }
            break;

        case "vertical":
            for (let i = 0; i < 4; i++) {
                document.getElementById("gridTable").rows[rowPos + i].cells[colPos].classList.add('cellHighlight');
            }
            break;
            
        case "diagonal right":
            for (let i = 0; i < 4; i++) {
                document.getElementById("gridTable").rows[rowPos + i].cells[colPos + i].classList.add('cellHighlight');
            }
            break;          
            
        case "diagonal left":
            for (let i = 0; i < 4; i++) {
                document.getElementById("gridTable").rows[rowPos + i].cells[colPos - i].classList.add('cellHighlight');
            }
            break;

    }

}


window.addEventListener("load", getLargestProductInGrid);

function generateRandomGrid() {
    let randomGrid = Array.from({length:400}, () => Math.floor(Math.random() * 100)); 
    let gridArray = randomGrid.map(x => pad(x, 2))
    // let gridArray = randomGrid
    return gridArray
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
