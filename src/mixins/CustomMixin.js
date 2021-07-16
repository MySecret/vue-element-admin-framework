/*
 * @Author: your name
 * @Date: 2021-05-11 15:56:54
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\mixins\CustomMixin.js
 */
import { getUserId } from "@/utils/auth";
export const mixins = {
    data() {
        return {
            showImport: false, //导入弹框控制
            queryExpend: false, //条件搜索展开开关
            collect: false, //收藏
            checkedList: [], //选择的数据
            checkAll: false, //控制是否全选
            isIndeterminate: false, //部分选中状态
            tableLoading: true,
            pagenation: { //分页
                total: 0,
                currentPage: 1,
                pageSize: 20,
            },
        }
    },
    created() {
        //将收藏提取出来
        let query = localStorage.getItem(this.$route.name + "_search_" + getUserId());
        if (query) {
            this.querySearch = JSON.parse(query);
            this.collect = true;
        }
        //获取table列
        let cols = localStorage.getItem(this.$route.fullPath + "_filter_" + getUserId());
        if (cols) {
            this.tableColumns = JSON.parse(cols)
        }
    },
    mounted() {
        if (this.queryList) {
            this.tableLoading = true;
            this.queryList().finally(() => {
                this.tableLoading = false;
            })
        }
    },
    watch: {
        //表格页数减一
        "pagenation.total": function (val) {
            if (
                val <= (this.pagenation.currentPage - 1) * this.pagenation.pageSize &&
                val !== 0
            ) {
                this.pagenation.currentPage -= 1;
                this.tableLoading = true;
                this.queryList().finally(() => {
                    this.tableLoading = false;
                })
            }
        },
    },
    methods: {
        //收藏
        toggleCollect() {
            this.collect = !this.collect;
            if (this.collect) {
                localStorage.setItem(this.$route.name + "_search_" + getUserId(), JSON.stringify(this.querySearch))
            } else {
                localStorage.removeItem(this.$route.name + "_search_" + getUserId());
            }
        },
        //展开条件搜索框
        toggleQuery() {
            this.queryExpend = !this.queryExpend;
            //再次计算表格
            this.$refs.table.calcTableHeight();
        },
        //切换页码事件
        changeCurrent(page) {
            this.pagenation.currentPage = page;
            this.tableLoading = true;
            this.queryList().finally(() => {
                this.tableLoading = false;
            })
        },
        //切换每页条数事件
        handleSizeChange(pagesize) {
            this.pagenation.pageSize = pagesize;
            this.tableLoading = true;
            this.queryList().finally(() => {
                this.tableLoading = false;
            })
        },
        //调整列接受事件
        receiveCols(value) {
            this.tableColumns = value;
        },
        //关闭导入框事件
        closeImport() {
            this.showImport = false;
            this.tableLoading = true;
            this.queryList().finally(() => {
                this.tableLoading = false;
            })
        },
        //table 单选控制
        selectionChange(val) {
            this.checkedList = val;
            let checkedCount = val.length;
            this.checkAll = checkedCount === this.tableData.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.tableData.length;
        },
        //table 全选控制
        handleCheckAllChange(val) {
            if (val) {
                this.$refs.table.toggleAllSelection();
                this.checkedList = this.tableData;
            } else {
                this.$refs.table.clearSelection();
                this.checkedList = [];
            }
            this.isIndeterminate = false;
        },
        //查询方法
        searchQueryList() {
            this.tableLoading = true;
            this.queryList().finally(() => {
                this.tableLoading = false;
            })
        }
    }
}