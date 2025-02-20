<template>
  <div class="space-y-6">
    <!-- 图片转 Base64 -->
    <ToolCard>
      <template #title>图片转 Base64</template>
      <div class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label
            class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200"
            :class="[
              imagePreview 
                ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <PhotoIcon class="w-12 h-12 mb-3" :class="imagePreview ? 'text-blue-500' : 'text-gray-400'" />
                <p class="mb-2 text-sm" :class="imagePreview ? 'text-blue-600' : 'text-gray-500'">
                  <span class="font-semibold">点击上传</span> 或拖放图片
                </p>
                <p class="text-xs" :class="imagePreview ? 'text-blue-500' : 'text-gray-400'">
                  支持 PNG、JPG、GIF 等格式
                </p>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleImageToBase64Upload"
            />
          </label>
        </div>
        <div v-if="imagePreview" class="space-y-4">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-gray-600">预览</span>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">{{ imageInfo }}</span>
                  <button 
                    class="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1.5"
                    @click="copyBase64"
                  >
                    <DocumentDuplicateIcon class="h-4 w-4" />
                    复制 Base64
                  </button>
                </div>
              </div>
              <div class="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img :src="imagePreview" class="max-w-full h-auto mx-auto" alt="预览图" />
              </div>
              <div class="mt-4 relative group">
                <textarea
                  v-model="base64Result"
                  rows="3"
                  class="w-full rounded-lg border bg-gray-50 py-2 px-3 text-xs font-mono text-gray-600 group-hover:bg-white transition-colors duration-150"
                  readonly
                ></textarea>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CheckCircleIcon class="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- Base64 转图片 -->
    <ToolCard>
      <template #title>Base64 转图片</template>
      <div class="space-y-4">
        <div class="relative">
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-600">Base64 编码</label>
            <button 
              class="text-gray-500 hover:text-gray-700 flex items-center gap-1.5 text-sm transition-colors duration-150"
              @click="pasteBase64"
            >
              <ClipboardIcon class="h-4 w-4" />
              粘贴
            </button>
          </div>
          <textarea
            v-model="base64Input"
            rows="3"
            class="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="请输入 Base64 编码"
            @input="handleBase64Input"
          ></textarea>
        </div>
        <div v-if="base64Preview" class="space-y-4">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-gray-600">预览</span>
                <button 
                  class="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 text-sm transition-colors duration-150"
                  @click="downloadBase64Image"
                >
                  <ArrowDownTrayIcon class="h-4 w-4" />
                  下载图片
                </button>
              </div>
              <div class="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img :src="base64Preview" class="max-w-full h-auto mx-auto" alt="Base64 预览" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- 图片压缩 -->
    <ToolCard>
      <template #title>图片压缩</template>
      <div class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label
            class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200"
            :class="[
              compressedPreview 
                ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <PhotoIcon class="w-12 h-12 mb-3" :class="compressedPreview ? 'text-green-500' : 'text-gray-400'" />
                <p class="mb-2 text-sm" :class="compressedPreview ? 'text-green-600' : 'text-gray-500'">
                  <span class="font-semibold">点击上传</span> 或拖放图片
                </p>
                <p class="text-xs" :class="compressedPreview ? 'text-green-500' : 'text-gray-400'">
                  支持 PNG、JPG 格式
                </p>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              accept="image/png,image/jpeg"
              @change="handleCompressUpload"
            />
          </label>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">压缩质量</label>
            <div class="flex items-center gap-3">
              <input
                v-model="quality"
                type="range"
                min="0"
                max="1"
                step="0.1"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <span class="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md min-w-[4rem] text-center">
                {{ Math.round(quality * 100) }}%
              </span>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">最大宽度</label>
            <div class="relative">
              <input
                v-model="maxWidth"
                type="number"
                class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                placeholder="可选，默认保持原宽度"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowsRightLeftIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="compressedPreview" class="space-y-4">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-gray-600">压缩效果</span>
                <button 
                  class="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1.5"
                  @click="downloadCompressedImage"
                >
                  <ArrowDownTrayIcon class="h-4 w-4" />
                  下载压缩图片
                </button>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <div class="text-xs text-gray-500">原图</div>
                    <div class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{{ originalSize }}</div>
                  </div>
                  <div class="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img :src="originalPreview" class="max-w-full h-auto" alt="原图" />
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <div class="text-xs text-gray-500">压缩后</div>
                    <div class="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">{{ compressedSize }}</div>
                  </div>
                  <div class="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img :src="compressedPreview" class="max-w-full h-auto" alt="压缩后" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import Compressor from 'compressorjs'
