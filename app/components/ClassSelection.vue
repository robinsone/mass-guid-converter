<script lang="ts" setup>
import data from '../json/class-data.json'

const classData = toRef(data.classes)
</script>

<template>
  <UContainer class="py-10">
    <UPageGrid :ui="{ wrapper: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5' }">
      <ULandingCard v-for='(item, index) in classData' :key="index" :title="item.name" :color="item.color">
        <template #title>
          <div class="text-center" :style='`color: ${item.color}`'>{{ item.name }}</div>
        </template>
        <template #default>
          <UButtonGroup size="sm" orientation="vertical">
            <UButton variant="ghost" v-for='(spec, index) in item.specializations' color="white" :key="index"
              class="justify-center text-center ma-0 pa-0" :label="spec.name" />
          </UButtonGroup>
        </template>
      </ULandingCard>
    </UPageGrid>
  </UContainer>
</template>

<style></style>
