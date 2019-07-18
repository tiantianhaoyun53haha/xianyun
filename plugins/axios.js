import { Message } from "element-ui";

// 把方法暴露出来
export default ({$axios})=>{
    // 拦截axios的错误请求
    $axios.onError(err=>{
        const {message,statusCode}=err.response.data;
        if(statusCode===400){
            // 错误提示
            Message.error(message)
        }
    })
}