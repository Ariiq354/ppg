<script setup lang="ts">
  useSeoMeta({
    description: "Web PPG",
  });

  useHead({
    htmlAttrs: {
      lang: "id",
    },
  });
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-black">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="5" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>

<style>
  html {
    font-family: Poppins, sans-serif;
    font-size: 14px;
  }
</style>
