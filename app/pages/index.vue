<script setup lang="ts">


const { data } = await useFetch(() => 'https://api.restful-api.dev/objects')

const cards = ref([
  {
    title: 'GUIDs in Oracle databases',
    description: "are stored using the RAW(16) datatype. However, Oracle's byte order differs from the standard hyphen-separated GUID format commonly used in other applications, such as SQL Server. When inserting GUIDs into Oracle, you must use the HEXTORAW function to ensure proper formatting.",
    icon: 'i-lucide-smile',
  },
  {
    title: 'How-to Use the Converter',
    description: 'This online GUID converter simplifies the process by generating equivalent GUIDs formatted specifically for Oracle. Additionally, it provides alternative formats for convenience, making it a valuable tool for developers working across multiple database systems.',
    icon: 'i-lucide-a-large-small',
  },
])

</script>

<template>
  <div>
    <UContainer class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col my-0">
      <img src="~/public/icons/512.png" alt="Mass GUID Converter" class="w-32 h-32 sm:w-72 sm:h-72 mx-auto" />
      <div class="text-center">
        <div class="dark:text-primary-400 text-primary-500 text-2xl md:text-6xl xs:text-2xl sm:text-4xl font-black">
        <h1>GUID to HEX converter</h1>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          Convert GUIDs to Oracle RAW(16) format and more.
        </p>
      </div>

      </div>
      <UPageSection class="pt-0 mt-0">
        <Converter />
      </UPageSection>
      <UPageSection>
        <UPageGrid>
          <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
        </UPageGrid>
      </UPageSection>
    </UContainer>
  </div>
</template>
