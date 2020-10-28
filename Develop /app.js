const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//need to link to other files!
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeType = [
    {
        type: "list",
        name: "role",
        choices:["Manager" , "Engineer" ,  "Intern"],
        message: "What kind of employee do you want to create?",
      },
    ]
    const managerQuestions = [
        {
            name:"name",
            type: "input",
            message:"What is the employee's name?"
        },
        {
            name: "id",
            type: "input",
            message:"what is the employee's id?"
        },
        {
            name: "email",
            type: "input",
            message:"what is the employee's email?"
        },
        {
            name: "officeNumber",
            type: "input",
            message:"what is the employee's officeNumber?"
        },

    ]
    const engineerQuestions = [
        {
            name:"name",
            type: "input",
            message:"What is the employee's name?"
        },
        {
            name: "id",
            type: "input",
            message:"what is the employee's id?"
        },
        {
            name: "email",
            type: "input",
            message:"what is the employee's email?"
        },
        {
            name: "github",
            type: "input",
            message:"what is the employee's github?"
        },

    ]
    const internQuestions = [
        {
            name:"name",
            type: "input",
            message:"What is the employee's name?"
        },
        {
            name: "id",
            type: "input",
            message:"what is the employee's id?"
        },
        {
            name: "email",
            type: "input",
            message:"what is the employee's email?"
        },
        {
            name: "school",
            type: "input",
            message:"what is the employee's school?"
        },

    ]
    
    


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

const input = [];

function init(){
    let role;

    inquirer.prompt(employeeType)
    .then(function(answers){
        role = answers.role;
        if(answers.role === "Manager"){
            return inquirer.prompt(managerQuestions);
        }
        else if (answers.role === "Engineer"){
            return inquirer.prompt(engineerQuestions);
        }
        else if(answers.role === "Intern"){
            return inquirer.prompt(internQuestions);
        }
    })
    .then(function(answers){
        let employee;
        if(role === "Manager"){
            employee = new Manager(answers.name, answers.id, answers.email,answers.officeNumber);
        }
        else if(role === "Engineer"){
            employee = new Engineer( answers.name, answers.id, answers.email, answers.github);
        }
        else if(role === "Intern"){
            employee = new Intern( answers.name, answers.id, answers.email, answers.school);
        }
        //prompting user again
        input.push(employee);
        return inquirer.prompt([{
            name:"continue", type:"confirm", message:"would you like to add another employee?"

        }])
    })
    //if confirm to continue, call the functing again using init
    .then(function(answers){
        if (answers.continue){
            return init();
        }
        else{
            //return render(input);
            var html = render(input);
            fs.writeFileSync(outputPath, html,"UTF-8");
        }
        console.log(input);
    })
}
init();
