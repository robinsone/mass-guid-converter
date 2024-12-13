<script lang="ts" setup>
import data from '../json/class-data.json'

const toast = useToast()

const classData = toRef(data.classes)
const url = ref<string>('')
const reportCode = ref<string>('')
const params = ref<string>('')
const report = ref({})
const reportData = ref({})
const events = ref({})
const healers = ref([])
const results = ref([])

const milisecondsToMinutes = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const parseUrl = () => {
  var uri = new URL(url.value)

  var hash = uri.hash.substring(1).split('&').reduce(function (res, item) {
    var parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
}, {});

  params.value = hash['fight']
  reportCode.value = uri.pathname.split('/').pop()
}

const getReport = async () => {
  const graphql = JSON.stringify({
    query: `{
      reportData {
        report(code: "${reportCode.value}") {
          fights(fightIDs: ${params.value}) {
            startTime
          }
          playerDetails(fightIDs: ${params.value} )

        }
      }
    }`,
  })

  const data  = await $fetch(`https://www.warcraftlogs.com/api/v2/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTI0OWRhZi0zMTIwLTQ0ODMtOWE4Yi1jZjc4NTliNzI5NGMiLCJqdGkiOiI4NjMxNmI0N2JlODZjMThiOTQ3MDJiZmFkM2ExM2E2NDUwY2ZiZDEwZDhiY2UxYTIxYjIwZTNlNWNmYzkzNDVhNzcwNGEzMDI1YTUxZTUyNyIsImlhdCI6MTcwOTY2NTk3OC4xNDU1NTcsIm5iZiI6MTcwOTY2NTk3OC4xNDU1NiwiZXhwIjoxNzQwNzY5OTc4LjEzNjksInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.R05dMHAfOFlZ5hH6i2odwsMlwhmssV6Z7_4CN3fLjnyaH-6EnZWz1ojas4Ioz8iO8hqiWU17234XNCBeRt2NKPnwneTmcR1tKUiDp2FlN-akQLKJLGAs1jrhPa7TVoxMXjTYVkuGPQQ6XrrnhVn7vw313juczqyczJif6wnrSc0ChuMDmElCdmFgmbLbcTw12BWd30XMYSM0_3JXNagoe_t0_99OmS6ozaxUj2p3HPIaTDjAvbc5uBIQN9sgaY-YJBifClnTmdB2wT_s58vIrwALvuvqOtoJnPwiT6t3MtxF67V5abpP2gzqlHEtbHiXY6gbtQKDs5P6_UEEayRhYIgs6dLuZ5RKmI2ckr6y26s0OLjiTXiI3bHnj6CwH6XrFaUnzXnvpwU4OSqDaO_kSVmHOG6lMad_je3w2gorrUyyxdQQnZIO13Ji8HhPZdj1vWxVjXZ9hQnax-V9_-W5RxLi9B3P--oruNuhHoyKikQsjaGk8S5zArbIt1wgzogjY16JGy3G8zeOUgcn1W2B_Xh6unVXcu057ymWb2Zis-Tv3KDTqSCk1mwD5bwTVFi3_0KI0sAsIrHRAHXE41vU9f24jvMlurcCD-_7tHHwSZV5XlvukfoaLFakn_Q0RZKPs8TO5expCroVtdxkG8roNSDXbBeHWLHcmXG9fZC_Emk',
    },
    body: graphql,
  })

  reportData.value = data
}

const getEvents = async () => {
  healers.value = reportData.value.data.reportData.report.playerDetails.data.playerDetails.healers.map(healer => {
    const healerClass = classData.value.find(cls => cls.name === healer.type);
    return {
      ...healer,
      classColor: healerClass ? healerClass.color : '#FFFFFF', // Default to white if class not found
    }
  })
  const eventSearch = healers.value.map(healer => `x${healer.id}: events(dataType: Casts fightIDs: ${params.value} sourceID: ${healer.id}) { data }`).join(' ');

  const graphql = JSON.stringify({
    query: `{
      reportData {
        report(code: "${reportCode.value}") {
          ${eventSearch}
        }
      }
    }`,
  })


  const data  = await $fetch(`https://www.warcraftlogs.com/api/v2/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTI0OWRhZi0zMTIwLTQ0ODMtOWE4Yi1jZjc4NTliNzI5NGMiLCJqdGkiOiI4NjMxNmI0N2JlODZjMThiOTQ3MDJiZmFkM2ExM2E2NDUwY2ZiZDEwZDhiY2UxYTIxYjIwZTNlNWNmYzkzNDVhNzcwNGEzMDI1YTUxZTUyNyIsImlhdCI6MTcwOTY2NTk3OC4xNDU1NTcsIm5iZiI6MTcwOTY2NTk3OC4xNDU1NiwiZXhwIjoxNzQwNzY5OTc4LjEzNjksInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.R05dMHAfOFlZ5hH6i2odwsMlwhmssV6Z7_4CN3fLjnyaH-6EnZWz1ojas4Ioz8iO8hqiWU17234XNCBeRt2NKPnwneTmcR1tKUiDp2FlN-akQLKJLGAs1jrhPa7TVoxMXjTYVkuGPQQ6XrrnhVn7vw313juczqyczJif6wnrSc0ChuMDmElCdmFgmbLbcTw12BWd30XMYSM0_3JXNagoe_t0_99OmS6ozaxUj2p3HPIaTDjAvbc5uBIQN9sgaY-YJBifClnTmdB2wT_s58vIrwALvuvqOtoJnPwiT6t3MtxF67V5abpP2gzqlHEtbHiXY6gbtQKDs5P6_UEEayRhYIgs6dLuZ5RKmI2ckr6y26s0OLjiTXiI3bHnj6CwH6XrFaUnzXnvpwU4OSqDaO_kSVmHOG6lMad_je3w2gorrUyyxdQQnZIO13Ji8HhPZdj1vWxVjXZ9hQnax-V9_-W5RxLi9B3P--oruNuhHoyKikQsjaGk8S5zArbIt1wgzogjY16JGy3G8zeOUgcn1W2B_Xh6unVXcu057ymWb2Zis-Tv3KDTqSCk1mwD5bwTVFi3_0KI0sAsIrHRAHXE41vU9f24jvMlurcCD-_7tHHwSZV5XlvukfoaLFakn_Q0RZKPs8TO5expCroVtdxkG8roNSDXbBeHWLHcmXG9fZC_Emk',
    },
    body: graphql,
  })

  events.value = data
}

