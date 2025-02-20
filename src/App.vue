<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <div class="flex">
      <!-- 左侧导航 -->
      <div class="w-64 min-h-screen bg-white border-r border-gray-200 p-4 fixed left-0 top-0">
        <div class="mb-6">
          <h1 class="text-xl font-bold text-gray-800">编码工具集</h1>
          <p class="mt-2 text-sm text-gray-600">一站式编码解码工具集合</p>
        </div>
        
        <!-- 工具列表 -->
        <div class="space-y-1">
          <button 
            v-for="tool in tools" 
            :key="tool.id"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200"
            :class="[
              currentTool === tool.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="currentTool = tool.id"
          >
            <component 
              :is="tool.icon" 
              class="w-5 h-5"
              :class="currentTool === tool.id ? 'text-blue-600' : 'text-gray-500'"
            />
            <span class="text-sm font-medium">{{ tool.name }}</span>
          </button>
        </div>

        <!-- 底部设置 -->
        <div class="absolute bottom-4 left-4 right-4">
          <div class="space-y-2">
            <button 
              class="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200"
              @click="clearAll"
            >
              <TrashIcon class="h-4 w-4 text-gray-500" />
              清空所有
            </button>
            <div class="flex items-center justify-between rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
              <span class="text-gray-600">自动执行</span>
              <button
                type="button"
                :class="[
                  autoExecute ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                ]"
                role="switch"
                :aria-checked="autoExecute"
                @click="toggleAutoExecute"
              >
                <span
                  :class="[
                    autoExecute ? 'translate-x-4' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="flex-1 ml-64">
        <div class="max-w-4xl mx-auto p-8">
          <!-- 通知组件 -->
          <Notification ref="notificationRef" />
          
          <!-- 工具内容区域 -->
          <component :is="currentToolComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, markRaw, provide, onMounted, onUnmounted } from 'vue'
import Notification from './components/Notification.vue'
import SM2Tool from './components/SM2Tool.vue'
import Base64Tool from './components/Base64Tool.vue'
import HashTool from './components/HashTool.vue'
import URLTool from './components/URLTool.vue'
import PasswordTool from './components/PasswordTool.vue'
import TimeTool from './components/TimeTool.vue'
import ImageTool from './components/ImageTool.vue'
import QRCodeTool from './components/QRCodeTool.vue'
import NetworkTool from './components/NetworkTool.vue'
import FileTool from './components/FileTool.vue'
import { 
  LockClosedIcon, 
  CodeBracketIcon, 
  ShieldCheckIcon, 
  LinkIcon,
  TrashIcon,
  KeyIcon,
  ClockIcon,
  PhotoIcon,
  QrCodeIcon,
  GlobeAltIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'

const notificationRef = ref(null)
const currentTool = ref('sm2')
const autoExecute = ref(true)

const tools = [
  { id: 'sm2', name: 'SM2加解密', icon: markRaw(LockClosedIcon), component: markRaw(SM2Tool) },
  { id: 'base64', name: 'Base64', icon: markRaw(CodeBracketIcon), component: markRaw(Base64Tool) },
  { id: 'hash', name: '哈希函数', icon: markRaw(ShieldCheckIcon), component: markRaw(HashTool) },
  { id: 'url', name: 'URL编解码', icon: markRaw(LinkIcon), component: markRaw(URLTool) },
  { id: 'password', name: '密码生成器', icon: markRaw(KeyIcon), component: markRaw(PasswordTool) },
  { id: 'time', name: '时间工具', icon: markRaw(ClockIcon), component: markRaw(TimeTool) },
  { id: 'image', name: '图片工具', icon: markRaw(PhotoIcon), component: markRaw(ImageTool) },
  { id: 'qrcode', name: '二维码工具', icon: markRaw(QrCodeIcon), component: markRaw(QRCodeTool) },
  { id: 'network', name: '网络工具', icon: markRaw(GlobeAltIcon), component: markRaw(NetworkTool) },
  { id: 'file', name: '文件工具', icon: markRaw(DocumentIcon), component: markRaw(FileTool) }
]

const currentToolComponent = computed(() => {
  const tool = tools.find(t => t.id === currentTool.value)
  return tool ? tool.component : null
})

// 清空所有内容
const clearAll = () => {
  window.dispatchEvent(new CustomEvent('clearAllContent'))
  notificationRef.value?.show('已清空所有内容')
}

// 提供通知方法给子组件使用
const showNotification = (message, type = 'success') => {
  notificationRef.value?.show(message, type)
}

// 切换自动执行状态
const toggleAutoExecute = () => {
  autoExecute.value = !autoExecute.value
  // 触发自动执行状态改变事件
  window.dispatchEvent(new CustomEvent('autoExecuteChanged', { detail: autoExecute.value }))
}

// 将通知方法提供给所有子组件
provide('showNotification', showNotification)
// 提供自动执行状态给子组件
provide('autoExecute', autoExecute)
</script>

<style>
body {
  background-color: #f5f5f7;
}

.tool-btn {
  transition: all 0.2s ease;
}

.tool-btn:hover {
  transform: translateY(-1px);
}

.tool-btn.active {
  background-color: #f0f9ff;
  border-color: #93c5fd;
}
</style> 