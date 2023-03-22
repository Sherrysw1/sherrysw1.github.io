# 双向绑定
vue有双向绑定，react没有。vue通过v-model来双向绑定。
实现原理：Object.defineProperty或Proxy+发布订阅模式
实现效果：data <=> view
## 过程
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/5/23/04fdcd64ed41f762a7a495f73c0a2f86~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)
- 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
- 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
- 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
```
# Observer
function directive(data, key, val) {
    // 给所有属性绑定observer
    observer(val);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // 判断是否需要添加订阅者
            if (Dep.target) {
                dep.addWatcher(Dep.target);
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) return;
            val = newVal;
            console.log('dep=', dep);
            dep.notify();
        }
    });
}
function Dep() {
    this.watchers = [];
}
Dep.prototype = {
    addWatcher: function(watcher) {
        this.watchers.push(watcher);
    },
    notify: function() {
        this.watchers.forEach(watcher => watcher.update());
    }
}
Dep.target = null;
function observer(data) {
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach(key => directive(data, key, data[key]));
}
```
```
# 模板
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model="name">
        {{name}}
    </div>
    <script src="./observer.js"></script>
    <script src="./watcher.js"></script>
    <script src="./compiler.js"></script>
    <script type="text/javascript">
        const myVue = new SelfVue({
            el: '#app',
            data: {
                name: '123'
            }
        });

        function SelfVue(options) {
            this.data = options.data;
            observer(this.data);
            let id = options.el;
            const el = document.querySelector(id);
            let dom = nodeToFragment(el, this);
            // 处理完所有dom节点后,重新将内容添加回去
            el.appendChild(dom);
        }

        function nodeToFragment(node, vm) {
            let fragment = document.createDocumentFragment();
            let child;
            while (child = node.firstChild) {
                compiler(child, vm);
                fragment.appendChild(child);
            }
            return fragment
        }
    </script>
</body>
</html>
```
```
# watcher实现
// vm: 模板数据 exp: 要双向绑定的模板变量 cb: 获取更新后需要执行的回调函数
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.cb = cb;
    this.exp = exp;
    this.value = this.get(); // 执行get方法，将自己添加到订阅器
}
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        if (value === this.value) return;
        this.value = value;
        this.cb.call(this.vm, value);
    },
    get: function() {
        Dep.target = this;
        // 执行observer里面的get方法
        var value = this.vm.data[this.exp];
        Dep.target = null; // 释放
        return value;
    }
}
```
```
# 编译
function compiler(node, vm) {
    let reg = /\{\{(.*)\}\}/; // 来匹配 {{ xxx }} 中的xxx
    // 如果是元素节点
    if (node.nodeType === 1) {
        let attr = node.attributes;
        // 解析元素节点的所有属性
        for (let i = 0; i < attr.length; i++) {
            if (attr[i].nodeName === 'v-model') {
                let name = attr[i].nodeValue; // 看看是与哪一个数据相关
                node.addEventListener('input', function (e) {
                    vm.data[name] = e.target.value; // 将实例的text 修改为最新值
                });
                node.value = vm.data.name; // 将data的值赋给该node
                node.removeAttribute('v-model');
            }
        }
    }
    // 如果是文本节点
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            let name = RegExp.$1; // 获取到匹配的字符串
            name = name.trim();
            node.nodeValue = vm.data.name;  // 将data的值赋给该node
            new Watcher(vm, name, function(value) {
                node.nodeValue = value;
            }); // 不直接通过赋值的操作，而是通过绑定一个订阅者
        }
    }
}
```

## 例子
[线上运行代码](./bindExample/index.html)