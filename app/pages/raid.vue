<script lang="ts" setup>
const supabase = useSupabaseClient()

const dateType = [{ label: 'Overall' }, { label: '2 Weeks' }, { label: '1 Week' }, { label: '1 Quarter' }, { label: '1 Month' }]
const roles = [{ label: 'DPS' }, { label: 'HPS' }]

let selectedDateType = dateType[0]
let selectedRole = roles[0]

const healerData = ref([])
const damageData = ref([])
const healerSeries = ref([])
const damageSeries = ref([])

async function onChangeDifficulty(index) {
  selectedDateType = dateType[index]
  await setSeries()
}

async function onChangeRole(index) {
  selectedRole = roles[index]
  await setSeries()
}

async function fetchDamageData() {
  const { data } = await supabase
    .from('TierDamage')
    .select('*')
    .order('q75', { ascending: false })
  return data
}

async function fetchHealData() {
  const { data } = await supabase
    .from('TierHealer')
    .select('*')
    .order('q75', { ascending: false })

  return data
}

async function setSeries() {
  const heal = healerData.value.filter(x => x.dateType === selectedDateType.label).map((stat) => {
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

  const damage = damageData.value.filter(x => x.dateType === selectedDateType.label).map((stat) => {
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

  dispatchWindowResize()
}

function dispatchWindowResize() {
  window.dispatchEvent(new Event('resize'))
}

onMounted(async () => {
  damageData.value = await fetchDamageData()
  healerData.value = await fetchHealData()
  await setSeries()
})
</script>

<template>
  <div v-if="healerSeries && damageSeries">
    <UContainer class="py-10">
      <UTabs :items="dateType" @change="onChangeDifficulty" />
      <UTabs :items="roles" @change="onChangeRole" />

      <HorizontalBoxChart v-if="selectedRole.label === 'DPS'" :series="damageSeries" description="Damage Rankings" icon="i-heroicons-fire-solid" height="800" />
      <HorizontalBoxChart v-if="selectedRole.label === 'HPS'" :series="healerSeries" description="Healer Rankings" icon="i-heroicons-fire" height="350" />
    </UContainer>
  </div>
</template>

<style>

</style>
