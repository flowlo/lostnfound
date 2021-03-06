
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({trigger: 'focus hover'});
});

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

    validationQuestions++;
    var validationContainer = document.getElementById('validationQuestions');

    var row = document.createElement('tr');
    validationContainer.appendChild(row);

    var question = document.createElement('input');
    question.id="q"+validationQuestions;
    question.type="text";
    question.className += 'form-control';
    question.addEventListener('change',validateQuestions, false);
    question.placeholder="Ask something only the owner knows. E.g. ID-number in case of a lost ID.";

    var td = document.createElement('td');
    td.appendChild(question);

    row.appendChild(td);

    var answer = document.createElement('input');
    answer.id="a"+validationQuestions;
    answer.className += 'form-control';
    answer.placeholder="Answer to the validation Question.";
    answer.addEventListener('change',validateQuestions, false);


    document.getElementById('add').classList.add('hide');

    td = document.createElement('td');
    td.appendChild(answer);

    row.appendChild(td);
}


function validateQuestions(){
  var addButton = document.getElementById('add');
  if(document.getElementById('q'+validationQuestions).value===''|| document.getElementById('a'+validationQuestions).value===''){
      addButton.classList.add('hide');
  }else{
    addButton.classList.remove('hide');
  }
}

function loadFound(){
    var event = window.location.hash.substring(1);
    $('#header')[0].textContent += event;
}
