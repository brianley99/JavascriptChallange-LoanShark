//get input from user
//input function
function getValues() {
    //get inputs from dom
    let totalLoanAmount = parseInt(document.getElementById("loanAmt").value);
    let payments = parseInt(document.getElementById("payments").value);
    let interestRate = parseInt(document.getElementById("rate").value);

    //generate values for table as an object 
    let loan = generateValues(totalLoanAmount, payments, interestRate);

    //display to user
    displayValues(loan);
}

//generate costs
//logic function
function generateValues(totalLoanAmount, payments, rate) {

    loan = {};
    loanTable = "";
    remaningBalance = totalLoanAmount;
    totalInterest = 0

    //calculate how much to pay each month with interest included
    totalMonthlyPayment = (totalLoanAmount) * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), -payments));

    //generate payments table
    for (let month = 1; month <= payments; month++) {

        //calculate interest
        let interestPayment = remaningBalance*(rate/1200);

        //adds interest
        totalInterest += interestPayment;

        //calculate princibal Payment
        let princibalPayment = totalMonthlyPayment-interestPayment;

        //subtracts monthly payment from balance  
        remaningBalance -= princibalPayment;
       

        //round numbers
        totalMonthlyPayment = Math.round(totalMonthlyPayment * 100) / 100;
        princibalPayment = Math.round( princibalPayment * 100) / 100;
        interestPayment = Math.round(interestPayment * 100) / 100;
        remaningBalance = Math.round(remaningBalance * 100) / 100;
        totalInterest = Math.round(totalInterest * 100) / 100;
        remaningBalance = Math.round(remaningBalance * 100) / 100;
        
        loanTable += generateTr(month, totalMonthlyPayment, princibalPayment, interestPayment, totalInterest, remaningBalance);
        
    }

    //propreties to be returned as an object
    loan.loanAmount = totalLoanAmount;
    loan.table = loanTable;
    loan.totalMonthlyPayment = totalMonthlyPayment;
    loan.totalInterest = totalInterest;
    loan.totalCost = totalLoanAmount + totalInterest;

    return loan
}

//generate html row
function generateTr(month, totalMonthlyPayment, princibalPayment, interestPayment, totalInterest, remaningBalance) {

    tr = `<tr><td>${month}</td><td>${totalMonthlyPayment}</td><td>${princibalPayment}</td><td>${interestPayment}</td><td>${totalInterest}</td><td>${remaningBalance}</td><tr>`;

    return tr
}

//display to user
//output function
function displayValues(loan) {
    document.getElementById("monthlyPayment").innerHTML = `$${loan.totalMonthlyPayment}`;
    document.getElementById("tPrincibal").innerHTML = `$${loan.loanAmount}`;
    document.getElementById("tInterest").innerHTML = `$${loan.totalInterest}`;
    document.getElementById("tCost").innerHTML = `$${loan.totalCost}`;
    document.getElementById("calculatorTable").innerHTML = loan.table;
}
