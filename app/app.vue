<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
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
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
