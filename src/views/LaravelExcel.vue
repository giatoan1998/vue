<template>
    <div>
        <button @click="ExportData">Export Data</button>
    </div>
</template>

<script setup>
import axios from 'axios';

const ExportData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/export-excel', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // xlsx: Excel Spreadsheet XML
        // csv: Comma Separated Value
        // PDF: Portable Document Format
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const fileName = `user_${timestamp}.xlsx`;

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error downloading Excel:', error);
    }
}

</script>

<style lang="scss" scoped>

</style>