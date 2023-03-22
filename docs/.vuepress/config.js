
const VueSide = [
    {
        title: 'Vue',
        path: '/Vue/'
    },
    {
        title: '双向绑定',
        path: 'bind'
    }
];




const homeSide = [
    {
        title: '首页',
        path: '/'
    },
    {
        title: 'Vue',
        path: '/Vue/'
    }
];

module.exports = {
    title: 'sherrysw',  //标题
    keywords: '前端开发',
    description: '前端开发 sherrysw个人博客',
    repo: 'https://github.com/Sherrysw1/sherrysw1.github.io.git',  //仓库地址
    base: '/',  // 配合部署项目
    head: [
        ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/30037961?v=4' }]
    ],
    lastUpdated: 'Last Updated',
    themeConfig: {  //主题配置
        logo: 'https://avatars.githubusercontent.com/u/30037961?v=4',
        nav: [  //导航栏
            { text: '首页', link: '/' },
            { text: 'JS', link: '/js_docs/' },
            { text: 'CSS', link: '/css_docs/' },
            { text: 'Vue', link: '/Vue/' },
            { text: 'React', link: '/react_docs/' },
            {
                text: '2020',
                ariLabel: '2020',
                items: [  //多级导航栏
                    { text: 'May', link: '/2020/5/' },
                    { text: 'June', link: '/2020/6/' }
                ]
            },
            { text: 'github', link: 'https://github.com/Sherrysw1/sherrysw1.github.io.git' }
        ],
        sidebar: {
            '/Vue/': VueSide,
            '/': homeSide,
        }
    }
}
