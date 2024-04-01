<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">+${{ incomeProp.toFixed(2) }}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p id="money-minus" class="money minus">-${{ (-1*expensesProp).toFixed(2) }}</p>
        </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    expensesProp: {
        type: Number,
        required: true
    },
    incomeProp: {
        type: Number,
        required: true
    },
});
</script>