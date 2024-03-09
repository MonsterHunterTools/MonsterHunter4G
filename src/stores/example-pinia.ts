import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useExampleStore = defineStore('example', () => {
  // Store 储存的变量 State 需return导出
  const exampleLS = localStorage.getItem('exampleData') || '[]';
  const exampleData = ref<(string | number)[]>(JSON.parse(exampleLS || '[]'));
  // 计算属性 Getter
  const computexampleData = computed(() => (exampleData.value = ['计算属性']));
  // Action 相当于组件中的 method
  function setSelectSceneId(exampledata: (string | number)[]) {
    localStorage.setItem('selectSceneId', JSON.stringify(exampledata));
    exampleData.value = exampledata;
  }

  return { exampleData, computexampleData, setSelectSceneId };
});
