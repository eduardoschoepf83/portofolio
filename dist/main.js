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
// Function to load and process the JSON
function loadAndProcessJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('../profile.json');
            const profileData = yield response.json();
            // Calling functions to add data to HTML
            addPersonalInformation(profileData.personalInformation);
            addSkills(profileData.skills);
            addWorkExperience(profileData.workExperience);
            addEducation(profileData.education);
        }
        catch (error) {
            console.error('Error loading the JSON file:', error);
        }
    });
}
// The rest of the code remains the same, but now the functions receive the profileData as a parameter
function addPersonalInformation(personalInformation) {
    const divInformacoesPessoais = document.getElementById("personalInformation");
    if (divInformacoesPessoais) {
        divInformacoesPessoais.innerHTML = `
      <h1 class="name">${personalInformation.name}</h1>
      <h2 class="my-job-title">${personalInformation.desiredPosition}</h2>
    `;
    }
}
function addSkills(skills) {
    const divExperienciaProfissional = document.getElementById("personalInformation");
    if (divExperienciaProfissional) {
        let skillConcat = "";
        skills.forEach((skill) => {
            skillConcat += " " + skill + " |";
        });
        if (skillConcat.length > 0) {
            skillConcat = skillConcat.slice(0, -1);
        }
        let skillHTML = document.createElement("p");
        skillHTML.textContent = skillConcat;
        divExperienciaProfissional.appendChild(skillHTML);
    }
}
function addWorkExperience(workExperience) {
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
    });
    if (sectionWorkExperience) {
        sectionWorkExperience.innerHTML = workExperienceHTML;
    }
}
function addEducation(education) {
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
    });
    if (sectionEducation) {
        sectionEducation.innerHTML = educationHTML;
    }
}
// Calling the function to load and process the JSON
loadAndProcessJSON();
