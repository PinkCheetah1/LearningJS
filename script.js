let errorBox = document.getElementById("error-box");
let errorMessage = document.getElementById("error-message");
let factorsList;
let isPrime;


function validateForm() {
    let numInput = document.forms["form"]["num"].value;
    if (isNaN(numInput) || numInput == "") {
        errorMessage.innerText = "Please input a valid number to begin learning."
        errorBox.style.display = "block";
        return false;
    }
    else if (numInput.length > 9) {
        errorMessage.innerText = "Please input a number that is no longer than 9 digits."
        errorBox.style.display = "block";
        return false;
    }
    errorBox.style.display = "none";

    let num = Number(numInput);
    console.log("User entered:", num);

    let isPrime = getIsPrime(num);

    if (isPrime) {
        document.getElementById("factors-box").style.display = "none";
        document.getElementById("number-pairs-box").style.display = "none";
    }
    else {
        document.getElementById("factors-box").style.display = "block";
        document.getElementById("number-pairs-box").style.display = "block";
        factors = getFactors(num);
        getNumberPairs(num, factors);
    }

    getMultiples(num);

    document.getElementById("results").style.display = "block";

    return false;
}

function getIsPrime(num) {
    // The following code was written with a LOT of help from ChatGPT, but I typed it all, and I understand it.
    let isPrime = true;
    
    if (num < 2) {
        isPrime = false;
    }
    else {
        for (let i = 2; i < Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
    }
    if (isPrime) {
        document.getElementById("is-prime-text").innerText = `${num} is a prime number!`;
    }
    else {
        document.getElementById("is-prime-text").innerText = `${num} is not a prime number.`;
    }
    return isPrime;
}

function getFactors(num) {
    console.log("getFactors started...")
    let factors = [];
    let count = 1;
    let numString = "";
    
    for (let i = 1; i <= num; i++) {
        if (num % i == 0) {
            factors.push(i);
            console.log("Adding the number: ", String(i))
        }
    }
    
    //Get string of factors
    numString = "";
    console.log("Factors list length is: ", factors.length);
    
    // Got help from ChatGPT for syntax on this one. 
    factors.forEach((factor, index) => {
        console.log("Adding to String: ", String(factors[index]), ". index = ", String(index))
        if ((index + 1) == factors.length) {
            numString += ("and " + String(factors[index]) + ".")
        }
        else {
            numString += (String(factors[index]) + ", ");
        }
    });
    document.getElementById("factors-text").innerText = numString;
    return factors;
}

function getNumberPairs(num, factors) {
    let pairNumber;
    let pairString = "";
    const pairList = [];
    for (let i = 0; i < factors.length; i++) {
        pairNumber = num / factors[i];
        pairList.push([factors[i], pairNumber]);
    }
    
    for (index in pairList) {
        pairString += `(${pairList[index].toString()}) `;
    }
    document.getElementById("number-pairs-text").innerText = pairString;
}

function getMultiples(num) {
    let multiple;
    let multiplesString = "";
    const limit = Math.min(num, 50);
    for (i = 1; i <= limit; i++) {
        multiplesString += `${i} X ${num} = ${i * num}. \n`
    }

    document.getElementById("multiples-text").innerText = multiplesString;
}