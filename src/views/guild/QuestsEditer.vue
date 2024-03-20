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
              <template v-slot:selection="{ item, index }">
                <v-img height="40" width="40" aspect-ratio="1/1" :src="item.raw.icon"></v-img>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.text"
                  :subtitle="item.raw.type"
                  rounded="xl"
                >
                  <template v-slot:prepend>
                    <v-avatar rounded="0" color="#5A4D31">
                      <v-img cover aspect-ratio="1/1" :src="item.raw.icon"></v-img>
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
              <template v-slot:selection="{ item, index }">
                <v-img height="40" width="40" aspect-ratio="1/1" :src="item.raw.icon"></v-img>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.text"
                  :subtitle="item.raw.type"
                  rounded="xl"
                >
                  <template v-slot:prepend>
                    <v-avatar rounded="0" color="#5A4D31">
                      <v-img cover aspect-ratio="1/1" :src="item.raw.icon"></v-img>
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
                <v-list-item v-bind="props" rounded="xl">
                  <template v-slot:default>
                    <div class="d-flex">
                      <v-img
                        height="260"
                        v-for="iconsdata in item.raw.icons.split(',')"
                        :src="iconsdata || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                      ></v-img>
                    </div>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <!-- 选择防具外观 -->
          <v-card-item>
            <v-select
              :disabled="armorList.length == 0"
              clearable
              :label="$t('guild.questsEditer.selectSecondaryMonster')"
              :items="armorList"
              item-title="name"
              v-model="guildQuestsForm.armor"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" rounded="xl">
                  <!-- <template v-slot:default>
                    <div class="d-flex">
                      <v-img
                        height="260"
                        v-for="iconsdata in item.raw.icons.split(',')"
                        :src="iconsdata || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                      ></v-img>
                    </div>
                  </template> -->
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <!-- 选择防具类型 -->

          <v-card-item>
            <v-select
              clearable
              :label="$t('guild.questsEditer.selectSecondaryMonster')"
              :items="armorTypeList"
              item-title="name"
              v-model="guildQuestsForm.armorType"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" rounded="xl">
                  <!-- <template v-slot:default>
                    <div class="d-flex">
                      <v-img
                        height="260"
                        v-for="iconsdata in item.raw.icons.split(',')"
                        :src="iconsdata || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                      ></v-img>
                    </div>
                  </template> -->
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <v-divider class="mx-4 mb-1"></v-divider>
          <!-- lv -->
          <v-card-item>
            <v-text-field
              v-model="guildQuestsForm.level"
              color="primary"
              label="level"
              type="number"
              @update:modelValue="onchangeLevel"
            ></v-text-field>
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
  MainMonster: null, //主怪
  SecondaryMonster: null, //副怪
  weapon: null, //武器
  armor: null, //防具
  armorType: null, //防具类型
  level: 0 //任务等级
});
const SelectedMainMonster = ref(null);
const mainMonsterList = ref([]);
const artifactList = ref([]);
const weaponList = ref([]);
const armorList = ref([]);
const armorTypeList = ref([
  {
    id: '00',
    name: '胴',
    icons: ''
  },
  {
    id: '01',
    name: '腕',
    icons: ''
  },
  {
    id: '02',
    name: '腰',
    icons: ''
  },
  {
    id: '03',
    name: '脚',
    icons: ''
  },
  {
    id: '04',
    name: '頭',
    icons: ''
  }
]);
const secondaryMonsterList = ref([]);
const canSelectSecondaryMonster = ref(false);
// 监听等级变化
const onchangeLevel = (data: string) => {
  if (data) {
    if (Number(data) > 140) {
      guildQuestsForm.value.level = 140;
      return;
    }
  }
  console.log(data);
};
// 计算任务等级
const getQuestsLevel = () => {
  if (guildQuestsForm.value.MainMonster && guildQuestsForm.value.SecondaryMonster) {
    guildQuestsForm.value.level = Math.floor(
      (Number(guildQuestsForm.value.MainMonster.level) +
        Number(guildQuestsForm.value.SecondaryMonster.level)) /
        2
    );
  } else {
    guildQuestsForm.value.level = guildQuestsForm.value.MainMonster
      ? Number(guildQuestsForm.value.MainMonster.level)
      : guildQuestsForm.value.SecondaryMonster
        ? Number(guildQuestsForm.value.SecondaryMonster.level)
        : 0;
  }
};
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
      weaponList.value = item.weapon;
      armorList.value = item.armor;
      console.log('111', armorList.value);
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
  // 计算level
  getQuestsLevel();
};
const onSelectSecondaryMonster = (data) => {
  console.log(data);
  getQuestsLevel();
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
