
<script setup>
// expense tracker begin.
import Header from '../components/expense-tracker/Header.vue'
import Balance from '../components/expense-tracker/Balance.vue'
import IncomeExpenses from '../components/expense-tracker/IncomeExpenses.vue'
import TransactionList from '../components/expense-tracker/TransactionList.vue'
import AddTransaction from '../components/expense-tracker/AddTransaction.vue'
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return (acc + transaction.amount)
  }, 0).toFixed(2)
});

// Get income
const income = computed(() => {
  return transactions.value
  .filter((a) => a.amount > 0)
  .reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0).toFixed(2);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
  .filter((a) => a.amount < 0)
  .reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0).toFixed(2);
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  })
  saveTransactionsToLocalStorage();
  toast.success('Transaction added.');
};

// Generate Unique Id Function.
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000);
};

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
  saveTransactionsToLocalStorage();
  toast.success('Transaction deleted.');
};

// Save to local storage.
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
// expense tracker end.

// Download csv begin.
const exportDataToCsv = () => {
  const data = transactions.value;
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  // Blob (Binary Large Object) là một loại dữ liệu đặc biệt được sử dụng để lưu trữ dữ liệu nhị phân (binary data), chẳng hạn như hình ảnh, video, âm thanh, v.v.
  const url = URL.createObjectURL(blob);
  // Tạo một URL đại diện cho đối tượng Blob đã tạo, để có thể sử dụng nó cho thuộc tính href của thẻ <a>.
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'export_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (data) => {
  const headers = Object.keys(data[0]);
  // headers = ['id', 'text', 'amount']
  const rows = data.map(obj => headers.map(header => obj[header]));
  // [[751319480, 'hch4wt9m', 6544], [551732422, 'hch4wt9m', 654]].
  const headerRow = headers.join(',');
  const csvRows = [headerRow, ...rows.map(row => row.join(','))];

  return csvRows.join('\n');
};
// Download csv end.
</script>

<template>
    <div class="container">
        <Header />
        <Balance :totalProp = "+total"/>
        <IncomeExpenses :incomeProp = "+income" :expensesProp = "+expenses" />
        <TransactionList @transactionDeleted="handleTransactionDeleted" :transactions="transactions" />
        <button class="btn-csv" @click="exportDataToCsv">Download Csv</button>
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
</template>

<style lang="scss" scoped>

</style>