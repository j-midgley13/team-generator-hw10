const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let seenID = {};

let team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addTeamMember(){
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Choose a team member",
            choices: ["Manager", "Engineer", "Intern", "Team Build Finished"]
        }
    ]).then(response => {
        switch(response.role) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            case "Team Build Finished":
                console.log("Your team is complete!");
                console.log(team);
                render(team);
                createHtml();
                break;
        }
    })
}

function addManager(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?",
            validate: answerVal
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID number?",
            validate: idVal
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's work email?",
            validate: emailVal
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office Number?",
            validate: answerVal
        }
    ]).then(response => {
        console.log(response);
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(newManager);
        // console.log(team);
        return addTeamMember();
    })
};

function addEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's name?",
            validate: answerVal
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID number?",
            validate: idVal
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's work email?",
            validate: emailVal
        },
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's GitHub username?",
            validate: answerVal
        }
    ]).then(response => {
        console.log(response);
        const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
        team.push(newEngineer);
        // console.log(team);
        return addTeamMember();
    })
};

function addIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?",
            validate: answerVal
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID number?",
            validate: idVal
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's work email?",
            validate: answerVal
        },
        {
            type: "input",
            name: "school",
            message: "What is the Intern's school?",
            validate: answerVal
        }
    ]).then(response => {
        console.log(response);
        const newIntern = new Intern(response.name, response.id, response.email, response.school);
        team.push(newIntern);
        // console.log(team);
        return addTeamMember();
    })
};

function answerVal(value) {
    if(value === "") {
        return "Field cannot be left blank.";
    } else {
        return true;
    }
};

function idVal(id) {
    if (id === "") {
        return "ID field cannot be left blank."
    } else if (seenID[id]) {
        return "Invalid ID."
    } else {
        seenID[id] = true;
        return true;
    }
};

function emailVal(email) {
    const emailFormat = /\S+@\S+\.\S+/;
    if((email.charAt(0)===".")||(email==="")){
        return "Invalid email address."    
    }
    else if(email.match(emailFormat)){
        return true
    }
    else{
        return "Invalid email address."
    }
};

function createHtml (){
    fs.writeFileSync(outputPath, render(team), "utf-8");
};

addTeamMember();
// addManager();
// addEngineer();
// addIntern();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
