<template>
  <div>
    <!-- 密钥对区域 -->
    <ToolCard>
      <template #title>密钥对</template>
      <div class="space-y-4">
        <!-- 公钥 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">公钥</label>
            <div class="flex items-center gap-2">
              <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('publicKey')">
                <ClipboardIcon class="h-4 w-4 mr-1" />
                粘贴
              </button>
              <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(publicKey)">
                <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                复制
              </button>
            </div>
          </div>
          <textarea
            v-model="publicKey"
            rows="2"
            class="w-full rounded-md border border-gray-300 p-2 text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入或生成公钥"
            @input="validatePublicKey"
          ></textarea>
        </div>

        <!-- 私钥 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">私钥</label>
            <div class="flex items-center gap-2">
              <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('privateKey')">
                <ClipboardIcon class="h-4 w-4 mr-1" />
                粘贴
              </button>
              <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(privateKey)">
                <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                复制
              </button>
            </div>
          </div>
          <textarea
            v-model="privateKey"
            rows="2"
            class="w-full rounded-md border border-gray-300 p-2 text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入或生成私钥"
            @input="validatePrivateKey"
          ></textarea>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-2">
          <button
            class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center justify-center"
            @click="generateKeyPair"
          >
            <KeyIcon class="h-4 w-4 mr-2" />
            生成密钥对
          </button>
          <button
            class="flex-1 rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 flex items-center justify-center"
            @click="clearKeyPair"
          >
            <TrashIcon class="h-4 w-4 mr-2" />
            清空密钥对
          </button>
        </div>
      </div>
    </ToolCard>

    <!-- 加密区域 -->
    <ToolCard>
      <template #title>加密</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待加密内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('plaintext')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="plaintext"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要加密的内容"
        ></textarea>
      </div>
      <button
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        @click="encrypt"
      >
        加密
      </button>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">加密结果</label>
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(encryptedText)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="encryptedText"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          readonly
        ></textarea>
      </div>
    </ToolCard>

    <!-- 解密区域 -->
    <ToolCard>
      <template #title>解密</template>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">待解密内容</label>
          <button class="text-gray-600 text-sm hover:text-gray-800 flex items-center" @click="pasteText('ciphertext')">
            <ClipboardIcon class="h-4 w-4 mr-1" />
            粘贴
          </button>
        </div>
        <textarea
          v-model="ciphertext"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="请输入要解密的内容"
        ></textarea>
      </div>
      <button
        class="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        @click="decrypt"
      >
        解密
      </button>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">解密结果</label>
          <button class="text-blue-600 text-sm hover:text-blue-800 flex items-center" @click="copyText(decryptedText)">
            <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
            复制
          </button>
        </div>
        <textarea
          v-model="decryptedText"
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
import { sm2 } from 'sm-crypto'
import ToolCard from './ToolCard.vue'
import { 
  DocumentDuplicateIcon,
  KeyIcon,
  TrashIcon,
  ClipboardIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')
const autoExecute = inject('autoExecute')

const publicKey = ref('')
const privateKey = ref('')
const plaintext = ref('')
const encryptedText = ref('')
const ciphertext = ref('')
const decryptedText = ref('')

// 验证公钥格式
const validatePublicKey = () => {
  if (publicKey.value && !publicKey.value.match(/^[0-9a-fA-F]*$/)) {
    showNotification('公钥格式不正确，请输入十六进制字符', 'error')
    // 移除非十六进制字符
    publicKey.value = publicKey.value.replace(/[^0-9a-fA-F]/g, '')
  }
}

// 验证私钥格式
const validatePrivateKey = () => {
  if (privateKey.value && !privateKey.value.match(/^[0-9a-fA-F]*$/)) {
    showNotification('私钥格式不正确，请输入十六进制字符', 'error')
    // 移除非十六进制字符
    privateKey.value = privateKey.value.replace(/[^0-9a-fA-F]/g, '')
  }
}

// 清空密钥对
const clearKeyPair = () => {
  publicKey.value = ''
  privateKey.value = ''
  showNotification('密钥对已清空')
}

// 生成密钥对
const generateKeyPair = () => {
  try {
    const keypair = sm2.generateKeyPairHex()
    publicKey.value = keypair.publicKey
    privateKey.value = keypair.privateKey
    showNotification('密钥对生成成功')
  } catch (error) {
    showNotification(error.message, 'error')
  }
}

// 加密
const encrypt = () => {
  if (!plaintext.value) {
    showNotification('请输入要加密的内容', 'error')
    return
  }
  if (!publicKey.value) {
    showNotification('请先生成密钥对', 'error')
    return
  }

  try {
    const encrypted = sm2.doEncrypt(plaintext.value, publicKey.value)
    encryptedText.value = encrypted
    showNotification('加密成功')
  } catch (error) {
    showNotification(error.message, 'error')
  }
}

// 解密
const decrypt = () => {
  if (!ciphertext.value) {
    showNotification('请输入要解密的内容', 'error')
    return
  }
  if (!privateKey.value) {
    showNotification('请先生成密钥对', 'error')
    return
  }

  try {
    const decrypted = sm2.doDecrypt(ciphertext.value, privateKey.value)
    if (!decrypted) {
      showNotification('解密失败：解密结果为空', 'error')
      return
    }
    decryptedText.value = decrypted
    showNotification('解密成功')
  } catch (error) {
    decryptedText.value = ''
    showNotification('解密失败：' + error.message, 'error')
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
        case 'publicKey':
          publicKey.value = text
          validatePublicKey()
          break
        case 'privateKey':
          privateKey.value = text
          validatePrivateKey()
          break
        case 'plaintext':
          plaintext.value = text
          break
        case 'ciphertext':
          ciphertext.value = text
          break
      }
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 监听输入变化
watch([plaintext, publicKey], () => {
  if (autoExecute.value && plaintext.value && publicKey.value) {
    encrypt()
  }
}, { deep: true })

watch([ciphertext, privateKey], () => {
  if (autoExecute.value && ciphertext.value && privateKey.value) {
    decrypt()
  }
}, { deep: true })

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
    if (plaintext.value && publicKey.value) encrypt()
    if (ciphertext.value && privateKey.value) decrypt()
  }
}

// 清空内容
const clearContent = () => {
  publicKey.value = ''
  privateKey.value = ''
  plaintext.value = ''
  encryptedText.value = ''
  ciphertext.value = ''
  decryptedText.value = ''
}
</script> 