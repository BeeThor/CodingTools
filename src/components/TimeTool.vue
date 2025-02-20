<template>
  <div class="space-y-6">
    <!-- 时间戳转换 -->
    <ToolCard>
      <template #title>时间戳转换</template>
      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="timestamp"
              type="text"
              class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="请输入时间戳"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ClockIcon class="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            class="rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5"
            @click="getCurrentTimestamp"
          >
            <ArrowPathIcon class="h-4 w-4" />
            获取当前时间戳
          </button>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-600">转换结果</label>
            <button 
              class="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1.5"
              @click="copyText(formattedDate)"
            >
              <DocumentDuplicateIcon class="h-4 w-4" />
              复制
            </button>
          </div>
          <input
            type="text"
            :value="formattedDate"
            class="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50"
            readonly
          />
        </div>
      </div>
    </ToolCard>

    <!-- 日期格式化 -->
    <ToolCard>
      <template #title>日期格式化</template>
      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="dateInput"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon class="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            class="rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5"
            @click="getCurrentDate"
          >
            <ArrowPathIcon class="h-4 w-4" />
            获取当前时间
          </button>
        </div>
        <div class="flex gap-2">
          <div class="relative flex-1 group">
            <select
              v-model="selectedFormat"
              class="w-full appearance-none rounded-lg border border-gray-300 pl-4 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
            >
              <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
              <option value="YYYY/MM/DD HH:mm">YYYY/MM/DD HH:mm</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY年MM月DD日">YYYY年MM月DD日</option>
              <option value="custom">自定义格式</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-500">
              <ChevronUpDownIcon class="h-4 w-4 transition-colors duration-200" />
            </div>
          </div>
          <button
            class="rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5"
            @click="formatDate"
          >
            <ArrowPathIcon class="h-4 w-4" />
            格式化
          </button>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-600">格式化结果</label>
            <button 
              class="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1.5"
              @click="copyText(formattedCustomDate)"
            >
              <DocumentDuplicateIcon class="h-4 w-4" />
              复制
            </button>
          </div>
          <input
            type="text"
            :value="formattedCustomDate"
            class="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50"
            readonly
          />
        </div>
      </div>
    </ToolCard>

    <!-- 日期计算 -->
    <ToolCard>
      <template #title>日期计算</template>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">基准日期</label>
            <div class="relative">
              <input
                v-model="baseDate"
                type="date"
                class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">计算类型</label>
            <div class="relative group">
              <select
                v-model="calculationType"
                class="w-full appearance-none rounded-lg border border-gray-300 pl-4 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
              >
                <option value="add">增加</option>
                <option value="subtract">减少</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-500">
                <ChevronUpDownIcon class="h-4 w-4 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">数值</label>
            <input
              v-model="calculationValue"
              type="number"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              min="0"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">单位</label>
            <div class="relative group">
              <select
                v-model="calculationUnit"
                class="w-full appearance-none rounded-lg border border-gray-300 pl-4 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
              >
                <option value="days">天</option>
                <option value="months">月</option>
                <option value="years">年</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-500">
                <ChevronUpDownIcon class="h-4 w-4 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-600">计算结果</label>
            <button 
              class="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1.5"
              @click="copyText(calculatedDate)"
            >
              <DocumentDuplicateIcon class="h-4 w-4" />
              复制
            </button>
          </div>
          <input
            type="text"
            :value="calculatedDate"
            class="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50"
            readonly
          />
        </div>
        <div v-if="dateDiff" class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm" :class="dateDiff.color">
              相差 {{ dateDiff.days }} 天
            </span>
            <div class="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
              <div class="h-full transition-all duration-300"
                :class="{
                  'bg-gradient-to-r from-green-400 to-green-600': dateDiff.days <= 7,
                  'bg-gradient-to-r from-yellow-400 to-yellow-600': dateDiff.days > 7 && dateDiff.days <= 14,
                  'bg-gradient-to-r from-orange-400 to-orange-600': dateDiff.days > 14 && dateDiff.days <= 30,
                  'bg-gradient-to-r from-red-400 to-red-600': dateDiff.days > 30
                }"
                :style="{ width: Math.min(dateDiff.days / 365 * 100, 100) + '%' }"
              ></div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div class="text-center p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div class="text-sm font-medium text-blue-600">{{ dateDiff.weeks }}</div>
              <div class="text-xs text-blue-500">周</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div class="text-sm font-medium text-purple-600">{{ dateDiff.months }}</div>
              <div class="text-xs text-purple-500">月</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100">
              <div class="text-sm font-medium text-pink-600">{{ dateDiff.years }}</div>
              <div class="text-xs text-pink-500">年</div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import dayjs from 'dayjs'
