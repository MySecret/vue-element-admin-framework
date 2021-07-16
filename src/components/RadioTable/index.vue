<template>
    <div class="radio-table">
        radio-table
         <el-table ref="table"></el-table>
        <slot></slot>
    </div>
</template>

<script>
import Element from 'element-ui'
export default {
    name:'RadioTable',
    props:[],
    mounted(){
        console.log("-----------------");
        console.log(this.$props);
        console.log(this.$refs.table);
        console.log(Element);
         console.log("-----------------");
    }
}
</script>

<style scoped>

</style>