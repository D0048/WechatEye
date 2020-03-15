// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let updateRepoButton = document.getElementById('repo_src_save');
let updateRepoField = document.getElementById('repo_src');

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    repo_src: updateRepoField.value
  }, function() {
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    repo_src: "https://raw.githubusercontent.com/D0048/WechatEye/master/database/uiuc_blocklist.json"
  }, function(items) {
    updateRepoField.value = items.repo_src;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
updateRepoButton.addEventListener('click', save_options);
