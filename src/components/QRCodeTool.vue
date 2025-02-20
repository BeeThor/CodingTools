<template>
  <div class="space-y-6">
    <!-- 生成二维码 -->
    <ToolCard>
      <template #title>生成二维码</template>
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-600">内容</label>
            <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteContent">
              <ClipboardIcon class="h-4 w-4 mr-1" />
              粘贴
            </button>
          </div>
          <textarea
            v-model="content"
            rows="3"
            class="w-full rounded-md border border-gray-300 p-2 text-sm"
            placeholder="请输入要生成二维码的内容"
          ></textarea>
        </div>

        <!-- 样式设置 -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">尺寸</label>
            <div class="flex items-center gap-3">
              <div class="relative flex-1">
                <input
                  v-model="size"
                  type="range"
                  min="100"
                  max="400"
                  step="10"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  :style="{
                    backgroundImage: `linear-gradient(to right, rgb(59, 130, 246) ${(size - 100) / 3}%, rgb(229, 231, 235) ${(size - 100) / 3}%)`
                  }"
                />
                <div class="absolute -top-1 left-0 right-0">
                  <div class="grid grid-cols-4 gap-0.5">
                    <div v-for="score in [1, 2, 3, 4]" :key="score"
                      class="h-0.5 rounded-full transition-all duration-300"
                      :class="size >= score * 100 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gray-200'"
                    ></div>
                  </div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md min-w-[4rem] text-center">
                {{ size }}px
              </span>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">容错级别</label>
            <div class="relative group">
              <select
                v-model="errorLevel"
                class="w-full appearance-none rounded-lg border border-gray-300 pl-4 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
              >
                <option value="L">低 (7%)</option>
                <option value="M">中 (15%)</option>
                <option value="Q">较高 (25%)</option>
                <option value="H">高 (30%)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-500">
                <ChevronUpDownIcon class="h-4 w-4 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">前景色</label>
            <div class="flex gap-2">
              <div class="relative">
                <input
                  v-model="foreground"
                  type="color"
                  class="h-9 w-9 rounded-lg border border-gray-300 p-0.5 cursor-pointer bg-white"
                />
              </div>
              <input
                v-model="foreground"
                type="text"
                class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="#000000"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">背景色</label>
            <div class="flex gap-2">
              <div class="relative">
                <input
                  v-model="background"
                  type="color"
                  class="h-9 w-9 rounded-lg border border-gray-300 p-0.5 cursor-pointer bg-white"
                />
              </div>
              <input
                v-model="background"
                type="text"
                class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <!-- Logo设置 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-600">Logo图片（可选）</label>
            <button 
              v-if="logoPreview"
              class="text-red-600 text-sm hover:text-red-800 flex items-center"
              @click="removeLogo"
            >
              <TrashIcon class="h-4 w-4 mr-1" />
              移除
            </button>
          </div>
          <div class="flex items-center justify-center w-full">
            <label
              class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div v-if="!logoPreview" class="flex flex-col items-center justify-center pt-5 pb-6">
                <PhotoIcon class="w-8 h-8 mb-2 text-gray-500" />
                <p class="text-xs text-gray-500">点击上传Logo图片</p>
              </div>
              <div v-else class="relative w-20 h-20 p-2">
                <img :src="logoPreview" class="w-full h-full object-contain" alt="Logo预览" />
              </div>
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleLogoUpload"
              />
            </label>
          </div>
        </div>

        <button
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          @click="generateQRCode"
        >
          生成二维码
        </button>

        <!-- 预览和下载 -->
        <div v-if="qrCodeUrl" class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">预览</span>
            <button 
              class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
              @click="downloadQRCode"
            >
              <ArrowDownTrayIcon class="h-4 w-4 mr-1" />
              下载二维码
            </button>
          </div>
          <div class="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
            <img :src="qrCodeUrl" :alt="content" class="max-w-full" />
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- 识别二维码 -->
    <ToolCard>
      <template #title>识别二维码</template>
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-center w-full">
            <label
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <QrCodeIcon class="w-8 h-8 mb-2 text-gray-500" />
                <p class="mb-2 text-sm text-gray-500">
                  <span class="font-semibold">点击上传</span> 或拖放二维码图片
                </p>
                <p class="text-xs text-gray-500">支持 PNG、JPG 格式</p>
              </div>
              <input
                type="file"
                class="hidden"
                accept="image/png,image/jpeg"
                @change="handleQRCodeUpload"
              />
            </label>
          </div>
          <div v-if="decodedContent" class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-600">识别结果</label>
              <button 
                class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                @click="copyDecodedContent"
              >
                <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                复制
              </button>
            </div>
            <textarea
              v-model="decodedContent"
              rows="3"
              class="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-50"
              readonly
            ></textarea>
          </div>
        </div>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import ToolCard from './ToolCard.vue'
