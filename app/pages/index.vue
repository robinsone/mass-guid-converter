<script setup lang="ts">

useSeoMeta({
  titleTemplate: 'Mass GUID Converter',
  title: 'Mass GUID Converter',
  ogTitle: 'Mass GUID Converter',
  description: 'Mass GUID Converter',
  ogDescription: 'Mass GUID Converter',
})
</script>

<template>
  <div>

    <UContainer class="py-12 text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col my-0">
      <div class="dark:text-primary-400 text-primary-500 text-2xl md:text-6xl xs:text-2xl sm:text-4xl font-black">
        Mass GUID Converter
      </div>
    </UContainer>

    <UContainer>
      <Converter />
    </UContainer>

  </div>
</template>
