<template>
  <a-form
    auto-label-width
    :model="form"
    class="max-w-lg mx-auto"
  >
    <a-form-item
      label="姓名"
      field="name"
      required
    >
      <a-input v-model="form.name" />
    </a-form-item>

    <a-form-item
      label="生日"
      field="birthday"
      required
    >
      <a-date-picker
        v-model="form.birthday"
        class="w-full"
      />
    </a-form-item>

    <a-form-item
      label="所在部门"
      field="dept"
      required
    >
      <a-select v-model="form.dept">
        <a-option
          v-for="opt in depts"
          :key="opt.value"
          :value="opt.value"
        >{{ opt.label }}</a-option>
      </a-select>
    </a-form-item>

    <a-form-item
      label="工作岗位"
      field="job"
      required
    >
      <a-input v-model="form.job" />
    </a-form-item>

    <a-form-item
      label="电子邮箱"
      field="email"
      required
    >
      <a-input v-model="form.email" />
    </a-form-item>

    <a-form-item
      label="个人简介"
      field="intro"
    >
      <a-textarea v-model="form.intro" />
    </a-form-item>

    <div class="mt-2 pb-4 text-center">
      <a-button
        type="primary"
        html-type="submit"
      >保存</a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getDepts } from '@/api/dept'
import type { IOption } from '@/types'

const form = reactive({
  name: '',
  birthday: '',
  dept: '',
  job: '',
  email: '',
  intro: '',
  address: '',
})

const depts = ref<IOption[]>([])
getDepts().then((res) => {
  depts.value = res.data
})
</script>