import { 
  DocumentDuplicateIcon, 
  PhotoIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  ClipboardIcon,
  TrashIcon,
  ChevronUpDownIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')

// 生成二维码
const content = ref('')
const size = ref(200)
const errorLevel = ref('M')
const foreground = ref('#000000')
const background = ref('#FFFFFF')
const logoPreview = ref('')
const qrCodeUrl = ref('')

// 识别二维码
const decodedContent = ref('')

const generateQRCode = async () => {
  if (!content.value) {
    showNotification('请输入要生成二维码的内容', 'error')
    return
  }

  try {
    const QRCode = (await import('qrcode')).default
    const options = {
      errorCorrectionLevel: errorLevel.value,
      margin: 1,
      width: size.value,
      color: {
        dark: foreground.value,
        light: background.value
      }
    }

    const qrDataUrl = await QRCode.toDataURL(content.value, options)
    
    if (logoPreview.value) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const qrImage = await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = qrDataUrl
      })
      
      canvas.width = size.value
      canvas.height = size.value
      ctx.drawImage(qrImage, 0, 0)
      
      const logoImg = await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = logoPreview.value
      })
      
      const logoSize = size.value * 0.2
      const logoX = (size.value - logoSize) / 2
      const logoY = (size.value - logoSize) / 2
      
      ctx.fillStyle = 'white'
      ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4)
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
      
      qrCodeUrl.value = canvas.toDataURL()
    } else {
      qrCodeUrl.value = qrDataUrl
    }

    showNotification('二维码生成成功')
  } catch (error) {
    showNotification('二维码生成失败：' + error.message, 'error')
  }
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showNotification('请选择图片文件', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    logoPreview.value = e.target.result
    if (content.value) {
      generateQRCode()
    }
  }
  reader.readAsDataURL(file)
}

const removeLogo = () => {
  logoPreview.value = ''
  if (content.value) {
    generateQRCode()
  }
}

const handleQRCodeUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    showNotification('请选择 JPG 或 PNG 格式的图片', 'error')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('https://api.qrserver.com/v1/read-qr-code/', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    if (data[0].symbol[0].data) {
      decodedContent.value = data[0].symbol[0].data
      showNotification('二维码识别成功')
    } else {
      showNotification('未能识别出二维码', 'error')
    }
  } catch (error) {
    showNotification('二维码识别失败：' + error.message, 'error')
  }
}

// 复制和粘贴功能
const copyDecodedContent = async () => {
  if (!decodedContent.value) {
    showNotification('没有可复制的内容', 'error')
    return
  }
  try {
    await navigator.clipboard.writeText(decodedContent.value)
    showNotification('内容已复制')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

const pasteContent = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      content.value = text
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 下载二维码
const downloadQRCode = () => {
  if (!qrCodeUrl.value) {
    showNotification('请先生成二维码', 'error')
    return
  }

  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = qrCodeUrl.value
  link.click()
}

// 监听参数变化自动生成二维码
watch([content, size, errorLevel, foreground, background], () => {
  if (content.value) {
    generateQRCode()
  }
})
</script>

<style scoped>
/* 美化滑动条样式 */
input[type="range"] {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
  margin-top: -6px;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
  height: 8px;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #1d4ed8;
}

/* 美化颜色选择器 */
input[type="color"] {
  -webkit-appearance: none;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}

/* 美化下拉框 */
select {
  background-image: none;
}

select option {
  padding: 8px;
  cursor: pointer;
}

select option:hover {
  background-color: #f3f4f6;
}
</style> 