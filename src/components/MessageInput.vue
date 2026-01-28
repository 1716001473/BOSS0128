<template>
  <!-- 消息输入框组件 -->
  <view class="message-input safe-area-bottom">
    <view class="input-wrapper">
      <!-- 文本输入框 -->
      <view class="input-box">
        <input 
          class="input-field"
          type="text"
          v-model="inputText"
          :placeholder="placeholder"
          :confirm-type="'send'"
          :adjust-position="true"
          @confirm="handleSend"
          @focus="onFocus"
          @blur="onBlur"
        />
      </view>
      
      <!-- 图片按钮 -->
      <view class="image-btn clickable" @click="handleChooseImage">
        <text class="icon">📷</text>
      </view>
      
      <!-- 发送按钮 -->
      <view 
        class="send-btn clickable" 
        :class="{ active: inputText.trim() }"
        @click="handleSend"
      >
        <text class="icon">➤</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 消息输入组件
 * 支持文本输入、语音按钮、发送按钮
 */
import { ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '输入消息...'
  }
})

const emit = defineEmits(['send', 'focus', 'blur'])

const inputText = ref('')
const isFocused = ref(false)

// 发送消息
function handleSend() {
  const text = inputText.value.trim()
  if (!text) return
  
  emit('send', {
    type: 'text',
    content: text
  })
  
  inputText.value = ''
}

// 选择图片
function handleChooseImage() {
  uni.chooseImage({
    count: 1,                           // 最多选择1张
    sizeType: ['compressed'],           // 使用压缩图
    sourceType: ['album', 'camera'],    // 相册或拍照
    success: (res) => {
      const imagePath = res.tempFilePaths[0]
      // 发送图片消息
      emit('send', {
        type: 'image',
        content: imagePath
      })
    },
    fail: (err) => {
      // H5 环境可能不支持相机
      if (err.errMsg && err.errMsg.includes('cancel')) return
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 输入框获取焦点
function onFocus() {
  isFocused.value = true
  emit('focus')
}

// 输入框失去焦点
function onBlur() {
  isFocused.value = false
  emit('blur')
}
</script>

<style lang="scss" scoped>
.message-input {
  background: linear-gradient(180deg, rgba(245, 237, 230, 0) 0%, rgba(245, 237, 230, 0.95) 20%);
  padding: $spacing-md $spacing-lg;
  padding-bottom: calc($spacing-lg + env(safe-area-inset-bottom));
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  background: $bg-card;
  border-radius: $radius-full;
  padding: $spacing-xs $spacing-sm;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.input-box {
  flex: 1;
  background: $bg-input;
  border-radius: $radius-full;
  padding: $spacing-sm $spacing-md;
}

.input-field {
  width: 100%;
  font-size: $font-md;
  color: $text-primary;
  
  &::placeholder {
    color: $text-light;
  }
}

.image-btn {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-input;
  border-radius: 50%;
  transition: all $transition-fast ease;
  
  &:active {
    background: $cream-light;
  }
  
  .icon {
    font-size: 32rpx;
  }
}

.send-btn {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $cream-dark;
  border-radius: 50%;
  transition: all $transition-fast ease;
  
  &.active {
    background: $accent-orange;
  }
  
  .icon {
    font-size: 32rpx;
    color: $text-white;
    transform: rotate(0deg);
  }
}
</style>
