<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset(form)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <el-table
        :data="menuList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              @click="handleAdd(2, scope.row)"
              type="primary"
              size="small"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="small"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType == 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuType == 1"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api"
import { IMenu } from "@/types/menu"
import bus from '@/utils/bus'
import { ElMessage, FormInstance, FormRules } from "element-plus"
import { nextTick, onMounted, ref } from "vue"
import utils from "../utils/utils"

const queryForm = ref<Partial<IMenu>>({menuState: 1})
const menuList = ref<Array<IMenu>>([])
const columns = [
  { label: "菜单名称", prop: "menuName", width: 150, },
  { label: "图标", prop: "icon", },
  {
    label: "菜单类型",
    prop: "menuType",
    formatter(row: IMenu, column: IMenu, value: number) {
      return {
        1: "菜单",
        2: "按钮",
      }[value];
    },
  },
  { label: "权限标识", prop: "menuCode", },
  { label: "路由地址", prop: "path", },
  { label: "组件路径", prop: "component", },
  {
    label: "菜单状态",
    prop: "menuState",
    width: 90,
    formatter(row: IMenu, column: IMenu, value: number) {
      return {
        1: "正常",
        2: "停用",
      }[value];
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
    formatter(row: IMenu, column: IMenu, value: string) {
      return utils.formateDate(new Date(value));
    },
  },
]
const showModal = ref(false)
const menuForm = ref<Partial<IMenu>>({
  parentId: [null],
  menuType: 1,
  menuState: 1,
})
let action = ''
let rules: FormRules = {
  menuName: [
    { required: true, message: "请输入菜单名称", trigger: "blur", },
    { min: 2, max: 10, message: "长度在2-8个字符", trigger: "blur", },
  ],
}

const form = ref<FormInstance>()
const dialogForm = ref<FormInstance>()

onMounted(() => {
  getMenuList()
})
// 菜单列表初始化
const getMenuList = async () => {
  try {
    let list = await api.getMenuList(queryForm.value)
    menuList.value = list
    bus.emit('updateMenu', list)
  } catch (e: Error) {
    throw new Error(e)
  }
}

// 表单重置
const handleReset = (formRef: FormInstance | undefined) => {
  formRef && formRef.resetFields()
}

// 新增菜单
const handleAdd = (type: number, row?: IMenu) => {
  showModal.value = true
  action = "add"
  if (type == 2 && row) {
    if (row.parentId) {
      menuForm.value.parentId = [...row.parentId, row._id].filter(
        (item) => item
      )
    }
  }
}

const handleEdit = (row: IMenu) => {
  showModal.value = true
  action = "edit"
  nextTick(() => {
    menuForm.value = row
  })
}

const handleDel = async (_id: number) => {
  await api.menuSubmit({ _id, action: "delete" })
  ElMessage.success("删除成功")
  getMenuList()
}

// 菜单操作-提交
const handleSubmit = () => {
  dialogForm.value && dialogForm.value.validate(async (valid) => {
    if (valid) {
      let params = { ...menuForm.value, action }
      console.log({params})
      await api.menuSubmit(params)
      showModal.value = false
      ElMessage.success("操作成功")
      handleReset(dialogForm.value)
      getMenuList()
    }
  })
}

// 弹框关闭
const handleClose = () => {
  showModal.value = false
  handleReset(dialogForm.value)
}
</script>

<style lang="scss">
</style>