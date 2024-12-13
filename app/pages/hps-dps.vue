<!-- eslint-disable no-console -->
<script lang="ts" setup>
const supabase = useSupabaseClient()

let healerData = []
let damageData = []

const isLoading = ref(false)
const healerSeries = ref([])
const damageSeries = ref([])

const roles = [{ label: 'DPS' }, { label: 'HPS' }]
const difficulties = [{ label: 'Normal' }, { label: 'Heroic' }, { label: 'Mythic' }]
const bosses = ref([])
const dateTypes = [{ label: 'Overall' }, { label: '2 Weeks' }, { label: '1 Week' }, { label: '1 Quarter' }, { label: '1 Month' }]

const selectedDateType = ref(0)
const selectedRole = ref(0)
const selectedBoss = ref(0)
const selectedDifficulty = ref(0)

async function fetchDamageData() {
  const { data } = await supabase
    .from('DamageStatistics')
    .select('*')
    .order('q75', { ascending: false })
  return data
}

async function fetchHealerData() {
  const { data } = await supabase
    .from('HealerStatistics')
    .select('*')
    .order('q75', { ascending: false })
  return data
}

async function setSeries() {
  isLoading.value = true
  await nextTick()

  const boss = bosses.value[selectedBoss.value]
  const dateType = dateTypes[selectedDateType.value]
  const difficulty = difficulties[selectedDifficulty.value]

  const heal = healerData.filter(x => x.dateType === dateType.label && x.encounter === boss.label && x.difficulty === difficulty.label).map((stat) => {
    return {
      x: stat.class,
      y: [
        stat.min.toFixed(0),
        stat.q25.toFixed(0),
        stat.q50.toFixed(0),
        stat.q75.toFixed(0),
        stat.max.toFixed(0),
      ],
    }
  })

  healerSeries.value = [{ data: heal }]

  const damage = damageData.filter(x => x.dateType === dateType.label && x.encounter === boss.label && x.difficulty === difficulty.label).map((stat) => {
    return {
      x: stat.class,
      y: [
        stat.min.toFixed(0),
        stat.q25.toFixed(0),
        stat.q50.toFixed(0),
        stat.q75.toFixed(0),
        stat.max.toFixed(0),
      ],
    }
  })

  damageSeries.value = [{ data: damage }]
  isLoading.value = false
  dispatchWindowResize()
}

function dispatchWindowResize() {
  window.dispatchEvent(new Event('resize'))
}

function getBosses() {
  return [...new Set(damageData.map(item => item.encounter))].sort()
}

function getTitle() {
  return damageData.length > 0 ? `${roles[selectedRole.value].label} - ${bosses.value[selectedBoss.value].label} Rankings` : '' //
}

function update() {
  setSeries()
}

onMounted(async () => {
  damageData = await fetchDamageData()
  healerData = await fetchHealerData()

  bosses.value = getBosses().map(boss => ({ label: boss }))
  selectedBoss.value = 0

  setSeries()
})
</script>

<template>
  <div>
    <UContainer class="py-10">
      <UTabs v-model="selectedDateType" :items="dateTypes" @change="update()" />
      <UTabs v-model="selectedRole" :items="roles" @change="update()" />
      <UTabs v-model="selectedDifficulty" :items="difficulties" @change="update()" />
      <UTabs v-model="selectedBoss" :items="bosses" @change="update()" />
      <HorizontalBoxChart v-if="healerSeries.length > 0 && healerSeries[0].data.length > 0 && !isLoading && roles[selectedRole].label === 'HPS'" :series="healerSeries" :description="getTitle()" icon="i-heroicons-fire" height="350" />
      <HorizontalBoxChart v-if="damageSeries.length > 0 && damageSeries[0].data.length > 0 && !isLoading && roles[selectedRole].label === 'DPS'" :series="damageSeries" :description="getTitle()" icon="i-heroicons-fire-solid" height="900" />
      <div v-else class="flex justify-center w-full">
        <UAlert variant="subtle" title="No data available" class="w-48 my-10 text-center" />
      </div>
    </UContainer>
  </div>
</template>

<style>

</style>
