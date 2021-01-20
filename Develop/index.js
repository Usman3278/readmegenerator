// TODO: Include packages needed for this application
const inquirer= require('inquirer')
const fs= require('fs')
const util= require('util')
const axios= require('axios')
const markup= require('./utils/generateMarkdown')
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? ",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['Eclipse Public License 1.0', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];



// TODO: Create a function to write README file
function  writeToFile(fileName, data) {
   fs.writeFile(fileName,data,err=>{
       if(err) return console.log(err)

       console.log('README.md file created')
   })
}
const writeAsyncFile= util.promisify(writeToFile)

// TODO: Create a function to initialize app
async function init (){
    try{
        const responses = await inquirer.prompt(questions)
        const userGithub= await axios.get(`https://api.github.com/users/${responses.username}`)
        console.log(userGithub.data)

        const output= markup(responses,userGithub.data)
        await writeAsyncFile('README.md',output)
    }catch(err){
        console.log(`Failed to create README.md file`)
        console.log(err.message)
    }
}

// Function call to initialize app
init();
