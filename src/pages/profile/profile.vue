<template>
  <!-- 个人中心页 -->
  <view class="profile-page">
    <!-- 顶部背景 -->
    <view class="header-bg safe-area-top">
      <view class="header-content">
        <text class="page-title">我的</text>
      </view>
    </view>

    <!-- 用户信息卡片 -->
    <view class="user-card card slide-up">
      <view class="user-info">
        <view class="user-avatar">
          <UserAvatar 
            :src="chatStore.currentUser.avatar" 
            size="lg"
            :show-status="true"
            status="online"
          />
        </view>
        
        <view class="user-detail">
          <view class="user-name-row">
            <text class="user-name">{{ chatStore.currentUser.nickname }}</text>
            <view class="level-badge">
              <text>Lv.{{ chatStore.currentUser.level }}</text>
            </view>
          </view>
          <text class="user-signature">{{ chatStore.currentUser.signature }}</text>
        </view>
        
        <view class="edit-icon clickable" @click="goToEdit">
          <text>✏️</text>
        </view>
      </view>
    </view>

    <!-- 功能入口列表 -->
    <view class="menu-card card slide-up" style="animation-delay: 0.1s;">
      <view 
        v-for="item in menuItems" 
        :key="item.id"
        class="menu-item clickable"
        @click="handleMenuClick(item)"
      >
        <view class="menu-icon">
          <text>{{ item.icon }}</text>
        </view>
        <text class="menu-label">{{ item.label }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 设置入口 -->
    <view class="menu-card card slide-up" style="animation-delay: 0.15s;">
      <view 
        v-for="item in settingItems" 
        :key="item.id"
        class="menu-item clickable"
        @click="handleMenuClick(item)"
      >
        <view class="menu-icon">
          <text>{{ item.icon }}</text>
        </view>
        <text class="menu-label">{{ item.label }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="version-info slide-up" style="animation-delay: 0.2s;">
      <text class="version-text">Companion AI v1.0.0</text>
    </view>

    <!-- 退出按钮 -->
    <view class="logout-section slide-up" style="animation-delay: 0.25s;">
      <view class="logout-btn btn-ghost clickable" @click="handleLogout">
        <text>退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 个人中心页
 * 展示当前用户信息和功能入口
 */
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat.js'
import UserAvatar from '@/components/UserAvatar.vue'

const chatStore = useChatStore()

// 功能菜单
const menuItems = ref([
  { id: 'favorite', icon: '⭐', label: '我的收藏' },
  { id: 'history', icon: '📜', label: '聊天记录' },
  { id: 'files', icon: '📁', label: '文件管理' },
  { id: 'cloud', icon: '☁️', label: '云端同步' }
])

// 设置菜单
const settingItems = ref([
  { id: 'settings', icon: '⚙️', label: '设置' },
  { id: 'help', icon: '❓', label: '帮助与反馈' },
  { id: 'about', icon: 'ℹ️', label: '关于我们' }
])

// 跳转编辑页面
function goToEdit() {
  uni.showToast({
    title: '编辑资料功能开发中',
    icon: 'none'
  })
}

// 菜单点击处理
function handleMenuClick(item) {
  uni.showToast({
    title: `${item.label}功能开发中`,
    icon: 'none'
  })
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: $bg-page;
  padding-bottom: calc($spacing-xl + env(safe-area-inset-bottom));
}

// 顶部背景
.header-bg {
  background: $primary-gradient;
  padding-top: env(safe-area-inset-top);
  padding-bottom: 60rpx;
}

.header-content {
  padding: $spacing-lg;
}

.page-title {
  font-size: 48rpx;
  font-weight: 700;
  color: $text-primary;
}

// 用户信息卡片
.user-card {
  margin: -30rpx $spacing-lg $spacing-lg;
  padding: $spacing-lg;
}

.user-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.user-avatar {
  flex-shrink: 0;
}

.user-detail {
  flex: 1;
  min-width: 0;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-xs;
}

.user-name {
  font-size: $font-xl;
  font-weight: 700;
  color: $text-primary;
}

.level-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #fff;
  font-size: $font-xs;
  font-weight: 600;
  padding: 4rpx 12rpx;
  border-radius: $radius-full;
}

.user-signature {
  font-size: $font-sm;
  color: $text-secondary;
}

.edit-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
}

// 菜单卡片
.menu-card {
  margin: 0 $spacing-lg $spacing-md;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  
  &:not(:last-child) {
    border-bottom: 1rpx solid $border-color;
  }
  
  &:active {
    background: rgba(0, 0, 0, 0.02);
  }
}

.menu-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: $spacing-md;
}

.menu-label {
  flex: 1;
  font-size: $font-md;
  color: $text-primary;
}

.menu-arrow {
  font-size: 36rpx;
  color: $text-light;
}

// 版本信息
.version-info {
  text-align: center;
  padding: $spacing-xl 0;
}

.version-text {
  font-size: $font-sm;
  color: $text-light;
}

// 退出按钮
.logout-section {
  padding: 0 $spacing-lg;
}

.logout-btn {
  width: 100%;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-md;
  color: #ff4d4f;
  background: $bg-card;
  border-radius: $radius-lg;
  border: 1rpx solid rgba(255, 77, 79, 0.2);
}
</style>
