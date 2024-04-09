<template>
  <div class="questsEditer">
    <v-text-field :model-value="guildQuestsForm.author" @update:modelValue="onChangeAuthor" label="Label"></v-text-field>
    <!-- step -->
    <v-stepper :items="editerStep" item-title="name" item-value="id" next-text="next" prev-text="prev" @update:modelValue="onChnageStep">
      <!-- step1 Select monsterInfo,weaponInfo armorInfo questInfo...  -->
      <template v-slot:item.1>
        <v-card :title="$t('guild.questsEditer.step.title1')" flat>
          <v-card-item>
            <!-- Select MainMonster -->
            <v-select clearable :label="$t('guild.questsEditer.selectMainMonster')" :items="mainMonsterList" item-title="text" v-model="guildQuestsForm.MainMonster" @update:modelValue="onSelectMainMonster" return-object>
              <template v-slot:selection="{ item, index }">
                <v-img height="40" width="40" aspect-ratio="1/1" :src="item.raw.icon"></v-img>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.text" :subtitle="item.raw.type" rounded="xl">
                  <template v-slot:prepend>
                    <v-avatar rounded="0" color="#5A4D31">
                      <v-img cover aspect-ratio="1/1" :src="item.raw.icon"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-select>
            <!-- Select MainMonsterStatus -->
            <v-select clearable label="mt" :items="monsterStatus" item-value="id" item-title="name" v-model="guildQuestsForm.MainMonsterType">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.name" rounded="xl"> </v-list-item>
              </template>
            </v-select>
            <!-- Select SecondaryMonster -->
            <v-select :disabled="canSelectSecondaryMonster" clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="secondaryMonsterList" item-title="text" v-model="guildQuestsForm.SecondaryMonster" @update:modelValue="onSelectSecondaryMonster" return-object>
              <template v-slot:selection="{ item, index }">
                <v-img height="40" width="40" aspect-ratio="1/1" :src="item.raw.icon"></v-img>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.text" :subtitle="item.raw.type" rounded="xl">
                  <template v-slot:prepend>
                    <v-avatar rounded="0" color="#5A4D31">
                      <v-img cover aspect-ratio="1/1" :src="item.raw.icon"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-select>
            <!-- Select SecondaryMonsterStatus -->
            <v-select clearable label="mt" :items="monsterStatus" item-value="id" item-title="name" v-model="guildQuestsForm.SecondaryMonsterType">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.name" rounded="xl"> </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <v-divider class="mx-4 mb-1"></v-divider>
          <!-- Select Weapon -->
          <v-card-item>
            <v-select :disabled="weaponList.length == 0" clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="weaponList" item-title="name" v-model="guildQuestsForm.weapon" return-object>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" rounded="xl">
                  <template v-slot:default>
                    <div class="d-flex">
                      <v-img height="260" v-for="iconsdata in item.raw.icons.split(',')" :src="iconsdata || 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"></v-img>
                    </div>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-card-item>
          <!-- Select ArmorStyle -->
          <v-card-item>
            <v-select :disabled="armorList.length == 0" clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="armorList" item-title="name" v-model="guildQuestsForm.armor" return-object>
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
          <!-- Select ArmorType -->
          <v-card-item>
            <v-select clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="armorTypeList" item-title="name" v-model="guildQuestsForm.armorType" return-object>
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
          <!-- Setting QuestLevel -->
          <v-card-item>
            <v-text-field v-model="guildQuestsForm.level" color="primary" label="level" type="number" @update:modelValue="onchangeLevel"></v-text-field>
          </v-card-item>
        </v-card>
        <!-- Select QuestLocation -->
        <v-card-item>
          <v-select clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="questList" item-title="name" v-model="guildQuestsForm.questcountInit" return-object>
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" rounded="xl"> </v-list-item>
            </template>
          </v-select>
        </v-card-item>
      </template>
      <!-- Step2 Setting EverwoodMapInfo  -->
      <template v-slot:item.2>
        <v-card title="Step Two" flat>
          <v-container>
            <v-row v-for="(item, i) in guildQuestsForm.everwoodMapInfo" no-gutters>
              <!-- Select EverwoodMap -->
              <v-col cols="12" sm="4">
                <v-card-item>
                  <v-select clearable @click:clear="onClearEverwoodMap(i)" :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="everwoodMapList" item-title="name" v-model="item.info" return-object>
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props" rounded="xl"> </v-list-item>
                    </template>
                  </v-select>
                </v-card-item>
              </v-col>
              <!-- Select Entrance -->
              <v-col v-if="item.info" cols="12" sm="4">
                <v-card-item>
                  <v-select :rules="[() => validateEntrance(guildQuestsForm.everwoodMapInfo[i].in, i)]" clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="item.info.chooseable" item-title="name" v-model="item.in" return-object @update:modelValue="(data) => onSelectMapIn(item, i)">
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props" rounded="xl"> </v-list-item>
                    </template>
                  </v-select>
                </v-card-item>
              </v-col>
              <!-- Select Exit -->
              <v-col v-if="item.info" cols="12" sm="4">
                <v-card-item>
                  <v-select ref="selectExitRefs" :rules="[() => validateExit(guildQuestsForm.everwoodMapInfo[i].out, i)]" clearable :label="$t('guild.questsEditer.selectSecondaryMonster')" :items="item.info.chooseable" item-title="name" v-model="item.out" return-object @update:modelValue="(data) => onSelectMapIn(item, i)">
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props" rounded="xl"> </v-list-item>
                    </template>
                  </v-select>
                </v-card-item>
              </v-col>
              <!-- Setting MainMonster -->
              <template v-if="guildQuestsForm.MainMonster && item.birthPointsInit && item.birthPointsInit.length > 0 && MonsterInMap(guildQuestsForm.MainMonster.choseableArea, item.info ? item.info.id : false)">
                <!-- Monster Icon -->
                <!-- <v-col cols="12" sm="1">
                  <v-card-item>
                    <v-img height="40" width="40" aspect-ratio="1/1" :src="guildQuestsForm.MainMonster.icon"></v-img>
                  </v-card-item>
                </v-col> -->
                <!-- initPoint -->
                <v-col cols="12" sm="5">
                  <v-card-item>
                    <v-radio-group @update:modelValue="setInitPoint(i, 'MainMonster')" v-model="item.MainMonster.initPoint" inline>
                      <v-radio v-for="(bitem, bi) in item.birthPointsInit" :label="bitem.name" :value="bitem.id"></v-radio>
                    </v-radio-group>
                  </v-card-item>
                </v-col>
                <!-- BirthPoint -->
                <v-col cols="12" sm="2" v-show="item.MainMonster.initPoint != 'FF'">
                  <v-card @click="setIsBirthPoint(i, 'MainMonster')" :color="item.MainMonster.isBirthPoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Birth</div>
                  </v-card>
                </v-col>
                <!-- SleepPoint -->
                <v-col cols="12" sm="2" v-show="item.MainMonster.initPoint != 'FF'">
                  <v-card @click="setEatOrSleepPoint(i, 'MainMonster', 'sleep')" :color="item.MainMonster.isSleepPoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Sleep</div>
                  </v-card>
                </v-col>
                <!-- ActivePoint -->
                <v-col cols="12" sm="2" v-show="item.MainMonster.initPoint != 'FF'">
                  <v-card @click="setEatOrSleepPoint(i, 'MainMonster', 'active')" :color="item.MainMonster.isActivePoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Active</div>
                  </v-card>
                </v-col>
              </template>
              <!-- Setting SecondaryMonster -->
              <template v-if="guildQuestsForm.SecondaryMonster && item.birthPointsInit && item.birthPointsInit.length > 0 && MonsterInMap(guildQuestsForm.SecondaryMonster.choseableArea, item.info ? item.info.id : false)">
                <!-- Monster Icon -->
                <!-- <v-col cols="12" sm="1">
                  <v-card-item>
                    <v-img height="40" width="40" aspect-ratio="1/1" :src="guildQuestsForm.SecondaryMonster.icon"></v-img>
                  </v-card-item>
                </v-col> -->
                <!-- initPoint -->
                <v-col cols="12" sm="5">
                  <v-card-item>
                    <v-radio-group @update:modelValue="setInitPoint(i, 'SecondaryMonster')" v-model="item.SecondaryMonster.initPoint" inline>
                      <v-radio v-for="(bitem, bi) in item.birthPointsInit" :label="bitem.name" :value="bitem.id"></v-radio>
                    </v-radio-group>
                  </v-card-item>
                </v-col>
                <!-- BirthPoint -->
                <v-col cols="12" sm="2" v-show="item.SecondaryMonster.initPoint != 'FF'">
                  <v-card @click="setIsBirthPoint(i, 'SecondaryMonster')" :color="item.SecondaryMonster.isBirthPoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Birth</div>
                  </v-card>
                </v-col>
                <!-- SleepPoint -->
                <v-col cols="12" sm="2" v-show="item.SecondaryMonster.initPoint != 'FF'">
                  <v-card @click="setEatOrSleepPoint(i, 'SecondaryMonster', 'sleep')" :color="item.SecondaryMonster.isSleepPoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Sleep</div>
                  </v-card>
                </v-col>
                <!-- ActivePoint -->
                <v-col cols="12" sm="2" v-show="item.SecondaryMonster.initPoint != 'FF'">
                  <v-card @click="setEatOrSleepPoint(i, 'SecondaryMonster', 'active')" :color="item.SecondaryMonster.isActivePoint ? 'primary' : ''" class="d-flex align-center" dark>
                    <div class="text-h3 flex-grow-1 text-center">Active</div>
                  </v-card>
                </v-col>
              </template>
              <v-divider class="border-opacity-50" color="info"></v-divider>
            </v-row>
          </v-container>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>

    <!-- finalCode -->
    <v-card title="Code">
      <!-- author -->
      <v-card title="author">
        <v-card-item>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(0) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.authorHexCode[0] }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(4) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.authorHexCode[1] }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(8) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.authorHexCode[2] }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(12) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.authorHexCode[3] }}</span>
          </div>
        </v-card-item>
      </v-card>
      <!-- randomQuestsId 随机生成？？？？？？？ -->
      <v-card title="RandomQuestsId">
        <v-card-item>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(24) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">
              {{ `${guildQuestsForm.randomId[14]}${guildQuestsForm.randomId[15]}${guildQuestsForm.randomId[12]}${guildQuestsForm.randomId[13]}${guildQuestsForm.randomId[10]}${guildQuestsForm.randomId[11]}${guildQuestsForm.randomId[8]}${guildQuestsForm.randomId[9]}` }}
            </span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(28) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">
              {{ `${guildQuestsForm.randomId[6]}${guildQuestsForm.randomId[7]}${guildQuestsForm.randomId[4]}${guildQuestsForm.randomId[5]}${guildQuestsForm.randomId[2]}${guildQuestsForm.randomId[3]}${guildQuestsForm.randomId[0]}${guildQuestsForm.randomId[1]}` }}
            </span>
          </div>
        </v-card-item>
      </v-card>
      <!-- WeaponType&ArmorType&ArmorPart 装备部件--装备样式--武器--????-->
      <v-card title="WeaponType-ArmorType-ArmorPart-00">
        <v-card-item>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(36) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.armorType ? guildQuestsForm.armorType.id : '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.armor ? guildQuestsForm.armor.id : '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.weapon ? guildQuestsForm.weapon.id : '01' }}</span>
            <span style="color: rgb(0, 255, 0)">00</span>
          </div>
        </v-card-item>
      </v-card>
      <v-card title="MainM1">
        <v-card-item>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(40) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <!-- 主怪id -->
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.MainMonster ? guildQuestsForm.MainMonster.id : '13' }}</span>
          </div>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(44) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00000001' }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(48) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '07' }}</span>
            <!-- 出生区 -->
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('MainMonster', 'isBirthPoint') }}</span>
            <span style="color: rgb(0, 255, 0)">{{ 'FF' }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(240) }}</span>
            <span>&nbsp;</span>
            <!-- 图2InitPoint-图1InitPoint-SleepPoint-ActivePoint -->
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('MainMonster', 1) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('MainMonster', 0) }}</span>
            <!-- 睡眠区 -->
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('MainMonster', 'isSleepPoint') }}</span>
            <!-- 活跃区 -->
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('MainMonster', 'isActivePoint') }}</span>
          </div>
          <div>
            1000
            <span style="color: aquamarine">{{ getquestCount2Hex(244) }}</span>
            <span>&nbsp;</span>
            <!-- 00-00-图4InitPoint-图3InitPoint -->
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('MainMonster', 3) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('MainMonster', 2) }}</span>
          </div>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(246) }}</span>
            <span>&nbsp;</span>
            <!-- 00-00-00-图5InitPoint -->
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('MainMonster', 4) }}</span>
          </div>
        </v-card-item>
      </v-card>
      <v-card title="MainM2">
        <v-card-item>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(80) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.SecondaryMonster ? guildQuestsForm.SecondaryMonster.id : '13' }}</span>
          </div>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(84) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '01' }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(88) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '07' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('SecondaryMonster', 'isBirthPoint') }}</span>
            <span style="color: rgb(0, 255, 0)">{{ 'FF' }}</span>
          </div>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(247) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('SecondaryMonster', 'isActivePoint') }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(248) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('SecondaryMonster', 2) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('SecondaryMonster', 1) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('SecondaryMonster', 0) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getPointByName('SecondaryMonster', 'isSleepPoint') }}</span>
          </div>
          <div>
            1000
            <span style="color: aquamarine">{{ getquestCount2Hex(252) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('SecondaryMonster', 4) }}</span>
            <span style="color: rgb(0, 183, 255)">{{ getInitPointByIndex('SecondaryMonster', 3) }}</span>
          </div>
        </v-card-item>
      </v-card>
      <v-card title="MainM3">
        <v-card-item>
          <div>
            0000<span style="color: aquamarine">{{ getquestCount2Hex(120) }}</span
            >{{ ` 00000000` }}
          </div>
          <div>
            0000<span style="color: aquamarine">{{ getquestCount2Hex(124) }}</span
            >{{ ` 00000001` }}
          </div>
          <div>
            2000<span style="color: aquamarine">{{ getquestCount2Hex(128) }}</span
            >{{ ` 000700FF` }}
          </div>
          <div>
            1000<span style="color: aquamarine">{{ getquestCount2Hex(254) }}</span
            >{{ ` 00000000` }}
          </div>
          <div>
            2000<span style="color: aquamarine">{{ getquestCount2Hex(256) }}</span
            >{{ ` 00000000` }}
          </div>
          <div>
            0000<span style="color: aquamarine">{{ getquestCount2Hex(260) }}</span
            >{{ ` 00000000` }}
          </div>
        </v-card-item>
      </v-card>
      <v-card title="default">
        <v-card-item>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(164) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(206, 255, 206)">{{ '00000001' }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(168) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(206, 255, 206)">{{ '000700FF' }}</span>
          </div>
          <div>
            0000
            <span style="color: aquamarine">{{ getquestCount2Hex(204) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(206, 255, 206)">{{ '00000001' }}</span>
          </div>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(208) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(206, 255, 206)">{{ '000700FF' }}</span>
          </div>
        </v-card-item>
      </v-card>
      <v-card title="mapInfo **--out--in--mapCode">
        <v-card-item>
          <div v-for="(item, i) in guildQuestsForm.everwoodMapInfo">
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(276 + (i << 2)) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(255, 123, 123)" v-if="i == 1 && 3 == getRealEverwoodMap()">{{ '02' }}</span>
            <span style="color: rgb(255, 128, 128)" v-else-if="i == 2 && 4 == getRealEverwoodMap()">{{ '02' }}</span>
            <span style="color: rgb(255, 123, 123)" v-else-if="i == 3 && 5 == getRealEverwoodMap()">{{ '02' }}</span>
            <span style="color: rgb(0, 183, 255)" v-else-if="i == 4">{{ '00' }}</span>
            <span style="color: rgb(148, 234, 255)" v-else>{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ item.out ? item.out : '01' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ item.in ? item.in : '01' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ item.info ? item.info.id : '00' }}</span>
          </div>
        </v-card-item>
      </v-card>
      <v-card title="Mmtype-treasure-level-defaultLevel">
        <!-- 当前monster状态（普通0狂1极9）-是否有宝藏-当前任务等级-初始等级 -->
        <v-card-item>
          <div>
            2000
            <span style="color: aquamarine">{{ getquestCount2Hex(296) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.MainMonsterType }}</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.treasure }}</span>
            <span style="color: rgb(0, 183, 255)">{{ dec2Hex(guildQuestsForm.level).toUpperCase() }}</span>
            <span style="color: rgb(0, 183, 255)">{{ dec2Hex(guildQuestsForm.defaultLevel).toUpperCase() }}</span>
          </div>
        </v-card-item>
      </v-card>
      <!-- <v-card v-if="false" title="??????????">
        <v-card-item>
          <div>
            1000
            <span style="color: aquamarine">{{ getquestCount2Hex(298) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(255, 0, 0)">{{ guildQuestsForm.treasure }}</span>
            <span style="color: rgb(255, 0, 0)">{{ guildQuestsForm.treasure }}</span>
            <span style="color: rgb(255, 0, 0)">{{ dec2Hex(guildQuestsForm.level).toUpperCase() }}</span>
            <span style="color: rgb(255, 0, 0)">{{ dec2Hex(guildQuestsForm.defaultLevel).toUpperCase() }}</span>
          </div>
        </v-card-item>
      </v-card> -->
      <v-card v-if="guildQuestsForm.MainMonsterType != '00'" title="00-00-UnknownMonsterType-SecondaryMonsterType">
        <!-- ??????? -->
        <v-card-item>
          <div>
            1000
            <span style="color: aquamarine">{{ getquestCount2Hex(300) }}</span>
            <span>&nbsp;</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 255, 0)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ '00' }}</span>
            <span style="color: rgb(0, 183, 255)">{{ guildQuestsForm.SecondaryMonsterType }}</span>
          </div>
        </v-card-item>
      </v-card>
    </v-card>
  </div>
