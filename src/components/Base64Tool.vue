<template>
  <div>
    <!-- 编码区域 -->
    <ToolCard>
      <template #title>Base64 编码</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待编码内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('raw')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="rawText"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要编码的内容"
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
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(encodedText)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="encodedText"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          readonly
        ></textarea>
      </div>
    </ToolCard>

    <!-- 解码区域 -->
    <ToolCard>
      <template #title>Base64 解码</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待解码内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('base64')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="base64Text"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要解码的Base64字符串"
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
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(decodedText)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="decodedText"
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

const rawText = ref('')
const encodedText = ref('')
const base64Text = ref('')
const decodedText = ref('')

// Base64编码
const encode = () => {
  if (!rawText.value) {
    showNotification('请输入要编码的内容', 'error')
    return
  }

  try {
    encodedText.value = btoa(encodeURIComponent(rawText.value))
    showNotification('编码成功')
  } catch (error) {
    showNotification('编码失败：' + error.message, 'error')
  }
}

// Base64解码
const decode = () => {
  if (!base64Text.value) {
    showNotification('请输入要解码的内容', 'error')
    return
  }

  try {
    decodedText.value = decodeURIComponent(atob(base64Text.value))
    showNotification('解码成功')
  } catch (error) {
    showNotification('解码失败：请确保输入的是有效的Base64字符串', 'error')
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
          rawText.value = text
          break
        case 'base64':
          base64Text.value = text
          break
      }
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 监听输入变化
watch(rawText, () => {
  if (autoExecute.value && rawText.value) {
    encode()
  }
})

watch(base64Text, () => {
  if (autoExecute.value && base64Text.value) {
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
    if (rawText.value) encode()
    if (base64Text.value) decode()
  }
}

// 清空内容
const clearContent = () => {
  rawText.value = ''
  encodedText.value = ''
  base64Text.value = ''
  decodedText.value = ''
}
</script> 