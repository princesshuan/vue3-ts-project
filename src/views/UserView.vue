<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nikeName" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.roleId" placeholder="请选择角色">
            <el-option label="全部" :value="0" />
            <el-option v-for="role in rolelist" :key="role.roleName" :label="role.roleName" :value="role.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border stripe :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="nikeName" label="姓名" align="center" />
      <el-table-column prop="role" label="角色" align="center">
        <template #default="scope">
          <el-button v-for="i in scope.row.role" :key="i.role" type="text" size="small">{{i.roleName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <!-- <el-button type="text" size="small" @click="handleClick">Detail</el-button> -->
          <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isShow" title="编辑用户信息" width="400px">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="100">
        <el-input v-model="active.nikeName" autocomplete="off" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色" label-width="100">
        <el-select v-model="active.role" placeholder="请选择角色" multiple>
          <el-option v-for="role in rolelist" :key="role.roleName" :label="role.roleName" :value="role.roleId" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="userChange">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue'
  import { InitData, ListInt } from '../types/user'
  import { getUserList, getRoleList } from "../http/api"
  export default defineComponent({
    setup() {
      const data = reactive(new InitData)
      onMounted(() => {
        getUserList().then(res => {
          console.log(res, "list")
          data.list = res.data
          data.listData = res.data
        })
        getRoleList().then(res => {
          console.log(res, "rolelist")
          data.rolelist = res.data
        })
      })

      const onSubmit = () => {
        let arr: [ListInt][] = []
        console.log(data.selectData)
        if (data.selectData.nikeName || data.selectData.roleId) {
          if (data.selectData.nikeName) {
            arr = data.listData.filter((v: any) => v.nikeName.indexOf(data.selectData.nikeName) != -1)
            console.log(arr, "arr")
          }
          if (data.selectData.roleId) {
            arr = (data.selectData.nikeName ? arr : data.listData).filter((v: any) => v.role.find((i: any) => i.role === data.selectData.roleId))
          }

        } else {
          arr = data.listData
        }
        data.list = arr
      }
      const editFun = (row: ListInt) => {
        data.active = {
          id: row.id,
          nikeName: row.nikeName,
          userName: row.userName,
          role: row.role.map((v: any) => v.role || v.roleId)
        }
        console.log(row, "row")
        data.isShow = true
      }
      const userChange = () => {
        const obj: any = data.list.find((v: any) => v.id === data.active.id)
        obj.nikeName = data.active.nikeName
        obj.role = data.rolelist.filter((v: any) => data.active.role.indexOf(v.roleId) != -1)
        data.isShow = false
      }
      return {
        ...toRefs(data),
        onSubmit,
        editFun,
        userChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  .el-input {
    width: 280px;
  }

  .el-select {
    width: 280px;
  }
.dialog-footer{
    text-align: center;
    display: block;
}
  
</style>