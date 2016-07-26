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

window.onload = generateRows();

function addSiteToBlacklist() {
  var value = addSiteField.value.trim();
  chrome.storage.local.get('urls', function(data) {
    var list = data.urls;
    if (value != 0) {
      if (!checkForDuplicates(value, list)) {
        list.push(value);
      }
    }

    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        var name = checkboxes[i].name;
        var index = list.indexOf(name);
        console.log(name + " | " + index);
        list.splice(index, 1);
      }
    }
    chrome.storage.local.set({'urls':list});
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

function removeSiteFromBlacklist() {
  chrome.storage.local.get('urls', function(data) {
    var list = data.urls;
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        for (j = 0; j < list.length; j++) {
          if (list[j] === checkboxes[i].name) {
            list.splice(j, 1);
          }
        }
      }
    }
    chrome.storage.local.set({'urls':list});
  });
}

function updateBlacklist() {
  addSiteToBlacklist();
  window.location.reload();
}

updateButton.onclick = updateBlacklist;
