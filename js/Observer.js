'use strict';

export default class Observer {
	constructor() {
		this.observers = [];
	}


	subscribe(observer) {
		this.observers.push(observer);
	}

	unsubscribe(observer) {
		let observerIndex = this.observers.indexOf(observer);
		this.observers.splice(observerIndex, 1);
	}

	notify(data) {
		this.observers.forEach((observer) => observer(data));
	}
}