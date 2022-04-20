<template>
  <div>
    <div class="select-box">
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </div>
    <el-table border stripe :data="list" style="width: 100%">
      <el-table-column prop="roleId" label="ID" align="center" />
      <el-table-column prop="roleName" label="角色名" align="center" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="authorityChange(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isAdd" title="新增角色" width="400px">
    <el-form :model="addData">
      <el-form-item label="角色名" label-width="100">
        <el-input v-model="addData.roleName" autocomplete="off" placeholder="请输入角色名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isAdd = false">取消</el-button>
        <el-button type="primary" @click="submitAdd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { InitData, ListInt } from '../types/role'
  import { getRoleList } from "../http/api"
  export default defineComponent({
    setup() {
      const router = useRouter()
      const data = reactive(new InitData)
      onMounted(() => {
        getRoleList().then(res => {
          console.log(res, "rolelist")
          data.list = res.data
        })
      })
      const addRole = () =>{
        data.isAdd = true
      }
      const submitAdd=()=>{
        data.list.push({
          roleName:data.addData.roleName,
          roleId:data.list.length+1,
          authority:[]
        })
        ElMessage({
        showClose: false,
        message: '新增成功！',
        type: 'success',
        })
        data.isAdd = false
      }
      const authorityChange = (row: ListInt) => {
        router.push({
          path:'/authority',
          query:{
            id:row.roleId,
            authorityIds:row.authority.join(',')
          }
          })
        console.log(row, "row")
      }
      return {
        ...toRefs(data),
        authorityChange,
        addRole,
        submitAdd
      }
    }
  })
</script>

<style lang="scss" scoped>
  .select-box {
    margin: 10px 0;
    // float: right;
  }

  .el-input {
    width: 280px;
  }

  .el-select {
    width: 280px;
  }

  .dialog-footer {
    text-align: center;
    display: block;
  }
</style>