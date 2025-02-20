import { inject } from 'vue'

// 创建一个通知工具函数
export const useNotification = () => {
  const showNotification = inject('showNotification')
  
  return {
    success: (message) => showNotification(message, 'success'),
    error: (message) => showNotification(message, 'error')
  }
} 