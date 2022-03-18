export const asyncLocalStorage = {
    setItem(key: string, value: string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value)
        })
    },
    getItem(key: string) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key)
        })
    },
}
