<template>
  <div>
    <!-- 编码区域 -->
    <ToolCard>
      <template #title>URL 编码</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待编码内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('raw')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="rawUrl"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要编码的URL"
        ></textarea>
      </div>
      <button
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        @click="encode"
      >
        编码
      </button>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">编码结果</label>
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(encodedUrl)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="encodedUrl"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          readonly
        ></textarea>
      </div>
    </ToolCard>

    <!-- 解码区域 -->
    <ToolCard>
      <template #title>URL 解码</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待解码内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('encoded')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="encodedUrlInput"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要解码的URL"
        ></textarea>
      </div>
      <button
        class="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        @click="decode"
      >
        解码
      </button>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">解码结果</label>
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(decodedUrl)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="decodedUrl"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          readonly
        ></textarea>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, watch } from 'vue'
import ToolCard from './ToolCard.vue'
import { ClipboardIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')
const autoExecute = inject('autoExecute')

const rawUrl = ref('')
const encodedUrl = ref('')
const encodedUrlInput = ref('')
const decodedUrl = ref('')

// URL编码
const encode = () => {
  if (!rawUrl.value) {
    showNotification('请输入要编码的URL', 'error')
    return
  }

  try {
    encodedUrl.value = encodeURIComponent(rawUrl.value)
    showNotification('编码成功')
  } catch (error) {
    showNotification('编码失败：' + error.message, 'error')
  }
}

// URL解码
const decode = () => {
  if (!encodedUrlInput.value) {
    showNotification('请输入要解码的URL', 'error')
    return
  }

  try {
    decodedUrl.value = decodeURIComponent(encodedUrlInput.value)
    showNotification('解码成功')
  } catch (error) {
    showNotification('解码失败：请确保输入的是有效的编码URL', 'error')
  }
}

// 复制文本
const copyText = async (text) => {
  if (!text) {
    showNotification('没有可复制的内容', 'error')
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    showNotification('复制成功')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

// 粘贴文本
const pasteText = async (target) => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      switch (target) {
        case 'raw':
          rawUrl.value = text
          break
        case 'encoded':
          encodedUrlInput.value = text
          break
      }
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 监听输入变化
watch(rawUrl, () => {
  if (autoExecute.value && rawUrl.value) {
    encode()
  }
})

watch(encodedUrlInput, () => {
  if (autoExecute.value && encodedUrlInput.value) {
    decode()
  }
})

// 监听自动执行状态变化
onMounted(() => {
  window.addEventListener('clearAllContent', clearContent)
  window.addEventListener('autoExecuteChanged', handleAutoExecuteChanged)
})

onUnmounted(() => {
  window.removeEventListener('clearAllContent', clearContent)
  window.removeEventListener('autoExecuteChanged', handleAutoExecuteChanged)
})

// 处理自动执行状态变化
const handleAutoExecuteChanged = (event) => {
  if (event.detail) {
    if (rawUrl.value) encode()
    if (encodedUrlInput.value) decode()
  }
}

// 清空内容
const clearContent = () => {
  rawUrl.value = ''
  encodedUrl.value = ''
}
</script> 