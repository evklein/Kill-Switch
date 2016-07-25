var activateButton = document.getElementById("activate");
var modifyWhitelistButton = document.getElementById("modify_whitelist");

function fetchUrlData()
{
	var list = new Array();
	$.getJSON('blacklist.json', function(data) {
		for (i = 0; i < data.length; i++) {
			list.push(data[i]);
		}
	});

	return list;
}

function removeUnproductiveTabs() {
	var list = fetchUrlData();
	console.log(list);
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

function openBlacklistPage() {
	chrome.tabs.create({'url': "whitelist_page.html"});
}

modifyWhitelistButton.onclick = openBlacklistPage;
