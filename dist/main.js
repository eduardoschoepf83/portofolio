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
const translations = {
    aboutMe: {
        en: "About Me",
        fr: "À propos de moi",
        pt: "Sobre mim"
    },
    workExperience: {
        en: "Work Experience",
        fr: "Expérience professionnelle",
        pt: "Experiência Profissional"
    },
    education: {
        en: "Education",
        fr: "Éducation",
        pt: "Educação"
    },
    projects: {
        en: "Projects",
        fr: "Projets",
        pt: "Projetos"
    }
};
/**
 * Sets the language of the page and updates section titles and anchor texts accordingly.
 *
 * @param {string} lang - The language selected by the user.
 * @returns {void}
 */
function setLanguage(lang) {
    // Select all sections with an ID attribute
    const sections = document.querySelectorAll('section[id]');
    // Iterate over each section
    sections.forEach(section => {
        // Get the ID of the current section
        const id = section.id;
        // Get the translated title for the current section and language
        const title = translations[id][lang];
        // Update the corresponding anchor text to the translated title, if exists
        const anchor = document.querySelector(`a[href="#${id}"]`);
        if (anchor) {
            anchor.textContent = title.toUpperCase(); // Set anchor text to uppercase
        }
        // Update the section title with the translated title, if exists
        const sectionTitle = document.querySelector(`#${id} h2`);
        if (sectionTitle) {
            sectionTitle.textContent = title;
        }
    });
}
/**
 * Loads and processes the JSON profile data based on the selected language.
 *
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
 * @returns {void}
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
 * @returns {void}
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
 * @returns {void}
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
/**
 * Adds social media links to the designated HTML element.
 *
 * @param socialMedias An array of social media objects to be added.
 * @returns {void}
 */
