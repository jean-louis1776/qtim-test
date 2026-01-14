<script setup lang="ts">
const props = defineProps<{
  name?: string
}>()

const icon = ref<string | undefined>()

const icons = Object.fromEntries(
  Object.entries(import.meta.glob('~/assets/icons/*.svg', { query: '?raw', import: 'default' })).map(([key, value]) => {
    const filename = key.split('/').pop()?.split('.').shift()
    return [filename, value]
  }),
)

watchEffect(async () => {
  if (props.name && icons[props.name]) {
    icon.value = await icons[props.name]()
  }
})
</script>

<template>
  <div class="icon" v-if="icon" v-html="icon"/>
</template>
