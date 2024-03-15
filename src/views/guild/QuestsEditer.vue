<template>
  <div>
    <v-stepper alt-labels :items="['Step 1', 'Step 2', 'Step 3']">
      <template v-slot:item.1>
        <v-card :title="$t('guild.questsEditer.step.title1')" flat>
          <v-card-item>
            <v-select
              clearable
              :label="$t('guild.questsEditer.selectMainMonster')"
              :items="mainMonsterList"
              item-title="text"
              v-model="guildQuestsForm.MainMonster"
              @update:modelValue="onSelectMainMonster"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.text"
                  :subtitle="item.raw.type"
                  rounded="xl"
                >
                  <template v-slot:prepend>
                    <v-avatar color="#5A4D31">
                      <v-img cover :src="item.raw.icon"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-select>
            <v-select
              :disabled="canSelectSecondaryMonster"
              clearable
              :label="$t('guild.questsEditer.selectSecondaryMonster')"
              :items="secondaryMonsterList"
              item-title="text"
              v-model="guildQuestsForm.SecondaryMonster"
              @update:modelValue="onSelectSecondaryMonster"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.text"
                  :subtitle="item.raw.type"
                  rounded="xl"
                >
                  <template v-slot:prepend>
                    <v-avatar color="grey-lighten-1">
                      <v-img :width="30" aspect-ratio="16/9" cover :src="item.raw.icon"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <v-divider class="mx-4 mb-1"></v-divider>
          <!-- 选择weapon -->
          <v-card-item>
            <v-select
              :disabled="weaponList.length == 0"
              clearable
              :label="$t('guild.questsEditer.selectSecondaryMonster')"
              :items="weaponList"
              item-title="name"
              v-model="guildQuestsForm.weapon"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.name" rounded="xl">
                  <!-- :subtitle="item.raw.type" -->
                  <!-- <template v-slot:prepend>
                    <v-avatar color="grey-lighten-1">
                      <v-img :width="30" aspect-ratio="16/9" cover :src="item.raw.icon"></v-img>
                    </v-avatar>
                  </template> -->
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Step Two" flat>...</v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>
  </div>
</template>
<script setup lang="ts">
import {
  provide,
  inject,
  ref,
  reactive,
  shallowReactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  onServerPrefetch
} from 'vue';
// import { storeToRefs } from 'pinia';
// import { useExampleStore } from '@/stores/example-pinia';
import { useRoute, useRouter } from 'vue-router';
// const store = useExampleStore();
// const { exampleData } = storeToRefs(store);
const axios: any = inject('$axios');
const route = useRoute(); // route.query.exampleId
const router = useRouter();
const guildQuestsForm = ref({
  MainMonster: null,
  SecondaryMonster: null,
  weapon: null
});
const toExamplePage = () => {
  router.push({
    path: '/example',
    query: {
      exampleId: 'exampleId'
    }
  });
};
const SelectedMainMonster = ref(null);
const mainMonsterList = ref([]);
const artifactList = ref([]);
const weaponList = ref([]);
const armorList = ref([]);
const secondaryMonsterList = ref([]);
const canSelectSecondaryMonster = ref(false);
const getGuildMonster = () => {
  axios
    .getGuildMonster(localStorage.getItem('lang') || 'ja')
    .then((res) => {
      console.log(res);
      if (res.length > 0) {
        mainMonsterList.value = res;
        secondaryMonsterList.value = [];
        res.forEach((item) => {
          if (item.unit === '2') {
            secondaryMonsterList.value?.push(item);
          }
        });
      } else {
        mainMonsterList.value = [];
        secondaryMonsterList.value = [];
      }
    })
    .catch((err) => {
      mainMonsterList.value = [];
      secondaryMonsterList.value = [];
    });
};
const getGuildArtifact = () => {
  axios
    .getGuildArtifact(localStorage.getItem('lang') || 'ja')
    .then((res) => {
      if (res.length > 0) {
        artifactList.value = res;
      } else {
      }
    })
    .catch((err) => {});
};
const getMonsterOfArtifact = (id) => {
  artifactList.value.forEach((item) => {
    if (item.id == id) {
      console.log('111', guildQuestsForm.value.weapon);
      weaponList.value = item.weapon;
      armorList.value = item.armor;
    }
  });
  if (guildQuestsForm.value.weapon && guildQuestsForm.value.weapon.id) {
    weaponList.value.forEach((item) => {
      if (item.id == guildQuestsForm.value.weapon.id) {
        guildQuestsForm.value.weapon = item;
      }
    });
  }
};
getGuildMonster();
getGuildArtifact();
// 选中首要目标
const onSelectMainMonster = (data) => {
  console.log(data);
  if (data) {
    if (data.unit === '1') {
      // 次要不可选并清空次要选项
      canSelectSecondaryMonster.value = true;
      guildQuestsForm.value.SecondaryMonster = null;
    } else {
      canSelectSecondaryMonster.value = false;
    }
    getMonsterOfArtifact(data.artifact);
  } else {
    weaponList.value = [];
    armorList.value = [];
    guildQuestsForm.value.weapon = null;
  }
};
const onSelectSecondaryMonster = (data) => {
  console.log(data);
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
