# WechatEye
A browser extension for filtering unwanted users from wechat groups.

## Usage
1. Download and install the Chrome extension at the [release page](https://github.com/D0048/WechatEye/releases);
1. Login at [Wechat](https://wx.qq.com/)
1. **Click to select the Wechat to perform checks in;**
1. Click on the extension icon, and click `fetch users`;
1. After all users are fetched, click on `Check fetched users against database`;
1. If users in blacklist is found, they will be labeled in red.

## Contribution: UIUC Blacklist
1. When a "代写" in the wild is found missing in the current community blacklist, create an issue following the generic addition template [here](https://github.com/D0048/WechatEye/issues/new?assignees=&labels=&template=add--insert-wechat-id-nickname-.md&title=).
1. After creating the issue, create a pull-request by editing [this file](https://github.com/D0048/WechatEye/blob/repo/database/uiuc_blocklist.json), while sourcing the issue in the pull-request description.
1. It is recommended to ensure modified json file is in correct format by copying it [here](https://jsonlint.com/)

### Json Blacklist format:
```json
{
    "wechat_id": "example_id", // 微信号，unique, most reliable detection metric
    "used_alias": ["example_alias1", "example_alias2"], // 昵称， easily changeable, and one wechat_id may hold many alias
    "used_avatars": ["data:image/png;base64,AAAA_plz_copy_from_extension_output"], // 头像， should be used in conjunction with alias to reduce false positives
    "evidence": ["issue url here", "PR url here", "etc."], // issue/pr url for reasons to add this user
    "certainty_rating": 1 // certainty rating, in range of [0,1], where higher is more certain
}
```

## Contribution: Extension
### TODO
- Match Wechat ID and avatars together with alias
- Hash users and only keep hashes inside blacklist repo to protect privacy of users
- Allow custom query of particular user
- Overhaul UI interface
