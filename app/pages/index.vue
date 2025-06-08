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

</script>

<template>
  <div>

    <UContainer class="py-12 text-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col my-0">
      <img src="~/public/icons/512.png" alt="Mass GUID Converter" class="w-32 h-32 sm:w-72 sm:h-72 mx-auto" />
      <div class="dark:text-primary-400 text-primary-500 text-2xl md:text-6xl xs:text-2xl sm:text-4xl font-black">
        <h1>GUID to HEX converter</h1>
      </div>
      <Converter class="pt-4" />
      <div class="grid grid-cols-1 sm:grid-cols-2 py-12 text-justify text-md md:text-lg gap-12">
        <div>
          <p>
            GUIDs in Oracle databases are stored using the RAW(16) datatype. However, Oracle's byte order differs from
            the
            standard hyphen-separated GUID format commonly used in other applications, such as SQL Server. When
            inserting
            GUIDs into Oracle, you must use the HEXTORAW function to ensure proper formatting.
          </p>
        </div>
        <div>
          <p>
            This online GUID converter simplifies the process by generating equivalent GUIDs formatted specifically for
            Oracle. Additionally, it provides alternative formats for convenience, making it a valuable tool for
            developers working across multiple database systems.
          </p>
        </div>
      </div>
    </UContainer>

  </div>
</template>
