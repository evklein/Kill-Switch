var activateButton = document.getElementById("activate");
var modifyWhitelistButton = document.getElementById("modify_whitelist");

function fetchUrlData()
{
	var list = new Array();
	chrome.storage.local.get('urls', function(data) {list = data});
	console.log()
	return list;
}

function removeUnproductiveTabs() {
	var list = new Array();
	chrome.tabs.query({}, function (allTabs) {
		chrome.storage.local.get('urls', function(data) {
			list = data.urls;
			for (i = 0; i < allTabs.length; i++) {
				for (j = 0; j < list.length; j++) {
					if (allTabs[i].url.indexOf(list[j]) != -1) {
						chrome.tabs.remove(allTabs[i].id, function() {});
					}
				}
			}
		});
	});
}

activateButton.onclick = removeUnproductiveTabs;

function openBlacklistPage() {
	chrome.tabs.create({'url': "whitelist_page.html"});
}

modifyWhitelistButton.onclick = openBlacklistPage;
