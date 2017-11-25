'use strict';

const articleWrapper = document.getElementById("news"),
	sourcesSelect = document.getElementById("sources"),
	apiKey = 'e3d6b3ad8b4e480c84ab39972bb544a5',
	apiVersion = 'v2';

function loadChannels() {
	fetch(`https://newsapi.org/${apiVersion}/sources?apiKey=${apiKey}`)
	  .then((response) =>  response.json())
	  .then((response) => {
	  	if (response.status == 'ok') {
			response.sources.forEach((source => {
				let sourceOption = document.createElement("option");
				({id: sourceOption.value} = source);
				sourceOption.text += `${source.name} (${source.language})`;
				sourcesSelect.add(sourceOption);
			}));
	  	}
	  })
	  .then(() => {
	  	addSourceListener()
	  })
	  .catch(alert);
}

function addSourceListener() {
	loadNews(sourcesSelect.value);
	sourcesSelect.addEventListener('change', (event) => {
		let selectedSource = event.currentTarget.value;
		loadNews(selectedSource);
	});
}

function createArticleMarkup(article) {
	let {
		author: author,
		title: title,
		publishedAt: date = '',
		urlToImage: imgSrc = '',
		description: content,
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

function loadNews(channel) {
	fetch(`https://newsapi.org/${apiVersion}/everything?sources=${channel}&apiKey=${apiKey}`)
	  .then((response) =>  response.json())
	  .then((response) => {
	  	if (response.status == 'ok') {
	  		articleWrapper.innerHTML = '';
			response.articles.forEach((article) => {
				let articleContent = createArticleMarkup(article);
				articleWrapper.innerHTML += articleContent;
			});
	  	}
	  })
	  .catch(alert);
}

loadChannels();