</template>
<script setup lang="ts">
// 1.休眠与食事

// 如果有两个区域可以让怪物移动，则初始区域将处于休眠状态，另一个区域将用于进食。
// 如果怪物可以移动的区域数量为3个或更多，则休眠和进食的区域将与初始区域不同。

// 例如，傾斜(丘)→水→悬崖→天井→宝藏。
// 金狮子可以移动到两个区域：傾斜(丘)和水，所以最初的区域将处于休眠状态，另一个区域将用于进食。
// 金狮子可以移动到三个区域：水、悬崖和天井，所以休眠和进食都会在与初始区域不同的区域。

// 2.初始区域

// 从每个怪物可以移动的地图类型中选择两种后，在生成其他地图之前，会根据所选类型确定初始区域，因此怪物 1 和怪物 2 如果初始地图类型相同但初始区域为不同的是，您可以接受订单，但这将是非法的。

// 例如，假设Jinra中可以移动的地图类型是水和斜坡，而Ra中可以移动的地图类型是水和悬崖。
// 选择的三种地图类型是水、坡度和悬崖。
// 接下来，从上述三种类型中选择每个怪物的初始地图类型。
// 在这两种情况下，假设选择水作为初始地图类型。
// 然后，决定区域的顺序并生成其他区域。
// 例如，假设额外生成了水和宝藏，并创建了任务水->宝藏->悬崖->斜坡->水。
// 由于添加的水域没有设置初始值，所以区域 1 的水中有 Jin，而区域 5 的水中有 Ra，这是不规则的。
// 如果两者的初始地图类型都设置为水域，则它们应该位于同一区域。
// 地图类型

