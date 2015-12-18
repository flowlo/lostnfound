
var validationQuestions = 0;

function verboseswitch(element){
  var parent = element.parentElement.parentElement;

  console.log(parent);

  if(parent.classList.contains('normal-mode')){
      parent.classList.remove('normal-mode');
      parent.classList.add('verbose-mode');
  }
}

function addQuestion(){
    if(document.getElementById('q'+validationQuestions)===''|| document.getElementById('a'+validationQuestions)===''){
      return;
    }

    var validationContainer = document.getElementById('validationQuestions');

    var row = document.createElement('div');
    row.className="row validation";
    validationContainer.appendChild(row);

    var question = document.createElement('input');
    question.id="q"+validationQuestions;
    question.type="text";
    question.placeholder="Ask something only the owner knows. E.g. ID-number in case of a lost ID.";

    row.appendChild(question);

    var answer = document.createElement('input');
    answer.id="a"+validationQuestions;
    answer.placeholder="Answer to the validation Question.";
    row.appendChild(answer);
}


function validateQuestions(){
  var addButton = document.getElementById('add');

  if(document.getElementById('q'+validationQuestions).value===''|| document.getElementById('a'+validationQuestions).value===''){
      addButton.classList.add('hide');
  }else{
    addButton.classList.remove('hide');
  }
}