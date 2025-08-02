<template>
  <div class="bg-gray-900 text-white min-h-screen font-sans">
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Network Detective's Casebook</h1>
        <div>
          <router-link to="/" class="text-gray-300 hover:text-white mr-4">Casebook</router-link>
          <router-link to="/ledger" class="text-gray-300 hover:text-white">Detective's Ledger</router-link>
        </div>
      </div>
    </nav>
    <main class="p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>