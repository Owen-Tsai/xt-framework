<template>
  <main class="px-6 pb-6">
    <s-navs :navs="['menu.dashboard']" />

    <a-row :gutter="16">
      <a-col :span="18">
        <div class="s-section">
          <div class="text-lg">欢迎回来，{{ userInfo.name }}</div>
          <a-divider />
          <data-panel />
          <a-divider />
          <talent-chart />
        </div>

        <a-row :gutter="16" class="mt-4">
          <a-col :span="12">
            <todo-panel />
          </a-col>
          <a-col :span="12">
            <service-chart />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <action-panel />
        <notice-panel class="mt-4" />
      </a-col>
    </a-row>
  </main>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import DataPanel from './widgets/data-panel.vue'
import TalentChart from './widgets/talent-chart.vue'
import ActionPanel from './widgets/action-panel.vue'
import NoticePanel from './widgets/notice-panel.vue'
import TodoPanel from './widgets/todo-panel.vue'
import ServiceChart from './widgets/service-chart.vue'

const { userInfo } = useUserStore()
</script>
