<script setup lang="ts">
const input = ref<string>('');
const source = ref<string>('');
const target = ref<string>('');

const result = ref<string>('Loading...');

function translate() {
  fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: input.value,
      source: source.value,
      target: target.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      result.value = data.translation;
    });
}
</script>

<template>
  <div>
    <textarea v-model="input"/>
    <br>
    <select v-model="source">
      <option>pl</option>
      <option>ru</option>
      <option>en</option>
      <option>js</option>
      <option>rust</option>
      <option>python</option>
      <option>go</option>
    </select>
    <select v-model="target">
      <option>pl</option>
      <option>ru</option>
      <option>en</option>
      <option>js</option>
      <option>rust</option>
      <option>python</option>
      <option>go</option>
    </select>
    <button @click="translate">Translate</button>

    <hr>

    <p v-text="result"></p>
  </div>
</template>

<style scoped></style>
