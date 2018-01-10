'use strict';

import constants from './constants.js';
import ElementBuilder from './ElementBuilder.js';
import initObservers from './listeners.js';
import * as app from './app.js'

export default function loadChannels() {
	constants.loadRequest.loadData(`https://newsapi.org/${constants.apiVersion}/sources?apiKey=${constants.apiKey}`)
		.then((response) => {
			if (response.status == 'ok') {
				response.sources.forEach((source = {}) => {
					app.channels.set(source.id, `${source.name} (${source.language})`);
					app.news[source.id] = [];
				});
				for (let [sourceId, sourceName] of app.channels) {
					let sourceOption = new ElementBuilder('option')
						.setValue(sourceId)
						.setContent(sourceName)
						.getResult();
					constants.sourcesSelect.add(sourceOption);
				}
			}
		})
		.then(() => {
			initObservers();
		})
		.catch(function(error) {
			console.error('There has been a problem with your fetch operation: ' + error.message);
		});
}