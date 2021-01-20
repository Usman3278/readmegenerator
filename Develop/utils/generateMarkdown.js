const axios = require('axios')

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const licenseOpts=['Eclipse Public License 1.0', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
  const badgeOpts=['https://img.shields.io/badge/License-EPL%201.0-red.svg','https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg','https://img.shields.io/badge/License-Apache%202.0-blue.svg',' https://img.shields.io/badge/License-MIT-yellow.svg','https://img.shields.io/badge/License-Boost%201.0-lightblue.svg','https://img.shields.io/badge/license-Unlicense-blue.svg']
  let badge=''
  licenseOpts.forEach((el,i)=>{
    if(el===license){
      badge=badgeOpts[i]
    }
  })

  return badge
  
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseOpts= ['Eclipse Public License 1.0', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
  const linkOpts=['https://opensource.org/licenses/EPL-1.0','https://opensource.org/licenses/MPL-2.0','https://opensource.org/licenses/Apache-2.0','https://opensource.org/licenses/MIT','https://www.boost.org/LICENSE_1_0.txt','http://unlicense.org/']
  let link=''
  licenseOpts.forEach((el,i)=>{
    if(el===license){
      link= linkOpts[i]
    }
  })

  return link
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data,repolink) {

  let markup= `# ${data.title}

  (${renderLicenseBadge(data.license)})

  ## Description 
  ${data.description}
  
  #Table Of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [License](#license)
  * [Questions](#questions)
  

  ## Installation
  ${data.installation}


  ## Usage
  ${data.usage}


  ## Contributing
  ${data.contributing}


  ## Test
  ${data.tests}


  ## License
  ${data.license}
  (${renderLicenseLink(data.license)}) 



  ## Questions 
  
  [${data.username}](${repolink.html_url})
  `
  if(!repolink.email===null){
    markup+=`
    
    Please feel free to contact me for any questions.
    ${repolink.email}
    `
  }  

  return markup;
}

module.exports = generateMarkdown;
