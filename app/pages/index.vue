<script setup lang="ts">
import page from '../json/siteInfo.json'

useSeoMeta({
  titleTemplate: 'WarcraftStats',
  title: page.title,
  ogTitle: page.title,
  description: page.description,
  ogDescription: page.description,
})
</script>

<template>
  <div v-if="page">

    <ULandingHero
      :description="page.hero.description"
      :ui="{ container: 'py-0 my-0' }"
    >
      <template #title>
        <span class="dark:text-primary-400 text-primary-500" v-html="page.hero.title" />
      </template>
    </ULandingHero>

    <ULandingSection
      :ui="{ wrapper: 'sm:py-0 py-0', description: 'mt-0' }"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features" :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection class="text-center">
      <p>
        If you wan't to see version 1 visit <UButton to="https://cooldowns-v1.erobinson.ca/">
          cooldowns-v1
        </UButton>
      </p>
    </ULandingSection>
  </div>
</template>


