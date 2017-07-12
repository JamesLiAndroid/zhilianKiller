/*
* @Author: Marte
* @Date:   2017-07-12 09:06:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-12 17:25:49
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
    // TODO：控制页面内容显示
    var urlContent = parseURL(tab.url);
    var params = urlContent.query;
    console.log("当前数据信息：" + urlContent.params);
    infoHTML += `<li> params: ${params}</li>`;

    document.getElementById("tab-popup").innerHTML = infoHTML;
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function renderAllTable() {
    console.log("执行js代码！");
    chrome.tabs.executeScript(null, {
        file: 'js/table.js'
    });
    // 注意：js文件必须使用完整路径！
    console.log("js代码执行完成！");
    // window.close();

}

// function renderAllTableFront() {
//     // 获取当前页面所有table标签
//     var tables = document.querySelectorAll("table");
//     // 设置table背景颜色
//     for (var i = tables.length - 1; i >= 0; i--) {
//         tables[i].addEventListener('click', renderAllTable)
//     };
// }

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTab(function(tab) {
        renderStatus('Current tabs\'s url is ' + tab.url);
        renderTabInfo(tab)

        // 渲染所有table标签
        var button = document.getElementById("renderTables");
        button.onclick = renderAllTable;
    });
})

/**
 * 解析url中的参数
 * @param  {[type]} url [description]
 * @return {[type]}     [返回一个包含url所有信息的字典]
 */
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
             var ret = {},
                 seg = a.search.replace(/^\?/,'').split('&'),
                 len = seg.length, i = 0, s;
             for (;i<len;i++) {
                 if (!seg[i]) { continue; }
                 s = seg[i].split('=');
                 ret[s[0]] = s[1];
             }
             return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
     };
}


