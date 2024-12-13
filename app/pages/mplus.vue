<script lang="ts" setup>
const supabase = useSupabaseClient()

const distribution = ref([])

const ranks = [{
  label: 'Top 500',
  value: '500',
}, {
  label: 'Top 100',
  value: '100',
}]

const roles = [{
  label: 'Damage',
  value: 'dps',
}, {
  label: 'Healer',
  value: 'healer',
}, {
  label: 'Tank',
  value: 'tank',
}]

let selectedRank = ranks[0]
let selectedRole = roles[0]

async function getDistribution(rank: string, role: string) {
  const { data } = await supabase
    .from('MPlusClassDistribution')
    .select('class, spec, role')
    .lt('rank', rank)
    .eq('role', role)
  const result = groupBy(data, ['class', 'spec'])

  const stats = result.map((stat) => {
    return {
      x: stat.name,
      y: [stat.count],
    }
  })

  distribution.value = [{ data: stats }]
}

interface DataItem {
  [key: string]: any // Define a generic object type with string keys
  role: string // Define the 'role' key specifically
}

interface GroupedItem {
  items: DataItem[]
  count: number
}

interface GroupedResult {
  name: string
  count: number
  role: string
  color: string
}

function groupBy(data: DataItem[], keys: (keyof DataItem)[]): GroupedResult[] {
  const result = data.reduce((objectsByKeyValue, obj) => {
    const value = keys.map(key => obj[key]).join('-')
    if (!objectsByKeyValue[value]) {
      objectsByKeyValue[value] = { items: [], count: 0 }
    }
    objectsByKeyValue[value].items.push(obj)
    objectsByKeyValue[value].count += 1
    return objectsByKeyValue
  }, {} as Record<string, GroupedItem>)

  return Object.entries(result)
    .map(([key, value]) => {
      return {
        name: key,
        count: value.count,
        role: value.items[0].role,
        color: 'primary',
      }
    })
    .sort((a, b) => b.count - a.count)
}

function getTitle() {
  return `${selectedRank.label} ${selectedRole.label}`
}

function onChangeRank(index) {
  selectedRank = ranks[index]
  setChartHeight()
  getDistribution(selectedRank.value, selectedRole.value)
}

function onChangeRole(index) {
  selectedRole = roles[index]
  setChartHeight()
  getDistribution(selectedRank.value, selectedRole.value)
}

const chartHeight = ref('500')
function setChartHeight() {
  const value = unref(distribution)
  chartHeight.value = value.length > 0 ? (value[0].data.length * 80).toString() : '500'
}

onMounted(() => {
  setChartHeight()
  getDistribution('500', 'dps')
})
</script>

<template>
  <div>
    <UContainer class="py-10">
      <UTabs :items="ranks" @change="onChangeRank" />
      <UTabs :items="roles" @change="onChangeRole" />
      <DistributionChart :series="distribution" title="Healers" :description="getTitle()" icon="i-heroicons-fire" />
    </UContainer>
  </div>
</template>
