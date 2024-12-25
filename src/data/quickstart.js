export default [
    {
        type: 1,
        args: 'joinBand?tag=8CCV2GV&token=bcn8rw8j',
        title: '加入本网站官方战队'
    },
    { type: 1, args: 'pandora', title: '国服活动' },
    { type: 2, args: 'supercell_id', title: 'Supercell  ID' },
    {
        args: 'webview?page=https://bilibili.com/&popup_title=B站EmberHeart',
        title: 'B站'
    },
    {
        args: 'webview?page=https://ys.mihoyo.com/cloud&popup_title=B站EmberHeart技术支持|B站nuomi_Again原创',
        title: '云原神'
    },
    {
        args: `createAndJoinRoom?roomname=${Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}&friendly=1&side=1'`,
        title: '创建一个自己在对面的友谊战'
    },
    { args: 'OpenWeb?url=https://brawlstars.top/Auto/', title: '无限循环' },
    { args: 'replay', title: '“回放不可用”' },
    { args: 'webview', title: 'webview盒子' },
    { args: 'shop', title: '商店' },
    { args: 'brawlpass', title: '金券' },
    { args: 'catalog', title: '乱斗图鉴' },
    { args: 'clubs', title: '战队聊天' },
    { args: 'social', title: '战队管理' },
    { args: 'supportcreator?code=EmberHeart', title: '支持创作者' },
    { args: 'inboxlink', title: '新闻' },
    { args: 'openselfhelp', title: '玩家与支持' }
];