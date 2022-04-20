<template>
  <el-button type="primary" @click="onSubmit()">确认修改</el-button>
  <div>
    <el-tree ref="treeRef" :data="list" show-checkbox check-strictly node-key="roleId" :default-checked-keys="authorityIds" :props="{
        children:'roleList',
        label:'name'
    }" />

  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
  import { InitData } from '../types/authority'
  import { useRoute } from 'vue-router'
  import { getAuthorityList } from "../http/api"
  export default defineComponent({
    setup() {
      const route = useRoute()
      const query: any = route.query
      const data = reactive(new InitData(query.id, query.authorityIds))
      console.log(data, "data")
      onMounted(() => {
        getAuthorityList().then(res => {
          data.list = res.data
        })
      })
      const onSubmit = () => {
        // const data = data.treeRef.getCheckedNodes()
        let ref = data.treeRef
        console.log(ref?.getCheckedKeys())
        alert("提交")
      }
      return {
        ...toRefs(data),
        onSubmit
      }
    }
  })
</script>

<style scoped>

</style>