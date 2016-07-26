var addSiteField = document.getElementById('web_entry');
var updateButton = document.getElementById('update_blacklist');

function generateRows() {
  var list = new Array();
  var table = document.getElementById('site_list');
  chrome.storage.local.get('urls', function(data) {
    list = data.urls;
    for (i = 0; i < list.length; i++) {
      table.innerHTML += '<tr><th>' + list[i] + '</th><th><input type="checkbox" name="' + list[i] + '"></th></tr>';
    }
  });
}

function updateBlacklist() {
  // Check for user adding additional website (and add if not empty/duplicate)...
  var value = addSiteField.value.trim();
  chrome.storage.local.get('urls', function(data) {
    var list = data.urls;
    if (value.length != 0) {
      if (!checkForDuplicates(value, list)) {
        list.push(value);
      }
    }

    // Check for user removing site already on blacklist.
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        var name = checkboxes[i].name;
        var index = list.indexOf(name);
        list.splice(index, 1);
      }
    }

    // Save results and refresh page.
    chrome.storage.local.set({'urls':list});
    window.location.reload();
  });
}

function checkForDuplicates(testValue, urls) {
  for (i = 0; i < urls.length; i++) {
    if (testValue === urls[i]) {
      return true;
    }
  }
  return false;
}

window.onload = generateRows();
updateButton.onclick = updateBlacklist;
