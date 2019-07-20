<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
               <flightListHead/>
                
                
                <!-- 航班信息 -->
                <flightsltem  
                v-for="(item,index) in flightData.flights"
                :key="index"
                :data="item"
                />
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import flightListHead from "@/components/air/flightListHead"
import flightsltem from "@/components/air/flightsltem"

export default {
    data(){
        return {
            flightData:{
                flights:[],
            }
        }
    },
    components:{
        flightsltem,
        flightListHead
    },
    mounted(){
      this.$axios({
          url:"/airs",
          params:this.$route.query
      })
      .then(res=>{
        //   console.log(res)
          console.log(res.data)
        // 请求回来的数据都有用，大的数据是一个对象，那么我们也定义一个对象
        // 来接收这个值
        this.flightData=res.data;
        

      })  
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>