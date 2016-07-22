// var a=0;
// function count() {
//     a++;
//     document.getElementById('do-count').innerHTML = a;
// }
// document.getElementById('do-count').onclick = count;
var activeTag = document.getElementById("active_tag");
var activateButton = document.getElementById("activate");

function toggle() {
	if (activeTag.innerHTML == "Kill-Switch is NOT active") {
		activeTag.innerHTML = "Kill-Switch is active";
		activateButton.innerHTML = "Deactivate";
		activeTag.style.color = "green";
		removeUnproductiveTabs();
	}
	else {
		activeTag.innerHTML = "Kill-Switch is NOT active";
		activateButton.innerHTML = "Activate";
		activeTag.style.color = "red";
	}
}

activateButton.onclick = toggle;

function removeUnproductiveTabs() {
	var list = ["imgur.com", "youtube.com", "facebook.com", "reddit.com"];
	chrome.tabs.query({}, function (allTabs) {
		for (i = 0; i < allTabs.length; i++) {
			for (j = 0; j < list.length; j++) {
				if (allTabs[i].url.indexOf(list[j]) != -1) {
					chrome.tabs.remove(allTabs[i].id, function() {});
				}
			}
		}
	});
}

// function killUnproductiveTabs() {
// 	var allUrls = getAllTabURLs();
// 	alert(allUrls[1]);
// 	var reader = new FileReader();
//
// 	var blacklist = reader.readAsText("blacklist.json");
// 	for (int i = 0; i < allUrls.length; i++) {
// 		for (int j = 0; j < blacklist.blacklist.length, j++) {
// 			if (allUrls[i].contains(blacklist.blacklist[j]))
// 			{
// 				chrome.tabs.remove(i, function());
// 			}
// 		}
// 	}
// }
