<template>
  <div class="flex items-center justify-between flex-wrap" :class="{ 'title-sticky': !!sticky }">
    <div class="flex-shrink-0 flex">
      <div
        v-if="!!title"
        class="title px-10px -ml-5px relative font-extrabold flex items-center"
        @click="$emit('clickTitle')"
      >
        <SvgIcon v-if="!!name" class="icon" :name="name" />
        <i v-else-if="!!icon" class="icon" :class="icon"></i>
        <slot>
          <span class="text-18px text-[#303133] ml-6px">{{ title }}</span>
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

<script setup lang="ts">
import { onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
defineOptions({
  name: 'TitleBar'
})
defineEmits(['clickTitle'])
defineProps({
  title: String,
  icon: String,
  name: String,
  sticky: Boolean
})

onMounted(() => {
  const el = document.querySelector('.title-sticky')
  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle('shadow', e.intersectionRatio < 1),
    {
      threshold: [1]
    }
  )
  if (el) observer.observe(el)
})
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

.title-sticky {
  position: sticky;
  top: -21px;
  z-index: 9;
  background-color: white;
  padding: 10px 0;
}
.shadow {
  box-shadow: 0 10px 10px -8px rgba($color: #000000, $alpha: 0.1);
}
</style>
