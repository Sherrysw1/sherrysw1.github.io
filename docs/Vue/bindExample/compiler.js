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