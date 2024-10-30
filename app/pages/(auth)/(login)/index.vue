<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type Schema, getInitialState, loginSchema } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const state = ref(getInitialState());

  const error = useError();

  watch(error, () => {
    console.log(error, "check");
  });

  const isLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;
      await $fetch("/api/auth/login", {
        method: "POST",
        body: event.data,
      });
      await navigateTo("/dashboard");
    } catch (error: any) {
      useToastError(String(error.statusCode), error.data.statusMessage);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <Title>Masuk</Title>
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtImg src="/ppg.webp" width="200" height="200" />
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            Selamat Datang!
          </div>
          <div class="mt-1 text-gray-500 dark:text-gray-400">
            Belum punya akun?
            <NuxtLink
              no-prefetch
              to="/register"
              class="text-primary font-medium"
            >
              Daftar.
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
          <UFormGroup label="Username" name="username">
            <UInput
              v-model="state.username"
              :leading="true"
              placeholder="Masukkan username anda"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              :leading="true"
              type="password"
              placeholder="Masukkan kata sandi anda"
            />
          </UFormGroup>

          <UCheckbox v-model="state.rememberMe" label="Ingat saya" />

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="isLoading"
          >
            Lanjut
          </UButton>
        </UForm>
      </div>
    </UCard>
  </div>
</template>
