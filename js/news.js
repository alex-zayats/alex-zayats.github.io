'use strict';

import * as constants from './constants.js';

export default function loadNews(source, page) {
	constants.getMoreButton.disabled = true;
	fetch(`https://newsapi.org/${constants.apiVersion}/everything?sources=${source}&page=${page}&apiKey=${constants.apiKey}`)
		.then((response) =>  response.json())
		.then((response) => {
			if (response.status == 'ok') {
				response.articles.forEach((article) => {
					let articleContent = createArticleMarkup(article);
					constants.articlesWrapper.innerHTML += articleContent;
				});
			}
		})
		.then(() => {
			constants.getMoreButton.disabled = false;
		})
		.catch(function(error) {
			console.error('There has been a problem with your fetch operation: ' + error.message);
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