interface PersonalInformation {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  desiredPosition: string;
}

interface MediaLinks {
  name: string;
  address: string;
}

interface SocialMedias {
  name: string;
  link: string;
}

interface AboutMe {
  summary: string;
}

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  type: string;
  location: string;
  period: string;
  description: string;
}

interface Language {
  language: string;
  level: string;
}

interface Certification {
  certificate: string;
  institution: string;
  completionYear: string;
}

interface Profile {
  personalInformation: PersonalInformation;
  skills: string[];
  mediaLinks: MediaLinks[];
  socialMedias: SocialMedias[];
  aboutMe: AboutMe;
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
}

async function loadAndProcessJSON() {
  try {
    const response = await fetch("./profile.json");
    const profileData: Profile = await response.json();

    addPersonalInformation(profileData.personalInformation);
    addSkills(profileData.skills);
    addMediasForDownload(profileData.mediaLinks);
    addSocialMediaLinks(profileData.socialMedias);
    addAboutMe(profileData.aboutMe);
    addWorkExperience(profileData.workExperience);
    addEducation(profileData.education);

  } catch (error) {
    console.error('Error loading the JSON file:', error);
  }
}

function addPersonalInformation(personalInformation: PersonalInformation) {
  const divInformacoesPessoais = document.getElementById('personalInformation');

  if (divInformacoesPessoais) {
    divInformacoesPessoais.innerHTML = `
      <h1 class='name'>${personalInformation.name}</h1>
      <h2 class='my-job-title'>${personalInformation.desiredPosition}</h2>
    `;
  }
}

function addSkills(skills: string[]) {
  const divExperienciaProfissional = document.getElementById("personalInformation");

  if (divExperienciaProfissional) {
    let skillConcat = '';

    skills.forEach((skill) => {
      skillConcat += ' ' + skill + ' |';
    })

    if (skillConcat.length > 0) {
      skillConcat = skillConcat.slice(0, -1);
    }

    let skillHTML = document.createElement('p');
    skillHTML.textContent = skillConcat;

    divExperienciaProfissional.appendChild(skillHTML);
  }
}

function addMediasForDownload(mediaLinks: MediaLinks[] ) {
  const divInformacoesPessoais = document.getElementById('personalInformation');

  if (divInformacoesPessoais) {
    let mediaLinksHTML = document.createElement("p");
    mediaLinksHTML.textContent = "CV download : ";

    mediaLinks.forEach( ml => {
      let buttonElement = document.createElement('button');
      buttonElement.textContent = ml.name;

      let anchorElement = document.createElement('a');
      anchorElement.href = ml.address;
      anchorElement.appendChild(buttonElement);
      mediaLinksHTML.appendChild(anchorElement);
    });

    divInformacoesPessoais.appendChild(mediaLinksHTML);
  }

}

function addSocialMediaLinks(socialMedias: SocialMedias[]) {
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

function addAboutMe(aboutMe: AboutMe) {
  const aboutMeSection = document.getElementById('about-me');

  if (aboutMeSection) {
    aboutMeSection.innerHTML = `<p>${aboutMe.summary}</p>`;
  }
}

function addWorkExperience(workExperience: WorkExperience[]) {
  const sectionWorkExperience = document.getElementById('workExperience');

  if (sectionWorkExperience) {
    let workExperienceHTML = '<h2>Work Experience</h2>';

    workExperience.forEach((work) => {
      let description = work.description.replace(/[:;]/g, match => `${match}<br>`);

      workExperienceHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${work.period}</div>
          <div class='job-title'>${work.position}</div>
          <div class='company-name'>${work.company}, ${work.location}</div>
          <p class='job-description'>${description}</p>
        </div>
      `;
    });

    sectionWorkExperience.innerHTML = workExperienceHTML;
  }
}

function addEducation(education: Education[]) {
  const sectionEducation = document.getElementById('education');

  if (sectionEducation) {
    let educationHTML = '<h2>Education</h2>';
    
    education.forEach((elem) => {
      educationHTML += `
        <div class='resume-entry'>
          <div class='date-range'>${elem.period}</div>
          <div class='course-title'>${elem.degree}</div>
          <div class='educational-institution'>${elem.institution}</div>
          <p class='course-description'>${elem.description}</p>
        </div>
      `;
    })
  
    sectionEducation.innerHTML = educationHTML;
  }
}

loadAndProcessJSON();