<script setup lang="ts">
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div
      class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

    <!-- <AppHeader /> -->

    <UMain>
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>

<style scoped>
.shadow {
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
}

.landing-grid {
  background-size: cover;
  background: no-repeat left bottom, linear-gradient(to right,
      rgb(var(--color-gray-200)) 1px,
      transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-size: cover;
    background: no-repeat left bottom, linear-gradient(to right,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px),
      linear-gradient(to bottom,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px);
  }
}
</style>
