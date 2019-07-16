<template>
  <div style="padding:50px">
    <!-- 控制部分 -->
    <div class="tab">
      <span
        v-for="(item,index) in ['新闻', '体育','军事'] "
        :key="index"
        @click="handClick(index) "
        :class=" {active:index===current} "
      >{{item}}</span>
    </div>

    <!-- 新闻内容部分 -->
    <div v-if="current===0">
      <ul>
        <li>为什么黄飞鸿来广州都带伞？</li>
        <li>为什么黄飞鸿来广州都带伞？</li>
        <li>为什么黄飞鸿来广州都带伞？</li>
      </ul>
    </div>
    <!-- 体育部分 -->
    <div v-if="current===1">
      <ul>
        <li>猛龙总冠军</li>
        <li>猛龙总冠军</li>
        <li>猛龙总冠军</li>
      </ul>
    </div>
    <!-- 军事部分 -->
    <div v-if="current===2">
      <ul>
        <li>伊朗同学可能击败什么无人机</li>
        <li>伊朗同学可能击败什么无人机</li>
        <li>伊朗同学可能击败什么无人机</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },

  methods: {
    handClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.tab span {
  cursor: pointer;
}
.tab .active {
  color: blue;
}
</style>
