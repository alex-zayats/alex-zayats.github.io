'use strict';

// import '../style/style.css';
// import loadChannels from './channels.js';
// import loadNews from './news.js';
// loadChannels();

require.ensure([], function() {
  require('../style/style.css');
  var loadChannels = require('./channels.js');
  var loadNews = require('./news.js');
  loadChannels.default();
}, 'app-code');