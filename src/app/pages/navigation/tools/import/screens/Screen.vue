<template>
  <div :class="$style.screen">
    <h1 v-if="title" :class="$style.title">
      <Button v-if="back" color="dark" :icon="RiArrowLeftSLine" textual @click="back" />
      <span>{{ title }}</span>
    </h1>
    <div :class="classes">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RiArrowLeftSLine } from '@remixicon/vue';
import { computed } from 'vue';
import Button from '@components/base/button/Button.vue';
import { ClassNames } from '@utils';

const props = defineProps<{
  class?: ClassNames;
  title?: string;
  back?: () => void;
}>();

const classes = computed(() => props.class);
</script>

<style lang="scss" module>
.screen {
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  align-items: center;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-m);
  margin-bottom: 10px;
}
</style>
