<template>
  <div class="custom-input" @click.stop="liftTips">
    <el-input
      :value="value"
      ref="input"
      @input="input"
      @blur="fallTips"
      @clear="clear"
      clearable
    >
      <slot name="suffixIcon" slot="suffix"></slot>
    </el-input>

    <span
      class="tips"
      :class="{
        'lift-tips': on,
        'stay-tips': stay,
      }"
      >{{ placeholder }}</span
    >
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: String,
    placeholder: String,
    suffixIcon: String,
  },
  data() {
    return {
      on: false,
      stay: false,
      timer: null,
    };
  },
  watch: {
    value: {
      handler(val, oldVal) {
        //首次监听，dom还没有完成渲染，用于初始化值
        if (!this.$refs.input) {
          if (val) {
            this.on = true;
            this.stay = true;
          }
          return false;
        }
        //重置操作，监听value，空值并且当前input并非focus，执行重置操作
        if (
          val == "" &&
          document.activeElement != this.$refs.input.$el.firstElementChild
        ) {
          this.fallTips();
        }
      },
      immediate: true,
    },
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    },
    liftTips() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.on = true;
      this.stay = false;
      this.$refs.input.focus();
    },
    fallTips() {
      if (this.value.trim() === "") {
        this.stay = false;
        this.timer = setTimeout(() => {
          this.on = false;
        }, 100);
      } else {
        this.stay = true;
      }
    },
    clear(){
      this.$emit("clear");
    }
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  position: relative;
  height: 32px;

  .tips {
    position: absolute;
    left: 8px;
    top: 50%;
    margin-top: -9px;
    transition: all 0.3s;
    font-size: 14px;
    line-height: 1;
    padding: 2px;
    box-sizing: content-box;
    color: #ccc;
    background-color: #fff;
  }
  .lift-tips {
    top: 0;
    left: 5px;
    color: #1890ff;
    font-size: 12px;
    margin-top: -7px;
  }
  .stay-tips {
    color: #ccc;
  }
}
</style>
