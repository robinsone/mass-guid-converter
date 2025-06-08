<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    { hid: 'description', name: 'description', content: 'Convert GUIDs to Oracle RAW(16) format with ease.' },
  ],

  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Mass GUID to HEX Converter – Oracle, SQL, and .NET Format Support'
const description = 'Convert GUIDs to HEX for Oracle databases and back. Generate and transform multiple GUIDs with byte order options and mass conversion tools.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  ogUrl: 'https://guid.erobinson.ca',
  ogType: 'website',
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
  </div>
</template>
