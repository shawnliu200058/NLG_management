import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

class LocalCache {
  setCache(key: string, value: any) {
    // window.localStorage.setItem(key, JSON.stringify(value))
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // const value = window.localStorage.getItem(key)
    const value = window.sessionStorage.getItem(key)

    if (value) return JSON.parse(value)
  }

  deleteCache(key: string) {
    // window.localStorage.removeItem(key)
    window.sessionStorage.removeItem(key)
  }

  clearCache() {
    // window.localStorage.clear()
    window.sessionStorage.clear()
  }

  getToken() {
    return Cookies.get(TokenKey)
  }

  setToken(token: string) {
    return Cookies.set(TokenKey, token, { expires: 1 })
  }

  removeToken() {
    return Cookies.remove(TokenKey)
  }
}

export default new LocalCache()
