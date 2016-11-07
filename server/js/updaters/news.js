var constants = require('../constants.js');
var http = require('../utils/easyhttp.js');

function updateNews(updateCallback, news) {
	response = { articles : [] };	

	news.forEach(function(newsSource) {
		newsSource.articles.forEach(function(article) {
			response.articles.push({
				source      : newsSource.source,
				url         : article.url,
				imgURL      : article.urlToImage,
				title       : article.title,
				description : article.description
			});
		});
	});

	updateCallback('news', response);
}

function update(updateCallback) {
	var callData = constants.NEWS.API_PATHS.map(function(path) {
		return {
			host : constants.NEWS.API_HOST,
			path : path
		};
	});

	http.batchCall(callData, function(news) {
		updateNews(updateCallback, news);
	})
};

module.exports = {
	update : update
};
