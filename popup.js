// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var logger_elem = document.getElementById('log');
var fetched_set = new Set()
var repo_data = null;

let fetchBtn = document.getElementById('fetch_user_');
fetchBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: 'detector.js'
        });
    });
};
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var fetched_obj = {};
        
        fetched_obj["name"] = request.name;
        var div = document.createElement('div');
        div.textContent = "Nickname: ";
        div.textContent += request.name;
        div.textContent += "\nAvatar:" + request.avatar;
        logger_elem.prepend(div);
        
        fetched_obj["avatar"] = request.avatar.toString();
        const cvs = document.createElement('canvas');
        var image = new Image();
        image.src = request.avatar;
        var ctx = cvs.getContext("2d");
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
        };
        logger_elem.prepend(image);
        
        fetched_set.add(JSON.stringify(fetched_obj))
        
        if (request.dummy == "lol"){
            sendResponse({farewell: "ok"});
        }
    });

let updateRepoButton = document.getElementById('update');
updateRepoButton.onclick = function(element) {
    console.log("Updating");
    $.getJSON("https://raw.githubusercontent.com/D0048/WechatEye/master/database/uiuc_blocklist.json",{"callback":"?"},
              function(data, textStatus){
                  var div = document.createElement('div')
                  logger_elem.prepend(div)
                  div.textContent = "Database fetch done: "+textStatus+", "
                  
                  var idx = data.index
                  div.textContent+=idx.length+" entries fetched: \n   { "
                  for (var i = 0, len = idx.length; i < len; i++) {
                      div.textContent += idx[i].wechat_id;
                      div.textContent+=", ";
                  }
                  
                  div.textContent+="}"
                  repo_data = data
              });
};
updateRepoButton.onclick();




let checkBtn = document.getElementById('check');
checkBtn.onclick = function(element) {
    if(repo_data==null){updateRepoButton.onclick();}
    if(fetched_set.size==0){fetchBtn.onclick();}
    
    var div = document.createElement('div');
    logger_elem.prepend(div);
    div.textContent += "Checking: \n";
    
    fetched_set.forEach(async(jsonstr) =>{
        var div = document.createElement('div');
        logger_elem.prepend(div);
        var user = JSON.parse(jsonstr);
        
        var max_sim=-1, max_obj="{Not found}", cutoff=0.8
        var idx = repo_data.index
        for (var i = 0, len = idx.length; i < len; i++) {
            var id2 = user.name
            for (var j = 0, len2 = idx[i].used_alias.length; j < len1; j++) {
                var id1 = idx[i].used_alias[j]
                var sim = stringSimilarity.compareTwoStrings(id1,id2);
                if(sim>max_sim){
                    max_sim = sim
                    max_obj = JSON.stringify(idx[i])
                }
            }
        }
        if(max_sim>cutoff){
            div = document.createElement('div');
            logger_elem.prepend(div);
            div.textContent += user.name + " :";
            div.textContent += "Result(final_certainty = "+max_sim*JSON.parse(max_obj).certainty_rating+ "): ";
            div = document.createElement('div');
            logger_elem.prepend(div);
            div.textContent += "Matching: " + max_obj;
        }
    })
    
    
}

