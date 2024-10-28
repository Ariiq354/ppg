<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type Schema, getInitialState, loginSchema } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const { data } = await useFetch("/api/daerah");

  const state = ref(getInitialState());
  const modalOpen = ref(false);
  const registerResult = ref();

  const isLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: event.data,
      });

      registerResult.value = data;
      modalOpen.value = true;
    } catch (error: any) {
      useToastError(String(error.statusCode), error.statusMessage);
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
          <NuxtImg src="/ppg.webp" width="200" height="200" />
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
          :schema="loginSchema"
          :state="state"
          class="w-full space-y-6"
          :validate-on="['submit']"
          @submit="onSubmit"
        >
          <UFormGroup label="Daerah" name="name">
            <USelectMenu
              v-model="state"
              placeholder="Masukkan nama daerah"
              :options="data"
              option-attribute="name"
              searchable
              creatable
            />
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
