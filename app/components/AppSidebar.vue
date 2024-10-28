<script setup lang="ts">
  defineProps<{
    sidebarToggle: boolean;
  }>();

  const sidebarItems = [
    {
      title: "Dashboards",
      items: [
        {
          title: "Home Dashboard",
          link: "/dashboard",
          icon: "i-heroicons-home",
        },
      ],
    },
  ];
</script>

<template>
  <div
    id="sidebar"
    class="fixed top-0 h-full overflow-hidden border-r border-gray-200 bg-white shadow-xl transition-all duration-200 dark:border-gray-700 dark:bg-gray-900"
    :class="sidebarToggle ? 'w-72' : 'w-0'"
  >
    <div class="text-primary flex items-center justify-center pb-8 pt-10">
      <div class="flex items-center gap-2 text-2xl tracking-widest">
        <UIcon name="i-heroicons-globe-alt" class="h-8 w-8" />
        <span>PPG</span>
      </div>
    </div>
    <div v-for="(firstItem, firstIndex) in sidebarItems" :key="firstIndex">
      <h1 class="text-primary px-8 py-4 text-sm font-bold uppercase">
        {{ firstItem.title }}
      </h1>
      <AppSidebarItem :link-item-prop="firstItem.items" :depth="0" />
    </div>
  </div>
</template>
