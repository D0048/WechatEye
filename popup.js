// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: 'detector.js'
        });
    });
};

let updateRepoButton = document.getElementById('update');
updateRepoButton.onclick = function(element) {
    $.getJSON("https://raw.githubusercontent.com/D0048/WechatEye/master/database/uiuc_blocklist.json",{"callback":"?"},function(data, textStatus){ console.log(data)});
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
        console.log(request);
        
        var div = document.createElement('div');
        div.textContent = "Result for user: ";
        div.textContent += request.name;
        div.textContent += "\n" + request.avatar;
        document.body.appendChild(div);
        
        const cvs = document.createElement('canvas');
        var image = new Image();
        image.src = request.avatar;
        var ctx = cvs.getContext("2d");
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
        };
        document.body.appendChild(image);
        
        
        if (request.dummy == "lol"){
            sendResponse({farewell: "ok"});
        }
    });