import ToolCard from './ToolCard.vue'
import { 
  DocumentDuplicateIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
  ChevronUpDownIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')
const autoExecute = inject('autoExecute')

// 时间戳转换
const timestamp = ref('')
const formattedDate = computed(() => {
  if (!timestamp.value) return ''
  const date = dayjs(parseInt(timestamp.value))
  return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss.SSS') : '无效的时间戳'
})

// 日期格式化
const dateInput = ref('')
const selectedFormat = ref('YYYY-MM-DD HH:mm:ss')
const formattedCustomDate = computed(() => {
  if (!dateInput.value) return ''
  return dayjs(dateInput.value).format(selectedFormat.value)
})

// 日期计算
const baseDate = ref(dayjs().format('YYYY-MM-DD'))
const calculationType = ref('add')
const calculationValue = ref(1)
const calculationUnit = ref('days')
const calculatedDate = computed(() => {
  if (!baseDate.value) return ''
  const date = dayjs(baseDate.value)
  let result
  if (calculationType.value === 'add') {
    result = date.add(calculationValue.value, calculationUnit.value)
  } else {
    result = date.subtract(calculationValue.value, calculationUnit.value)
  }
  return result.format('YYYY-MM-DD')
})

// 计算日期差异
const dateDiff = computed(() => {
  if (!baseDate.value) return null
  const date = dayjs(baseDate.value)
  const result = calculationType.value === 'add' 
    ? date.add(calculationValue.value, calculationUnit.value)
    : date.subtract(calculationValue.value, calculationUnit.value)
  
  const diff = Math.abs(result.diff(date, 'day'))
  const weeks = Math.floor(diff / 7)
  const months = Math.floor(diff / 30)
  const years = Math.floor(diff / 365)
  
  let color = 'text-gray-600'
  if (diff > 30) color = 'text-red-600'
  else if (diff > 14) color = 'text-orange-600'
  else if (diff > 7) color = 'text-yellow-600'
  else color = 'text-green-600'
  
  return {
    days: diff,
    weeks,
    months,
    years,
    color
  }
})

// 获取当前时间戳
const getCurrentTimestamp = () => {
  timestamp.value = Date.now().toString()
}

// 获取当前日期
const getCurrentDate = () => {
  dateInput.value = dayjs().format('YYYY-MM-DDTHH:mm:ss')
}

// 格式化日期
const formatDate = () => {
  if (!dateInput.value) {
    return
  }
  showNotification('日期格式化成功')
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

// 监听输入变化
watch([timestamp, dateInput], () => {
  if (autoExecute.value) {
    if (timestamp.value) {
      showNotification('时间戳转换成功')
    }
    if (dateInput.value) {
      showNotification('日期格式化成功')
    }
  }
})

// 监听日期计算相关变化
watch([baseDate, calculationType, calculationValue, calculationUnit], () => {
  if (autoExecute.value && baseDate.value) {
    showNotification('日期计算成功')
  }
})

// 组件挂载时初始化
onMounted(() => {
  window.addEventListener('clearAllContent', clearContent)
  window.addEventListener('autoExecuteChanged', handleAutoExecuteChanged)
  
  // 初始化时如果有默认值，显示提示
  if (baseDate.value) {
    showNotification('日期计算初始化完成')
  }
})

onUnmounted(() => {
  window.removeEventListener('clearAllContent', clearContent)
  window.removeEventListener('autoExecuteChanged', handleAutoExecuteChanged)
})

// 处理自动执行状态变化
const handleAutoExecuteChanged = (event) => {
  if (event.detail) {
    formatDate()
  }
}

// 清空内容
const clearContent = () => {
  timestamp.value = ''
  dateInput.value = ''
  baseDate.value = dayjs().format('YYYY-MM-DD')
  calculationValue.value = 1
}
</script>

<style scoped>
/* 美化日期选择器 */
input[type="datetime-local"],
input[type="date"] {
  -webkit-appearance: none;
  background-image: none;
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