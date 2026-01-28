<template>
  <!-- 用户头像组件 -->
  <view class="avatar-wrapper" :class="[sizeClass, { 'has-status': showStatus }]">
    <image 
      class="avatar-image" 
      :src="src || defaultAvatar" 
      mode="aspectFill"
      @error="onImageError"
    />
    <!-- 在线状态指示器 -->
    <view v-if="showStatus" class="status-dot" :class="statusClass"></view>
  </view>
</template>

<script setup>
/**
 * 用户头像组件
 * 支持不同尺寸、在线状态显示
 */
import { ref, computed } from 'vue'

const props = defineProps({
  // 头像图片地址
  src: {
    type: String,
    default: ''
  },
  // 尺寸：sm | md | lg
  size: {
    type: String,
    default: 'md'
  },
  // 是否显示在线状态
  showStatus: {
    type: Boolean,
    default: false
  },
  // 在线状态：online | offline | busy
  status: {
    type: String,
    default: 'offline'
  }
})

// 默认头像
const defaultAvatar = '/static/avatars/default.png'
const imageSrc = ref(props.src)

// 尺寸类名
const sizeClass = computed(() => `avatar-${props.size}`)

// 状态类名
const statusClass = computed(() => `status-${props.status}`)

// 图片加载失败处理
function onImageError() {
  imageSrc.value = defaultAvatar
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
  
  // 尺寸变体
  &.avatar-sm {
    width: 64rpx;
    height: 64rpx;
    
    .status-dot {
      width: 16rpx;
      height: 16rpx;
      right: -2rpx;
      bottom: -2rpx;
    }
  }
  
  &.avatar-md {
    width: 88rpx;
    height: 88rpx;
    
    .status-dot {
      width: 20rpx;
      height: 20rpx;
      right: 0;
      bottom: 0;
    }
  }
  
  &.avatar-lg {
    width: 140rpx;
    height: 140rpx;
    
    .status-dot {
      width: 28rpx;
      height: 28rpx;
      right: 4rpx;
      bottom: 4rpx;
    }
  }
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $mint-light;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  border-radius: 50%;
  border: 3rpx solid #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  
  // 状态颜色
  &.status-online {
    background-color: #52c41a;
  }
  
  &.status-offline {
    background-color: #d9d9d9;
  }
  
  &.status-busy {
    background-color: #fa8c16;
  }
}
</style>
