<template>
  <template v-for="menu in props.userMenu">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <el-icon>
            <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :userMenu="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :index="menu.path"
      :key="`${menu._id}${menu.menuType}`"
      >{{ menu.menuName }}</el-menu-item
    >
  </template>
</template>
<script lang="ts" setup>
import { Menu } from '@element-plus/icons-vue';

export interface Menus {
  children: Menus[];
  _id: string | number;
  icon: string;
  menuName: string;
  menuType: string | number;
  path: string;
}
const props = defineProps<{
  userMenu: Menus[]
}>()
</script>