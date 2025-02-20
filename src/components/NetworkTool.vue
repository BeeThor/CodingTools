<template>
  <div class="space-y-6">
    <!-- IP 地址查询 -->
    <ToolCard>
      <template #title>IP 地址查询</template>
      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="ipAddress"
              type="text"
              class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="请输入 IP 地址"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GlobeAltIcon class="h-5 w-5 text-gray-400" />
            </div>
            <button 
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="pasteIP"
            >
              <ClipboardIcon class="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <button
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5"
            @click="lookupIP"
          >
            <MagnifyingGlassIcon class="h-4 w-4" />
            查询
          </button>
        </div>
        <div v-if="ipInfo" class="space-y-2">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="grid grid-cols-2 divide-x divide-y divide-gray-100">
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <MapPinIcon class="h-4 w-4 text-red-500" />
                  国家/地区
                </dt>
                <dd class="text-sm text-gray-900">{{ ipInfo.country }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <BuildingOfficeIcon class="h-4 w-4 text-blue-500" />
                  城市
                </dt>
                <dd class="text-sm text-gray-900">{{ ipInfo.city }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <ServerIcon class="h-4 w-4 text-green-500" />
                  ISP
                </dt>
                <dd class="text-sm text-gray-900">{{ ipInfo.isp }}</dd>
              </div>
              <div class="p-4 hover:bg-gray-50 transition-colors duration-150">
                <dt class="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <ClockIcon class="h-4 w-4 text-purple-500" />
                  时区
                </dt>
                <dd class="text-sm text-gray-900">{{ ipInfo.timezone }}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- 端口扫描 -->
    <ToolCard>
      <template #title>端口扫描</template>
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">端口扫描</label>
          </div>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <input
                v-model="scanHost"
                type="text"
                class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="请输入要扫描的主机地址"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GlobeAltIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              class="rounded-lg px-4 text-sm font-medium text-white transition-colors duration-200 flex items-center gap-1.5"
              :class="isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'"
              @click="isScanning ? stopScanning() : scanPorts()"
            >
              <component :is="isScanning ? StopIcon : RocketLaunchIcon" class="h-4 w-4" />
              {{ isScanning ? '停止扫描' : '开始扫描' }}
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-600">起始端口</label>
              <input
                v-model="startPort"
                type="number"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="1-65535"
                min="1"
                max="65535"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-600">结束端口</label>
              <input
                v-model="endPort"
                type="number"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="1-65535"
                min="1"
                max="65535"
              />
            </div>
          </div>
          <!-- 扫描进度和统计 -->
          <div v-if="scanResults.length > 0" class="space-y-4">
            <div class="bg-white rounded-lg border p-4 space-y-3">
              <!-- 进度条 -->
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">扫描进度</span>
                  <span class="text-sm font-medium text-gray-700">
                    {{ Math.round((scanResults.length / (endPort - startPort + 1)) * 100) }}%
                  </span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                    :style="{ width: `${(scanResults.length / (endPort - startPort + 1)) * 100}%` }"
                  ></div>
                </div>
              </div>
              <!-- 统计数据 -->
              <div class="grid grid-cols-3 gap-3">
                <div class="text-center p-3 rounded-lg bg-gray-50">
                  <div class="text-sm font-medium text-gray-600">总端口</div>
                  <div class="text-lg font-semibold text-gray-700">{{ endPort - startPort + 1 }}</div>
                </div>
                <div class="text-center p-3 rounded-lg bg-green-50">
                  <div class="text-sm font-medium text-green-600">开放</div>
                  <div class="text-lg font-semibold text-green-700">
                    {{ scanResults.filter(r => r.status === 'open').length }}
                  </div>
                </div>
                <div class="text-center p-3 rounded-lg bg-red-50">
                  <div class="text-sm font-medium text-red-600">关闭</div>
                  <div class="text-lg font-semibold text-red-700">
                    {{ scanResults.filter(r => r.status === 'closed').length }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 扫描结果列表 -->
            <div class="max-h-60 overflow-y-auto rounded-lg border bg-white" ref="resultContainer">
              <div class="divide-y divide-gray-100">
                <div
                  v-for="result in scanResults"
                  :key="result.port"
                  class="p-3 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                >
                  <span class="text-sm font-medium text-gray-700">端口 {{ result.port }}</span>
                  <span 
                    class="text-sm font-medium px-2 py-1 rounded-full"
                    :class="result.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ result.status === 'open' ? '开放' : '关闭' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- Ping 测试 -->
    <ToolCard>
      <template #title>Ping 测试</template>
      <div class="space-y-4">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="pingHost"
              type="text"
              class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="请输入主机地址"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SignalIcon class="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1.5"
            @click="startPing"
          >
            <PlayIcon class="h-4 w-4" />
            开始测试
          </button>
        </div>
        <div v-if="pingResults.length > 0" class="space-y-4">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">测试结果</h4>
              <div class="space-y-2">
                <div v-for="(result, index) in pingResults" :key="index" 
                  class="flex items-center justify-between p-2 rounded-lg transition-colors duration-150"
                  :class="result.success ? 'bg-green-50' : 'bg-red-50'"
                >
                  <span class="text-sm text-gray-600">第 {{ index + 1 }} 次</span>
                  <span :class="[
                    'text-sm font-medium px-2 py-1 rounded-md',
                    result.success 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                  ]">
                    {{ result.success ? `${result.time}ms` : '超时' }}
                  </span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                    <dt class="text-sm font-medium text-blue-700 mb-1">平均延迟</dt>
                    <dd class="text-2xl font-semibold text-blue-600">{{ averagePingTime }}ms</dd>
                  </div>
                  <div class="p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                    <dt class="text-sm font-medium text-red-700 mb-1">丢包率</dt>
                    <dd class="text-2xl font-semibold text-red-600">{{ packetLoss }}%</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>

    <!-- DNS 查询 -->
    <ToolCard>
      <template #title>DNS 查询</template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">域名</label>
            <div class="relative">
              <input
                v-model="domain"
                type="text"
                class="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="请输入域名"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GlobeAltIcon class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">记录类型</label>
            <div class="relative group">
              <select
                v-model="recordType"
                class="w-full appearance-none rounded-lg border border-gray-300 pl-4 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:bg-gray-50"
              >
                <option value="A">A 记录</option>
                <option value="AAAA">AAAA 记录</option>
                <option value="CNAME">CNAME 记录</option>
                <option value="MX">MX 记录</option>
                <option value="TXT">TXT 记录</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-gray-500">
                <ChevronUpDownIcon class="h-4 w-4 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>
        <button
          class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1.5"
          @click="queryDNS"
        >
          <MagnifyingGlassIcon class="h-4 w-4" />
          查询
        </button>
        <div v-if="dnsResults.length > 0" class="space-y-2">
          <div class="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div class="p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">查询结果</h4>
              <div class="space-y-2">
                <div v-for="(result, index) in dnsResults" :key="index" 
                  class="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-gray-700">记录 #{{ index + 1 }}</span>
                    <span class="text-xs text-gray-500">TTL: {{ result.ttl }}s</span>
                  </div>
                  <div class="text-sm text-gray-600 font-mono">{{ result.value }}</div>
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
import { ref, computed, inject, nextTick, watch } from 'vue'
import axios from 'axios'
import ToolCard from './ToolCard.vue'
import { 
  ClipboardIcon,
  GlobeAltIcon,
  ServerIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  RocketLaunchIcon,
  SignalIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ArrowPathIcon,
  StopIcon
} from '@heroicons/vue/24/outline'

const showNotification = inject('showNotification')

// IP 地址查询
const ipAddress = ref('')
const ipInfo = ref(null)

const lookupIP = async () => {
  if (!ipAddress.value) {
    showNotification('请输入 IP 地址', 'error')
    return
  }

  try {
    const response = await axios.get(`https://ipwho.is/${ipAddress.value}`)
    ipInfo.value = {
      country: response.data.country,
      city: response.data.city,
      isp: response.data.connection.isp,
      timezone: response.data.timezone.id
    }
    showNotification('IP 地址查询成功')
  } catch (error) {
    showNotification('IP 地址查询失败：请检查网络连接或稍后重试', 'error')
  }
}

const pasteIP = async () => {
  try {
    const text = await navigator.clipboard.readText()
    if (text) {
      ipAddress.value = text
    }
  } catch (error) {
    showNotification('粘贴失败', 'error')
  }
}

// 端口扫描
const scanHost = ref('')
const startPort = ref(1)
const endPort = ref(500)
const scanResults = ref([])
const isScanning = ref(false)
const shouldStopScanning = ref(false)
const resultContainer = ref(null)

// 停止扫描
const stopScanning = () => {
  shouldStopScanning.value = true
}

// 端口扫描
const scanPorts = async () => {
  if (!scanHost.value) {
    showNotification('请输入要扫描的主机地址', 'error')
    return
  }

  const start = parseInt(startPort.value)
  const end = parseInt(endPort.value)

  if (isNaN(start) || isNaN(end) || start < 1 || end > 65535 || start > end) {
    showNotification('请输入有效的端口范围（1-65535）', 'error')
    return
  }

  if (end - start > 500) {
    showNotification('为了性能考虑，最多只能扫描500个端口', 'error')
    return
  }

  isScanning.value = true
  shouldStopScanning.value = false
  scanResults.value = []
  showNotification('开始扫描端口...')

  const ports = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  )

  // 使用 WebSocket 进行端口扫描
  const scanPort = async (port) => {
    if (shouldStopScanning.value) {
      return { port, status: 'closed' }
    }

    try {
      const ws = new WebSocket(`ws://${scanHost.value}:${port}`)
      return new Promise((resolve) => {
        ws.onerror = () => {
          resolve({ port, status: 'closed' })
          ws.close()
        }
        ws.onopen = () => {
          resolve({ port, status: 'open' })
          ws.close()
        }
        // 设置超时
        setTimeout(() => {
          resolve({ port, status: 'closed' })
          ws.close()
        }, 1000)
      })
    } catch {
      return { port, status: 'closed' }
    }
  }

  // 并发扫描端口
  const batchSize = 10
  for (let i = 0; i < ports.length; i += batchSize) {
    if (shouldStopScanning.value) {
      break
    }

    const batch = ports.slice(i, i + batchSize)
    const results = await Promise.all(batch.map(scanPort))
    scanResults.value.push(...results)
    
    // 自动滚动到最新结果，但仅当用户没有手动滚动时
    await nextTick()
    if (resultContainer.value) {
      const container = resultContainer.value
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
      if (isAtBottom) {
        container.scrollTop = container.scrollHeight
      }
    }
  }

  isScanning.value = false
  shouldStopScanning.value = false
  showNotification(
    shouldStopScanning.value ? '端口扫描已停止' : '端口扫描完成'
  )
}

// Ping 测试
const pingHost = ref('')
const pingResults = ref([])
const pingCount = 4

const startPing = async () => {
  if (!pingHost.value) {
    showNotification('请输入主机地址', 'error')
    return
  }

  pingResults.value = []
  showNotification('开始 Ping 测试')

  for (let i = 0; i < 4; i++) {
    const startTime = Date.now()
    try {
      await fetch(`http://${pingHost.value}`, { 
        mode: 'no-cors',
        timeout: 3000
      })
      const endTime = Date.now()
      pingResults.value.push({
        success: true,
        time: endTime - startTime
      })
    } catch (error) {
      pingResults.value.push({
        success: false,
        time: 0
      })
    }
    // 等待 1 秒再发送下一个请求
    if (i < 3) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  showNotification('Ping 测试完成')
}

const averagePingTime = computed(() => {
  const successfulPings = pingResults.value.filter(r => r.success)
  if (successfulPings.length === 0) return 0
  const total = successfulPings.reduce((sum, r) => sum + r.time, 0)
  return Math.round(total / successfulPings.length)
})

const packetLoss = computed(() => {
  if (pingResults.value.length === 0) return 0
  const lost = pingResults.value.filter(r => !r.success).length
  return Math.round((lost / pingResults.value.length) * 100)
})

// DNS 查询
const domain = ref('')
const recordType = ref('A')
const dnsResults = ref([])

const queryDNS = async () => {
  if (!domain.value) {
    showNotification('请输入域名', 'error')
    return
  }

  try {
    showNotification('正在查询 DNS 记录...')
    const response = await axios.get(`https://cloudflare-dns.com/dns-query`, {
      params: {
        name: domain.value,
        type: recordType.value
      },
      headers: {
        'Accept': 'application/dns-json'
      }
    })

    if (response.data.Answer) {
      dnsResults.value = response.data.Answer.map(record => ({
        value: record.data,
        ttl: record.TTL
      }))
      showNotification('DNS 查询成功')
    } else {
      dnsResults.value = []
      showNotification('未找到 DNS 记录', 'warning')
    }
  } catch (error) {
    showNotification('DNS 查询失败：' + error.message, 'error')
  }
}

// 监听扫描结果变化，自动滚动到底部
watch(scanResults, () => {
  nextTick(() => {
    if (resultContainer.value) {
      resultContainer.value.scrollTop = resultContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script> 