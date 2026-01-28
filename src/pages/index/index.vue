<template>
  <!-- 对话列表页 -->
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="header safe-area-top">
      <view class="header-content">
        <text class="header-title">Companion AI</text>
        <view class="header-avatar">
          <image class="robot-avatar" src="/static/avatars/ai-robot.png" mode="aspectFill" />
        </view>
      </view>
    </view>

    <!-- 对话列表 -->
    <scroll-view 
      class="conversation-list"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="chatStore.refreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <!-- 主卡片区域 -->
      <view class="main-card card">
        <view 
          v-for="(conv, index) in chatStore.conversations" 
          :key="conv.id"
          class="conversation-item clickable"
          :class="{ 'fade-in': true }"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="goToChat(conv)"
        >
          <!-- 头像 -->
          <view class="conv-avatar">
            <UserAvatar 
              :src="conv.contactAvatar" 
              size="md"
              :show-status="conv.isAI"
              :status="'online'"
            />
          </view>
          
          <!-- 对话信息 -->
          <view class="conv-info">
            <view class="conv-header">
              <text class="conv-name">{{ conv.contactName }}</text>
              <text class="conv-time">{{ conv.lastTime }}</text>
            </view>
            <view class="conv-message">
              <text class="message-text text-ellipsis">{{ conv.lastMessage }}</text>
              <view v-if="conv.unreadCount > 0" class="badge">
                {{ conv.unreadCount > 99 ? '99+' : conv.unreadCount }}
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 加载提示 -->
      <view v-if="chatStore.loading" class="loading-tip">
        <text>加载中...</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
/**
 * 对话列表页
 * 展示会话记录，支持下拉刷新、上拉加载
 */
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat.js'
import UserAvatar from '@/components/UserAvatar.vue'

const chatStore = useChatStore()

onMounted(() => {
  console.log('对话列表页加载完成')
})

// 下拉刷新
async function onRefresh() {
  await chatStore.refreshConversations()
}

// 上拉加载更多
async function onLoadMore() {
  await chatStore.loadMoreConversations()
}

// 跳转聊天详情
function goToChat(conv) {
  chatStore.setCurrentConversation(conv.id)
  uni.navigateTo({
    url: `/pages/chat/chat?convId=${conv.id}`,
    animationType: 'slide-in-right',
    animationDuration: 300
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: $primary-gradient;
  display: flex;
  flex-direction: column;
}

// 页面头部
.header {
  padding: $spacing-lg $spacing-lg 0;
  padding-top: calc($spacing-lg + env(safe-area-inset-top));
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: $spacing-lg;
}

.header-title {
  font-size: 48rpx;
  font-weight: 700;
  color: $text-primary;
}

.header-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: $mint;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-button;
}

.robot-avatar {
  width: 60rpx;
  height: 60rpx;
}

// 对话列表
.conversation-list {
  flex: 1;
  padding: $spacing-md;
}

.main-card {
  padding: $spacing-md 0;
}

// 对话项
.conversation-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-lg;
  transition: background-color $transition-fast ease;
  
  &:active {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.conv-avatar {
  flex-shrink: 0;
}

.conv-info {
  flex: 1;
  min-width: 0;
}

.conv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-xs;
}

.conv-name {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
}

.conv-time {
  font-size: $font-xs;
  color: $text-light;
}

.conv-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;
}

.message-text {
  flex: 1;
  font-size: $font-sm;
  color: $text-secondary;
}

// 加载提示
.loading-tip {
  text-align: center;
  padding: $spacing-lg;
  color: $text-light;
  font-size: $font-sm;
}

// 动画延迟
.fade-in {
  animation: fadeIn $transition-normal ease-out forwards;
  opacity: 0;
}
</style>