const getCasts = () => {
  const cooldowns = classData.value.flatMap(cls =>
    cls.specializations.flatMap(spec =>
      spec.cooldowns || []
    )
  );


  results.value = healers.value.flatMap(healer => {
    let casts = events.value.data.reportData.report[`x${healer.id}`].data
    casts = casts.filter(cast => cast.type === 'cast' && cast.hasOwnProperty('fake') === false && cooldowns.some((cooldown) => cooldown.id === cast.abilityGameID))
    const healerClass = classData.value.find(cls => cls.name === healer.type);
    const classColor = healerClass ? healerClass.color : '#FFFFFF'; // Default to white if class not found

    return casts.map(cast => {
      const cooldown = cooldowns.find(cooldown => cooldown.id === cast.abilityGameID);
      const time = cast.timestamp - reportData.value.data.reportData.report.fights[0].startTime;
      return {
        healer: healer,
        casts: casts,
        cooldown: cooldown,
        color: classColor,
        key: cast.timestamp,
        value: `{time:${milisecondsToMinutes(time)}} ${healer.name} ${cooldown.name} {spell:${cast.abilityGameID}}`
      }
    })
  })

  results.value = results.value.sort((a, b) => a.key - b.key)

}

const copyToClipboard = () => {
  const mrtNote = results.value.map(results => results.value).join("\r\n");
  navigator.clipboard.writeText(mrtNote)

  toast.add({ title: 'Copied', icon: 'i-heroicons-check-circle' })

}

const submit = async() => {
  if (url.value === '') {
    return
  }

  parseUrl()
  await getReport()
  await getEvents()
  getCasts()
}
</script>

<template>
  <UContainer class="py-10">
    <div class="grid grid-cols-1">
      <div class="text-2xl text-center font-bold pb-10 tracking-tight">
        Cooldowns
      </div>
      <UFormGroup
        class="w-full break-words"
        label="Please enter a Warcraftlogs link."
        help="example: https://www.warcraftlogs.com/reports/z84aMxZGPTr96KH7#fight=32&type=damage-done"
        :ui="{ label: {wrapper: 'pb-2'} }"
      >
        <UInput color="gray" size="xl" v-model="url" autofocus variant="outline" placeholder="Warcraftlogs url..." class="w-full"/>
      </UFormGroup>

    </div>
    <div class="float-right justify-items-end pt-4">
        <UButton label="Submit" color="gray" @click="submit()" class="w-24 justify-center" />
      </div>
    <UDivider v-show="healers.length > 0" class="py-4"/>
    <div v-if="healers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="">
        <h2 class="pb-1">Healers</h2>
        <div v-for="healer in healers" :key="healer.id">
          <UButtonGroup orientation="horizontal" class="mb-2 w-full">
            <UButton :label="healer.specs[0].spec" color="gray" />
            <UInput v-model="healer.name" variant="outline" placeholder="Healer name..." class="w-full" />
          </UButtonGroup>
        </div>
        <UDivider class="mt-2 mb-4"/>

        <div class="justify-items-end">
          <UButton label="Rename Healers" color="primary" variant="solid" @click="getCasts"/>
        </div>
      </div>
      <div class="col-span-3">
        <UCard>
          <template #header>
            <div class="flex w-full">
            <div class="flex">
              <h3 class="text-lg font-semibold">Cooldowns</h3>
            </div>
            <div class="flex flex-grow justify-end">
              <UButton icon="i-heroicons-clipboard" color="primary" variant="outline" @click="copyToClipboard"/>
            </div>
          </div>
          </template>

            <code
            class="text-sm sm:text-base inline-flex text-left items-center rounded-lg w-full">
            <span class="flex">
                <span class="flex-1">
                    <div v-for="result in results" :key="result.healer">
                        {{ result.value }}
                    </div>
                </span>
            </span>
        </code>


        </UCard>

      </div>
    </div>





  </UContainer>
</template>

<style>

</style>
