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
