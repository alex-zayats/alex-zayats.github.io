'use strict';

import constants from './constants.js';
import ElementBuilder from './ElementBuilder.js';
import * as listeners from './listeners.js';

export default function loadChannels() {
	constants.loadRequest.loadData(`https://newsapi.org/${constants.apiVersion}/sources?apiKey=${constants.apiKey}`)
		.then((response) => {
			if (response.status == 'ok') {
				response.sources.forEach((source = {}) => {
					let sourceOption = new ElementBuilder('option')
						.setValue(source.id)
						.setContent(`${source.name} (${source.language})`)
						.getResult();
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