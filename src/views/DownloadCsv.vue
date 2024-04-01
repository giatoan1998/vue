<script setup>
import axios from "axios";

import { ref, onMounted } from "vue"

const data = ref([]);

const getUsers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-users');
    
        if (response.data) {
            data.value = response.data
        }
    } catch (error) {
        console.error('There was an error', error);
    }
}

const downloadCsv = () => {
    const csvContent = convertToCsv(data);
    console.log(csvContent);
    const blob = new Blob([csvContent], { type: 'text/csv; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const convertToCsv = () => {
    const usersInfo = data.value;
    const headers = Object.keys(usersInfo[0]);
    const rows = usersInfo.map(obj => headers.map(header => obj[header]));
    const headerRow = headers.join(',');
    const csvRows = [headerRow, ...rows.map(row => row.join(','))];

    return csvRows.join('\n');
}

onMounted(() => {
    getUsers();
})
</script>

<template>
    <div class="container">
        <button @click="downloadCsv">Download</button>
    </div>
</template>


<style scoped>
.container button {
    padding: 10px;
    font-weight: bold;
}
</style>