function getAllTabURLs() {
	var urls = [];
	index = 0;

	chrome.tabs.query({}, function (allTabs) 
	{
		for (i = 0; i < allTabs.length; i++)
		{
			urls[i] = allTabs[i].url;
		}
	});

	return urls;
}

function killUnproductiveTabs() {
	var allUrls = getAllTabURLs();

	for (int i = 0; i < allUrls.length - 1; i++) {

	}
}