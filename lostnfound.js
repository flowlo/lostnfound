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
	item('Braune Geldbörse (incl. eCard und Führerschein) leider ohne Bargeld', ['In welchem Jahr wurde der Führerschein ausgestellt?', 'Wie lautet die Sozialversicherungsnummer auf der E-Card?'], ['123456', '123456'], 'Bitte schreib\' mir eine E-Mail an finder@example.com! Bin erst wieder ab 6. Jänner in Wien!', '2015-12-17'),
	item('Olivgrüne Jacke', ['Von welcher Marke ist die Jacke?'], ['DKNY'], 'Bin unter \'Die Finderin\' auf Facebook, einfach anschreiben!', '2015-12-18', 'http://lorempixel.com/100/100/abstract/'),

]

function item(description, questions, answers, contact, date, picture) {
	return {
		description: description,
		questions: questions,
		answers: answers,
		contact: contact,
		date: date,
		picture: picture
	};
}

function renderItems() {
	var parent = document.getElementById('items');
	for (var i = 0; i < items.length; i++) {
		parent.appendChild(itemNode(items[i]));
	}
}

function itemNode(item) {
	var div = document.createElement('div');
	div.className = 'item';
	div.dataset.item = JSON.stringify(item);

	div.appendChild(paragraph(item.description));
	div.appendChild(paragraph(item.date));

	if (item.picture) {
		var img = document.createElement('img');
		img.src = item.picture;
		div.appendChild(img);
	}

	return div;
}

function paragraph(textContent) {
	var node = document.createElement('p');
	node.textContent = textContent;
	return node;
}
