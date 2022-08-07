/**
 * Storage二次封装
 * @author JackBean
 */
import config from '../config'
export default {
    setItem(key: string, val: string | object) {
        let storage = this.getStroage();
        storage[key] = val;
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    getItem(key: string) {
        return this.getStroage()[key]
    },
    getStroage() {
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
    },
    clearItem(key: string) {
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    clearAll() {
        window.localStorage.clear()
    }
}