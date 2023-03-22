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