import ToolCard from './ToolCard.vue'
import { 
  DocumentDuplicateIcon, 
  PhotoIcon, 
  ArrowDownTrayIcon,
  ClipboardIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')

// 图片转 Base64
const imagePreview = ref('')
const base64Result = ref('')
const imageInfo = ref('')

const handleImageToBase64Upload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showNotification('请选择图片文件', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
    base64Result.value = e.target.result
    imageInfo.value = `${file.name} (${formatFileSize(file.size)})`
  }
  reader.readAsDataURL(file)
}

// Base64 转图片
const base64Input = ref('')
const base64Preview = ref('')

const handleBase64Input = () => {
  if (!base64Input.value) {
    base64Preview.value = ''
    return
  }

  try {
    // 验证 Base64 格式
    if (!isValidBase64Image(base64Input.value)) {
      showNotification('无效的图片 Base64 编码', 'error')
      return
    }
    base64Preview.value = base64Input.value
  } catch (error) {
    showNotification('Base64 解析失败', 'error')
  }
}

const pasteBase64 = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      base64Input.value = text
      handleBase64Input()
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 图片压缩
const quality = ref(0.8)
const maxWidth = ref('')
const originalPreview = ref('')
const compressedPreview = ref('')
const originalSize = ref('')
const compressedSize = ref('')

const handleCompressUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    showNotification('请选择 JPG 或 PNG 格式的图片', 'error')
    return
  }

  // 显示原图预览
  const reader = new FileReader()
  reader.onload = (e) => {
    originalPreview.value = e.target.result
    originalSize.value = formatFileSize(file.size)
  }
  reader.readAsDataURL(file)

  // 压缩图片
  compressImage(file)
}

const compressImage = (file) => {
  new Compressor(file, {
    quality: quality.value,
    maxWidth: maxWidth.value ? parseInt(maxWidth.value) : undefined,
    success(result) {
      const reader = new FileReader()
      reader.onload = (e) => {
        compressedPreview.value = e.target.result
        compressedSize.value = formatFileSize(result.size)
        showNotification('图片压缩成功')
      }
      reader.readAsDataURL(result)
    },
    error(err) {
      showNotification('图片压缩失败：' + err.message, 'error')
    }
  })
}

// 复制功能
const copyBase64 = async () => {
  if (!base64Result.value) {
    showNotification('没有可复制的内容', 'error')
    return
  }
  try {
    await navigator.clipboard.writeText(base64Result.value)
    showNotification('Base64 编码已复制')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

// 下载功能
const downloadBase64Image = () => {
  if (!base64Preview.value) {
    showNotification('没有可下载的图片', 'error')
    return
  }

  const link = document.createElement('a')
  link.download = 'image.png'
  link.href = base64Preview.value
  link.click()
}

const downloadCompressedImage = () => {
  if (!compressedPreview.value) {
    showNotification('没有可下载的图片', 'error')
    return
  }

  const link = document.createElement('a')
  link.download = 'compressed.jpg'
  link.href = compressedPreview.value
  link.click()
}

// 工具函数
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const isValidBase64Image = (str) => {
  if (!str?.startsWith('data:image/')) return false
  try {
    return btoa(atob(str.split(',')[1])) === str.split(',')[1]
  } catch (err) {
    return false
  }
}

// 监听压缩参数变化
watch([quality, maxWidth], () => {
  if (originalPreview.value) {
    // 获取原始文件并重新压缩
    fetch(originalPreview.value)
      .then(res => res.blob())
      .then(blob => compressImage(blob))
  }
})
</script> 