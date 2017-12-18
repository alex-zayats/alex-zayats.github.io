'use strict';

import * as constants from './constants.js';
import * as listeners from './listeners.js';

export default function loadChannels() {
	fetch(`https://newsapi.org/${constants.apiVersion}/sources?apiKey=${constants.apiKey}`)
		.then((response) => response.json())
		.then((response) => {
			if (response.status == 'ok') {
				response.sources.forEach((source = {}) => {
					let sourceOption = document.createElement("option");
					sourceOption.value = source.id;
					sourceOption.text = `${source.name} (${source.language})`;
					constants.sourcesSelect.add(sourceOption);
				});
			}
		})
		.then(() => {
			listeners.addChannelListener();
			listeners.addLoadMoreListener();
		})
		.catch(function(error) {
			console.error('There has been a problem with your fetch operation: ' + error.message);
		});
}