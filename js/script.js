// Personal Finances Simulator by Marco Antonio Gonzalez Hernandez

// Objects Definition
class Job {
    constructor (company, role, salary, start, end) {
        this.company = company;
        this.role = role;
        this.salary = salary;
        this.start = start;
        this.end = end;
    }
}
class Debt {
    constructor (amount, n_months, interest, maintainance) {
        this.amount = amount;
        this.n_months = n_months;
        this.interest = interest;
        this.maintainance = maintainance;
        this.monthlyPayment = this.calcMonthCost()
    }
    calcMonthCost () {
        const baseMP = this.amount/this.n_months;
        let draftAmount = this.amount
        let interestPayed = 0;
        for (let month = 1; month <= this.n_months; month++) {
            interestPayed += draftAmount*this.interest;
            draftAmount -= baseMP
        }
        const totalPayment = this.amount + interestPayed + this.maintainance*this.n_months;
        const monthlyPayment = totalPayment/this.n_months
        return Math.trunc(monthlyPayment);
    }
}
class Persona {
    constructor (nombre, dob, startingAmount = 0, startingDebt = 0) {
        this.nombre = nombre;
        this.dob = dob;
        this.startingAmount = startingAmount;
        this.jobs = [];
        this.debts = [];
        this.startingDebt = startingDebt;
        this.networth = this.startingAmount - this.startingDebt;
    }
    addJob (job) {
        this.jobs.push(job);
    }
    addDebt (debt) {
        this.debts.push(debt);
    }
    addExpense () {

    }
    showInfo () {
        for (const propiedad in this) {
            if(propiedad == 'jobs'){
                for (const job in this[propiedad]) {
                    for (const jobProp in this[propiedad][job]){
                        console.log(`${jobProp}: ${this[propiedad][job][jobProp]}`)
                    }
                }
            }
            else if (propiedad == 'debts') {
                for (const debt in this[propiedad]) {
                    for (const debtProp in this[propiedad][debt]){
                        console.log(`${debtProp}: ${this[propiedad][debt][debtProp]}`)
                    }
                }
            }
            else{
                console.log(`${propiedad}: ${this[propiedad]}`)
                if(propiedad == 'nombre'){
                    let elem_nombre = document.getElementById("nombre_persona")
                    elem_nombre.innerText = `${this[propiedad]}`
                }
            }
        }
        console.log()
    }
}

//Functions Definition
function SelectPerson(personas) {
    let selectString = "Select a person: "
    for (const person in personas){
        selectString = selectString.concat(`\n${person} - ${personas[person].nombre}`)
    }
    personChoice = prompt(selectString)
    return personChoice;
}


//Object Arrays Initialization
let personas = []

//Menu
let exitMenu = false
while (!exitMenu) {
    const menuString = "What would you like to do?\
                    \n1 - add a person to the PFS\
                    \n2 - add a job to a person\
                    \n3 - add a debt to a person\
                    \n4 - show a persons info\
                    \nexit - exit the PFS"
    let menuChoice = prompt(menuString)
    let personChoice
    switch (menuChoice.toLowerCase()) {
        case "exit":
            exitMenu = true
            break;
        case "1":
            let name = prompt("What is the persons name?")
            let dob = prompt("What is the persons Date of Birth?")
            let startingAmount = prompt("What is the person starting amount?")
            let startingDebt = prompt("What is the person starting debt?")
            let persona = new Persona(name, dob, startingAmount, startingDebt)
            personas.push(persona)
            break;
        case "2":
            personChoice = SelectPerson(personas)
            let company = prompt("What is the company name?")
            let role = prompt("What was the role in the compnay?")
            let salary = prompt("What was your salary?")
            let start = prompt("When did you start this job?")
            let end = prompt("When will/did you leave this job?")
            let job = new Job(company, role, salary, start, end)
            personas[personChoice].addJob(job)
            break;
        case "3":
            console.log(menuChoice)
            break;
        case "4":
            personChoice = SelectPerson(personas)
            personas[personChoice].showInfo()
            break;
        default:
            exitMenu = true
            break;
    }
}

const debt1 = new Debt(100,12,0.05,3);
console.log(debt1.monthlyPayment)