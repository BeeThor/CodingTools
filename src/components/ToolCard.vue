<template>
  <div class="tool-card mb-6">
    <div class="overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200">
      <!-- 标题栏 -->
      <div class="tool-header relative border-b bg-[#f6f6f6] px-4 py-2.5">
        <!-- 窗口按钮装饰 -->
        <div class="absolute left-3 top-1/2 flex -translate-y-1/2 space-x-2">
          <div class="tool-dot close"></div>
          <div class="tool-dot minimize"></div>
          <div class="tool-dot maximize"></div>
        </div>
        <div class="text-center text-sm font-medium text-gray-600">
          <slot name="title"></slot>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="p-4 space-y-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这是一个纯展示组件，不需要任何逻辑
</script>

<style scoped>
.tool-header {
  -webkit-app-region: drag;
  user-select: none;
}

.tool-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
}

.tool-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.2s ease;
}

.tool-dot.close {
  background-color: #ff5f56;
  border: 1px solid #e0443e;
}

.tool-dot.minimize {
  background-color: #ffbd2e;
  border: 1px solid #dea123;
}

.tool-dot.maximize {
  background-color: #27c93f;
  border: 1px solid #1aab29;
}

/* 悬停效果 */
.tool-dot.close:hover::before {
  opacity: 1;
  background-color: #4a0002;
}

.tool-dot.minimize:hover::before {
  opacity: 1;
  background-color: #4a2900;
}

.tool-dot.maximize:hover::before {
  opacity: 1;
  background-color: #003306;
}

/* 适配深色模式 */
@media (prefers-color-scheme: dark) {
  .tool-header {
    background-color: #2d2d2d;
  }
  
  .tool-dot.close {
    border-color: #bf3f39;
  }
  
  .tool-dot.minimize {
    border-color: #bd8b1e;
  }
  
  .tool-dot.maximize {
    border-color: #179023;
  }
}
</style> 