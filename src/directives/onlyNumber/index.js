

import Vue from 'vue'
import store from '@/store'
/**
 * numberControl 权限指令
 *
 <el-input  v-model="inputVal" v-number-control="{max:100,min:0,precision:2}" size="mini"
 placeholder="请输入受益比例">
 <template slot="append">%</template>
 </el-input>
 */
const numberControl = Vue.directive('numberControl', {
  bind(el, binding) {
    var defaultVal = {
      precision:2,   //Number小数点位数  //TODO：不传默认两位，后期从配置读取，最多不超过6位（DB最大精度：decimal(16,6)）
      couldNegative:false, //负数？
      min:null,
      max:null,
    }
    let precision = Object.assign(defaultVal,binding.value).precision
    let couldNegative = Object.assign(defaultVal,binding.value).couldNegative
    let min = Object.assign(defaultVal,binding.value).min
    let max = Object.assign(defaultVal,binding.value).max
    el.handler = (e) => {
      if(!e.target.value)return
      let miusFont = (couldNegative && e.target.value.slice(0,1)== '-')?'-':''
      let valueMiddle = e.target.value
      valueMiddle = valueMiddle.toString().replace(/[^\d\.]/g, '');  //如果输入非数字，则替换为''
      //必须保证第一个为数字而不是.
      valueMiddle = valueMiddle.toString().replace(/^\./g,'');
      //前两位不能是0加数字
      valueMiddle = valueMiddle.toString().replace(/^0\d[0-9]*/g,'');
      //保证只有出现一个.而没有多个.
      valueMiddle = valueMiddle.toString().replace(/\.{2,}/g,'.');
      //保证.只出现一次，而不能出现两次以上
      valueMiddle = valueMiddle.toString().replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      //只能输入两位小数 或者多位
      let str = Array.from({length:precision}).reduce((total,item)=>{
        return total+='\\d'
      },'')
      let part = `/^(\\-)*(\\d+)\\.(${str}).*$/`
      valueMiddle = valueMiddle.toString().replace(eval(part),'$1$2.$3');

      //当最小值不为null验证是否满足最小值
       if(min&&min>valueMiddle){
         valueMiddle=min
       }
      //当最大值不为null验证是否小于等于最大值
      if(max&&max<valueMiddle){
        valueMiddle =max
      }
      e.target.value = miusFont+valueMiddle
    }
    el.addEventListener("input", el.handler)
    el.addEventListener("blur", el.handler)
  },
  unbind(el) {
    el.removeEventListener('input', el.handler);
    el.removeEventListener("blur", el.handler)
  },
})

export default numberControl
