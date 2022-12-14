<template>
  <div class="">
    <a-layout class="h-full">
      <a-layout-sider :width="240">
        <div class="m-4">
          <div class="font-bold">组件</div>
          <draggable
            :list="fields"
            :group="{ name: 'widgets', pull: 'clone', put: false }"
            item-key="type"
            :sort="false"
            :clone="cloneWidgetConfigFromRaw"
            class="drag-section-container"
          >
            <template #item="{ element }: { element: WidgetsConfig }">
              <div class="draggable-item" :data-key="element.type">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
        <a-divider />
        <div class="m-4">
          <div class="font-bold">操作</div>
          <a-space direction="vertical" class="mt-4 w-full">
            <a-button
              type="outline"
              long
              :disabled="copied"
              @click="copy()"
            >{{ copied ? '已复制' : '复制 AST 源码' }}</a-button>
            <a-button
              type="outline"
              long
              @click="copy()"
            >编辑数据源</a-button>
            <a-button
              type="primary"
              long
              @click="showPreview"
            >预览表单</a-button>
          </a-space>
        </div>
      </a-layout-sider>
      <a-layout-content class="bg-gray-50 p-4">
        <!-- insert widget-form -->
        <widget-form v-model:ast="ast" />
      </a-layout-content>
      <a-layout-sider :width="240" data-simplebar>
        <div class="flex">
          <div
            class="panel-tab"
            :class="{ active: activeTab === 0 }"
            @click="activeTab = 0"
          >表单配置</div>
          <div
            class="panel-tab"
            :class="{ active: activeTab !== 0 }"
            @click="activeTab = 1"
          >控件配置</div>
        </div>
        <div class="p-4">
          <config-panel-form
            v-show="activeTab === 0"
            :config="ast.formConfig"
          />
          <div v-show="activeTab !== 0">
            <config-panel-widget
              v-if="selectedWidget"
              v-model:widget-config="selectedWidget"
            />
          </div>
        </div>
      </a-layout-sider>
    </a-layout>

    <a-modal v-model:visible="previewVisible" fullscreen>
      <template #title>表单预览</template>
      <s-form :ast="ast" />
    </a-modal>

    <a-modal v-model:visible="dataSourcesEditorVisible" fullscreen>
      <template #title>数据源编辑</template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
  computed
} from 'vue'
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import { useClipboard } from '@vueuse/core'
import { fields, findWidgetWithUID } from './use-draggable-data'
import WidgetForm from './widget-form.vue'
import ConfigPanelForm from './config-panel-form.vue'
import ConfigPanelWidget from './config-panel-widget.vue'
import SForm from '../s-form/index.vue'
import { generateUID } from '@/utils'
import {
  // imported type used in template incorrectly throws warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  WidgetsConfig,
  AST,
  FormDesignerContext,
  contextSymbol
} from './types'

const ast = ref<AST>({
  formConfig: {
    labelAlign: 'right',
    layout: 'vertical',
    size: 'medium'
  },
  dataSources: [],
  widgetsConfig: []
})

const source = computed(() => JSON.stringify(ast.value))

const { copy, copied } = useClipboard({
  source
})

const activeTab = ref(0)

const previewVisible = ref(false)
const dataSourcesEditorVisible = ref(false)

const cloneWidgetConfigFromRaw = (config: WidgetsConfig) => {
  const uid = generateUID()
  config.uid = uid
  return cloneDeep(config)
}

const removeWidget = (idx: number, uid: string) => {
  console.log(`delete ${idx} element with uid ${uid}`)
  if (ast.value.widgetsConfig[idx].uid === uid) {
    ast.value.widgetsConfig.splice(idx, 1)
  } else {
    for (let i = 0; i < ast.value.widgetsConfig.length; i++) {
      const widget = ast.value.widgetsConfig[i]
      if (widget.type === 'grid' && widget.cols.length > 0) {
        for (let j = 0; j < widget.cols.length; j++) {
          const subWidgets = widget.cols[j].widgets
          for (let k = 0; k < widget.cols[j].widgets.length; k++) {
            if (subWidgets[k].uid === uid) {
              subWidgets.splice(k, 1)
            }
          }
        }
      }
    }
  }
}

const duplicateWidget = (idx: number) => {
  const newWidgetConfig = { ...ast.value.widgetsConfig[idx] }
  ast.value.widgetsConfig.splice(idx, 0, newWidgetConfig)
}

const addWidget = (widget: WidgetsConfig, idx?: number) => {
  if (!idx) {
    ast.value.widgetsConfig.push(widget)
  } else {
    ast.value.widgetsConfig.splice(idx, 0, widget)
  }
}

const selectedUID = ref<string>('')
const selectedWidget = computed(() => findWidgetWithUID(ast.value.widgetsConfig, selectedUID.value))

const setSelectedUID = (uid: string) => {
  selectedUID.value = uid
}

const showPreview = () => {
  previewVisible.value = true
}

provide<FormDesignerContext>(contextSymbol, {
  selectedUID,
  setSelectedUID,
  addWidget,
  removeWidget,
  duplicateWidget,
  ast
})
</script>

<style lang="scss" scoped>
.drag-section-container {
  @apply grid grid-cols-2 gap-2 my-4;
}
.draggable-item {
  @apply bg-blue-50 px-2 py-2 text-center inline-block text-xs select-none cursor-move
    border-dashed border border-transparent hover:border-blue-500 hover:text-blue-500;
}
.panel-tab {
  @apply w-1/2 text-center py-4 first:border-r border-b bg-slate-100 text-gray-600 cursor-pointer;
  &.active {
    @apply bg-white text-blue-500;
  }
}
</style>
