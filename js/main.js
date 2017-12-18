'use strict';

require.ensure([], function() {
  require('../style/style.css');
  var loadChannels = require('./channels.js');
  var loadNews = require('./news.js');
  loadChannels.default();
}, 'app-code');