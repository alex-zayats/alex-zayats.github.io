'use strict';

import constants from './constants.js';
import * as app from './app.js'

export default function loadNews(source, page) {
	if (!app.news[source][page]) {
		constants.loadRequest.loadData(`https://newsapi.org/${constants.apiVersion}/everything?sources=${source}&page=${page}&apiKey=${constants.apiKey}`)
			.then((response) => {
				if (response.status == 'ok') {
					app.news[source][page] = response.articles;
					renderArticles(app.news[source][page]);
				}
			})
			.catch(function(error) {
				console.error('There has been a problem with your fetch operation: ' + error.message);
			});
	} else {
		renderArticles(app.news[source][page]);
	}
}

function renderArticles(articles) {
	articles.forEach((article) => {
		let articleContent = createArticleMarkup(article);
		constants.articlesWrapper.innerHTML += articleContent;	
	});
}

function createArticleMarkup(article = {}) {
	let {
		author: author = '',
		title: title = '',
		publishedAt: date = '',
		urlToImage: imgSrc = '',
		description: content = '',
		url: contentLink = '/#'
	} = article;

 	return `<article class="article">
				<img class="image" src="${imgSrc}" alt="${title}">
				<div class="content-wrapper">
					<h3 class="title">${title}</h3>
					<p class="content">${content || ''}</p>
					<a class="read-more" href="${contentLink}">Read more</a>
					<p class="author">Author: ${author || 'Unknown'}</p>
					<time class="date">Published: ${new Date(date).toDateString()}</time>
				</div>
			</article>`
}