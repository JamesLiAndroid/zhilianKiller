/*
* @Author: Marte
* @Date:   2017-07-12 10:51:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-12 11:14:10
*/

'use strict';

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  var tabCurrentUrl = parseURL(tab.url);
  console.log('Turning ' + tabCurrentUrl.params + ' red!');

  // 获取页面中显示公司信息的table组件
  var table = document.getElementsByClassName('newlist_list_content');

  console.log("tables : " + tables.length)
  // chrome.tabs.executeScript({
  //   code: 'document.body.style.backgroundColor="red"'
  // });
});

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
