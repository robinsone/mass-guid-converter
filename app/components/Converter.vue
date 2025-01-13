<template>
  <div>
    <UTextarea autoresize color="gray" v-model="input" variant="outline" placeholder="Enter GUID(s) or HEX(s)..."
      class="w-full mb-2" />
    <div class="flex flex-wrap gap-2 mb-2">
      <div>
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton label="Convert" color="primary" @click="convert" />
          <USelectMenu color="primary" :options="['Auto', 'GUID', 'Hex']" v-model="convertType" />
        </UButtonGroup>
      </div>
      <div>
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton label="Generate" color="white" @click="generate" />
          <USelectMenu color="gray" :options="['1', '5', '10']" v-model="generateAmount" />
        </UButtonGroup>
      </div>
      <div class="sm:ml-auto mt-1 mr-1">
        <UCheckbox label="Upper Case" v-model="AsUpperCase" color="primary" />
      </div>
    </div>

    <div v-show="result" class="py-10">
      <UCard
        :ui="{ background: 'bg-gray-100 dark:bg-gray-800', divide: 'divide-gray-200 dark:divide-gray-600', ring: 'ring-gray-200 dark:ring-gray-600' }">
        <template #header>
          <div class="flex w-full">
            <div class="flex">
              <h3 class="text-primary text-2xl font-semibold">Results</h3>
            </div>
            <div class="flex flex-grow justify-end">
              <UButton icon="i-heroicons-clipboard" color="primary" variant="outline" @click="copyToClipboard" />
            </div>
          </div>
        </template>

        <code class="text-sm sm:text-base inline-flex text-left items-center rounded-lg w-full">
  <span class="flex">
    <span class="flex-1 whitespace-pre-line">
      {{ result }}
    </span>
  </span>
</code>


      </UCard>
    </div>
  </div>
</template>

<script setup>
import { Buffer } from 'buffer';

const toast = useToast();

const input = ref('');
const result = ref('');
const generateAmount = ref(10);
const convertType = ref('Auto');
const AsUpperCase = ref(false);

watch(AsUpperCase, (newValue) => {
  if (newValue) {
    input.value = input.value.toUpperCase();
    result.value = result.value.toUpperCase();
  } else {
    input.value = input.value.toLowerCase();
    result.value = result.value.toLowerCase();
  }
});

const generate = () => {
  let ids = [];
  for (let i = 0; i < generateAmount.value; i++) {
    ids.push(crypto.randomUUID());
  }

  result.value = ids.join(',\n');
  result.value = AsUpperCase.value ? result.value.toUpperCase() : result.value.toLowerCase();
};

const parseUUIDs = (inputString) => {
  const parts = inputString.split(/[\s,]+/); // Split by comma or whitespace
  const validUUIDs = parts.filter(part => validateUUID(part));
  return validUUIDs;
};

const parseHexStrings = (inputString) => {
  const parts = inputString.split(/[\s,]+/); // Split by comma or whitespace
  const validHexStrings = parts.filter(part => /^[0-9a-fA-F]+$/.test(part) && part.length % 2 === 0);
  return validHexStrings;
};

const convert = () => {
  switch (convertType.value) {
    case 'Auto':
      if (input.value.includes('-')) {
        convertToHex();
      } else {
        convertToGUID();
      }
      break;
    case 'GUID':
      convertToGUID();
      break;
    case 'Hex':
      convertToHex();
      break;
  }

  result.value = AsUpperCase.value ? result.value.toUpperCase() : result.value.toLowerCase();
};

const convertToGUID = () => {
  const hexStrings = parseHexStrings(input.value);

  if (hexStrings.length === 0) {
    result.value = input.value;
    return;
  }

  const guids = hexStrings.map(hexToUUID).join(',\n');
  result.value = guids;
};

const convertToHex = () => {
  const uuids = parseUUIDs(input.value);

  if (uuids.length === 0) {
    result.value = input.value;
    return;
  }

  const hexStrings = uuids.map(uuidToOracleRaw).join(',\n');
  result.value = hexStrings;
};

const uuidToOracleRaw = (uuid) => {
  const hex = uuid.replace(/-/g, '');
  const bytes = Buffer.from(hex, 'hex');

  // Reorder bytes according to ORACLE Raw(16) format
  const reordered = Buffer.from([
    bytes[3], bytes[2], bytes[1], bytes[0], // time_low
    bytes[5], bytes[4], // time_mid
    bytes[7], bytes[6], // time_hi_and_version
    bytes[8], bytes[9], // clock_seq_hi_and_reserved, clock_seq_low
    bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15] // node
  ]);

  return reordered.toString('hex').toUpperCase();
};

const hexToUUID = (hex) => {
  if (hex.length !== 32) {
    throw new Error('Invalid hex string length. Expected 32 characters.');
  }

  const bytes = Buffer.from(hex, 'hex');

  // Reorder bytes according to UUID format
  const reordered = Buffer.from([
    bytes[3], bytes[2], bytes[1], bytes[0], // time_low
    bytes[5], bytes[4], // time_mid
    bytes[7], bytes[6], // time_hi_and_version
    bytes[8], bytes[9], // clock_seq_hi_and_reserved, clock_seq_low
    bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15] // node
  ]);

  const reorderedHex = reordered.toString('hex').toUpperCase();

  return `${reorderedHex.substring(0, 8)}-${reorderedHex.substring(8, 4)}-${reorderedHex.substr(12, 4)}-${reorderedHex.substr(16, 4)}-${reorderedHex.substr(20, 12)}`;
};

const validateUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(result.value)

  toast.add({ title: 'Copied', icon: 'i-heroicons-check-circle' })

}

</script>

<style></style>
