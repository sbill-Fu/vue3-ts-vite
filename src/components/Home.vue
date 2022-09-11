<script lang="ts" setup>
  import TreeMenu from "./TreeMenu.vue"
  import BreadCrumb from "./BreadCrumb.vue"
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router';
  import api from '@/api'
import bus from '@/utils/bus';
import { IMenu } from '@/types/menu';

  const store = useStore()
  const router = useRouter()

  const activeMenu =  ref(location.hash.slice(1))

  const noticeCount = computed(() => {
    return store.state.noticeCount || 0
  })

  onMounted(() => {
    // getNoticeCount()
    getMenuList()
    bus.on('updateMenu', (menuList) => {
      userMenu.value = menuList as IMenu[]
    })
  })

  const isCollapse = ref(false)
  const toggle = () => {
    isCollapse.value = !isCollapse.value
  }

  let userInfo = ref(store.state.userInfo)
  const handleLogout = (key: string) => {
    if (key === "email") return;
    store.commit("saveUserInfo", "");
    userInfo.value = {};
    router.push("/login");
  }

  const getNoticeCount = async() => {
    try {
      const count = await api.noticeCount();
      store.commit("saveNoticeCount", count);
    } catch (error) {
      console.error(error);
    }
  }

  const userMenu = ref<IMenu[]>([])
  const getMenuList = async() => {
    try {
      const menuList = store.state.menuList
      userMenu.value = menuList
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <TreeMenu :userMenu="userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon><Fold /></el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
            @click="$router.push('/audit/approve')"
          >
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          cursor: pointer;
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        .notice {
          line-height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>