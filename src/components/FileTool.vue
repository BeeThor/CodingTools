<template>
  <div class="space-y-6">
    <!-- 文件哈希计算 -->
    <ToolCard>
      <template #title>文件哈希计算</template>
      <div class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label
            class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200"
            :class="[
              hashResults.length > 0 
                ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <DocumentIcon class="w-12 h-12 mb-3" :class="hashResults.length > 0 ? 'text-blue-500' : 'text-gray-400'" />
                <p class="mb-2 text-sm" :class="hashResults.length > 0 ? 'text-blue-600' : 'text-gray-500'">
                  <span class="font-semibold">点击上传</span> 或拖放文件
                </p>
                <p class="text-xs" :class="hashResults.length > 0 ? 'text-blue-500' : 'text-gray-400'">
                  支持任意文件类型，文件仅在本地处理
                </p>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              @change="handleHashFileUpload"
            />
          </label>
        </div>
        <div v-if="hashResults.length > 0" class="space-y-4">
          <div class="rounded-xl border bg-white shadow-sm divide-y divide-gray-100">
            <div v-for="result in hashResults" :key="result.type" class="p-4 transition-colors duration-150 hover:bg-gray-50">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <component 
                    :is="getHashIcon(result.type)"
                    class="w-5 h-5"
                    :class="getHashColor(result.type)"
                  />
                  <span class="text-sm font-medium text-gray-700">{{ result.name }}</span>
                </div>
                <button 
                  class="text-gray-500 hover:text-gray-700 flex items-center gap-1.5 text-sm transition-colors duration-150"
                  @click="() => copyHash(result.value)"
                >
                  <DocumentDuplicateIcon class="h-4 w-4" />
                  复制
                </button>
              </div>
              <div class="relative group">
                <input
                  type="text"
                  :value="result.value"
                  class="w-full rounded-lg border bg-gray-50 py-2 px-3 text-sm font-mono text-gray-600 group-hover:bg-white transition-colors duration-150"
                  readonly
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CheckCircleIcon class="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- 文件类型检测 -->
    <ToolCard>
      <template #title>文件类型检测</template>
      <div class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label
            class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200"
            :class="[
              fileInfo 
                ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <DocumentMagnifyingGlassIcon 
                  class="w-12 h-12 mb-3" 
                  :class="fileInfo ? 'text-green-500' : 'text-gray-400'" 
                />
                <p class="mb-2 text-sm" :class="fileInfo ? 'text-green-600' : 'text-gray-500'">
                  <span class="font-semibold">点击上传</span> 或拖放要检测的文件
                </p>
                <p class="text-xs" :class="fileInfo ? 'text-green-500' : 'text-gray-400'">
                  支持任意文件类型，快速识别文件信息
                </p>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              @change="handleFileTypeDetection"
            />
          </label>
        </div>
        <div v-if="fileInfo" class="space-y-2">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="grid grid-cols-2 divide-x divide-y divide-gray-100">
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1">文件名</dt>
                <dd class="text-sm text-gray-900 break-all">{{ fileInfo.name }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1">文件大小</dt>
                <dd class="text-sm text-gray-900">{{ fileInfo.size }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1">MIME 类型</dt>
                <dd class="text-sm text-gray-900 font-mono">{{ fileInfo.mimeType }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1">文件扩展名</dt>
                <dd class="text-sm text-gray-900 uppercase">{{ fileInfo.extension }}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import CryptoJS from 'crypto-js'
import ToolCard from './ToolCard.vue'
import { 
  DocumentDuplicateIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HashtagIcon,
  LockClosedIcon,
  KeyIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')

// 文件哈希计算
const hashResults = ref([])

const handleHashFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    hashResults.value = [
      { type: 'md5', name: 'MD5', value: CryptoJS.MD5(content).toString() },
      { type: 'sha1', name: 'SHA1', value: CryptoJS.SHA1(content).toString() },
      { type: 'sha256', name: 'SHA256', value: CryptoJS.SHA256(content).toString() },
      { type: 'sha512', name: 'SHA512', value: CryptoJS.SHA512(content).toString() }
    ]
    showNotification('哈希计算完成')
  }
  reader.readAsBinaryString(file)
}

const copyHash = async (hash) => {
  if (!hash) {
    showNotification('没有可复制的内容', 'error')
    return
  }

  try {
    await navigator.clipboard.writeText(hash)
    showNotification('复制成功')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

// 获取哈希算法对应的图标
const getHashIcon = (type) => {
  switch (type) {
    case 'md5':
      return HashtagIcon
    case 'sha1':
      return KeyIcon
    case 'sha256':
      return ShieldCheckIcon
    case 'sha512':
      return LockClosedIcon
    default:
      return HashtagIcon
  }
}

// 获取哈希算法对应的颜色
const getHashColor = (type) => {
  switch (type) {
    case 'md5':
      return 'text-purple-500'
    case 'sha1':
      return 'text-blue-500'
    case 'sha256':
      return 'text-green-500'
    case 'sha512':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

// 文件类型检测
const fileInfo = ref(null)

const handleFileTypeDetection = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  fileInfo.value = {
    name: file.name,
    size: formatFileSize(file.size),
    mimeType: file.type || '未知',
    extension: file.name.split('.').pop() || '无'
  }
  
  showNotification('文件类型检测完成')
}

// 工具函数
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script> 