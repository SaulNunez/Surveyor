async function loadSurveyFromServer(surveyName){
    let surveyInfo = await fetch(`./survey/${surveyName}.json`);

    if(surveyInfo.ok){
        let json = await surveyInfo.json();

        return json;
    }

    throw new Error('Failed to load survey');
}

function getSurveyToLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has('surveyname')){
        throw new Error('Survey to open was not defined');
    }

    return urlParams.get('surveyname');
}

function setTitle(survey){
    if('title' in survey){
        const titleElement = document.getElementById('title');
        titleElement.innerText = survey.title;
    }
}

function setDescription(survey){
    if('description' in survey){
        const titleElement = document.getElementById('description');
        titleElement.innerText = survey.description;
    }
}

function createOpenQuestionOptions(id){
    const input = document.createElement('input');
    input.type = 'text';
    input.name = id;
    input.placeholder = 'Write something';

    return [input];
}

function createMultipleOptions(options, id, multipleSelection = false){
    return options.map((element, optionIndex) => {
        const input = document.createElement('input');
        input.type = multipleSelection? 'checkbox' : 'radio';
        input.name = index.toString();
        input.id = `${id}_${optionIndex}`;

        const label = document.createElement('label');
        label.for = `${id}_${optionIndex}`;
        label.innerText = element;

        return [input, label];
    }).flat();
}

function prepareQuestion(question, index){
    const converter = new showdown.Converter();
    const questionHtml = converter.makeHtml(question.content);

    const questionTemplate = document.getElementById('questionTemplate');
    const element = questionTemplate.cloneNode(true);

    const elementQuestion = element.getElementsByTagName('div')[0];
    elementQuestion.innerHTML = questionHtml;

    let options;
    if(question.type === 'normal'){
        options = createMultipleOptions(question.options, index.toString(), false);
    } else if(question.type === 'open_question'){
        options = createNormalOptions(index.toString());
    } else if(question.type === 'multiple_options'){
        options = createMultipleOptions(question.options, index.toString(), true);
    }

    for (const option of options) {
        element.appendChild(option);
    }

    return element;
}

function loadSurvey() {
    loadSurveyFromServer(getSurveyToLoad()).then(survey => {
        setTitle(survey);
        setDescription(survey);
        const questions = survey.questions
            .map((question, index) => prepareQuestion(question, index));
        
        const surveyForm = document.getElementById('survey');
        for (const question of questions) {
            surveyForm.appendChild(question);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSurvey);