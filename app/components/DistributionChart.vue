<script setup lang='ts'>
import VueApexCharts from 'vue3-apexcharts'

const chartKey = ref(0)
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {

    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

watch(colorMode, async (oldValue, newValue) => {
  chartKey.value += 1
})

const props = defineProps({
  series: {
    type: Object,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '600',
  },
})

const { series, description, icon, height } = toRefs(props)

const chartOptions = computed(() => {
  return isDark.value ? chartOptionsDark : chartOptionsLight
})

const chartOptionsLight = {
  chart: {
    type: 'bar',
    height: 500,
    toolbar: {
      show: false,
    },
  },
  fill: {
    colors: ['#c084fc'],
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      color: '#e5e5e5',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    color: '#e5e5e5',
    labels: {
      show: true,
      style: {
        colors: '#0a0a0a',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    axisBorder: {
      color: '#e5e5e5',
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
    },
    boxPlot: {
      colors: {
        upper: '#008FFB',
        lower: '#095087',
      },
    },
  },
  stroke: {
    colors: ['#e5e5e5'],
  },
  grid: {
    borderColor: '#e5e5e5',
  },
}

const chartOptionsDark = {
  chart: {
    type: 'bar',
    height: 500,
    toolbar: {
      show: false,
    },
  },
  fill: {
    colors: ['#c084fc'],
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      color: '#262626',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    color: '#262626',
    labels: {
      show: true,
      style: {
        colors: '#f1f1f1',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    axisBorder: {
      color: '#262626',
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
    },
    boxPlot: {
      colors: {
        upper: '#008FFB',
        lower: '#095087',
      },
    },
  },
  stroke: {
    colors: ['#262626'],
  },
  grid: {
    borderColor: '#262626',
  },
}
</script>

<template>
  <div>
    <div class="mt-6 flex items-center">
      <div><UIcon :name="icon" class="mt-2 mr-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white" /></div>
      <div>
        <h1 class="text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          {{ description }}
        </h1>
      </div>
    </div>

    <UCard class="my-2">
      <client-only>
        <VueApexCharts
          type="bar"
          :options="chartOptions"
          :series="series"
          :height="height"
          :key="chartKey"
        />
      </client-only>
    </UCard>
  </div>
</template>