// 3.必须有1个宝藏区

// 4.g必须有2个或以上的可移动区域 如果只有两个可移动区域，那这两个必须为不同类型的区域

// 探索生成时，会从每个怪物可以移动的地图类型中选择两种，所以如果每个怪物没有两个可以移动的地图类型，你可以接受顺序，但会不规则。变成
// 例如:水→水→常春藤→宝藏是非常规的，因为唯一可以移动的地图类型是水。

// 6.如果相同的地图类型连续且中间没有任何宝藏，您仍然可以收到订单，但这不是官方的。
// 例如，在罗哈拉，水→宝藏→水→倾斜是合法的，但水→水→宝藏→倾斜是不规则的。

import { provide, inject, ref, reactive, shallowReactive, computed, watch, onMounted, onUnmounted, onServerPrefetch } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useExampleStore } from '@/stores/example-pinia';
import { useRoute, useRouter } from 'vue-router';
// import type { ValidationRule } from 'vuetify/components'
// import type { ValidationRule } from 'vuetify/lib';
interface armorTypeList {
  id: string;
  name: string;
  icons: string;
}
interface questList {
  id: number;
  name: string;
}
interface monsterStatus {
  id: string;
  name: string;
}
interface MonsterList {
  id: string;
  icon: string;
  unit: string;
  level: string;
  artifact: string;
  choseableArea: string[];
  frenzy: string;
  value: string;
  text: string;
  textCn: string;
  type: string;
}
interface everwoodMapList {
  id: string;
  chooseable: string[];
  name: string;
}
interface Weapon {
  id: string;
  name: string;
  icons: string;
}
interface Armor {
  id: string;
  name: string;
  icons: string;
}
interface artifactList {
  id: string;
  type: string;
  typeCn: string;
  weapon: Weapon[];
  armor: Armor[];
}
interface birthPointsInit {
  name: string;
  id: string;
}
interface everwoodMapInfo {
  /** * 地图信息 */
  info: everwoodMapList;
  /** * 入口 */
  in: any;
  /** * 出口 */
  out: any;
  /** * 出生点位 */
  birthPointsInit?: birthPointsInit[];
  MainMonster: {
    isBirthPoint: boolean; // 出生地
    isSleepPoint: boolean; // 睡眠地
    isActivePoint: boolean; // 活跃地
    initPoint: any; //地图降落点
  };
  SecondaryMonster: {
    isBirthPoint: boolean; // 出生地
    isSleepPoint: boolean; // 睡眠地
    isActivePoint: boolean; // 活跃地
    initPoint: any; //地图降落点
  };
}
// const store = useExampleStore();
// const { exampleData } = storeToRefs(store);
const axios: any = inject('$axios');
const route = useRoute(); // route.query.exampleId
const router = useRouter();
const guildQuestsForm = ref({
  author: '' as string, //作者
  authorHexCode: ['00000000', '00000000', '00000000', '00000000'], //作者16进制码
  randomId: '', //任务随机ID
  MainMonster: null as MonsterList | null, //主怪
  SecondaryMonster: null as MonsterList | null, //副怪
  MainMonsterType: '00' as string, //主怪状态
  SecondaryMonsterType: '00' as string, //副怪状态
  weapon: null as Weapon | null, //武器
  armor: null as Armor | null, //防具
  armorType: null as armorTypeList | null, //防具类型
  level: 0 as number, //当前任务等级
  defaultLevel: 0 as number, //默认等级
  questcountInit: null as questList | null, //任务栏位置
  treasure: '00' as string, //是否有宝藏00無 01 有
  everwoodMapInfo: [] as everwoodMapInfo[] //地图信息
});
const everwoodMapList = ref([] as everwoodMapList[]);
const mainMonsterList = ref([] as MonsterList[]);
const artifactList = ref([] as artifactList[]);
const weaponList = ref([] as Weapon[]);
const armorList = ref([] as Armor[]);
const armorTypeList = ref([] as armorTypeList[]);
const questList = ref([] as questList[]);
const monsterStatus = ref([] as monsterStatus[]);
const secondaryMonsterList = ref([] as MonsterList[]);
const canSelectSecondaryMonster = ref(false as boolean);
const selectExitRefs = ref([]);
const editerStep = [
  { name: 'Step 1', id: 1 },
  { name: 'Step 2', id: 2 },
  { name: 'Step 3', id: 3 }
];
// 改变Step时
const onChnageStep = (step: any) => {
  console.log('step', step);
  if (step == 3) {
    // 验证2的地图信息
    console.log('guildQuestsForm.everwoodMapInfo', guildQuestsForm.value.everwoodMapInfo);
    let mainMonsterHasPlace = 0; // 可以移动的地图数量
    let secondaryMonsterHasPlace = 0; // 可以移动的地图数量
    const mainMonsterPlace = new Set(); // 只计算不同类型的可移动地图数量
    const secondaryMonsterPlace = new Set(); // 只计算不同类型的可移动地图数量
    let mainMonsterIsSleepOrActiveWithBirth = false; // 休眠进食区与出生区是否相同
    let secondaryMonsterIsSleepOrActiveWithBirth = false; // 休眠进食区与出生区是否相同
    let mainMonsterBirthInfo = {
      id: '',
      location: -1
    };
    let secondaryMonsterBirthInfo = {
      id: '',
      location: -1
    };
    let treasureMapCount = 0; // 宝区数量
    guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
      // ************MainMonster************
      if (item.MainMonster.initPoint) {
        // 有适合地图增加
        mainMonsterHasPlace++;
        mainMonsterPlace.add(item.info.id);
        if (item.MainMonster.initPoint) {
          mainMonsterBirthInfo.id = item.info.id;
          mainMonsterBirthInfo.location = i;
        }
      }
      if ((item.MainMonster.isBirthPoint && item.MainMonster.isSleepPoint) || (item.MainMonster.isBirthPoint && item.MainMonster.isActivePoint)) {
        // 初始区与睡眠区相同
        mainMonsterIsSleepOrActiveWithBirth = true;
      }

      // ************SecondaryMonster************
      if (item.SecondaryMonster.initPoint) {
        // 有适合地图增加
        secondaryMonsterHasPlace++;
        secondaryMonsterPlace.add(item.info.id);
        if (item.SecondaryMonster.initPoint) {
          secondaryMonsterBirthInfo.id = item.info.id;
          secondaryMonsterBirthInfo.location = i;
        }
      }
      if ((item.SecondaryMonster.isBirthPoint && item.SecondaryMonster.isSleepPoint) || (item.SecondaryMonster.isBirthPoint && item.SecondaryMonster.isActivePoint)) {
        // 初始区与睡眠区相同
        secondaryMonsterIsSleepOrActiveWithBirth = true;
      }

      //
      if (item.info && item.info.id == '0A') {
        treasureMapCount++;
      }
    });
    // 校验开始校验开始校验开始校验开始校验开始校验开始校验开始校验开始
    // ************MainMonster************
    if (mainMonsterPlace.size < 2) {
      console.error('主 至少需要2个不同类型的可移动区域');
    }
    if (mainMonsterHasPlace === 2 && !mainMonsterIsSleepOrActiveWithBirth) {
      // g拥有的区域有且只有2个时,出生与睡眠必须相同
      console.error('主 有且只有2个区域时,出生与睡眠必须相同');
    } else if (mainMonsterHasPlace > 2 && mainMonsterIsSleepOrActiveWithBirth) {
      // g拥有的区域大于2个时,出生与睡眠需不相同
      console.error('主 拥有的区域大于2个时,出生与睡眠需不相同');
    }

    // ************SecondaryMonster************
    if (guildQuestsForm.value.SecondaryMonster) {
      if (secondaryMonsterPlace.size < 2) {
        console.error('副 至少需要2个不同类型的可移动区域');
      }
      if (secondaryMonsterBirthInfo.id == mainMonsterBirthInfo.id && secondaryMonsterBirthInfo.location != mainMonsterBirthInfo.location) {
        console.error('初始birth地图类型相同时，必须为相同地图，参考2.初始区域');
      }
      // 是否有副G
      if (secondaryMonsterHasPlace === 2 && !secondaryMonsterIsSleepOrActiveWithBirth) {
        // g拥有的区域有且只有2个时,出生与睡眠必须相同
        console.error('副 有且只有2个区域时,出生与睡眠必须相同');
      } else if (secondaryMonsterHasPlace > 2 && secondaryMonsterIsSleepOrActiveWithBirth) {
        // g拥有的区域大于2个时,出生与睡眠需不相同
        console.error('副 拥有的区域大于2个时,出生与睡眠需不相同');
      }
    }
    // ************teasureMap************
    if (treasureMapCount != 1) {
      console.error('quest need one treasure。参考注意事项<3>');
    }
  }
};
// 清除地图
const onClearEverwoodMap = (index: number) => {
  console.log('清除1');
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      console.log('清除32');
      guildQuestsForm.value.everwoodMapInfo[i] = {
        info: null, //地图信息
        in: null, //入口
        out: null, //出口
        SecondaryMonster: {
          isBirthPoint: false, // 出生地
          isSleepPoint: false, // 睡眠地
          isActivePoint: false, // 活跃地
          initPoint: 'FF' //地图降落点
        },
        MainMonster: {
          isBirthPoint: false, // 出生地
          isSleepPoint: false, // 睡眠地
          isActivePoint: false, // 活跃地
          initPoint: 'FF' //地图降落点
        }
      };
    }
  });
};
// 校验入口
const validateEntrance = (value: any, index: number) => {
  let rttype = true as string | boolean;
  console.log('value', value);
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      if ((value !== '' && value === item.out) || (value === '01' && item.out === '02') || (value === '02' && item.out === '01') || (value === '03' && item.out === '04') || (value === '04' && item.out === '03') || (value === '05' && item.out === '06') || (value === '06' && item.out === '05') || (value === '07' && item.out === '08') || (value === '08' && item.out === '07')) {
        rttype = '入口有误';
      }
    }
  });
  return rttype;
};
// 校验出口
const validateExit = (value: any, index: number) => {
  console.log('validateExit', value, index, selectExitRefs.value);
  let rttype = true as string | boolean;
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      if ((value !== '' && value === item.in) || (value === '01' && item.in === '02') || (value === '02' && item.in === '01') || (value === '03' && item.in === '04') || (value === '04' && item.in === '03') || (value === '05' && item.in === '06') || (value === '06' && item.in === '05') || (value === '07' && item.in === '08') || (value === '08' && item.in === '07')) {
        rttype = '出口有误';
      }
    }
  });
  return rttype;
};
// 改变注入点位时
const setInitPoint = (index: number, name: keyof everwoodMapInfo) => {
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      // 如果不设置注入，全部信息设置为false
      if (item[name].initPoint == 'FF') {
        item[name].isBirthPoint = false;
        item[name].isSleepPoint = false; // 睡眠地
        item[name].isActivePoint = false; // 活跃地
      }
    }
  });
};
const getInitPointByIndex = (name: keyof everwoodMapInfo, index: number) => {
  let pointRt = '00';
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      console.log('点位信息item[name].initPoint', item[name].initPoint);
      if (item[name].initPoint && item[name].initPoint == 'FF') {
      } else {
        pointRt = dec2Hex(item[name].initPoint);
      }
    }
  });
  return pointRt;
};
const onChangeAuthor = (author: string) => {
  guildQuestsForm.value.authorHexCode = getNameCode(author);
  console.log('Author', guildQuestsForm.value.authorHexCode);
};
const getNameCode = (name: string) => {
  // Chinese 無      盡      夏    日
  // ？？？ 33 113 225 118 15 89 229 101
  // 16进制 21 71   E1 76  0F 59 E5  65
  // 無盡夏日啊啊啊
  // 2000E760 76E17121
  // 2000E764 65E5590F
  // 2000E768 554A554A
  // 2000E76C 0000554A
  let authorRt = [] as any[];
  name.split('').forEach((item, i) => {
    // console.log(item);
    // 获取字符的Unicode编码
    const unicode12 = item.charCodeAt(0);
    // 拆分为两个十进制数字
    const num1 = Math.floor(unicode12 / 256);
    const num2 = unicode12 % 256;

    authorRt.push(`${dec2Hex(num1) + dec2Hex(num2)}`);
    // console.log(authorRt); // 输出：225 118
  });
  const defaultArr = [`${authorRt[1] || '0000'}${authorRt[0] || '0000'}`, `${authorRt[3] || '0000'}${authorRt[2] || '0000'}`, `${authorRt[5] || '0000'}${authorRt[4] || '0000'}`, `${authorRt[7] || '0000'}${authorRt[6] || '0000'}`];

  return defaultArr;
};
// 获取点
const getPointByName = (name: keyof everwoodMapInfo, type: string) => {
  let pointRt = '00';
  guildQuestsForm.value.everwoodMapInfo.forEach((item: everwoodMapInfo, i) => {
    if (item[name][type]) {
      console.log('点位信息', item);
      pointRt = dec2Hex(i + 1);
    }
  });
  return pointRt;
};
// 设置进食或睡眠
const setEatOrSleepPoint = (index: number, name: keyof everwoodMapInfo, type: string) => {
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      if (type == 'sleep') {
        item[name].isSleepPoint = true;
        item[name].isActivePoint = false;
      } else {
        item[name].isSleepPoint = false;
        item[name].isActivePoint = true;
      }
    } else {
      if (type == 'sleep') {
        item[name].isSleepPoint = false;
      } else {
        item[name].isActivePoint = false;
      }
    }
  });
};
// 设置出生地
const setIsBirthPoint = (index: number, name: keyof everwoodMapInfo) => {
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (index == i) {
      item[name].isBirthPoint = true;
    } else {
      item[name].isBirthPoint = false;
    }
  });
};
// 判断当前地图能否出现某种m
const MonsterInMap = (MonsterAreas: string[], MapId: string | boolean) => {
  console.log('mapinm', MonsterAreas, MapId);
  if (MapId) {
    return MonsterAreas.includes(MapId as string);
  } else {
    return false;
  }
};
// 当选中地图的入口后
const onSelectMapIn = (item: everwoodMapInfo, i: number) => {
  // console.log(selectData, item, i);
  guildQuestsForm.value.everwoodMapInfo[i].birthPointsInit = setEverwoodMapBirthPoint(item, i);
  console.log('重设出生点', guildQuestsForm.value.everwoodMapInfo[i].birthPointsInit);
};
// 设置选择地图与出入口后的怪物出生点可选项
const setEverwoodMapBirthPoint = (item: everwoodMapInfo, i: number) => {
  console.log(item, i);
  let birthPoints = [
    {
      name: 'no setting',
      id: 'FF'
    }
  ];
  if (item.in && item.out) {
    switch (item.info.id) {
      // 無m
      case '01':
      case '05':
      case '0A':
        break;
      case '06':
      case '07':
      case '08':
      case '0B':
      case '0C':
        birthPoints = [
          {
            name: 'no setting',
            id: 'FF'
          },
          {
            name: '⓪',
            id: '00'
          }
        ];
        break;
      //傾斜、蔦の場合
      case '02':
      case '06':
        birthPoints = [
          {
            name: 'no setting',
            id: 'FF'
          },
          {
            name: '①',
            id: '01'
          }
        ];
        if (item.in === '01' || item.out === '01' || item.in === '02' || item.out === '02') {
          birthPoints.push({
            name: '⓪',
            id: '00'
          });
        }
        if (item.in === '05' || item.out === '05' || item.in === '06' || item.out === '06') {
          birthPoints.push({
            name: '②',
            id: '02'
          });
        }
        //出入り口で7か8を使用していると③が追加される
        if (item.in === '07' || item.out === '07' || item.in === '08' || item.out === '08') {
          birthPoints.push({
            name: '③',
            id: '03'
          });
        }
        break;
      //崖の場合
      case '03':
        birthPoints = [
          {
            name: 'no setting',
            id: 'FF'
          },
          {
            name: '①',
            id: '01'
          }
        ];
        if (item.in === '01' || item.out === '01' || item.in === '02' || item.out === '02') {
          birthPoints.push({
            name: '⓪',
            id: '00'
          });
        }
        if (item.in === '05' || item.out === '05' || item.in === '06' || item.out === '06') {
          birthPoints.push({
            name: '②',
            id: '02'
          });
        }
        break;

      //水の場合
      case '04':
        birthPoints = [
          {
            name: 'no setting',
            id: 'FF'
          },
          {
            name: '⓪',
            id: '00'
          },
          {
            name: '①',
            id: '01'
          },
          {
            name: '②',
            id: '02'
          }
        ];
        if (item.in === '07' || item.out === '07' || item.in === '08' || item.out === '08') {
          birthPoints.push({
            name: '③',
            id: '03'
          });
        }
        break;
    }
  }
  return birthPoints;
};
// 获取有效地图数量
const getRealEverwoodMap = () => {
  let realLength = 0;
  guildQuestsForm.value.everwoodMapInfo.forEach((item, i) => {
    if (item.info) {
      realLength++;
    }
  });
  return realLength;
};
// 注入5个地图初始信息
const everwoodMapInfoInit = () => {
  for (let index = 0; index < 5; index++) {
    guildQuestsForm.value.everwoodMapInfo.push({
      info: null, //地图信息
      in: null, //入口
      out: null, //出口
      SecondaryMonster: {
        isBirthPoint: false, // 出生地
        isSleepPoint: false, // 睡眠地
        isActivePoint: false, // 活跃地
        initPoint: 'FF' //地图降落点
      },
      MainMonster: {
        isBirthPoint: false, // 出生地
        isSleepPoint: false, // 睡眠地
        isActivePoint: false, // 活跃地
        initPoint: 'FF' //地图降落点
      }
    });
  }
};
everwoodMapInfoInit();
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
// 测试任务栏位置对应数据
const getquestCount2Hex = (questCount: number) => {
  return dec2Hex(questCount + (guildQuestsForm.value.questcountInit ? guildQuestsForm.value.questcountInit.id : 0) * 304 + 56496).toUpperCase();
};
const dec2Hex = (dec: number) => {
  return Math.abs(dec).toString(16).padStart(2, '0').toUpperCase();
};
// 计算任务等级
const getQuestsLevel = () => {
  if (guildQuestsForm.value.MainMonster && guildQuestsForm.value.SecondaryMonster) {
    guildQuestsForm.value.level = Math.floor((Number(guildQuestsForm.value.MainMonster.level) + Number(guildQuestsForm.value.SecondaryMonster.level)) / 2);
    guildQuestsForm.value.defaultLevel = guildQuestsForm.value.level;
  } else {
    guildQuestsForm.value.level = guildQuestsForm.value.MainMonster ? Number(guildQuestsForm.value.MainMonster.level) : guildQuestsForm.value.SecondaryMonster ? Number(guildQuestsForm.value.SecondaryMonster.level) : 0;
    guildQuestsForm.value.defaultLevel = guildQuestsForm.value.level;
  }
};
const getMonsterOfArtifact = (id: string) => {
  artifactList.value.forEach((item) => {
    if (item.id == id) {
      weaponList.value = item.weapon;
      armorList.value = item.armor;
      console.log('111', armorList.value);
    }
  });
  if (guildQuestsForm.value.weapon && guildQuestsForm.value.weapon.id) {
    weaponList.value.forEach((item) => {
      if (item.id == guildQuestsForm.value.weapon!.id) {
        guildQuestsForm.value.weapon = item;
      }
    });
  }
};
// 选中首要目标
const onSelectMainMonster = (data: MonsterList) => {
  console.log('主要目标', data);
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
// 选中次要目标
const onSelectSecondaryMonster = (data: MonsterList) => {
  console.log('次要目标', data);
  // 计算level
  getQuestsLevel();
};
// 随机任务ID
const randomQuestsId = () => {
  // クエスト識別ID

  // クエストを識別する為のIDです
  // 同じIDは同じクエストとして扱われ、クエストが送信されても受信しません
  // 識別に他の値は関係なく、IDが全てです

  // 識別IDは8byte（64bit）のデータなので
  // 2の64乗通りのデータを扱えます
  // 訳分からない数字なので自然に被ることはほぼ絶対ないです
  let min = 0;
  let max = 4294967295;
  let random1: string | number = Math.floor(Math.random() * (max + 1 - min)) + min;
  let random2: string | number = Math.floor(Math.random() * (max + 1 - min)) + min;
  random1 = random1.toString(16).toUpperCase();
  random2 = random2.toString(16).toUpperCase();
  while (random1.length !== 8) {
    random1 = '0' + random1;
  }
  while (random2.length !== 8) {
    random2 = '0' + random2;
  }
  guildQuestsForm.value.randomId = random1 + random2;
};
// get GuildArtifact List
const getGuildArtifact = () => {
  axios
    .getGuildArtifact(localStorage.getItem('lang') || 'ja')
    .then((res: artifactList[]) => {
      if (res.length > 0) {
        artifactList.value = res;
      } else {
      }
    })
    .catch(() => {});
};
// get EverwoodMap List
const getEverwoodMap = () => {
  axios
    .getEverwoodMap(localStorage.getItem('lang') || 'ja')
    .then((res: everwoodMapList[]) => {
      if (res.length > 0) {
        everwoodMapList.value = res;
      } else {
      }
    })
    .catch(() => {});
};
// get GuildMonster List
const getGuildMonsterList = () => {
  axios
    .getGuildMonsterList(localStorage.getItem('lang') || 'ja')
    .then((res: MonsterList[]) => {
      if (res.length > 0) {
        mainMonsterList.value = res;
        secondaryMonsterList.value = [];
        res.forEach((item) => {
          // filter
          if (item.unit === '2') {
            secondaryMonsterList.value?.push(item);
          }
        });
      } else {
        mainMonsterList.value = [];
        secondaryMonsterList.value = [];
      }
    })
    .catch(() => {
      mainMonsterList.value = [];
      secondaryMonsterList.value = [];
    });
};
// get Monster Status List
const getMonsterStatusList = () => {
  axios
    .getMonsterStatusList(localStorage.getItem('lang') || 'ja')
    .then((res: monsterStatus[]) => {
      if (res.length > 0) {
        monsterStatus.value = res;
      } else {
        monsterStatus.value = [];
      }
    })
    .catch(() => {
      monsterStatus.value = [];
    });
};
// get Quest List
const getQuestLocationList = () => {
  axios
    .getQuestLocationList(localStorage.getItem('lang') || 'ja')
    .then((res: questList[]) => {
      if (res.length > 0) {
        questList.value = res;
      } else {
        questList.value = [];
      }
    })
    .catch(() => {
      questList.value = [];
    });
};
// get ArmorType List
const getArmorTypeList = () => {
  axios
    .getArmorTypeList(localStorage.getItem('lang') || 'ja')
    .then((res: armorTypeList[]) => {
      if (res.length > 0) {
        armorTypeList.value = res;
      } else {
        armorTypeList.value = [];
      }
    })
    .catch(() => {
      armorTypeList.value = [];
    });
};
randomQuestsId();
getMonsterStatusList();
getQuestLocationList();
getArmorTypeList();
getGuildMonsterList();
getGuildArtifact();
getEverwoodMap();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped>
.questsEditer {
  height: 100%;
  overflow-y: scroll;
}
</style>
