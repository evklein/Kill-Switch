// var a=0;
// function count() {
//     a++;
//     document.getElementById('do-count').innerHTML = a;
// }
// document.getElementById('do-count').onclick = count;

var activeTag = document.getElementById("active_tag");
var activateButton = document.getElementById("activate");

function toggle()
{
	if (activeTag.innerHTML == "Kill-Switch is NOT active") {
		activeTag.innerHTML = "Kill-Switch is active";
		activeTag.style.color = "green";
	}
	else {
		activeTag.innerHTML = "Kill-Switch is NOT active";
		activeTag.style.color = "red";
	}

	getAllTabURLs();
}

activateButton.onclick = toggle;

function getAllTabURLs() {
	var urls = new Array();

	chrome.tabs.query({}, function (allTabs) {
		for (i = 0; i < allTabs.length; i++)
			urls.push(allTabs[i].url);
		}
	});

	return urls;
}

// ERROR SOMEWHERE HERE!!!!!!!!!
// function killUnproductiveTabs() {
// 	var allUrls = getAllTabURLs();

// 	for (int i = 0; i < allUrls.length - 1; i++) {
// 		for (int i = 0; i < )
// 	}
// }
