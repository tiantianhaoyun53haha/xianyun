<template>
  <div class="flight-item">
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name }}</span>
          {{data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }} {{ data.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }} {{ data.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{ data.base_price / 2 }}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">￥{{ item.org_settle_price }}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                @click="handleToOrder( data.id,   item.seat_xid )"
                type="warning"
                size="mini"
              >选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    handleToOrder( id,seat_xid) {
      this.$router.push({
        path: "/air/order",
        query: {
          id,
          seat_xid
        }
      });
    }
  },
  computed: {
    rankTime() {
      //   准备数据
      const arr = this.data.arr_time; //19:30
      const dep = this.data.dep_time; //17：00

      // 将数据转换成为我们可以操作的类型，就是可以拿值
      const end = arr.split(":");
      const start = dep.split(":");

      //   console.log(start, end);

      // 第二天凌晨
      // 数组之间直接比较大小，比较的是第一个值
      if (end[0] * 1 < start[0] * 1) {
        // console.log(123);
        end[0] += 24;
      }

      // 对我们可以拿到的数据进行操作，先相减，用间隔时间得到我们需要的值
      const dis = end[0] * 60 + +end[1] - (start[0] * 60 + +start[1]);
      //   console.log(dis)
      // console.log(end[0] * 60 + +end[1]);
      // console.log(start[0] * 60 + +start[1]);

      const hours = Math.floor(dis / 60);
      const min = dis % 60;

      // 将我们得到的值拼接成字符串返回
      return `${hours}时${min}分 `;
    }
  },
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: {}
      // seat_infos:[]
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>