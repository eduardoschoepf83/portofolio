interface PersonalInformation {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  desiredPosition: {
    en: string;
    fr: string;
    pt: string;
  };
}

interface MediaLink {
  name: string;
  address: string;
}

interface SocialMedia {
  name: string;
  link: string;
}

interface AboutMe {
  summary: {
    en: string;
    fr: string;
    pt: string;
  };
}

interface WorkExperience {
  position: {
    en: string;
    fr: string;
    pt: string;
  };
  company: string;
  location: string;
  period: {
    en: string;
    fr: string;
    pt: string;
  };
  description: {
    en: string;
    fr: string;
    pt: string;
  };
}

interface Education {
  degree: {
    en: string;
    fr: string;
    pt: string;
  };
  institution: string;
  type: {
    en: string;
    fr: string;
    pt: string;
  };
  location: string;
  period: {
    en: string;
    fr: string;
    pt: string;
  };
  description: {
    en: string;
    fr: string;
    pt: string;
  };
}

interface Project {
  title: {
    en: string;
    fr: string;
    pt: string;
  };
  description: {
    en: string;
    fr: string;
    pt: string;
  };
  img: string;
  url: string;
}

interface Language {
  language: {
    en: string;
    fr: string;
    pt: string;
  };
  level: {
    en: string;
    fr: string;
    pt: string;
  };
}

interface Certification {
  certificate: string;
  institution: string;
  completionYear: string;
}

interface Profile {
  personalInformation: PersonalInformation;
  skills: string[];
  mediaLinks: MediaLink[];
  socialMedias: SocialMedia[];
  aboutMe: AboutMe;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
}

/**
 * Loads and processes the JSON profile data based on the selected language.
 * @param selectedLanguage The language selected by the user for displaying profile information.
 */
async function loadAndProcessJSON(selectedLanguage: string) {
  try {
    const response = await fetch("./profile.json");
    const profileData: Profile = await response.json();

    let defaultLanguage;
    if (selectedLanguage === "en" || selectedLanguage === "fr" || selectedLanguage === "pt") {
        defaultLanguage = selectedLanguage;
    } else {
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

  } catch (error) {
    console.error('Error loading the JSON file:', error);
  }
}

/**
 * Adds personal information to the designated HTML element based on the selected language.
 * 
 * @param personalInformation An object containing the personal information data.
 * @param language The selected language for displaying the personal information.
 */
function addPersonalInformation(personalInformation: PersonalInformation, language: string) {
  try {
    // Get the HTML element with the ID 'personalInformation'
    const divInformacoesPessoais = document.getElementById('personalInformation');

    // Check if the HTML element exists
    if (divInformacoesPessoais) {
      // Set the inner HTML of the element with the name and job title based on the selected language
      divInformacoesPessoais.innerHTML = `
        <h1 class='name'>${personalInformation.name}</h1>
        <h2 class='my-job-title'>${personalInformation.desiredPosition[language as keyof typeof personalInformation.desiredPosition]}</h2>
      `;
    } else {
      console.warn("The element with ID 'personalInformation' was not found.");
    }
  } catch (error) {
    console.error('An error occurred while adding personal information:', error);
  }
}

/**
 * Adds skills to the designated HTML element.
 * 
 * @param skills An array containing the skills to be added.
 */
function addSkills(skills: string[]) {
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
    } else {
      console.warn("The element with ID 'personalInformation' was not found.");
    }
  } catch (error) {
    console.error('An error occurred while adding skills:', error);
  }
}

/**
 * Adds media links for download to the designated HTML element.
 * 
 * @param mediaLinks An array of media link objects to be added.
 */
function addMediasForDownload(mediaLinks: MediaLink[]) {
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
    } else {
      console.warn("The element with ID 'personalInformation' was not found.");
    }
  } catch (error) {
    console.error('An error occurred while adding media links for download:', error);
  }
}

/**
 * Adds social media links to the designated HTML element.
 * 
 * @param socialMedias An array of social media objects to be added.
 */
function addSocialMediaLinks(socialMedias: SocialMedia[]) {
  try {
    // Get the HTML element with the ID 'social-medias'
    const socialMediasHTML = document.getElementById('social-medias');

    // Check if the HTML element exists
    if (socialMediasHTML) {
      let socialMediasConcat = '';

      // Iterate through each social media object in the array
      socialMedias.forEach(sm => {
        // Determine the icon class based on the social media name
        const iconName = sm.name === 'linkedin' ? 'fa-linkedin' : 'fa-square-github';

        // Concatenate HTML string for each social media link
        socialMediasConcat += `
          <a href='${sm.link}' target='_blank'>
            <i class='fa-brands ${iconName} fa-2xl'></i>
          </a>
        `;
      });

      // Set the inner HTML of the 'social-medias' element
      socialMediasHTML.innerHTML = socialMediasConcat;
    } else {
      console.warn("The element with ID 'social-medias' was not found.");
    }
  } catch (error) {
    console.error('An error occurred while adding social media links:', error);
  }
}

function addAboutMe(aboutMe: AboutMe, language: string) {
  const aboutMeSection = document.getElementById('about-me');

  if (aboutMeSection) {
    aboutMeSection.innerHTML = `<p>${aboutMe.summary[language as keyof typeof aboutMe.summary]}</p>`;
  }
}

function addWorkExperience(workExperience: WorkExperience[], language: string) {
  const sectionWorkExperience = document.getElementById('professional-activities');

  if (sectionWorkExperience) {
    let workExperienceHTML = '<h2>Work Experience</h2>';

    workExperience.forEach((work) => {
      //let description = work.description.replace(/[:;]/g, match => `${match}<br>`);

      workExperienceHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${work.period[language as keyof typeof work.period]}</div>
          <div class='job-title'>${work.position[language as keyof typeof work.position]}</div>
          <div class='company-name'>${work.company}, ${work.location}</div>
          <p class='job-description'>${work.description[language as keyof typeof work.description]}</p>
        </div>
      `;
    });

    sectionWorkExperience.innerHTML = workExperienceHTML;
  }
}

function addEducation(education: Education[], language: string) {
  const sectionEducation = document.getElementById('education');

  if (sectionEducation) {
    let educationHTML = '<h2>Education</h2>';

    education.forEach((elem) => {
      educationHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${elem.period[language as keyof typeof elem.period]}</div>
          <div class='course-title'>${elem.degree[language as keyof typeof elem.degree]}</div>
          <div class='educational-institution'>${elem.institution}</div>
          <p class='course-description'>${elem.description[language as keyof typeof elem.description]}</p>
        </div>
      `;
    })

    sectionEducation.innerHTML = educationHTML;
  }
}

function addProjects(projects: Project[], language: string) {
  const sectionProjects = document.getElementById('projects');

  if (sectionProjects) {
    let projectsHTML = '<h2>Projects</h2>';

    projects.forEach((elem) => {
      projectsHTML += `
        <div class='resume-entry'>
          <a href=${elem.url} target='_blank'>
            <img src='img/${elem.img}' alt='Project Image'>
          </a>
          <div class='project-title'>${elem.title[language as keyof typeof elem.title]}</div>
          <p class='project-description'>${elem.description[language as keyof typeof elem.description]}</p>
        </div>
      `;
    })

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
      const selectedLanguage =  (button as HTMLElement).innerText.toUpperCase() === 'EN' ? 'en' :
                                (button as HTMLElement).innerText.toUpperCase() === 'FR' ? 'fr' :
                                'pt';
      loadAndProcessJSON(selectedLanguage);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const userLanguage  = navigator.language || 'fr';
  setupLanguageButtons();
  loadAndProcessJSON(userLanguage);
});