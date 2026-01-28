<template>
  <!-- 聊天详情页 -->
  <view class="chat-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar safe-area-top">
      <view class="nav-content">
        <!-- 返回按钮 -->
        <view class="nav-back clickable" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        
        <!-- 联系人信息 -->
        <view class="nav-info" @click="goToContact">
          <text class="nav-title">{{ currentConv?.contactName || '聊天' }}</text>
        </view>
        
        <!-- 头像 -->
        <view class="nav-avatar" @click="goToContact">
          <UserAvatar 
            :src="currentConv?.contactAvatar" 
            size="sm"
            :show-status="currentConv?.isAI"
            status="online"
          />
        </view>
      </view>
    </view>

    <!-- 消息列表区域 -->
    <scroll-view 
      class="message-list"
      scroll-y
      :scroll-into-view="scrollToView"
      :scroll-with-animation="true"
      @scrolltoupper="onScrollToTop"
    >
      <view class="message-container">
        <!-- 消息列表 -->
        <view 
          v-for="(msg, index) in chatStore.currentMessages" 
          :key="msg.id"
          :id="`msg-${msg.id}`"
        >
          <ChatBubble 
            :type="msg.type"
            :content="msg.content"
            :is-self="msg.isSelf"
            :avatar="msg.isSelf ? chatStore.currentUser.avatar : currentConv?.contactAvatar"
            :show-feedback="msg.showFeedback"
            :animate="index >= initialMsgCount"
          />
        </view>
        
        <!-- 底部占位 -->
        <view class="scroll-bottom" id="scroll-bottom"></view>
      </view>
    </scroll-view>

    <!-- 底部输入框 -->
    <MessageInput 
      placeholder="输入消息..."
      @send="handleSend"
      @focus="onInputFocus"
    />
  </view>
</template>

<script setup>
/**
 * 聊天详情页
 * 展示完整对话记录，支持发送文本和图片消息
 */
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useChatStore } from '@/stores/chat.js'
import UserAvatar from '@/components/UserAvatar.vue'
import ChatBubble from '@/components/ChatBubble.vue'
import MessageInput from '@/components/MessageInput.vue'

const chatStore = useChatStore()

// 页面状态
const scrollToView = ref('')
const initialMsgCount = ref(0)

// 当前对话信息
const currentConv = computed(() => chatStore.currentConversation)

onLoad((options) => {
  const convId = options.convId
  if (convId) {
    chatStore.setCurrentConversation(convId)
    initialMsgCount.value = chatStore.currentMessages.length
  }
})

onMounted(() => {
  // 初始滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
})

// 监听消息变化，自动滚动到底部
watch(
  () => chatStore.currentMessages.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  }
)

// 滚动到底部
function scrollToBottom() {
  scrollToView.value = ''
  nextTick(() => {
    scrollToView.value = 'scroll-bottom'
  })
}

// 发送消息
function handleSend({ type, content }) {
  const msg = chatStore.sendMessage(content, type)
  if (msg) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 输入框获取焦点时滚动到底部
function onInputFocus() {
  setTimeout(() => {
    scrollToBottom()
  }, 300)
}

// 滚动到顶部时加载更多历史消息
function onScrollToTop() {
  // 可以实现加载更多历史消息的逻辑
  console.log('滚动到顶部，可加载更多历史消息')
}

// 返回上一页
function goBack() {
  uni.navigateBack({
    animationType: 'slide-out-right',
    animationDuration: 300
  })
}

// 跳转联系人详情
function goToContact() {
  if (!currentConv.value) return
  uni.navigateTo({
    url: `/pages/contact/contact?contactId=${currentConv.value.contactId}`,
    animationType: 'slide-in-right',
    animationDuration: 300
  })
}
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $chat-bg;
}

// 顶部导航栏
.nav-bar {
  background: linear-gradient(180deg, $mint 0%, rgba($mint, 0.8) 100%);
  padding-top: env(safe-area-inset-top);
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
}

.nav-content {
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

.nav-info {
  flex: 1;
  text-align: center;
}

.nav-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
}

.nav-avatar {
  width: 60rpx;
  display: flex;
  justify-content: flex-end;
}

// 消息列表
.message-list {
  flex: 1;
  background: $bg-card;
  margin: $spacing-md;
  margin-bottom: 0;
  border-radius: $radius-xl $radius-xl 0 0;
  box-shadow: $shadow-card;
}

.message-container {
  padding: $spacing-lg;
}

.scroll-bottom {
  height: 20rpx;
}
</style>
