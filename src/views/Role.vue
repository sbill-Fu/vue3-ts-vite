<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" @keyup.enter.native="getRoleList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset(form)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleOpenPermission(scope.row)"
              >设置权限</el-button
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
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框-->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :props="{ label: 'menuName' }"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import { IPager } from '@/types/page';
import { IMenu, IRole } from '@/types/role';
import { ElMessage, ElTree, FormInstance, FormRules } from 'element-plus';
import { nextTick, onMounted, ref } from "vue";
import utils from "../utils/utils";

const queryForm = ref<Partial<IRole>>({ roleName: ""})
// 菜单映射表
let actionMap: {[key: string]: string} = {}
const columns = [
  { label: "角色名称", prop: "roleName", },
  { label: "备注", prop: "remark", },
  {
    label: "权限列表",
    prop: "permissionList",
    width: 200,
    formatter: (row: IRole, column: IRole, value: any) => {
      let names: any[] = [];
      let list = value.halfCheckedKeys || [];
      list.map((key: any) => {
        let name = actionMap[key];
        if (key && name) names.push(name);
      });
      return names.join(",");
    },
  },
  {
    label: "更新时间",
    prop: "updateTime",
    formatter(row: IRole, column: IRole, value: string) {
      return utils.formateDate(new Date(value));
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
    formatter(row: IRole, column: IRole, value: string) {
      return utils.formateDate(new Date(value));
    },
  },
]
const roleList = ref<Array<IRole>>([])
const pager = ref<IPager>({
  total: 0,
  pageNum: 1,
  pageSize: 10,
})
const showModal = ref(false)
let action = 'create'
const roleForm = ref<Partial<IRole>>({})
const rules: FormRules= { roleName: [ { required: true, message: "请输入角色角色名称" } ] }
// 权限展示
const showPermission = ref(false)
let curRoleId = ''
const curRoleName = ref('')
const menuList = ref<Array<IMenu>>([])

const form = ref<FormInstance>()
const dialogForm = ref<FormInstance>()
const tree = ref<InstanceType<typeof ElTree>>()

onMounted(() => {
  getRoleList();
  getMenuList();
})

// 角色列表初始化
const getRoleList = async() => {
  try {
    let { list, page } = await api.getRoleList({
      ...queryForm.value,
      ...pager.value
    })
    roleList.value = list
    pager.value.total = page.total
  } catch (e: any) {
    throw new Error(e)
  }
}

// 菜单列表初始化
const getMenuList = async() => {
  try {
    let list = await api.getMenuList()
    menuList.value = list
    getActionMap(list)
  } catch (e: any) {
    throw new Error(e)
  }
}

// 表单重置
const handleReset = (formInstance: FormInstance | undefined) => {
  formInstance && formInstance.resetFields()
}

// 角色添加
const handleAdd = () => {
  action = "create"
  showModal.value = true
}

// 角色编辑
const handleEdit = (row: IRole) => {
  action = "edit"
  showModal.value = true
  nextTick(() => {
    roleForm.value = {
      _id: row._id,
      roleName: row.roleName,
      remark: row.remark,
    }
  })
}

// 角色删除
const handleDel = async(_id: string) => {
  await api.roleOperate({ _id, action: "delete" })
  ElMessage.success("删除成功")
  getRoleList()
}

// 弹框关闭
const handleClose = () => {
  handleReset(dialogForm.value)
  showModal.value = false
}

// 角色提交
const handleSubmit = () => {
  dialogForm.value?.validate(async (valid) => {
    if (valid) {
      let params = { ...roleForm.value, action }
      let res = await api.roleOperate(params)
      if (res) {
        showModal.value = false
        ElMessage.success("创建成功")
        handleReset(dialogForm.value)
        getRoleList()
      }
    }
  })
}

const handleCurrentChange = (current: number) => {
  pager.value.pageNum = current
  getRoleList()
}

const handleOpenPermission = (row: IRole) => {
  curRoleId = row._id
  curRoleName.value = row.roleName
  showPermission.value = true
  let { checkedKeys } = row.permissionList
  setTimeout(() => {
    tree.value?.setCheckedKeys(checkedKeys)
  })
}

const handlePermissionSubmit = async() => {
  let nodes = tree.value?.getCheckedNodes();
  let halfKeys: string[] = tree.value?.getHalfCheckedKeys() as string[];
  let checkedKeys: string[] = [];
  let parentKeys: string[] = [];
  nodes?.map((node) => {
    if (!node.children) {
      checkedKeys.push(node._id);
    } else {
      parentKeys.push(node._id);
    }
  });
  let params = {
    _id: curRoleId,
    permissionList: {
      checkedKeys,
      halfCheckedKeys: parentKeys.concat(halfKeys),
    },
  };
  await api.updatePermission(params);
  showPermission.value = false;
  ElMessage.success("设置成功");
  getRoleList();
}

const getActionMap = (list: IMenu[]) => {
  let actionTmpMap: typeof actionMap = {}
  const deep = (arr: IMenu[]) => {
    while (arr.length) {
      let item = arr.pop()
      if (!item) break
      if (item.children && item.action) {
        actionTmpMap[item._id] = item.menuName
      }
      if (item.children && !item.action) {
        deep(item.children)
      }
    }
  };
  deep(JSON.parse(JSON.stringify(list)));
  actionMap = actionTmpMap;
}
</script>

<style lang="scss">
</style>