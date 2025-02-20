<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
      move-class="transition duration-300"
    >
      <div 
        v-for="notification in notifications"
        :key="notification.id"
        class="min-w-[240px] max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <CheckCircleIcon v-if="notification.type === 'success'" class="h-6 w-6 text-green-400" />
              <ExclamationCircleIcon v-else class="h-6 w-6 text-red-400" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p :class="[
                'text-sm font-medium',
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              ]">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                type="button"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                @click="() => close(notification.id)"
              >
                <span class="sr-only">关闭</span>
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <!-- 进度条 -->
        <div 
          class="h-1 bg-gray-100"
          :class="notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'"
        >
          <div 
            class="h-full bg-green-500 transition-all duration-100 ease-linear"
            :class="notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
            :style="{
              width: `${notification.progress}%`
            }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const notifications = ref([])
let notificationId = 0

// 关闭指定通知
const close = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    const notification = notifications.value[index]
    if (notification.timer) {
      clearInterval(notification.timer)
    }
    notifications.value.splice(index, 1)
  }
}

// 显示通知
const show = (msg, msgType = 'success') => {
  const id = ++notificationId
  const notification = {
    id,
    message: msg,
    type: msgType,
    progress: 100,
    timer: null,
    startTime: Date.now()
  }

  // 添加新通知
  notifications.value.push(notification)

  // 设置进度条更新定时器
  const duration = 3000
  const updateInterval = 30 // 30ms更新一次进度条
  
  notification.timer = setInterval(() => {
    const elapsed = Date.now() - notification.startTime
    const progress = Math.max(0, ((duration - elapsed) / duration) * 100)
    
    if (progress <= 0) {
      clearInterval(notification.timer)
      close(notification.id)
    } else {
      const index = notifications.value.findIndex(n => n.id === notification.id)
      if (index > -1) {
        notifications.value[index].progress = progress
      }
    }
  }, updateInterval)

  // 3秒后自动关闭
  setTimeout(() => {
    close(id)
  }, duration)
}

// 组件卸载时清理所有定时器
onUnmounted(() => {
  notifications.value.forEach(notification => {
    if (notification.timer) {
      clearInterval(notification.timer)
    }
  })
  notifications.value = []
})

defineExpose({
  show
})
</script>

<style scoped>
.move-transition {
  transition: transform 0.3s ease-in-out;
}
</style> 