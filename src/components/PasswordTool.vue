<template>
  <div>
    <ToolCard>
      <template #title>密码生成器</template>
      <div class="space-y-6">
        <!-- 密码长度设置 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">密码长度</label>
            <span class="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{{ length }} 位</span>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              class="text-gray-500 hover:text-gray-700"
              @click="decreaseLength"
            >
              <MinusCircleIcon class="h-5 w-5" />
            </button>
            <input
              type="range"
              v-model="length"
              min="4"
              max="64"
              class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <button 
              class="text-gray-500 hover:text-gray-700"
              @click="increaseLength"
            >
              <PlusCircleIcon class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- 密码选项 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">密码选项</label>
          <div class="grid grid-cols-4 gap-2">
            <label class="relative flex flex-col items-center p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
              <input type="checkbox" v-model="options.numbers" class="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500" />
              <div class="mt-1 text-center">
                <span class="text-xs font-medium text-gray-600">数字</span>
                <span class="text-[10px] text-gray-400 block">0-9</span>
              </div>
            </label>
            <label class="relative flex flex-col items-center p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
              <input type="checkbox" v-model="options.lowercase" class="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500" />
              <div class="mt-1 text-center">
                <span class="text-xs font-medium text-gray-600">小写</span>
                <span class="text-[10px] text-gray-400 block">a-z</span>
              </div>
            </label>
            <label class="relative flex flex-col items-center p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
              <input type="checkbox" v-model="options.uppercase" class="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500" />
              <div class="mt-1 text-center">
                <span class="text-xs font-medium text-gray-600">大写</span>
                <span class="text-[10px] text-gray-400 block">A-Z</span>
              </div>
            </label>
            <label class="relative flex flex-col items-center p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
              <input type="checkbox" v-model="options.special" class="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500" />
              <div class="mt-1 text-center">
                <span class="text-xs font-medium text-gray-600">特殊</span>
                <span class="text-[10px] text-gray-400 block">!@#$%</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 快速选项 -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">快速选项</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="preset in presets"
              :key="preset.name"
              class="relative flex items-center p-3 rounded-xl transition-all duration-200 border-2"
              :class="[
                currentPreset === preset.name
                  ? 'bg-blue-50 border-blue-500 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
              ]"
              @click="applyPreset(preset)"
            >
              <div class="flex items-center justify-center w-10 h-10 rounded-lg mr-3"
                :class="[
                  currentPreset === preset.name
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                ]"
              >
                <CalculatorIcon v-if="preset.name === '纯数字'" class="h-5 w-5" :class="currentPreset === preset.name ? 'text-blue-600' : 'text-gray-600'" />
                <HashtagIcon v-else-if="preset.name === 'PIN码'" class="h-5 w-5" :class="currentPreset === preset.name ? 'text-blue-600' : 'text-gray-600'" />
                <DocumentTextIcon v-else-if="preset.name === '字母数字'" class="h-5 w-5" :class="currentPreset === preset.name ? 'text-blue-600' : 'text-gray-600'" />
                <ShieldCheckIcon v-else class="h-5 w-5" :class="currentPreset === preset.name ? 'text-blue-600' : 'text-gray-600'" />
              </div>
              <div class="flex flex-col items-start">
                <span class="text-sm font-medium" :class="currentPreset === preset.name ? 'text-blue-700' : 'text-gray-700'">
                  {{ preset.name }}
                </span>
                <span class="text-xs" :class="currentPreset === preset.name ? 'text-blue-600' : 'text-gray-500'">
                  {{ getPresetDescription(preset) }}
                </span>
              </div>
              <div v-if="currentPreset === preset.name" class="absolute top-2 right-2">
                <CheckCircleIcon class="h-5 w-5 text-blue-500" />
              </div>
            </button>
          </div>
        </div>

        <!-- 生成按钮 -->
        <button
          class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          @click="generatePassword"
        >
          <SparklesIcon class="h-5 w-5 mr-2" />
          生成密码
        </button>

        <!-- 生成结果 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">生成结果</label>
            <button 
              class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
              @click="copyPassword"
            >
              <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
              复制
            </button>
          </div>
          <div class="relative">
            <input
              type="text"
              v-model="generatedPassword"
              readonly
              class="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono bg-gray-50"
            />
          </div>
        </div>

        <!-- 密码强度指示器 -->
        <div class="space-y-2 bg-gray-50 p-4 rounded-lg">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">密码强度</span>
            <span class="text-sm font-medium" :class="strengthTextColor">{{ strengthText }}</span>
          </div>
          <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300"
              :class="strengthColor"
              :style="{ width: strengthPercentage + '%' }"
            ></div>
          </div>
          <div class="grid grid-cols-4 gap-1 mt-2">
            <div v-for="(score, index) in strengthScores" :key="index"
              class="h-1 rounded-full transition-all duration-300"
              :class="calculateStrength.value >= (index + 1) * 25 ? strengthColor : 'bg-gray-200'"
            ></div>
          </div>
        </div>

        <!-- 密码历史记录 -->
        <div v-if="passwordHistory.length > 0" class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">历史记录</label>
            <div class="flex items-center gap-2">
              <button
                class="text-gray-500 hover:text-gray-700"
                @click="togglePasswordVisibility"
              >
                <EyeIcon v-if="showPassword" class="h-4 w-4" />
                <EyeSlashIcon v-else class="h-4 w-4" />
              </button>
              <button 
                class="text-gray-600 text-sm hover:text-gray-800 flex items-center"
                @click="clearHistory"
              >
                <TrashIcon class="h-4 w-4 mr-1" />
                清空
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <div
              v-for="(password, index) in passwordHistory.slice(0, 5)"
              :key="index"
              class="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
            >
              <span class="text-sm font-mono">{{ maskPassword(password) }}</span>
              <button
                class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                @click="() => copyHistoryPassword(password)"
              >
                <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { 
  EyeIcon, 
  EyeSlashIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  CalculatorIcon,
  HashtagIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import ToolCard from './ToolCard.vue'

const showNotification = inject('showNotification')
const autoExecute = inject('autoExecute')

// 状态
const length = ref(16)
const options = ref({
  numbers: true,
  lowercase: true,
  uppercase: true,
  special: false
})
const generatedPassword = ref('')
const showPassword = ref(false)
const passwordHistory = ref([])
const currentPreset = ref('')
const strengthScores = [25, 50, 75, 100]

// 增减密码长度
const decreaseLength = () => {
  if (length.value > 4) {
    length.value--
  }
}

const increaseLength = () => {
  if (length.value < 64) {
    length.value++
  }
}

// 预设选项
const presets = [
  { name: '纯数字', options: { numbers: true, lowercase: false, uppercase: false, special: false } },
  { name: '字母数字', options: { numbers: true, lowercase: true, uppercase: true, special: false } },
  { name: '强密码', options: { numbers: true, lowercase: true, uppercase: true, special: true } },
  { name: 'PIN码', length: 6, options: { numbers: true, lowercase: false, uppercase: false, special: false } }
]

// 应用预设
const applyPreset = (preset) => {
  currentPreset.value = preset.name
  if (preset.length) {
    length.value = preset.length
  }
  options.value = { ...preset.options }
}

// 清空历史记录
const clearHistory = () => {
  passwordHistory.value = []
  showNotification('历史记录已清空')
}

// 密码强度文本颜色
const strengthTextColor = computed(() => {
  const strength = calculateStrength.value
  if (strength >= 80) return 'text-green-600'
  if (strength >= 60) return 'text-blue-600'
  if (strength >= 40) return 'text-yellow-600'
  if (strength > 0) return 'text-red-600'
  return 'text-gray-400'
})

// 生成密码
const generatePassword = () => {
  // 检查是否至少选择了一个选项
  const hasSelectedOption = Object.values(options.value).some(value => value)
  if (!hasSelectedOption) {
    showNotification('请至少选择一个密码选项', 'error')
    return
  }

  // 构建字符集
  let charset = ''
  if (options.value.numbers) charset += '0123456789'
  if (options.value.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (options.value.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (options.value.special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

  // 生成密码
  let password = ''
  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)
  
  for (let i = 0; i < length.value; i++) {
    password += charset[array[i] % charset.length]
  }

  // 确保密码包含所有选中的字符类型
  const ensureCharTypes = () => {
    if (options.value.numbers && !/\d/.test(password)) return false
    if (options.value.lowercase && !/[a-z]/.test(password)) return false
    if (options.value.uppercase && !/[A-Z]/.test(password)) return false
    if (options.value.special && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) return false
    return true
  }

  // 如果不满足所有要求，重新生成
  while (!ensureCharTypes()) {
    password = ''
    crypto.getRandomValues(array)
    for (let i = 0; i < length.value; i++) {
      password += charset[array[i] % charset.length]
    }
  }

  generatedPassword.value = password
  if (password) {
    passwordHistory.value.unshift(password)
    if (passwordHistory.value.length > 5) {
      passwordHistory.value.pop()
    }
  }
}

// 复制密码
const copyPassword = async () => {
  if (!generatedPassword.value) {
    showNotification('请先生成密码', 'error')
    return
  }

  try {
    await navigator.clipboard.writeText(generatedPassword.value)
    showNotification('密码已复制到剪贴板')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

// 复制历史密码
const copyHistoryPassword = async (password) => {
  try {
    await navigator.clipboard.writeText(password)
    showNotification('密码已复制到剪贴板')
  } catch (error) {
    showNotification('复制失败', 'error')
  }
}

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 掩码显示密码
const maskPassword = (password) => {
  return showPassword.value ? password : '•'.repeat(password.length)
}

// 计算密码强度
const calculateStrength = computed(() => {
  if (!generatedPassword.value) return 0
  
  let strength = 0
  const password = generatedPassword.value
  
  // 长度得分
  strength += Math.min(password.length * 4, 40)
  
  // 字符类型得分
  if (/[0-9]/.test(password)) strength += 10
  if (/[a-z]/.test(password)) strength += 10
  if (/[A-Z]/.test(password)) strength += 10
  if (/[^A-Za-z0-9]/.test(password)) strength += 10
  
  // 复杂性得分
  if (/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength += 10
  if (/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(password)) strength += 10
  
  return Math.min(strength, 100)
})

// 密码强度文本
const strengthText = computed(() => {
  const strength = calculateStrength.value
  if (strength >= 80) return '非常强'
  if (strength >= 60) return '强'
  if (strength >= 40) return '中等'
  if (strength > 0) return '弱'
  return '无'
})

// 密码强度颜色
const strengthColor = computed(() => {
  const strength = calculateStrength.value
  if (strength >= 80) return 'text-green-600 bg-green-600'
  if (strength >= 60) return 'text-blue-600 bg-blue-600'
  if (strength >= 40) return 'text-yellow-600 bg-yellow-600'
  if (strength > 0) return 'text-red-600 bg-red-600'
  return 'text-gray-400 bg-gray-400'
})

// 密码强度百分比
const strengthPercentage = computed(() => calculateStrength.value)

// 获取预设描述
const getPresetDescription = (preset) => {
  switch (preset.name) {
    case '纯数字':
      return '仅包含数字'
    case 'PIN码':
      return '6位数字密码'
    case '字母数字':
      return '字母和数字组合'
    case '强密码':
      return '包含所有字符类型'
    default:
      return ''
  }
}

// 监听选项变化
watch([options, length], () => {
  if (autoExecute.value) {
    generatePassword()
  }
}, { deep: true })

// 监听自动执行状态变化
onMounted(() => {
  window.addEventListener('clearAllContent', clearHistory)
  window.addEventListener('autoExecuteChanged', handleAutoExecuteChanged)
})

onUnmounted(() => {
  window.removeEventListener('clearAllContent', clearHistory)
  window.removeEventListener('autoExecuteChanged', handleAutoExecuteChanged)
})

// 处理自动执行状态变化
const handleAutoExecuteChanged = (event) => {
  if (event.detail) {
    generatePassword()
  }
}
</script> 