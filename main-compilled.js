'use strict';

var articlesWrapper = document.getElementById("news"),
    sourcesSelect = document.getElementById("sources"),
    getMoreButton = document.getElementById("get-more"),
    apiKey = 'e3d6b3ad8b4e480c84ab39972bb544a5',
    apiVersion = 'v2';

var selectedSource = null,
    selectedPage = 1,
    isLoadingMore = false;

function loadChannels() {
	fetch("https://newsapi.org/" + apiVersion + "/sources?apiKey=" + apiKey).then(function (response) {
		return response.json();
	}).then(function (response) {
		if (response.status == 'ok') {
			response.sources.forEach(function () {
				var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var sourceOption = document.createElement("option");
				sourceOption.id = sourceOption.value;
				sourceOption.text = source.name + " (" + source.language + ")";
				sourcesSelect.add(sourceOption);
			});
		}
	}).then(function () {
		addSourceListener();
		addLoadMoreListener();
	}).catch(function (error) {
		console.error('There has been a problem with your fetch operation: ' + error.message);
	});
}

function addSourceListener() {
	selectedSource = sourcesSelect.value;
	loadNews(selectedSource, selectedPage);
	sourcesSelect.addEventListener('change', function (event) {
		selectedPage = 1;
		selectedSource = event.currentTarget.value;
		articlesWrapper.innerHTML = '';
		loadNews(selectedSource, selectedPage);
	});
}

function addLoadMoreListener() {
	getMoreButton.addEventListener('click', function (event) {
		if (!isLoadingMore) {
			loadNews(selectedSource, ++selectedPage);
		}
	});
}

// it's working also fine
function addScrollListener() {
	window.addEventListener('scroll', function (event) {
		if (window.pageYOffset + window.innerHeight >= document.body.getBoundingClientRect().height && !isLoadingMore) {
			loadNews(selectedSource, ++selectedPage);
		}
	});
}

function createArticleMarkup() {
	var article = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _article$author = article.author,
	    author = _article$author === undefined ? '' : _article$author,
	    _article$title = article.title,
	    title = _article$title === undefined ? '' : _article$title,
	    _article$publishedAt = article.publishedAt,
	    date = _article$publishedAt === undefined ? '' : _article$publishedAt,
	    _article$urlToImage = article.urlToImage,
	    imgSrc = _article$urlToImage === undefined ? '' : _article$urlToImage,
	    _article$description = article.description,
	    content = _article$description === undefined ? '' : _article$description,
	    _article$url = article.url,
	    contentLink = _article$url === undefined ? '/#' : _article$url;


	return "<article class=\"article\">\n\t\t\t\t<img class=\"image\" src=\"" + imgSrc + "\" alt=\"" + title + "\">\n\t\t\t\t<div class=\"content-wrapper\">\n\t\t\t\t\t<h3 class=\"title\">" + title + "</h3>\n\t\t\t\t\t<p class=\"content\">" + (content || '') + "</p>\n\t\t\t\t\t<a class=\"read-more\" href=\"" + contentLink + "\">Read more</a>\n\t\t\t\t\t<p class=\"author\">Author: " + (author || 'Unknown') + "</p>\n\t\t\t\t\t<time class=\"date\">Published: " + new Date(date).toDateString() + "</time>\n\t\t\t\t</div>\n\t\t\t</article>";
}

function loadNews(source, page) {
	isLoadingMore = true;
	fetch("https://newsapi.org/" + apiVersion + "/everything?sources=" + source + "&page=" + page + "&apiKey=" + apiKey).then(function (response) {
		return response.json();
	}).then(function (response) {
		if (response.status == 'ok') {
			response.articles.forEach(function (article) {
				var articleContent = createArticleMarkup(article);
				articlesWrapper.innerHTML += articleContent;
			});
		}
	}).then(function () {
		isLoadingMore = false;
	}).catch(function (error) {
		console.error('There has been a problem with your fetch operation: ' + error.message);
	});
}

loadChannels();
