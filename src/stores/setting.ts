import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const uselangStore = defineStore('lang', () => {
  // Store 储存的变量 State 需return导出
  const localStorageData = localStorage.getItem('lang') || '[]';
  const lang = ref<(string | number)[]>(JSON.parse(localStorageData || '[]'));
  // 计算属性 Getter
  const computlang = computed(() => (lang.value = ['计算属性']));
  // Action 相当于组件中的 method
  function setlang(data: (string | number)[]) {
    localStorage.setItem('lang', JSON.stringify(data));
    lang.value = data;
  }

  return { lang, computlang, setlang };
});
