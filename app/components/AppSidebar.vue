<script setup lang="ts">
  const sidebarState = useSidebarToggle();

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
    {
      title: "Aplikasi",
      items: [
        {
          title: "Daftar Wilayah",
          link: "/dashboard/wilayah",
          icon: "i-heroicons-map",
        },
        {
          title: "Tenaga Pengajar",
          link: "/dashboard/pengajar",
          icon: "i-heroicons-users",
        },
        {
          title: "Generus",
          link: "/dashboard/generus",
          icon: "i-heroicons-user-group",
        },
      ],
    },
  ];
</script>

<template>
  <aside
    class="fixed top-0 z-20 h-full w-72 overflow-hidden border-r border-gray-200 bg-white shadow-xl transition-all duration-200 dark:border-gray-700 dark:bg-gray-900"
    :class="sidebarState ? '-left-72 md:left-0' : 'left-0 md:-left-72'"
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
      <nav :aria-label="firstItem.title + ' navigation'">
        <AppSidebarItem :link-item-prop="firstItem.items" :depth="0" />
      </nav>
    </div>
  </aside>
  <div
    v-if="!sidebarState"
    class="fixed left-0 top-0 z-10 h-full w-full bg-black/20 md:hidden"
    @click="sidebarState = true"
  />
</template>
