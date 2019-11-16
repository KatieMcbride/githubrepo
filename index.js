const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require('util');
const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");

const writeFileAsync = util.promisify(fs.writeFile);



inquirer
    .prompt([
        {
        type: 'input',
        message: 'What is your GitHub name?',
        name: 'username',
        },
        {
        type: 'list',
        name: 'color',
        message: 'Pick your favorite color', 
        choices: [
            { value: 'red' },
            { value: 'green' },
            { value: 'blue' },
            { value: 'yellow' },
            { value: 'pink' },
            { value: 'purple' },
          ],
        }
    ])
    .then(async ({ username, color }) => {
        const queryURL1 = `https://api.github.com/users/${username}`;
        const queryURL2 = `https://api.github.com/users/${username}/repos`;

      
        const res1 = await axios.get(queryURL1)
        const res2 = await axios.get(queryURL2)

        const stars =  res2.data.reduce((acc, curr) => {
            acc += curr.stargazers_count;
            return acc;
                }, 0);
      
                // const publicRepos = res.data.public_repos;
                // const userName = res.data.login;
                // const avatar = res.data.avatar_url;
                // const location = res.data.location;
                // const gitHub = res.data.login;
                console.log(stars);
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
                 <body class="background-${color}">
                 <h1 class="gitHubName" >Username: ${res1.data.login}</h1>
                 <div class= "btnlinks">
                    <a class ="button" href="https://www.google.com/maps/place/${res1.data.location}">Google Maps Link</a>
                    <a class ="button" href ="https://github.com/${res1.data.login}">GitHub Link</a>
                     <a class ="button" href ="${res1.data.blog}">Blog Link</a>
                </div>
                 <div class="imagePlacer">
                    <img class="image" src= "${res1.data.avatar_url}"  height="250" width="250"></img>
                </div>    
                
                <div class="infolinks">
                    <p class ="info">Bio: ${res1.data.bio}</p>
                </div>

                <div class="infolinks">
                    <p class ="info">Followers: ${res1.data.followers}</p>
                    <p class ="info">Following: ${res1.data.following}</p>
                </div>

                <div class="infolinks">
                    <p class ="info">Public Repositories: ${res1.data.public_repos}</p>
                    <p class ="info">Stars: ${stars}</p>
                </div>
                 </body>
                 </html>`;
  
      return writeFileAsync('index.html', hcHtml, (err, result) => {
          if(err) {
              console.log(err)
          }
      });
      
             
    }).then(() => {
        createPDF();
    });
    


 const createPDF = async () => {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, "./index.html"),
      outputPath: path.join(__dirname, "./github.pdf"),
      include: [
        path.join(__dirname, "./style.css")
      ],
      options: { printBackground: true } 
    });

    await html5ToPDF.start();
    await html5ToPDF.build();
    await html5ToPDF.close();
    console.log("DONE");
    process.exit(0);
    };
    

   




 
            
            

    
    