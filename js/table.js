/*
* @Author: Marte
* @Date:   2017-07-11 16:08:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-13 10:27:05
*/

var tables = document.querySelectorAll('table');
for (var i = tables.length - 1; i >= 0; i--) {
    var company = tables[i].querySelectorAll("td");
    var innerA = company[2].getElementsByTagName("a");
    // 替换当前节点的数据
    innerA[0].style.color= 'red';
    innerA[0].parentNode.replaceChild(replaceNodeValue(innerA[0]), innerA[0])
};

function replaceNodeValue(oldnode) {
    var newNode = document.createElement("s");
    newNode.innerHTML = oldnode.innerHTML;
    return newNode;
}