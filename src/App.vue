<script setup>

import { onMounted, ref } from "vue";

import englandFlag from './assets/imgs/england-flag.jpg';
import japanFlag from './assets/imgs/japan-flag.jpg';
import vietnamFlag from './assets/imgs/vietnam-flag.png';

onMounted(() => {
  document.cookie = 'locale=EN';
})

const list = [
  {
    name: "EN",
    flag: englandFlag
  },
  {
    name: "JA",
    flag: japanFlag
  },
  {
    name: "VN",
    flag: vietnamFlag
  },
];
const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};

let valueInit = ref(
  {
    initName: 'EN',
    initFlag: englandFlag
  }
);

const select = (option) => {
  valueInit.value.initName = option.name
  valueInit.value.initFlag = option.flag
  visible.value = false;
};

</script>
<template>
    <nav>
      <router-link to="/csv">{{ $t('Csv') }}</router-link>
      <router-link to="/">{{ $t('progress') }}</router-link>
      <router-link to="/todo-list">{{ $t('todos') }}</router-link>
      <router-link to="/upload-file">{{ $t('uploadFile') }}</router-link>
      <router-link to="/wiki-clone">{{ $t('wiki') }}</router-link>
      <router-link to="/random-quote-generator">{{ $t('quoteGenerator') }}</router-link>
      <router-link to="/password-generator">{{ $t('passGenerator') }}</router-link>
      <router-link to="/github-users-search">{{ $t('gitSearch') }}</router-link>
      <router-link to="/form-validation">{{ $t('validation') }}</router-link>
      <router-link to="/form-validation-new">{{ $t('validationNew') }}</router-link>
      <router-link to="/dad-jokes">{{ $t('dadJokes') }}</router-link>
      <router-link to="/calculator">{{ $t('calculator') }}</router-link>
      <router-link to="/accordion">{{ $t('accordion') }}</router-link>
      <router-link to="/create-tag">{{ $t('createTag') }}</router-link>
      <router-link to="/expense-tracker">{{ $t('expenseTracker') }}</router-link>
      <router-link to="/drag-drop">Drag Drop</router-link>
    </nav>
    <div class="aselect">
        <div class="selector" @click="toggle()">
            <div  class="label item-lang" style="display: flex;">
              <img :src="valueInit.initFlag" alt="">
              <p>{{ valueInit.initName }}</p>
            </div>
            <div class="arrow" :class="{ expanded : visible }"></div>
            <ul @click="toggle()" :class="{ hidden : !visible, visible }">
                <li v-for="(item, index) in list" :key="index" @click="$i18n.locale = item.name; select(item)" class="item-lang">
                  <img :src="item.flag" alt="">
                  <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
    <router-view/>
</template>

<style scoped>
.item-lang {
  display: flex;
}
.item-lang p {
  margin: 0;
}
.item-lang img {
  width: 30px;
  height: 20px;
  margin-right: 10px;
}
.aselect {
  width: 280px;
  margin: 20px auto;
}
.aselect .selector {
  border: 1px solid gainsboro;
  background: #f8f8f8;
  position: relative;
  z-index: 1;
}
.aselect .selector .arrow {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid #888;
  transform: rotateZ(0deg) translateY(0px);
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
}
.aselect .selector .expanded {
  transform: rotateZ(180deg) translateY(2px);
}
.aselect .selector .label {
  display: block;
  padding: 12px;
  font-size: 16px;
  color: #888;
}
.aselect ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  border: 1px solid gainsboro;
  position: absolute;
  z-index: 1;
  background: #fff;
}
.aselect li {
  padding: 12px;
  color: #666;
}
.aselect li:hover {
  color: white;
  background: seagreen;
}
.aselect .current {
  background: #eaeaea;
}
.aselect .hidden {
  visibility: hidden;
}
.aselect .visible {
  visibility: visible;
}
</style>

<!-- npm i vue-toastification@next -->