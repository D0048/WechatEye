'use strict';

// content.js - this is what you pass to `executeScript`
console.log("Eye loaded!");
(function() {
	// just place a div at top right
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'Eye loaded!';
	document.body.appendChild(div);
})();

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

var titlebar = document.getElementsByClassName("title_name ng-binding")[0];
eventFire(titlebar, 'click');
var group_name=titlebar.innerHTML;
console.log("Reading from group "+group_name);
var users=document.getElementsByClassName("member ng-scope");
console.log("Filtering "+(users.length-1) + " users.")

for (var i = 1; i < users.length; i++) {
    var user=users[i]
    var name=user.title;
    var avatar=user.getElementsByClassName("avatar")[0];
    const cvs = document.createElement('canvas');
    cvs.width = avatar.width;
    cvs.height = avatar.height;
    cvs.getContext('2d').drawImage(avatar,0,0);
    console.log("Name: "+ name);
    chrome.runtime.sendMessage({dummy:"lol",group: group_name, user:user, name:name.toString(), avatar: cvs.toDataURL()}, function(response) {
    console.log(response.farewell);
    });
    
}

var titlebar = document.getElementsByClassName("title_wrap")[0];
eventFire(titlebar, 'click');
