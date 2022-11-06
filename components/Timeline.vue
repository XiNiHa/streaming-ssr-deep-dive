<script setup lang="ts">
defineProps<{
  timeframes: {
    text: string
    boxClass?: string
    textClass?: string
    percentage: number
  }[];
  events: {
    text: string
    boxClass?: string
    textClass?: string
    left: string
  }[];
}>()
</script>

<template>
  <div class="mb-12">
    <div class="w-full h-32 flex items-stretch">
      <div v-for="timeframe in timeframes" :key="timeframe.text"
        :class="'relative flex items-center justify-center whitespace-pre-wrap text-center ' + timeframe.boxClass"
        :style="{ width: timeframe.percentage && `${timeframe.percentage}%` }">
        <span :class="timeframe.textClass">{{ timeframe.text }}</span>
      </div>
    </div>
    <div class="w-full flex">
      <div v-for="event in events" :class="'relative whitespace-pre-wrap text-center ' + event.boxClass"
        :style="{ left: event.left }">
        <div class="z-10 absolute top-0 left-0">
          <div class="w-[3px] h-4 bg-gray-600" />
          <div class="whitespace-pre relative mt-1">
            <span :class="'relative ' + event.textClass">{{ event.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
