import request from '@/utils/request';
// data
export default {
  getTest() {
    return request({ url: `/test/getlist`, method: 'GET' });
  },
  postTest(data: any) {
    return request({ url: `/test/postdata`, method: 'POST', data });
  },
  getMonster(data: string) {
    return request({ url: `../../src/data/monster-${data}.json`, method: 'GET', isLocal: true });
  },
  getGuildMonsterList(data: string) {
    return request({
      url: `../../src/data/guild/monster-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  },
  getGuildArtifact(data: string) {
    return request({
      url: `../../src/data/guild/artifact-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  },
  getEverwoodMap(data: string) {
    return request({
      url: `../../src/data/guild/everwoodMap-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  },
  getArmorTypeList(data: string) {
    return request({
      url: `../../src/data/guild/armorType-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  },

  getQuestLocationList(data: string) {
    return request({
      url: `../../src/data/guild/questLocation-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  },
  getMonsterStatusList(data: string) {
    return request({
      url: `../../src/data/guild/monsterStatus-${data}.json`,
      method: 'GET',
      isLocal: true
    });
  }
};
