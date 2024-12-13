<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'WarcraftStats'
const description = 'Track all the latest stats and updates, and gain meaningful insights into the next expansion of World of Warcraft - The War Within.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />

    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>
