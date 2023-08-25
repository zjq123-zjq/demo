<script setup lang="ts">
defineProps<{
  name: String
}>()
</script>

<template>
  <div>
    <svg aria-hidden="true" class="cp-icon">
      <use :href="`#icon-${name}`" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.cp-icon {
  width: 1em;
  height: 1em;
}
</style>
