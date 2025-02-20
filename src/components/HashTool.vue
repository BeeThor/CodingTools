<template>
  <div>
    <ToolCard>
      <template #title>哈希计算</template>
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">输入内容</label>
            <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText">
              <ClipboardIcon class="h-4 w-4 mr-1" />
              粘贴
            </button>
          </div>
          <textarea
            v-model="input"
            rows="4"
            class="w-full rounded-md border border-gray-300 p-2 text-sm"
            placeholder="请输入要计算哈希的内容"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="hash in hashes" :key="hash.type" class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-700">{{ hash.name }}</label>
              <button 
                class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                @click="copyText(hash.value)"
              >
                <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                复制
              </button>
            </div>
            <input
              type="text"
              :value="hash.value"
              class="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-50"
              readonly
            />
          </div>
        </div>

        <button
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          @click="calculateHashes"
        >
          计算哈希值
        </button>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, watch } from 'vue'
import CryptoJS from 'crypto-js'
import ToolCard from './ToolCard.vue'
import { ClipboardIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')
const autoExecute = inject('autoExecute')

const input = ref('')
const hashes = ref([
  { type: 'md5', name: 'MD5', value: '' },
  { type: 'sha1', name: 'SHA1', value: '' },
  { type: 'sha256', name: 'SHA256', value: '' },
  { type: 'sha512', name: 'SHA512', value: '' }
])

// 计算哈希值
const calculateHashes = () => {
  if (!input.value) {
    showNotification('请输入要计算哈希的内容', 'error')
    return
  }

  try {
    hashes.value.forEach(hash => {
      switch (hash.type) {
        case 'md5':
          hash.value = CryptoJS.MD5(input.value).toString()
          break
        case 'sha1':
          hash.value = CryptoJS.SHA1(input.value).toString()
          break
        case 'sha256':
          hash.value = CryptoJS.SHA256(input.value).toString()
          break
        case 'sha512':
          hash.value = CryptoJS.SHA512(input.value).toString()
          break
      }
    })
    showNotification('哈希计算成功')
  } catch (error) {
    showNotification('哈希计算失败：' + error.message, 'error')
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
const pasteText = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      input.value = text
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 监听输入变化
watch(input, () => {
  if (autoExecute.value && input.value) {
    calculateHashes()
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

// 清空内容
const clearContent = () => {
  input.value = ''
  hashes.value.forEach(hash => {
    hash.value = ''
  })
}

// 处理自动执行状态变化
const handleAutoExecuteChanged = (event) => {
  if (event.detail && input.value) {
    calculateHashes()
  }
}
</script> 