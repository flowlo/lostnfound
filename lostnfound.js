var good = [ 'Hooray!', 'Great!', 'Splendid!', 'Terrific!', 'Yippie!' ];
var bad  = [ 'Oh snap!', 'That\'s a pity!', 'What a bummer!', 'Sorry to hear that!' ];

function label(items, verb, middle) {
	return pick(items) + ' Tell us where you ' + verb + ' the item, so we can help ' + middle + '. Enter an event name or place to get started!';
}

function pick(items) {
	return items[Math.floor(Math.random() * items.length)];
}

function chooser(hash) {
	hash = hash || window.location.hash

	var choose = document.getElementById('choose');
	var search = document.getElementById('search');
	var l      = document.getElementById('label');

	if (hash === '#found' || hash === '#lost') {
		if (hash === '#found') {
			l.textContent = label(good, 'found', 'to find the owner');
		}
		if (hash === '#lost') {
			l.textContent = label(bad, 'lost', 'you out');
		}
		choose.style.display = 'none';
		search.style.display = 'block';
		return;
	}

	choose.style.display = 'block';
	search.style.display = 'none';
}

var items = [
	item('K.I.Z. @ Gasometer', 'Braune Geldbörse (incl. eCard und Führerschein) leider ohne Bargeld', ['In welchem Jahr wurde der Führerschein ausgestellt?', 'Wie lautet die Sozialversicherungsnummer auf der E-Card?'], ['123456', '123456'], 'Bitte schreib\' mir eine E-Mail an finder@example.com! Bin erst wieder ab 6. Jänner in Wien!', '2015-12-17'),
	item('K.I.Z. @ Gasometer', 'Olivgrüne Jacke', ['Von welcher Marke ist die Jacke?'], ['DKNY'], 'Bin unter \'Die Finderin\' auf Facebook, einfach anschreiben!', '2015-12-18', 'http://lorempixel.com/100/100/abstract/'),
];

function item(event, description, questions, answers, contact, date, picture) {
	return {
		event: event,
		description: description,
		questions: questions,
		answers: answers,
		contact: contact,
		date: date,
		picture: picture
	};
}

function renderItems() {
	var event = window.location.hash.substring(1);
	$('#items_header')[0].textContent += event;

	var parent = document.getElementById('items');
	for (var i = 0; i < items.length; i++) {
		if (items[i].event == event) {
			parent.appendChild(itemNode(items[i]));
		}
	}
}

function itemNode(item) {
	var div = document.createElement('div');
	div.className = 'item';
	div.dataset.item = JSON.stringify(item);
	div.onclick = function() {
		itemClick(this);
	};

	div.appendChild(paragraph(item.description));
	div.appendChild(paragraph(item.date));

	if (item.picture) {
		var img = document.createElement('img');
		img.src = item.picture;
		div.appendChild(img);
	}

	return div;
}

function itemClick(element) {
	var alias = $("#validation_popup");
	alias.modal();

	var item = JSON.parse(element.dataset.item);

	alias[0].dataset.item = element.dataset.item;

	if (item.questions.length !== item.answers.length) {
		console.warn('Number of questions does not match number of answers!');
		return;
	}

	if (alias[0].dataset.item.length > 0) {
		setQuestion(0, item);
	}
}

function setQuestion(index, item){
	$('#answer')[0].value = "";
	$("#validation_popup")[0].dataset.index = index;
	$("#question_holder")[0].textContent = item.questions[index];
}

function keydown(event, page){
	if (event.keyCode == 13){
		if (page == 'index'){
			submitMain($("#omni")[0].value);
		} else if (page == 'items') {
			submitAnswer();
		} else if (page == 'subscribe'){
			submitSub();
		}
	}
}

function submitSub() {
	if (document.getElementById('#email').checkValidity()) {
		$('#err')[0].textContent = "";
		$('#subscribe_popup').modal('hide');
		$('#subscription_success').modal('show');
		return;
	}

	$('#err')[0].textContent = "Email not valid.";
}

function submitMain(omniValue) {
	if (window.location.hash == '#lost') {
		window.location.href = 'items.html#' + omniValue;
	} else if (window.location.hash == '#found') {
		window.location.href = 'found.html#' + omniValue;
	}
}

function submitAnswer() {
	var alias = $('#validation_popup');
	var dataset = alias[0].dataset;
	var answer = $('#answer')[0].value;
	var index = dataset.index;
	var item = JSON.parse(dataset.item);

	if (answer == item.answers[index]){
		index++;
		if (index < item.questions.length){
			alias[0].dataset.index++;
			setQuestion(index, item);
		} else {
			alias.modal('hide');
			$('#contact')[0].textContent = item.contact;
			$('#you_won_popup').modal('show');
		}
	} else {
		alias.modal('hide');
		$('#you_lost_popup').modal('show');
	}
}


function paragraph(textContent) {
	var node = document.createElement('p');
	node.textContent = textContent;
	return node;
}
