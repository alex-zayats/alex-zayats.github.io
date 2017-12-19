'use strict';

import constants from './constants.js';
import loadNews from './news.js';

export {addChannelListener, addLoadMoreListener};

let selectedPage = 1;

function addChannelListener() {
	let selectedSource = constants.sourcesSelect.value;
	loadNews(selectedSource, selectedPage);
	constants.sourcesSelect.addEventListener('change', (event) => {
		selectedPage = 1;
		selectedSource = event.currentTarget.value;
		constants.articlesWrapper.innerHTML = '';
		loadNews(selectedSource, selectedPage);
	});
}

function addLoadMoreListener() {
	let selectedSource = constants.sourcesSelect.value;
	constants.getMoreButton.addEventListener('click', (event) => {
		loadNews(selectedSource, ++selectedPage);
	});
}
