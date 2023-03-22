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