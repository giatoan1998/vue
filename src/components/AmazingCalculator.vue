<script setup>
  import { ref } from "vue";

  const output = ref('');
  const previousValue = ref(null);
  const operationFired = ref(false);
  const countGetNumber = ref(0);
  let operation;
      
  const clearField = () => {
    output.value = '';
  };
  const setNagativeOrPositive = () => {
    output.value = output.value[0] === '-' ? output.value.slice(1) : `-${output.value}`;
  };
  const calculatePercentage = () => {

    if (output.value) {
      output.value = parseFloat(output.value)/100;
    }
  };
  const getNumber = (number) => {

    if(operationFired.value === true) {
      output.value = '';
      operationFired.value = false;
    }

    output.value = `${output.value}${number}`;
    countGetNumber.value += 1;
  };
  const getDot = () => {

    if (output.value === '') {
      output.value = '0.';
    } else if (output.value === '-') {
      output.value = '-0.';
    } else if (output.value.indexOf('.') === -1) {
      output.value = output.value + '.';
    }
    // Hàm indexOf('.') sẽ trả về chỉ số đầu tiên của dấu chấm nếu nó được tìm thấy trong chuỗi. Nếu không tìm thấy, hàm này sẽ trả về -1.
  };
  const processOutput = (string) => {

    if (['add', 'subtract', 'divide', 'multiply'].includes(string)) {
      if (string == 'add') {
        operation = (a, b) => output.value = parseFloat(a) + parseFloat(b);
      } else if (string == 'subtract') {
        operation = (a, b) => output.value = parseFloat(a) - parseFloat(b);
      } else if (string == 'divide') {
        operation = (a, b) => output.value = parseFloat(a) / parseFloat(b);
      } else if (string == 'multiply') {
        operation = (a, b) => output.value = parseFloat(a) * parseFloat(b);
      }
    }

    previousValue.value = output.value;
    operationFired.value = true;
  };
  const updateOutput = () => {
    if (countGetNumber.value > 1) {
      if (previousValue.value && output.value) {
        output.value = `${operation(previousValue.value, output.value)}`;
        countGetNumber.value = 0;
      }
    }
  };
  const deleteNumber = () => {

    if (output.value.length) {
      output.value = output.value.slice(0, -1);
    }
  };
</script>

<template>
  <div>
    <h1 class="m-3">Calculator</h1>
    <div class="col-md-4 m-3">
      <table class="table">
        <tbody>
          <tr class="output">
            <td colspan="4">{{ output || 0 }}</td>
          </tr>
          <tr>
            <td @click="clearField">C</td>
            <td @click="setNagativeOrPositive">+/-</td>
            <td @click="calculatePercentage">%</td>
            <td @click="processOutput('divide')" class="lastColumn">/</td>
          </tr>
          <tr>
            <td @click="getNumber('7')">7</td>
            <td @click="getNumber('8')">8</td>
            <td @click="getNumber('9')">9</td>
            <td @click="processOutput('multiply')" class="lastColumn">x</td>
          </tr>
          <tr>
            <td @click="getNumber('4')">4</td>
            <td @click="getNumber('5')">5</td>
            <td @click="getNumber('6')">6</td>
            <td @click="processOutput('subtract')" class="lastColumn">-</td>
          </tr>
          <tr>
            <td @click="getNumber('1')">1</td>
            <td @click="getNumber('2')">2</td>
            <td @click="getNumber('3')">3</td>
            <td @click="processOutput('add')" class="lastColumn">+</td>
          </tr>
          <tr>
            <td @click="getNumber('0')">0</td>
            <td @click="getDot()">.</td>
            <td @click="deleteNumber">&#8592;</td>
            <td @click="updateOutput" class="lastColumn">=</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.output td {
  background: #000;
  color: #FFF;
}
table tr td {
  text-align: center;
  border: 1px solid #e4e4e4;
}
.lastColumn {
  background: orange;
  color: #FFF;
}
table tr td:active {
  background: #000;
  color: #FFF;
}
table tr td {
  width: calc(100% / 4);
}
</style>