<template>
  <div class="flex items-center justify-between flex-wrap mb-12px">
    <div class="flex-shrink-0 flex">
      <div
        v-if="!!props.title"
        class="title px-10px -ml-5px relative font-extrabold flex items-center"
        @click="$emit('clickTitle')"
      >
        <svg-icon v-if="!!props.iconClass" class="icon" :icon-class="props.iconClass" />
        <i v-else-if="!!props.icon" :class="icon" class="icon"></i>
        <slot>
          <span class="text-18px text-[#303133]">{{ props.title }}</span>
        </slot>
      </div>
      <div class="space">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="space flex-shrink-0 flex">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="TitleBar">
import SvgIcon from '@/components/SvgIcon.vue'
defineEmits(['clickTitle'])
const props = defineProps(['title', 'icon', 'iconClass'])
</script>

<style lang="scss" scoped>
.title {
  &::before {
    position: absolute;
    content: '';
    left: 5px;
    width: 4px;
    height: 24px;
    background-color: #1890ff;
  }
}
.icon {
  margin: 0 5px;
  font-size: 22px;
  color: #606266;
  vertical-align: text-bottom;
}
.space {
  > * {
    margin: 4px;
  }
  > :first-child {
    margin-left: 0;
  }
  > :last-child {
    margin-right: 0;
  }
}
</style>
