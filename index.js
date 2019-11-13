const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require('util');
const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");

const writeFileAsync = util.promisify(fs.writeFile);

const createPDF = async () => {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, "./index.html"),
      outputPath: path.join(__dirname, "./github.pdf"),
      include: [
        path.join(__dirname, "./styles.css")
      ],
      options: { printBackground: true } 
    });

    await html5ToPDF.start();
    await html5ToPDF.build();
    await html5ToPDF.close();
    console.log("DONE");
    process.exit(0);
    };
createPDF();

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
                 <meta charset="utf-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                 <link rel="stylesheet" type="text/css" href="./style.css" />
                 <title>GitHub Repo Info</title>
                 </head>
                 <body>
                 <h1 class="gitHubName" >${res.data.login}</h1>
                 <div class= "btnlinks">
                    <a class ="button" href="https://www.google.com/maps/place/${res.data.location}">Google Maps Link</a>
                    <a class ="button" href ="https://github.com/${res.data.login}">GitHub Link</a>
                     <a class ="button" href ="${res.data.blog}">Blog Link</a>
                </div>
                 <div class="imagePlacer">
                    <img class="image" src= "${res.data.avatar_url}"  height="250" width="250"></img>
                </div>    
                
                <div class="infolinks">
                    <p class ="info">Bio: ${res.data.bio}</p>
                </div>

                <div class="infolinks">
                    <p class ="info">Followers: ${res.data.followers}</p>
                    <p class ="info">Following: ${res.data.following}</p>
                </div>

                <div class="infolinks">
                    <p class ="info">Public Repos: ${res.data.public_repos}</p>
                    <p class ="info">Stars:/Stars?</p>
                </div>
                 </body>
                 </html>`;
  
      return writeFileAsync('index.html', hcHtml);
             
    })
        

 });

 
            
            

    
    

  
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