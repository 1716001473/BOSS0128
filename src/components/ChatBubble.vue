<template>
  <!-- 聊天气泡组件 -->
  <view 
    class="chat-bubble" 
    :class="[
      isSelf ? 'bubble-self' : 'bubble-other',
      { 'bubble-animated': animated }
    ]"
  >
    <!-- 对方头像（左侧消息） -->
    <view v-if="!isSelf" class="bubble-avatar">
      <UserAvatar :src="avatar" size="sm" />
    </view>
    
    <!-- 消息内容区 -->
    <view class="bubble-content">
      <!-- 文本消息 -->
      <view v-if="type === 'text'" class="bubble-text">
        {{ content }}
      </view>
      
      <!-- 图片消息 -->
      <view v-else-if="type === 'image'" class="bubble-image">
        <image 
          :src="content" 
          mode="widthFix" 
          @click="previewImage"
        />
      </view>
      
      <!-- 图书卡片消息 -->
      <view v-else-if="type === 'book'" class="bubble-book">
        <image class="book-cover" :src="content.cover" mode="aspectFill" />
        <view class="book-info">
          <text class="book-title">{{ content.title }}</text>
          <text class="book-desc">{{ content.description }}</text>
        </view>
      </view>
      
      <!-- 反馈按钮（仅AI消息显示） -->
      <view v-if="showFeedback && !isSelf" class="bubble-feedback">
        <text class="feedback-label">喜欢/不喜欢</text>
        <view class="feedback-btns">
          <view class="feedback-btn" :class="{ active: feedbackType === 'like' }" @click="onFeedback('like')">
            <text class="icon">👍</text>
          </view>
          <view class="feedback-btn" :class="{ active: feedbackType === 'dislike' }" @click="onFeedback('dislike')">
            <text class="icon">👎</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 自己头像（右侧消息） -->
    <view v-if="isSelf" class="bubble-avatar">
      <UserAvatar :src="selfAvatar" size="sm" />
    </view>
  </view>
</template>

<script setup>
/**
 * 聊天气泡组件
 * 支持文本、图片、图书卡片等消息类型
 */
import { ref, onMounted } from 'vue'
import UserAvatar from './UserAvatar.vue'
import { useChatStore } from '@/stores/chat.js'

const props = defineProps({
  // 消息类型：text | image | book
  type: {
    type: String,
    default: 'text'
  },
  // 消息内容
  content: {
    type: [String, Object],
    default: ''
  },
  // 是否是自己发送的消息
  isSelf: {
    type: Boolean,
    default: false
  },
  // 发送者头像
  avatar: {
    type: String,
    default: ''
  },
  // 是否显示反馈按钮
  showFeedback: {
    type: Boolean,
    default: false
  },
  // 是否显示动画
  animate: {
    type: Boolean,
    default: false
  }
})

const chatStore = useChatStore()
const selfAvatar = chatStore.currentUser.avatar
const feedbackType = ref(null)
const animated = ref(false)

onMounted(() => {
  if (props.animate) {
    setTimeout(() => {
      animated.value = true
    }, 50)
  } else {
    animated.value = true
  }
})

// 预览图片
function previewImage() {
  uni.previewImage({
    urls: [props.content],
    current: props.content
  })
}

// 反馈处理
function onFeedback(type) {
  feedbackType.value = feedbackType.value === type ? null : type
}
</script>

<style lang="scss" scoped>
.chat-bubble {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all $transition-normal ease-out;
  
  &.bubble-animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  // 自己发送的消息（右对齐）
  &.bubble-self {
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
    max-width: 80%;
    flex-direction: row;
    
    .bubble-content {
      align-items: flex-end;
      order: 1;
    }
    
    .bubble-avatar {
      order: 2;
    }
    
    .bubble-text {
      background: $bubble-user;
      color: $text-primary;
      border-radius: $radius-lg $radius-xs $radius-lg $radius-lg;
    }
  }
  
  // 对方消息（左对齐）
  &.bubble-other {
    .bubble-text {
      background: $bubble-ai;
      color: $text-primary;
      border-radius: $radius-xs $radius-lg $radius-lg $radius-lg;
    }
  }
}

.bubble-avatar {
  flex-shrink: 0;
}

.bubble-content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.bubble-text {
  padding: $spacing-md $spacing-lg;
  font-size: $font-md;
  line-height: 1.6;
  word-break: break-word;
}

.bubble-image {
  border-radius: $radius-lg;
  overflow: hidden;
  max-width: 400rpx;
  min-width: 300rpx;
  min-height: 200rpx;
  background: linear-gradient(135deg, $mint-light, $cream-light);
  position: relative;
  
  image {
    width: 100%;
    min-height: 200rpx;
    display: block;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }
}

.bubble-book {
  display: flex;
  gap: $spacing-sm;
  padding: $spacing-sm;
  background: rgba(0, 0, 0, 0.03);
  border-radius: $radius-md;
  margin-top: $spacing-sm;
  
  .book-cover {
    width: 100rpx;
    height: 140rpx;
    border-radius: $radius-sm;
    flex-shrink: 0;
  }
  
  .book-info {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }
  
  .book-title {
    font-size: $font-sm;
    font-weight: 600;
    color: $text-primary;
    white-space: pre-line;
  }
  
  .book-desc {
    font-size: $font-xs;
    color: $text-secondary;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.bubble-feedback {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-top: $spacing-sm;
  padding-top: $spacing-sm;
  border-top: 1rpx solid rgba(0, 0, 0, 0.06);
  
  .feedback-label {
    font-size: $font-xs;
    color: $text-light;
  }
  
  .feedback-btns {
    display: flex;
    gap: $spacing-sm;
  }
  
  .feedback-btn {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.04);
    transition: all $transition-fast ease;
    
    &:active {
      transform: scale(0.9);
    }
    
    &.active {
      background: $accent-orange;
      
      .icon {
        filter: none;
      }
    }
    
    .icon {
      font-size: 28rpx;
      filter: grayscale(100%);
    }
  }
}
</style>