function addSocialMediaLinks(socialMedias) {
    try {
        // Get the HTML element with the ID 'social-medias'
        const socialMediasHTML = document.getElementById('socialMedias');
        // Check if the HTML element exists
        if (socialMediasHTML) {
            let socialMediasConcat = '<h3>Réseaux sociaux</h3>';
            // Iterate through each social media object in the array
            socialMedias.forEach(sm => {
                // Determine the icon class based on the social media name
                const iconName = sm.name === 'linkedin' ? 'fa-linkedin' : 'fa-square-github';
                // Concatenate HTML string for each social media link
                socialMediasConcat += `
          <a href='${sm.link}' target='_blank'>
            <i class='fa-brands ${iconName} fa-2xl' style='color: #F5F5F9'></i>
          </a>
        `;
            });
            // Set the inner HTML of the 'social-medias' element
            socialMediasHTML.innerHTML = socialMediasConcat;
        }
        else {
            console.warn("The element with ID 'social-medias' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding social media links:', error);
    }
}
/**
 * Adds the "About Me" section to the HTML document.
 *
 * @param aboutMe An object containing summaries in different languages.
 * @param language The selected language for displaying the summary.
 * @returns {void}
 */
function addAboutMe(aboutMe, language) {
    try {
        // Get the HTML element with the ID 'about-me'
        const aboutMeSection = document.getElementById('aboutMe');
        // Check if the HTML element exists
        if (aboutMeSection) {
            // Set the inner HTML of the 'about-me' element with the summary in the selected language
            aboutMeSection.innerHTML = `<p>${aboutMe.summary[language]}</p>`;
        }
        else {
            console.warn("The element with ID 'about-me' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding the About Me section:', error);
    }
}
/**
 * Adds the work experience section to the HTML document.
 *
 * @param workExperience An array of work experience objects.
 * @param language The selected language for displaying work experience details.
 * @returns {void}
 */
function addWorkExperience(workExperience, language) {
    try {
        // Get the HTML element with the ID 'professional-activities'
        const sectionWorkExperience = document.querySelector('#workExperience .resume-entry');
        // Check if the HTML element exists
        if (sectionWorkExperience) {
            let workExperienceHTML = '';
            // Iterate through each work experience object in the array
            workExperience.forEach((work) => {
                // Generate the HTML string for each work experience entry
                workExperienceHTML += ` 
          <div class='date-range'>${work.period[language]}</div>
          <div class='job-title'>${work.position[language]}</div>
          <div class='company-name'>${work.company}, ${work.location}</div>
          <p class='job-description'>${work.description[language]}</p>
        `;
            });
            // Set the inner HTML of the 'professional-activities' element
            sectionWorkExperience.innerHTML = workExperienceHTML;
        }
        else {
            console.warn("The element with ID 'professional-activities' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding work experience:', error);
    }
}
/**
 * Adds the education section to the HTML document.
 *
 * @param education An array of education objects.
 * @param language The selected language for displaying education details.
 * @returns {void}
 */
function addEducation(education, language) {
    try {
        // Get the HTML element with the ID 'education'
        const sectionEducation = document.querySelector('#education .resume-entry');
        // Check if the HTML element exists
        if (sectionEducation) {
            let educationHTML = '';
            // Iterate through each education object in the array
            education.forEach((elem) => {
                // Generate the HTML string for each education entry
                educationHTML += `
          <div class='date-range'>${elem.period[language]}</div>
          <div class='course-title'>${elem.degree[language]}</div>
          <div class='educational-institution'>${elem.institution}</div>
          <p class='course-description'>${elem.description[language]}</p>
          `;
            });
            // Set the inner HTML of the 'education' element
            sectionEducation.innerHTML = educationHTML;
        }
        else {
            console.warn("The element with ID 'education' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding education:', error);
    }
}
/**
 * Adds the projects section to the HTML document.
 *
 * @param projects An array of project objects.
 * @param language The selected language for displaying project details.
 * @returns {void}
 */
function addProjects(projects, language) {
    try {
        // Get the HTML element with the ID 'projects'
        const sectionProjects = document.querySelector('#projects .resume-entry');
        // Check if the HTML element exists
        if (sectionProjects) {
            let projectsHTML = '';
            // Iterate through each project object in the array
            projects.forEach((elem) => {
                // Generate the HTML string for each project entry
                projectsHTML += `
          <div class="badge">
            <a href=${elem.url} target='_blank'>
              <img src='img/${elem.img}' alt="Imagem do Badge" class="badge-image">
            </a>
            <h2 class="badge-title">${elem.title[language]}</h2>
            <p class="badge-description">${elem.description[language]}</p>
          </div>
        `;
            });
            // Set the inner HTML of the 'projects' element
            sectionProjects.innerHTML = projectsHTML;
        }
        else {
            console.warn("The element with ID 'projects' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding projects:', error);
    }
}
/**
 * Updates the copyright section with the current year.
 *
 * @returns {void}
 */
function addCopyright() {
    try {
        // Get the current year
        const currentYear = new Date().getFullYear();
        // Get the HTML element with the ID 'copyright'
        const copyright = document.getElementById('copyright');
        // Check if the HTML element exists
        if (copyright) {
            // Set the inner HTML to display the current year and the author's name
            copyright.innerHTML = `© ${currentYear} Eduardo Schoepf`;
        }
        else {
            console.warn("The element with ID 'copyright' was not found.");
        }
    }
    catch (error) {
        console.error('An error occurred while adding copyright:', error);
    }
}
/**
 * Sets up language buttons to load and process JSON data based on the selected language.
 *
 * @returns {void}
 */
function setupLanguageButtons() {
    try {
        // Select all language option buttons
        const buttons = document.querySelectorAll('.language-options-btns button');
        // Add a click event listener to each button
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Determine the selected language based on the button text
                const selectedLanguage = button.innerText.toUpperCase() === 'EN' ? 'en' :
                    button.innerText.toUpperCase() === 'FR' ? 'fr' :
                        'pt';
                // Sets the language of titles for sections.   
                setLanguage(selectedLanguage);
                // Load and process JSON data for the selected language
                loadAndProcessJSON(selectedLanguage);
            });
        });
    }
    catch (error) {
        console.error('An error occurred while setting up language buttons:', error);
    }
}
/**
 * Initializes the webpage by setting up language buttons and loading JSON data based on the user's browser language.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Get the user's browser language or default to 'fr'
        let userLanguage = navigator.language || 'fr';
        // Ensure the user language is one of the supported languages ('en', 'fr', 'pt')
        if (userLanguage !== "en" && userLanguage !== "fr" && userLanguage !== "pt") {
            userLanguage = "fr";
        }
        // Set up language buttons
        setupLanguageButtons();
        // Sets the language of titles for sections. 
        setLanguage(userLanguage);
        // Load and process JSON data for the detected or default language
        loadAndProcessJSON(userLanguage);
    }
    catch (error) {
        console.error('An error occurred during initialization:', error);
    }
});
