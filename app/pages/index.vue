<script setup lang="ts">

useHead({
  title: 'Mass GUID Converter',
  meta: [
    {
      name: 'description',
      content: 'Mass GUID Converter',
    },
    {
      property: 'og:title',
      content: 'Mass GUID Converter',
    },
    {
      property: 'og:description',
      content: 'Mass GUID Converter',
    },
  ],
})

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

    <LazyUContainer class="py-12 text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col my-0">
      <NuxtImg src="icons/512.png" alt="Mass GUID Converter" class="w-32 h-32 sm:w-72 sm:h-72 mx-auto" />
      <div class="dark:text-primary-400 text-primary-500 text-2xl md:text-6xl xs:text-2xl sm:text-4xl font-black">
        <h1>Mass GUID Converter</h1>
      </div>
      <Converter class="pt-4" />
    </LazyUContainer>

  </div>
</template>
