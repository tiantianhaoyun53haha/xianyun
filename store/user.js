// 这里面有3个模块

// state:存数据
export const  state=()=>{
    return {
        userInfo:{
            // 将登陆成功之后用户的数据存储起来
            token:"",
            user:{
                nickname:"123",
            }
        }
    }
}

// mutations：同步设置修改state的数据
export const mutation={
    // 设置用户的数据
    setUserInfo(state,data){
        console.log(567)
        state.userInfo=data
        console.log(state.userInfo)


    }
}

// action：异步请求state数据
