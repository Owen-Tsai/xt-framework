<template>
  <a-form-item label="字段名称">
    <a-input v-model="config.config.label" allow-clear />
  </a-form-item>
  <a-form-item label="宽度">
    <a-input
      v-model="config.config.width"
      placeholder="输入含单位(%/px)的数值"
      allow-clear
    />
  </a-form-item>
  <a-form-item
    label="展开下一级的触发方式"
  >
    <a-select v-model="config.config.expandTrigger">
      <a-option value="click">点击</a-option>
      <a-option value="hover">悬浮</a-option>
    </a-select>
  </a-form-item>
  <div class="mb-2">
    <span>默认内容</span>
    <a-input v-model="config.config.placeholder" class="mt-2" />
  </div>
  <div class="boolean-config mt-4 mb-4">
    <span class="label !mb-0 mr-4">是否禁用</span>
    <a-switch v-model="config.config.disabled" />
  </div>
  <div class="boolean-config mt-4 mb-4">
    <span class="label !mb-0 mr-4">是否允许搜索</span>
    <a-switch v-model="config.config.allowSearch" />
  </div>
  <div class="boolean-config mt-4 mb-4">
    <span class="label !mb-0 mr-4">是否允许清除</span>
    <a-switch v-model="config.config.allowClear" />
  </div>
  <div class="boolean-config mt-4 mb-4">
    <span class="label !mb-0 mr-4">是否为多选状态</span>
    <a-switch v-model="config.config.multiple" />
  </div>
  <div class="boolean-config mt-4 mb-4">
    <span class="label !mb-0 mr-4">是否开启严格选择模式</span>
    <a-switch v-model="config.config.checkStrictly" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType
} from 'vue'
import { IConfigCascader } from '../types';

const emit = defineEmits(['update:widgetConfig'])
const props = defineProps({
  widgetConfig: {
    type: Object as PropType<IConfigCascader>,
    required: true
  }
})
const config = computed({
  get: () => props.widgetConfig,
  set: (val) => {
    emit('update:widgetConfig', val)
  }
})
</script>

<style lang="scss" scoped>

</style>
