<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border stripe :data="list[selectData.page]" style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="100" />
      <el-table-column prop="title" label="标题" width="180" align="center" show-overflow-tooltip />
      <el-table-column prop="body" label="详情" align="center" show-overflow-tooltip />
    </el-table>
    <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="selectData.count" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue'
  import { InitData, ListInt } from '../types/order'
  import { getList } from "../http/api"
  export default defineComponent({
    setup() {
      const data = reactive(new InitData)
      onMounted(() => {
        getList({ page: data.selectData.page }).then(res => {
          //   console.log(res,"res")
          data.selectData.count = res.data.length
          data.dataList = res.data
          sliceList(res.data)
        })
      })
      const sliceList = (arr: ListInt[]) => {
        data.list = []
        for (let index = 0; index < arr.length; index += 10) {
          let list: any = arr.slice(index, index + 10)
          data.list.push(list)
        }
      }
      const onSubmit = () => {
        console.log(data.selectData)
        let arr: ListInt[] = []
        if (data.selectData.title || data.selectData.body) {
          if (data.selectData.title) {
            arr = data.dataList.filter(v => v.title.indexOf(data.selectData.title) != -1)
          }
          if (data.selectData.body) {
            arr = (data.selectData.title ? arr : data.dataList).filter(v => v.title.indexOf(data.selectData.body) != -1)
          }

        } else {
          arr = data.dataList
        }
        console.log(arr, "arr")
        data.selectData.count = arr.length
        sliceList(arr)

      }
      const currentChange = (page: number) => {
        data.selectData.page = page - 1
      }
      return { ...toRefs(data), currentChange, onSubmit }
    }
  })
</script>

<style scoped>

</style>