<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
         <!-- changeFlight会默认传递参数 -->
        <flightsFilters :data= "cacheFlightsData"  @changeFlights="changeFlights"/>
        <!-- 航班头部布局 -->
        <flightListHead  />

        <!-- 航班信息 -->
        <flightsltem v-for="(item,index) in dataList" :key="index" :data="item" />
        <div class="block">
          <span class="demonstration"></span>
          <!-- size-change：切换条数时触发 -->
          <!-- current-change：页面切换的时候触发 -->
          <!-- current-page：当前页面数 -->
          <!-- page-size：当前页面条数 -->
          <!-- total页面总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[3,5,10,15,20]"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
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
import flightListHead from "@/components/air/flightListHead";
import flightsltem from "@/components/air/flightsltem";
import flightsFilters from "@/components/air/flightsFilters";

export default {
  data() {
    return {
      flightData: {
        flights: [],
        info: {},
        options: {}
      },
      // 用于缓存大数据，一旦赋值之后，就不能修改
      cacheFlightsData:{
        flights:[],
        info:{},
        options:{}
      },

      //   dataList:[],//重新渲染页面的数组
      pageIndex: 1, //当前页面数
      PageSize: 2, //当前页面条数
      total: 8
    };
  },
  components: {
    flightsltem,
    flightListHead,
    flightsFilters
  },
  computed: {
    dataList() {
      return this.flightData.flights.slice(
        (this.pageIndex - 1) * this.PageSize,
        this.pageIndex * this.PageSize
      );
      // console.log(this.dataList);
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      //   console.log(res)
      console.log(res.data);
      // 请求回来的数据都有用，大的数据是一个对象，那么我们也定义一个对象
      // 来接收这个值
      this.flightData = res.data;
      //   第一页的数据显示
      //  this.setDataList()
      this.cacheFlightsData={...res.data};
    });
  },
  methods: {
    //   切换条数的时候触发
    handleSizeChange(value) {
      this.PageSize = value;
      //  this.setDataList(value)
    },

    changeFlights(arr){
      this.flightData.flights=arr
    },
    // 页面切换的时候触发
    handleCurrentChange(value) {
      this.pageIndex = value;

      //  this.setDataList(value)
    },
    // 封装好的显示数据列表
    setDataList(value) {
      // 设置datalist的值
    }
  }
};
</script>

<style scoped lang="less">
.block {
  margin: 0, auto;
}
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>