'use strict';

export default class ElementBuilder {
	constructor(elementName) {
		this.element = document.createElement(elementName);
	}

	setContent(content) {
		this.element.innerHTML = content;
		return this;
	}

	setClass(className) {
		this.element.className = className;
		return this;
	}

	setId(id) {
		this.element.id = id;
		return this;
	}

	setValue(value) {
		this.element.value = value;
		return this;
	}

	setHref(href) {
		this.element.href = href;
		return this;
	}

	setSrc(src) {
		this.element.src = src;
		return this;
	}

	setAlt(alt) {
		this.element.alt = alt;
		return this;
	}

	getResult() {
		return this.element;
	}
}