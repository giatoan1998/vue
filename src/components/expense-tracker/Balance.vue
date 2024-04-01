<template>
    <h4>Your Balance</h4>
    <h1 v-if="totalProp >= 0" id="balance">${{ totalProp.toFixed(2) }}</h1>
    <h1 v-else id="balance">-${{ (totalProp*-1).toFixed(2) }}</h1>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    totalProp: {
        type: Number,
        required: true
    }
});
</script>