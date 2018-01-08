'use strict';

import constants from './constants.js';
import loadNews from './news.js';
import Observer from './Observer.js';
import * as app from './app.js'

export default function initObservers() {
	let newsObserver = new Observer();

	newsObserver.subscribe((selectedSource) => {
		if (app.selectedSource != selectedSource) {
			app.selectedPage = 1;
			app.selectedSource = selectedSource;
			constants.articlesWrapper.innerHTML = '';
			loadNews(app.selectedSource, app.selectedPage);
		} else {
			loadNews(app.selectedSource, ++app.selectedPage);
		}
	});

	constants.sourcesSelect.addEventListener('change', (event) => {
		runObserve(newsObserver);
	});

	constants.getMoreButton.addEventListener('click', (event) => {
		runObserve(newsObserver);
	});

	runObserve(newsObserver); //inital load
}

function runObserve(newsObserver) {
	let selectedSource = constants.sourcesSelect.value;
	newsObserver.notify(selectedSource);
}