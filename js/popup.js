/*
* @Author: Marte
* @Date:   2017-07-12 09:06:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-12 10:12:03
*/

'use strict';

function getCurrentTab(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(queryInfo, function(tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        console.log("current tab" + tab);
        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(tab);
    });
}

function renderTabInfo(tab) {
    var infoHTML = '';
    Object.keys(tab).map((key) => {
        infoHTML += `<li> ${key}: ${tab[key]}</li>`;
        // infoHTML += '<li> ${key}: ${tab[key]} </li>'
    })
    document.getElementById("tab-popup").innerHTML = infoHTML;
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTab(function(tab) {
        renderStatus('Current tabs\'s url is ' + tab.url);
        renderTabInfo(tab)
    })
})


