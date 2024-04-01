<script setup>
import { ref, onMounted } from "vue";

import axios from "axios";

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)
const isDarkTheme = ref(false)
let percentComplete = ref(0)

const options = {
  responseType: 'blob',
  onDownloadProgress: function(progressEvent) {
    percentComplete.value = Math.floor((progressEvent.loaded / progressEvent.total)*100)

    const progressBarFill = document.querySelector(".progress-bar");
    if (progressBarFill) {
      progressBarFill.style.width = percentComplete.value + "%";
    }
  }
};

const searchWikipedia = async (query) => {
  const encodedQuery = encodeURIComponent(query)
  const endpoint = `https://picsum.photos/${encodedQuery}/${encodedQuery}`
  try {
    isLoading.value = true
    const response = await axios.get(endpoint, options)
    const data = response.data
    const img = new Image();
    img.src = URL.createObjectURL(data)
    document.getElementById('imgContainer').appendChild(img);

    if (data) {
      searchResults.value = data
      error.value = null
    } else {
      searchResults.value = []
      error.value = 'No results found.'
    }
  } catch (err) {
    console.error("Error fetching data:", err)
    searchResults.value = []
    error.value = "An error occurred while fetching data."
  } finally {
    isLoading.value = false
  }
}
const submitSearch = () => {
  if (searchQuery.value.trim() !== '') {
    searchWikipedia(searchQuery.value);
  }
}
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
}
</script>

<template>
  <div :class=" { 'dark-theme' : isDarkTheme } " class="container-wiki">
    <div class="header-container">
      <h1>Search Wikipedia</h1>
      <span @click="toggleTheme" id="theme-toggle">{{ isDarkTheme ? 'Light' : 'Dark' }}</span>
    </div>
    <form @submit.prevent="submitSearch">
      <input type="text" v-model="searchQuery" placeholder="Enter search term" id="search-input">
      <button type="submit">Search</button>
    </form>
    <div v-if="percentComplete != 0" class="range-loading">
      <span class="mark progress-bar"><mark class="progress-bar-fill">{{ percentComplete }}%</mark><p></p></span>
    </div>
    <div class="search-result">
      <div id="imgContainer">
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
#imgContainer {
  margin-top: 30px;
}
.container-wiki {
  width: 1000px;
  margin: 0 auto;
  padding: 0 30px;
}
.container-wiki form button {
  margin-top: 10px;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

#search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

#search-input {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  flex-grow: 1;
}

#search-input:focus {
  outline: none;
  border-color: #0074d9;
}

button[type='submit'] {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #0063ad;
}

#search-results {
  margin-bottom: 2rem;
}

.result-item {
  margin-bottom: 1rem;
}

.result-title {
  font-size: 1.5rem;
  margin-top: 0;
}

.result-link {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #0074d9;
}

.result-link:hover {
  text-decoration: underline;
}

.result-snippet {
  margin-top: 0;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 10rem;
}

/* Dark theme */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#theme-toggler {
  border: none;
  background: transparent;
  cursor: pointer;
  background: #e2e2e2;
  padding: 10px 20px;
  border-radius: 100px;
}

.dark-theme {
  background-color: #282c34;
  color: #fff;
}

.dark-theme #search-input {
  background-color: #454545;
  color: #fff;
  border-color: #fff;
}

.dark-theme #search-input:focus {
  border-color: #0074d9;
}

.dark-theme button[type='submit'] {
  background-color: #0074d9;
}

.dark-theme .result-link,
.dark-theme .result-link:hover {
  color: #90caf9;
}
.range-loading {
  background: #F6F6F6;
  width: 100%;
  height: 18px;
  border-radius: 9px;
  border: 1px solid #CCC;
  margin: 20px 0;
}
.range-loading span {
  display: block;
  height: 18px;
  border-radius: 9px;
  background: linear-gradient(270deg, #4B88C0 0.79%, #85C7FF 100%);
  position: relative;
  width: 0;
}
.range-loading span mark {
  padding: 4px 15px;
  border-radius: 25px;
  background: #3C3C3C;
  color: #FFF;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  right: -30px;
  top: 21px;
  z-index: 1;
}
.range-loading span p {
  position: absolute;
  width: 18px;
  height: 18px;
  background: #3C3C3C;
  right: -8px;
  top: 1px;
  border-radius: 9px;
  z-index: 0;
}
</style>