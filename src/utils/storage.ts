// 此组件用于封装所有的localStorage相关的操作
const TOKEN_KEY = 'tokenKey' //由于在当前这个组件中已经把所有的token相关操作都封装到一起了，所以这里的TOKEN_KEY在需要变更时就只在这里变更一次即可，而且key想弄多复杂都可以，随心所欲，想改就改
const REMEMBER_KEY = "remember"//记住密码
const USERNAME = "username"//用户名
const PASSWORD = "password"//密码
/**
 * 保存token
 * @param {*} token 
 * @returns 
 */
export const setToken = (token:string) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 获取token
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * 移除token
 * @returns 
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * 判断是否有token
 * @returns 
 */
export const hasToken = () => !!getToken()

//保存保存密码登录状态
export const setLocalRememberMe = (tf:boolean) => localStorage.setItem(REMEMBER_KEY, tf?"true":"false")
export const getLocalRememberMe = ():boolean => {
    const rememberStatus = localStorage.getItem(REMEMBER_KEY)
    if(rememberStatus === undefined || rememberStatus === "false")
        return false;
    else if(rememberStatus === "true")
        return true;
    else return false;
}
export const removeLocalRememberMe = () => localStorage.removeItem(REMEMBER_KEY)

//保存用户名
export const setLocalUsername = (username:string) => localStorage.setItem(USERNAME, username)
export const getLocalUsername = () => {
    return localStorage.getItem(USERNAME)
}
export const removeLocalusername = () => localStorage.removeItem(USERNAME)

//保存密码
export const setLocalPassword = (password:string) => localStorage.setItem(PASSWORD, password)
export const getLocalPassword = () => {
    return localStorage.getItem(PASSWORD)
}
export const removeLocalPassword = () => localStorage.removeItem(PASSWORD)
