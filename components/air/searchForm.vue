<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        // departCity: "",//出发城市
        // departCode: "",//出发城市代码
        // destCity: "",//目标城市
        // destCode: "",//目标城市代码
        // departDate: ""//日期2019-05-01
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 下拉列表不显示，当没有输入值的时候
      if (!value) {
        cb([]);
        return;
      }
      // 发起请求，将后台返回的数据展示在下拉列表里面
      this.$axios({
        url: "/airs/city",
        // get方式传递的参数会自动拼接在url后面
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // 给数组中的对象添加value值，
        // 因为返回来的数据身上没有value值，我们需要把数据处理之后，然后把处理后的数据作为value的值放在data里面的每个对象身上
        // 就是把返回的值中的城市信息去掉市字，放在一个新的数组里面
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.form.departCity = newData[0].value;
        this.form.departCode = newData[0].sort;
        cb(newData);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 下拉列表不显示，当没有输入值的时候
      if (!value) {
        cb([]);
        return;
      }
      // 发起请求，将后台返回的数据展示在下拉列表里面
      this.$axios({
        url: "/airs/city",
        // get方式传递的参数会自动拼接在url后面
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // 给数组中的对象添加value值，
        // 因为返回来的数据身上没有value值，我们需要把数据处理之后，然后把处理后的数据作为value的值放在data里面的每个对象身上
        // 就是把返回的值中的城市信息去掉市字，放在一个新的数组里面
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.form.destCity = newData[0].value;
        this.form.destCode = newData[0].sort;
        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCity = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      // console.log(  this.form.departDate)
    },

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {
      // 设置需要验证的数据
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发日期"
        }
      };
      // 函数的语句之间是用；隔开的
      // 设置开关
      let valid = true;
      // 循环判断上面的语句是否为空
      Object.keys(rules).forEach(v => {
        // 判断只要一次为空，不会再执行循环，return的作用：可以终止函数的执行
        if (valid) return;
        // 判断字段是否为空
        if(rules[v].value){
          valid=false;
          this.$message.warning(rules[v].message)
        }
      });

      // 跳转
      if(valid){
        this.$router.push({
          path:"/airs/flights",
          query:this.form
        })
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>