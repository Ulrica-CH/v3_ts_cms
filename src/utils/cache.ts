/** 缓存工具封装 */
enum CacheType {
  LOCAL,
  SESSION
}
class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.LOCAL ? localStorage : sessionStorage
  }
  setCache(key: string, val: any) {
    this.storage.setItem(key, JSON.stringify(val))
  }
  getCache(key: string) {
    const val = this.storage.getItem(key)
    return val && JSON.parse(val)
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.LOCAL)
const sessionCache = new Cache(CacheType.SESSION)

export { localCache, sessionCache }
