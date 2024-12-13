<!-- eslint-disable vue/html-self-closing -->
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
    type: Array,
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
    default: '500',
  },
})

const { series, height } = toRefs(props)

const chartOptions = computed(() => {
  return isDark.value ? chartOptionsDark : chartOptionsLight
})

const chartOptionsLight = {
  chart: {
    type: 'boxPlot',
    height: 400,
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
      color: '#888',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    color: '#333',
    labels: {
      show: true,
      style: {
        colors: '#333',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    axisBorder: {
      color: '#888',
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
    },
    boxPlot: {
      colors: {
        upper: '#c084fc',
        lower: '#6b4a8c',
      },
    },
  },
  stroke: {
    colors: ['#333'],
  },
  grid: {
    borderColor: '#888',
  },
}

const chartOptionsDark = {
  chart: {
    type: 'boxPlot',
    height: 400,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      color: '#333333',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    color: '#333333',
    labels: {
      show: true,
      style: {
        colors: '#fff',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    axisBorder: {
      color: '#333333',
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
    },
    boxPlot: {
      colors: {
        upper: '#c084fc',
        lower: '#6b4a8c',
      },
    },
  },
  stroke: {
    colors: ['#a1a1a1'],
  },
  grid: {
    borderColor: '#333333',
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
          type="boxPlot"
          :height="height"
          :options="chartOptions"
          :key="chartKey"
          :series="series"
        />
      </client-only>
    </UCard>
  </div>
</template>
