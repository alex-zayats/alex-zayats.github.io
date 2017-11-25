'use strict';

const articlesWrapper = document.getElementById("news"),
	sourcesSelect = document.getElementById("sources"),
	getMoreButton = document.getElementById("get-more"),
	apiKey = 'e3d6b3ad8b4e480c84ab39972bb544a5',
	apiVersion = 'v2';

let selectedSource = null,
	selectedPage = 1,
	isLoadingMore = false;

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
	selectedSource = sourcesSelect.value
	loadNews(selectedSource, selectedPage);
	sourcesSelect.addEventListener('change', (event) => {
		selectedPage = 1;
		selectedSource = event.currentTarget.value;
		articlesWrapper.innerHTML = '';
		loadNews(selectedSource, selectedPage);
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

function loadNews(source, page) {
	isLoadingMore = true;
	fetch(`https://newsapi.org/${apiVersion}/everything?sources=${source}&page=${page}&apiKey=${apiKey}`)
	  .then((response) =>  response.json())
	  .then((response) => {
	  	if (response.status == 'ok') {
			response.articles.forEach((article) => {
				let articleContent = createArticleMarkup(article);
				articlesWrapper.innerHTML += articleContent;
			});
	  	}
	  })
	  .then(() => {
  		isLoadingMore = false;
	  })
	  .catch(alert);
}

function addLoadMoreListener() {
	getMoreButton.addEventListener('click', (event) => {
		if (!isLoadingMore) {
			loadNews(selectedSource, ++selectedPage);
		}
	});
}
addLoadMoreListener();

function addScrollListener() {
	window.addEventListener('scroll', ((event) => {
		if (window.pageYOffset + window.innerHeight >= document.body.getBoundingClientRect().height && !isLoadingMore) {
			loadNews(selectedSource, ++selectedPage);
		}
	}));
}
// it's working also fine
// addScrollListener();

loadChannels();