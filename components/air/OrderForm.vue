<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <!-- 循环生成乘机人结构开始，因为下面的乘机人类型是一条文字标签，循环的应该是真个盒子
         -->
        <div class="member-info-item" v-for=" (item,index) in users " :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
        <!-- 循环结束 -->
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers()">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item">
          <el-checkbox label="航空意外险：￥30/份×1  最高赔付260万" border></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <!-- el-form一个页面可以放多个,每个交互的小表单可以放置一个el-form -->
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [{ username: "", id: "" }],
      insurances: [],
      contactName: "", // 联系人
      contactPhone: "", // 联系人的手机号码
      invoice: false, // 是否需要发票
      captcha: "", // 验证码 （注意下接口文档没有说明）

      seat_xid: "", // 座位id （来自于参数）
      air: "" // 航班id （来自于参数）
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push(
        {
          username:"",
          id:""        }
      )
    },
   

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index,1);
    },

    // 发送手机验证码
    handleSendCaptcha() {},

    // 提交订单
    handleSubmit() {
      console.log(this.users);
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>