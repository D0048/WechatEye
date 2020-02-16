// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     chrome.tabs.executeScript(tabs[0].id, {
        file: 'detector.js'
    });
  });
};

chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
   console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
   console.log(request);
   
   var div = document.createElement('div');
   div.style.top = 0;
   div.style.right = 0;
   div.textContent = "Result for user: ";
   div.textContent += request.name;
   document.body.appendChild(div);

    if (request.dummy == "lol"){
        sendResponse({farewell: "ok"});
    }
});
