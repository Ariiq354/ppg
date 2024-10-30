<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import {
    type Schema,
    getInitialState,
    registerSchema as beforeSchema,
  } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const registerSchema = beforeSchema
    .refine(
      (data) => {
        if (adminDesa.value) {
          return data.desa.name !== undefined;
        }
        return true;
      },
      {
        message: "Required",
        path: ["desa"],
      }
    )
    .refine(
      (data) => {
        if (adminKelompok.value) {
          return data.kelompok.name !== undefined;
        }
        return true;
      },
      {
        message: "Required",
        path: ["kelompok"],
      }
    );

  const state = ref(getInitialState());

  const daerahId = computed(() => state.value.daerah?.id);
  const desaId = computed(() => state.value.desa?.id);
  const modalOpen = ref(false);
  const adminDesa = ref(false);
  const adminKelompok = ref(false);
  watch(adminDesa, () => {
    if (!adminDesa.value) {
      adminKelompok.value = false;
      state.value.desa = undefined;
      state.value.kelompok = undefined;
    }
  });
  const { data: dataDaerah } = await useFetch("/api/daerah");
  const { data: dataDesa } = await useFetch("/api/desa", {
    query: {
      daerahId,
    },
    immediate: false,
  });
  const { data: dataKelompok } = await useFetch("/api/kelompok", {
    query: {
      desaId,
    },
    immediate: false,
  });

  const isLoading = ref(false);
  const registerResult = ref();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log("check");

    try {
      isLoading.value = true;
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: event.data,
      });

      registerResult.value = data;
      modalOpen.value = true;
    } catch (error: any) {
      useToastError(String(error.statusCode), error.statusText);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <Title>Daftar Akun</Title>
    <UModal v-model="modalOpen" :ui="{ width: 'sm:max-w-2xl' }" prevent-close>
      <div class="flex flex-col items-center px-4 py-5">
        <UIcon
          name="i-heroicons-check-circle"
          size="200"
          class="text-primary-500 dark:text-primary-400"
        />
        <h1 class="mb-2 text-3xl">Akun anda sudah terbuat</h1>
        <p>Username: {{ registerResult.username }}</p>
        <p>Password: {{ registerResult.password }}</p>
        <p class="mb-4 mt-2 text-sm opacity-60">
          *Anda dapat menggubah kredensial saat sudah masuk
        </p>

        <UButton to="/">Kembali ke laman masuk</UButton>
      </div>
    </UModal>
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtImg src="/ppg.webp" width="200" height="200" alt="logo ppg" />
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            Daftar akun
          </div>
          <div class="mt-1 text-gray-500 dark:text-gray-400">
            Sudah punya akun?
            <NuxtLink no-prefetch to="/" class="text-primary font-medium">
              Masuk.
            </NuxtLink>
          </div>
        </div>
        <UForm
          :schema="registerSchema"
          :state="state"
          class="w-full space-y-6"
          :validate-on="['submit']"
          @submit="onSubmit"
        >
          <UFormGroup label="Nama Daerah" name="daerah.name">
            <USelectMenu
              v-model="state.daerah"
              placeholder="Masukkan nama daerah"
              searchable-placeholder="Cari / Masukkan nama daerah"
              :options="dataDaerah"
              option-attribute="name"
              searchable
              creatable
            >
              <template #empty> Opsi tidak ada </template>
            </USelectMenu>
          </UFormGroup>

          <UCheckbox v-model="adminDesa" label="Masuk sebagai admin desa" />

          <UFormGroup v-if="adminDesa" label="Nama Desa" name="desa">
            <USelectMenu
              v-model="state.desa"
              placeholder="Masukkan nama desa"
              searchable-placeholder="Cari / Masukkan nama desa"
              :options="dataDesa"
              option-attribute="name"
              searchable
              creatable
            >
              <template #option-create="{ option }">
                <span class="flex-shrink-0">Buat Desa:</span>
                <span class="block truncate">{{ option.name }}</span>
              </template>
              <template #empty> Opsi tidak ada </template>
            </USelectMenu>
          </UFormGroup>

          <UCheckbox
            v-if="adminDesa"
            v-model="adminKelompok"
            label="Masuk sebagai admin kelompok"
          />

          <UFormGroup
            v-if="adminKelompok"
            label="Nama Kelompok"
            name="kelompok"
          >
            <USelectMenu
              v-model="state.kelompok"
              placeholder="Masukkan nama kelompok"
              searchable-placeholder="Cari / Masukkan nama kelompok"
              :options="dataKelompok"
              option-attribute="name"
              searchable
              creatable
            >
              <template #option-create="{ option }">
                <span class="flex-shrink-0">Buat Kelompok:</span>
                <span class="block truncate">{{ option.name }}</span>
              </template>
              <template #empty> Opsi tidak ada </template>
            </USelectMenu>
          </UFormGroup>

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="isLoading"
          >
            Buat Akun
          </UButton>
        </UForm>
      </div>
    </UCard>
  </div>
</template>
