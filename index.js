const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require('util');
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([
        {
        type: 'input',
        message: 'What is your GitHub name?',
        name: 'username',
        },
        {
        type: 'input',
        message: 'What is your favorite color?',
        color: 'color', 
        },
    ])
    .then(answers => {
        console.log(answers);

    // generate static html 
     const hcHtml = `
    <!DOCTYPE html>
        <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    </head>
    <body>
    <h1>${answers.name}</h1>
    <h2>${answers.color}</h2>
    </body>
    </html>`;

    return writeFileAsync('index.html', hcHtml);
})
.then(() => {
    // read from file system
    var html = fs.readFileSync('./index.html','utf8');
    var options = {format:'Letter'};

    // convert to pdf
    pdf.create(html, options).toFile('./github.pdf', function(err, res){
        if (err) return console.log(err);
        console.log(res);
    });
});
    // convert that html to a pdf
    // save that pdf to the folder



// // Initial state
// init();