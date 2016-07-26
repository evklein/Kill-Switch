var activateButton = document.getElementById("activate");
var modifyWhitelistButton = document.getElementById("modify_whitelist");

function fetchUrlData()
{
	var list = null;
	chrome.storage.local.get('urls', function(data) {
		list = data;
	});
	return list;
}

function removeUnproductiveTabs() {
	chrome.tabs.query({}, function(allTabs) {
		chrome.storage.local.get('urls', function(data) {
			var list = data.urls;
			for (i = 0; i < allTabs.length; i++) {
				for (j = 0; j < list.length; j++) {
					if (allTabs[i].url.indexOf(list[j]) != -1) { // Detects if inside.
						chrome.tabs.remove(allTabs[i].id);
					}
				}
			}
		});
	});
}

function openBlacklistPage() {
	chrome.tabs.create({'url': "blacklist_page.html"});
}

activateButton.onclick = removeUnproductiveTabs;
modifyWhitelistButton.onclick = openBlacklistPage;
