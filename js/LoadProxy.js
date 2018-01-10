'use strict';

class LoadData {
	constructor() {}

	loadData(url) {
		return fetch(url)
			.then((response) => response.json());
	}
}

export default class LoadProxy extends LoadData {
	constructor() {
		super();
		this.isLoading = false;
	}

	loadData(url) {
		if (!this.isLoading) {
			this.isLoading = true;
			return super.loadData(url)
				.then((response) => {
					this.isLoading = false;
					return response;
				});
		} else {
			return Promise.resolve({});
		}
	}
}