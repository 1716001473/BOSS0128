<template>
  <!-- 联系人详情页 -->
  <view class="contact-page">
    <!-- 顶部背景 -->
    <view class="header-bg safe-area-top">
      <!-- 返回按钮 -->
      <view class="nav-bar">
        <view class="nav-back clickable" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <view class="nav-title">联系人详情</view>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 主内容卡片 -->
    <view class="profile-card card slide-up">
      <!-- 头像区域 -->
      <view class="avatar-section">
        <view class="avatar-ring">
          <UserAvatar 
            :src="contact?.avatar" 
            size="lg"
            :show-status="true"
            :status="contact?.status || 'offline'"
          />
        </view>
        
        <!-- AI 标识 -->
        <view v-if="contact?.isAI" class="ai-badge">
          <text>AI</text>
        </view>
      </view>

      <!-- 基本信息 -->
      <view class="info-section">
        <text class="nickname">{{ contact?.nickname || '未知用户' }}</text>
        
        <!-- 等级徽章 -->
        <view class="level-badge">
          <text class="level-icon">⭐</text>
          <text class="level-text">Lv.{{ contact?.level || 1 }}</text>
        </view>
        
        <!-- 个性签名 -->
        <text class="signature">{{ contact?.signature || '这个人很懒，什么都没写' }}</text>
      </view>

      <!-- 状态信息 -->
      <view class="status-section">
        <view class="status-item">
          <view class="status-dot" :class="`status-${contact?.status || 'offline'}`"></view>
          <text class="status-text">
            {{ statusText }}
          </text>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-section">
        <view class="action-btn btn-primary clickable" @click="startChat">
          <text class="action-icon">💬</text>
          <text class="action-text">发消息</text>
        </view>
        
        <view class="action-btn btn-ghost clickable" @click="showMore">
          <text class="action-icon">⋯</text>
          <text class="action-text">更多</text>
        </view>
      </view>
    </view>

    <!-- 详细信息列表 -->
    <view class="detail-card card slide-up" style="animation-delay: 0.1s;">
      <view class="detail-item">
        <text class="detail-label">用户ID</text>
        <text class="detail-value">{{ contact?.id || '-' }}</text>
      </view>
      
      <view v-if="contact?.isAI" class="detail-item">
        <text class="detail-label">类型</text>
        <text class="detail-value">智能助手</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 联系人详情页
 * 展示联系人完整信息
 */
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useChatStore } from '@/stores/chat.js'
import UserAvatar from '@/components/UserAvatar.vue'

const chatStore = useChatStore()
const contact = ref(null)

// 状态文本
const statusText = computed(() => {
  const status = contact.value?.status
  switch (status) {
    case 'online': return '在线'
    case 'busy': return '忙碌'
    case 'offline': return '离线'
    default: return '未知'
  }
})

onLoad((options) => {
  const contactId = options.contactId
  if (contactId) {
    contact.value = chatStore.getContact(contactId)
  }
})

// 返回上一页
function goBack() {
  uni.navigateBack({
    animationType: 'slide-out-right',
    animationDuration: 300
  })
}

// 发起聊天
function startChat() {
  // 查找该联系人的对话
  const conv = chatStore.conversations.find(c => c.contactId === contact.value?.id)
  if (conv) {
    chatStore.setCurrentConversation(conv.id)
    uni.redirectTo({
      url: `/pages/chat/chat?convId=${conv.id}`,
      animationType: 'slide-in-right',
      animationDuration: 300
    })
  } else {
    uni.showToast({
      title: '暂无对话记录',
      icon: 'none'
    })
  }
}

// 显示更多选项
function showMore() {
  uni.showActionSheet({
    itemList: ['设为星标', '设置备注', '删除联系人'],
    success: (res) => {
      const actions = ['设为星标', '设置备注', '删除操作']
      uni.showToast({
        title: `${actions[res.tapIndex]}`,
        icon: 'none'
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  background: $bg-page;
}

// 顶部背景
.header-bg {
  background: $primary-gradient;
  padding-top: env(safe-area-inset-top);
  padding-bottom: 120rpx;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md $spacing-lg;
  height: 100rpx;
}

.nav-back {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .back-icon {
    font-size: 40rpx;
    color: $text-primary;
  }
}

.nav-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
}

.nav-placeholder {
  width: 60rpx;
}

// 主内容卡片
.profile-card {
  margin: -80rpx $spacing-lg $spacing-lg;
  padding: $spacing-xl;
  text-align: center;
}

// 头像区域
.avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: $spacing-lg;
}

.avatar-ring {
  padding: 8rpx;
  background: $primary-gradient;
  border-radius: 50%;
  box-shadow: $shadow-button;
}

.ai-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: $accent-orange;
  color: #fff;
  font-size: $font-xs;
  font-weight: 600;
  padding: 4rpx 12rpx;
  border-radius: $radius-full;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

// 信息区域
.info-section {
  margin-bottom: $spacing-lg;
}

.nickname {
  display: block;
  font-size: $font-xxl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #fff;
  font-size: $font-xs;
  padding: 4rpx 16rpx;
  border-radius: $radius-full;
  margin-bottom: $spacing-md;
  
  .level-icon {
    font-size: $font-sm;
  }
  
  .level-text {
    font-weight: 600;
  }
}

.signature {
  display: block;
  font-size: $font-md;
  color: $text-secondary;
  line-height: 1.6;
}

// 状态区域
.status-section {
  margin-bottom: $spacing-lg;
}

.status-item {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  
  &.status-online {
    background: #52c41a;
  }
  
  &.status-offline {
    background: #d9d9d9;
  }
  
  &.status-busy {
    background: #fa8c16;
  }
}

.status-text {
  font-size: $font-sm;
  color: $text-secondary;
}

// 操作按钮
.action-section {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-md $spacing-xl;
  
  .action-icon {
    font-size: $font-lg;
  }
  
  .action-text {
    font-size: $font-md;
  }
}

// 详细信息卡片
.detail-card {
  margin: 0 $spacing-lg $spacing-lg;
  padding: 0;
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  
  &:not(:last-child) {
    border-bottom: 1rpx solid $border-color;
  }
}

.detail-label {
  font-size: $font-md;
  color: $text-secondary;
}

.detail-value {
  font-size: $font-md;
  color: $text-primary;
}
</style>
