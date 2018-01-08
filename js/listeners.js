'use strict';

import constants from './constants.js';
import loadNews from './news.js';
import * as app from './app.js'

export {addChannelListener, addLoadMoreListener};

function addChannelListener() {
	app.selectedSource = constants.sourcesSelect.value;
	loadNews(app.selectedSource, app.selectedPage);
	constants.sourcesSelect.addEventListener('change', (event) => {
		app.selectedPage = 1;
		app.selectedSource = event.currentTarget.value;
		constants.articlesWrapper.innerHTML = '';
		loadNews(app.selectedSource, app.selectedPage);
	});
}

function addLoadMoreListener() {
	app.selectedSource = constants.sourcesSelect.value;
	constants.getMoreButton.addEventListener('click', (event) => {
		loadNews(app.selectedSource, ++app.selectedPage);
	});
}
