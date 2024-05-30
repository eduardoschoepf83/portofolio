"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Loads and processes the JSON profile data based on the selected language.
 * @param selectedLanguage The language selected by the user for displaying profile information.
 */
function loadAndProcessJSON(selectedLanguage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("./profile.json");
            const profileData = yield response.json();
            let defaultLanguage;
            if (selectedLanguage === "en" || selectedLanguage === "fr" || selectedLanguage === "pt") {
                defaultLanguage = selectedLanguage;
            }
            else {
                defaultLanguage = "fr";
            }
            addPersonalInformation(profileData.personalInformation, defaultLanguage);
            addSkills(profileData.skills);
            addSocialMediaLinks(profileData.socialMedias);
            addAboutMe(profileData.aboutMe, defaultLanguage);
            addWorkExperience(profileData.workExperience, defaultLanguage);
            addEducation(profileData.education, defaultLanguage);
            addProjects(profileData.projects, defaultLanguage);
            addCopyright();
        }
        catch (error) {
            console.error('Error loading the JSON file:', error);
        }
    });
}
/**
 * Adds personal information to the designated HTML element based on the selected language.
 *
 * @param personalInformation An object containing the personal information data.
 * @param language The selected language for displaying the personal information.
 */
function addPersonalInformation(personalInformation, language) {
    try {
        // Get the HTML element with the ID 'personalInformation'
        const divInformacoesPessoais = document.getElementById('personalInformation');
        // Check if the HTML element exists
        if (divInformacoesPessoais) {
            // Set the inner HTML of the element with the name and job title based on the selected language
            divInformacoesPessoais.innerHTML = `
        <h1 class='name'>${personalInformation.name}</h1>
        <h2 class='my-job-title'>${personalInformation.desiredPosition[language]}</h2>
      `;
        }
        else {
            console.warn("The element with ID 'personalInformation' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding personal information:', error);
    }
}
/**
 * Adds skills to the designated HTML element.
 *
 * @param skills An array containing the skills to be added.
 */
function addSkills(skills) {
    try {
        // Get the HTML element with the ID 'personalInformation'
        const divExperienciaProfissional = document.getElementById("personalInformation");
        // Check if the HTML element exists
        if (divExperienciaProfissional) {
            let skillConcat = '';
            // Concatenate skills into a single string with '|' separator
            skills.forEach((skill) => {
                skillConcat += ' ' + skill + ' |';
            });
            // Remove the last '|' character
            if (skillConcat.length > 0) {
                skillConcat = skillConcat.slice(0, -1);
            }
            // Create a new <p> element to display the skills
            let skillHTML = document.createElement('p');
            skillHTML.textContent = skillConcat;
            // Append the <p> element to the 'personalInformation' element
            divExperienciaProfissional.appendChild(skillHTML);
        }
        else {
            console.warn("The element with ID 'personalInformation' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding skills:', error);
    }
}
/**
 * Adds media links for download to the designated HTML element.
 *
 * @param mediaLinks An array of media link objects to be added.
 */
function addMediasForDownload(mediaLinks) {
    try {
        // Get the HTML element with the ID 'personalInformation'
        const divInformacoesPessoais = document.getElementById('personalInformation');
        // Check if the HTML element exists
        if (divInformacoesPessoais) {
            // Create a new <p> element to contain the media links
            let mediaLinksHTML = document.createElement("p");
            mediaLinksHTML.textContent = "CV download: ";
            // Iterate through each media link object in the array
            mediaLinks.forEach(ml => {
                // Create a button element for the media link
                let buttonElement = document.createElement('button');
                buttonElement.textContent = ml.name;
                // Create an anchor element to wrap the button element
                let anchorElement = document.createElement('a');
                anchorElement.href = window.location.pathname + ml.address;
                anchorElement.target = '_blank';
                anchorElement.appendChild(buttonElement);
                // Append the anchor element to the <p> element
                mediaLinksHTML.appendChild(anchorElement);
            });
            // Append the <p> element to the 'personalInformation' element
            divInformacoesPessoais.appendChild(mediaLinksHTML);
        }
        else {
            console.warn("The element with ID 'personalInformation' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding media links for download:', error);
    }
}
function addSocialMediaLinks(socialMedias) {
    const socialMediasHTML = document.getElementById('social-medias');
    if (socialMediasHTML) {
        let socialMediasConcat = '';
        socialMedias.forEach(sm => {
            const iconName = sm.name === 'linkedin' ? 'fa-linkedin' : 'fa-square-github';
            socialMediasConcat += `
        <a href='${sm.link}' target='_blank'>
          <i class='fa-brands ${iconName} fa-2xl'></i>
        </a>
      `;
        });
        socialMediasHTML.innerHTML = socialMediasConcat;
    }
}
function addAboutMe(aboutMe, language) {
    const aboutMeSection = document.getElementById('about-me');
    if (aboutMeSection) {
        aboutMeSection.innerHTML = `<p>${aboutMe.summary[language]}</p>`;
    }
}
function addWorkExperience(workExperience, language) {
    const sectionWorkExperience = document.getElementById('professional-activities');
    if (sectionWorkExperience) {
        let workExperienceHTML = '<h2>Work Experience</h2>';
        workExperience.forEach((work) => {
            //let description = work.description.replace(/[:;]/g, match => `${match}<br>`);
            workExperienceHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${work.period[language]}</div>
          <div class='job-title'>${work.position[language]}</div>
          <div class='company-name'>${work.company}, ${work.location}</div>
          <p class='job-description'>${work.description[language]}</p>
        </div>
      `;
        });
        sectionWorkExperience.innerHTML = workExperienceHTML;
    }
}
function addEducation(education, language) {
    const sectionEducation = document.getElementById('education');
    if (sectionEducation) {
        let educationHTML = '<h2>Education</h2>';
        education.forEach((elem) => {
            educationHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${elem.period[language]}</div>
          <div class='course-title'>${elem.degree[language]}</div>
          <div class='educational-institution'>${elem.institution}</div>
          <p class='course-description'>${elem.description[language]}</p>
        </div>
      `;
        });
        sectionEducation.innerHTML = educationHTML;
    }
}
function addProjects(projects, language) {
    const sectionProjects = document.getElementById('projects');
    if (sectionProjects) {
        let projectsHTML = '<h2>Projects</h2>';
        projects.forEach((elem) => {
            projectsHTML += `
        <div class='resume-entry'>
          <a href=${elem.url} target='_blank'>
            <img src='img/${elem.img}' alt='Project Image'>
          </a>
          <div class='project-title'>${elem.title[language]}</div>
          <p class='project-description'>${elem.description[language]}</p>
        </div>
      `;
        });
        sectionProjects.innerHTML = projectsHTML;
    }
}
function addCopyright() {
    const currentYear = new Date().getFullYear();
    const copyright = document.getElementById('copyright');
    if (copyright) {
        copyright.innerHTML = `© ${currentYear} Eduardo Schoepf`;
    }
}
function setupLanguageButtons() {
    const buttons = document.querySelectorAll('.language-options button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLanguage = button.innerText.toUpperCase() === 'EN' ? 'en' :
                button.innerText.toUpperCase() === 'FR' ? 'fr' :
                    'pt';
            loadAndProcessJSON(selectedLanguage);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const userLanguage = navigator.language || 'fr';
    setupLanguageButtons();
    loadAndProcessJSON(userLanguage);
});
