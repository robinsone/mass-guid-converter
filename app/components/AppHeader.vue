<script setup lang="ts">
import page from '../json/siteInfo.json'

const links = [{
  label: 'Mythic Plus',
  to: '/mplus',
},{
  label: 'Raid Tools',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/raid',
  children: [{
    label: 'Overall',
    to: '/raid',
    icon: 'i-heroicons-star-solid',
    description: 'View overall raid statistics.'
  },{
    label: 'Boss Stats',
    to: '/hps-dps',
    icon: 'i-heroicons-trophy-solid',
    description: 'View boss statistics for healers and dps.'
  }, {
    label: 'Cooldown Explorer',
    to: '/cooldowns',
    icon: 'i-heroicons-hand-thumb-up-solid',
    description: 'Get healer cooldowns from a warcraftlogs report.'
  }]
}, {
  label: 'Guild Stats',
  to: '/roster',
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      {{ page.title }}
      <UBadge label="new" variant="subtle" size="xs" class="mb-1 hidden md:block " />
    </template>

    <template
      #right
    >
      <div class="justify-items-end">
      <UButton
        icon="i-streamline-coffee-mug"
        label=""
        color="primary"
        to="https://buymeacoffee.com/ericzrobini"
        target="_blank"
        class="md:hidden"
      />
      <UButton
        icon="i-ep-coffee"
        label="Buy me a coffee"
        color="primary"
        variant="solid"
        to="https://buymeacoffee.com/ericzrobini"
        target="_blank"
        class="hidden md:inline-flex"
      />
    </div>
    </template>

    <template #panel>
      <UNavigationTree
        :links="links"
        default-open
      />
    </template>
  </UHeader>
</template>
