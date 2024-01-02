interface PersonalInformation {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  desiredPosition: string;
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
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certifications: Certification[];
}

// Function to load and process the JSON
async function loadAndProcessJSON() {
  try {
    const response = await fetch('./profile.json');
    const profileData: Profile = await response.json();

    // Calling functions to add data to HTML
    addPersonalInformation(profileData.personalInformation);
    addSkills(profileData.skills);
    addWorkExperience(profileData.workExperience);
    addEducation(profileData.education);

  } catch (error) {
    console.error('Error loading the JSON file:', error);
  }
}

// The rest of the code remains the same, but now the functions receive the profileData as a parameter
function addPersonalInformation(personalInformation: PersonalInformation) {
  const divInformacoesPessoais = document.getElementById("personalInformation");
  if (divInformacoesPessoais) {
    divInformacoesPessoais.innerHTML = `
      <h1 class="name">${personalInformation.name}</h1>
      <h2 class="my-job-title">${personalInformation.desiredPosition}</h2>
    `;
  }
}

function addSkills(skills: string[]) {
  const divExperienciaProfissional = document.getElementById("personalInformation");
  if (divExperienciaProfissional) {
    let skillConcat = "";
    skills.forEach((skill) => {
      skillConcat += " " + skill + " |";
    })
    if(skillConcat.length > 0) {
      skillConcat = skillConcat.slice(0, -1);
    }
    let skillHTML = document.createElement("p");
    skillHTML.textContent = skillConcat;
    divExperienciaProfissional.appendChild(skillHTML);
  }
}

function addWorkExperience(workExperience: WorkExperience[]) {
  const sectionWorkExperience = document.getElementById("workExperience");
  let workExperienceHTML = "<h2>Work Experience</h2>";
  workExperience.forEach((work) => {
    let description = work.description.replace(/[:;]/g, match => `${match}<br>`);
    workExperienceHTML += `
    <div class="resume-entry">
          <div class="date-range">${work.period}</div>
          <div class="job-title">${work.position}</div>
          <div class="company-name">${work.company}, ${work.location}</div>
          <p class="job-description">${description}</p>
        </div>
    `;
  })
  if(sectionWorkExperience) {
    sectionWorkExperience.innerHTML = workExperienceHTML;
  }
}

function addEducation(education: Education[]) {
  const sectionEducation = document.getElementById("education");
  let educationHTML = "<h2>Education</h2>";
  education.forEach((elem) => {
    educationHTML += `
    <div class="resume-entry">
          <div class="date-range">${elem.period}</div>
          <div class="course-title">${elem.degree}</div>
          <div class="educational-institution">${elem.institution}</div>
          <p class="course-description">${elem.description}</p>
        </div>
    `;
  })
  if(sectionEducation) {
    sectionEducation.innerHTML = educationHTML;
  }
}

// Calling the function to load and process the JSON
loadAndProcessJSON();