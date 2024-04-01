<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} 
            <span v-if="transaction.amount >= 0">+${{ transaction.amount.toFixed(2) }}</span>
            <span v-else>-${{ (transaction.amount*-1).toFixed(2) }}</span>
            <button @click="deleteTransaction(transaction.id)" class="delete-btn">X</button>
        </li>
    </ul>
</template>

<script setup>
import {defineProps} from 'vue';

const emit = defineEmits(['transactionDeleted']);
const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

const deleteTransaction = (id) => {
    emit('transactionDeleted', id)
}
</script>