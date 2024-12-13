<template>
  <div>
    <UContainer>
      <div class="sm:flex gap-4">
        <div class="flex-shrink">
          <UCard class="my-4 sm:my-10" :ui="{ background: 'bg-gray-200 dark:bg-gray-800' }">
            <UFormGroup v-slot="{ error }" label="Guild" error class="pb-4">
              <UInput v-model="guild" placeholder="Enter guild..." :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
            </UFormGroup>
            <UFormGroup v-slot="{ error }" label="Server" error class="pb-6">
              <UInput v-model="server" placeholder="Enter server..." :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
            </UFormGroup>
            <UButton label="Submit" color="primary" @click="submit()" class="justify-center w-full" />
          </UCard>
        </div>
        <div class="flex flex-grow">
          <UCard class="sm:my-10 w-full">
            <UTable :rows="filteredPlayers" :loading="pending" :columns="columns" v-model:sort="sort"/>
          </UCard>
        </div>
      </div>

    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'

const guild = ref('')
const server = ref('')
const pending = ref(false)

const submit = async () => {
  const {data} = await useFetch(`https://raider.io/api/v1/guilds/profile?region=us&realm=${server.value.replace(/\s+/g, '-').toLowerCase()}&name=${guild.value.toLowerCase()}&fields=members`)
  raiders.value = data.value.members.filter((member) =>  member.rank <= 5)
}

const getProfile = async (name, server) => {
  const {data}  = await useFetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${server}&name=${name}&fields=gear`)
  return data
}

const getBlizzardProfile = async(name, server) => {
  const {data} = await useFetch(`https://us.api.blizzard.com/profile/wow/character/${server.replace(/\s+/g, '-').toLowerCase()}/${name.toLowerCase()}/encounters/dungeons?namespace=profile-us&locale=en_US`, {
    headers: {
      'Authorization': 'Bearer USy0ViiLHCeRKMhIbcdWjFFnuyvHr7u9So'
    }
  })

  return data
}

const sort = ref({ column: 'Item Level', direction: 'asc' as const })
const columns = [
  { key: 'name', label: 'Name' },
  // { key: 'server', label: 'Server' },
  { key: 'ilvl', label: 'Item Level', sortable: true, align: 'right' },
  { key: 'heroicDungeonsCount', label: 'Heroic Dungeons', sortable: true }
]

function countHeroicCompletions(data) {
    let totalCompletedCount = 0;

    data.instances.forEach(instance => {
        instance.modes.forEach(mode => {
            if (mode.difficulty && mode.difficulty.type === "HEROIC") {
                totalCompletedCount += mode.progress.encounters[0].completed_count;
            }
        });
    });

    return totalCompletedCount;
}

const raiders = ref([]) //|| member.rank === 1 || member.rank === 2 || member.rank === 3 || member.rank === 4))
const players = computedAsync(async () => {
  pending.value = true
  const results = await Promise.all(raiders.value.map(async (o) => {
    try {
      const profile = await getProfile(o.character.name, o.character.realm)
      const blizzardProfile = await getBlizzardProfile(o.character.name, o.character.realm)
      const expansion = blizzardProfile.value.expansions.find((expansion) => expansion.expansion.id === 514)
      const heroicDungeonsCount = countHeroicCompletions(expansion)
      return { name: o.character.name, server: o.character.realm, ilvl: profile.value.gear.item_level_equipped, heroicDungeonsCount }
    } catch (e) {
      return { name: '', server: '', ilvl: 0 }
    }
  }))
  pending.value = false
  return results
})

const filteredPlayers = toRef(() => {
  return players.value?.filter((player) => player.ilvl > 529)
})



</script>

<style>

</style>
