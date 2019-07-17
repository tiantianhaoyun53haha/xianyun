// 这里面有3个模块

// state:存数据
export const state = () => {
    return {
        userInfo: {
            // 将登陆成功之后用户的数据存储起来
            token: "",
            user: {
                nickname: "",
            }
        }
    }
}

// mutations：同步设置修改state的数据
export const mutations = {
    // 设置用户的数据
    setUserInfo(state, data) {
  
        state.userInfo = data
  
    },
    clearUserInfo(state) {
        // 注意：这里的意思是给state.userInfo赋值，而不是定义
        // 赋值是=，定义是：
        state.userInfo = {
            token: '',
            user: {}
        }
    }
}

// action：异步请求state数据
export const actions = {
    // commit就是store身上的方法
    login({ commit }, data) {
        this.$axios({
            url: "/accounts/login",
            method: "POST",
            data,
        })
            .then(res => {
              
           commit("setUserInfo", res.data)
            })


    }
}