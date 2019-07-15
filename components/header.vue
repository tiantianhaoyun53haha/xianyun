<template>
    <div class="header">
        <!-- logo -->
        <div>
            <nuxt-link>
                   <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
            </nuxt-link>
        </div>
        <!-- 菜单 -->
        <div>
            <nuxt-link to='/'>首页</nuxt-link>
            <nuxt-link to='/'>旅游攻略</nuxt-link>
            <nuxt-link to='/'>酒店</nuxt-link>
            <nuxt-link to='/'>国内机票</nuxt-link>
        </div>
        <!-- 登陆信息 -->
        <div>
            <div v-if="false">
                <!-- 注意：跳转的后面需要加to，不然容易报错 -->
                <nuxt-link to='/user/login'>登录 / 注册</nuxt-link>
            </div>
        
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
