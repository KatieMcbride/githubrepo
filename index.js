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
        // {
        // type: 'input',
        // message: 'What is your favorite color?',
        // color: 'color', 
        // },
    ])
    .then(({ username }) => {
        const queryUrl = `https://api.github.com/users/${username}`;
    
        axios.get(queryUrl).then(res => {
      
                const publicRepos = res.data.public_repos;
                const userName = res.data.login;
                const avatar = res.data.avatar_url;
                const location = res.data.location;
                const gitHub = res.data.login;

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
                 <h1>${res.data.login}</h1>
                 <img src= "${res.data.avatar_url}"  height="200" width="200"></img>
                 <p>${res.data.public_repos}</p>
                 <a href="https://www.google.com/maps/place/${res.data.location}">Google Maps Link</a>
                 <a href ="https://github.com/${res.data.login}">GitHub Link</a>
                 <a href ="${res.data.blog}">Blog Link</a>
            
                 </body>
                 </html>`;
  
      return writeFileAsync('index.html', hcHtml);
                
                // publicRepoStr = publicRepos.join('\n');
                // console.log(publicRepoStr);       
             
    })
 })
            
            

    
    

  
// .then(() => {
//     read from file system
//     var html = fs.readFileSync('./index.html','utf8');
//     var options = {format:'Letter'};

    // convert to pdf
//     pdf.create(html, options).toFile('./github.pdf', function(err, res){
//         if (err) return console.log(err);
//         console.log(res);
//     });
// });
    // convert that html to a pdf
    // save that pdf to the folder
    /* <h1>${answers.name}</h1> */
    // <h2>${answers.color}</h2>



// // Initial state
// init();