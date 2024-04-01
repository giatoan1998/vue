<script setup>
import { ref, watch } from "vue";

const formData = {
  name: '',
  email: '',
  password: '',
}
const errors = ref({})
let isValid = true

const validateForm = () => {
  errors.value = {}
  isValid = true

  if(!formData.name.trim()) {
    errors.value.name = 'Name is required.'
    isValid = false
  }

  if(!formData.email.trim()) {
    errors.value.email = 'Email is required.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.value.email = 'Email is invalid.'
    isValid = false
  }

  if(!formData.password.trim()) {
    errors.value.password = 'Password is required.'
    isValid = false
  } else if (formData.password.trim().length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  validateForm()

  if(isValid) {
    console.log(formData);
  } else {
    console.log('errors');
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="custom-form">
      <div class="form-group">
        <label for="name">Name: </label>
        <input v-model="formData.name" type="text" id="name">
        <div v-if="errors.name" style="color: red;">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label for="name">Email: </label>
        <input v-model="formData.email" type="text" id="email">
        <div v-if="errors.email" style="color: red;">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="name">Password: </label>
        <input v-model="formData.password" type="password" id="password">
        <div v-if="errors.password" style="color: red;">{{ errors.password }}</div>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.custom-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.submit-button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>