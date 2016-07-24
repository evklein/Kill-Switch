var activateButton = document.getElementById("activate");

function removeUnproductiveTabs() {
	var list = ["imgur.com", "youtube.com", "facebook.com", "reddit.com"];
	chrome.tabs.query({}, function (allTabs) {
		for (i = 0; i < allTabs.length; i++) {
			for (j = 0; j < list.length; j++) {
				if (allTabs[i].url.indexOf(list[j]) != -1) {
					chrome.tabs.remove(allTabs[i].id, function(){});
				}
			}
		}
	});
}

activateButton.onclick = removeUnproductiveTabs;
