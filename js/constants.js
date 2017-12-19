'use strict';

import LoadProxy from './LoadProxy.js';

const constants = {
	articlesWrapper: document.getElementById("news"),
	sourcesSelect: document.getElementById("sources"),
	getMoreButton: document.getElementById("get-more"),
	apiKey: 'e3d6b3ad8b4e480c84ab39972bb544a5',
	apiVersion: 'v2',
	loadRequest: new LoadProxy()
}

export default constants;