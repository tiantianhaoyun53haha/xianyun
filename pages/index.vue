<template>
  <div>
    <div class="block">
      <el-carousel  height="700px"
      :interval="3000"
      arrow="always"
      >
        <el-carousel-item
          v-for=" (item,index) in banners "
          :key="index"
         >
          <h3 class="small" :style="`
          background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
          background-size:contain contain;
          `">
          
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      banners:[],
    }
  },
  mounted(){
    console.log(123)
    this.$axios({
      url:"/scenics/banners"
    })
    .then(res=>{
      console.log(res)
      const {data}=res.data;
      this.banners=data;
    })
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-carousel__container{
      height:700px;
  }
  .small{
    height:700px;
  }

</style>

