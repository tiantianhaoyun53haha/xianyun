<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes "
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList "
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      //   字符串需要用引号
      airSizeList: [
        { type: "大", size: "L" },
        { type: "中", size: "M" },
        { type: "小", size: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      this.$emit("changeFlights", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // 准备过滤时间
      const [from, to] = value.split(",");
      // 用过滤器对原数据进行筛选
      const arr = this.data.flights.filter(v => {
        const [start] = v.dep_time.split(":");
        // 对符合条件的数据进行返回
        return +from <= +start && +start < +to;
      });
      // 把数据发送回父组件
      this.$emit("changeFlights", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      const arr = this.data.flights.filter(v => {
        return v.airline_name === value;
      });
      this.$emit("changeFlights", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const arr = this.data.flights.filter(v => {
        //   value=item.size
        return v.plane_size === value;
      });

      // 得到一个过滤后的数组，传递回去给父组件
      this.$emit("changeFlights", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
        this.airport="";
        this.flightTimes="",
        this.company="",
        this.airSize="",
        this.$emit("changeFlights",this.data.flights)
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>