<script setup lang="ts">
defineProps<{
  timeframes: {
    text: string
    boxClass?: string
    textClass?: string
    percentage: number
  }[] | {
    subframes: {
      text: string
      boxClass?: string
      textClass?: string
    }[],
    boxClass?: string
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
  <div class="relative mb-12">
    <div class="w-full min-h-32 flex items-stretch">
      <div v-for="timeframe, i in timeframes" :key="i"
        class="relative flex items-center justify-center whitespace-pre-wrap text-center" :class="timeframe.boxClass"
        :style="{ width: timeframe.percentage && `${timeframe.percentage}%` }">
        <div v-if="'subframes' in timeframe" class="flex flex-col w-full h-full">
          <div v-for="subframe in timeframe.subframes" class="flex-1 flex items-center justify-center"
            :class="subframe.boxClass">
            <span :class="subframe.textClass">{{ subframe.text }}</span>
          </div>
        </div>
        <span v-else :class="timeframe.textClass">{{ timeframe.text }}</span>
      </div>
    </div>
    <div class="absolute -z-1 top-[calc(100%+16px)] w-full flex">
      <div v-for="event in events" class="relative whitespace-pre-wrap text-center" :class="event.boxClass"
        :style="{ left: event.left }">
        <div class="z-10 absolute bottom-0 left-0">
          <div class="w-[3px] h-16 bg-gray-600">
            <div class="absolute top-[calc(100%+4px)] whitespace-pre">
              <span class="relative" :class="event.textClass">{{ event.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
