<script setup lang="ts">
  import { z } from "zod";
  import type { FormSubmitEvent } from "#ui/types";

  const { data: dataDaerah } = await useLazyFetch("/api/daerah");

  const modalOpen = defineModel<boolean>();

  const schema = z.object({
    username: z.string().min(1, "Required"),
    password: z.string().optional(),
    daerahId: z.coerce.number().optional(),
    desaId: z.coerce.number().optional(),
    kelompokId: z.coerce.number().optional(),
  });

  type Schema = z.output<typeof schema>;

  const user = useUser();

  const initialFormData = () => ({
    username: user.value?.username,
    password: undefined,
    daerahId: user.value?.daerahId ? user.value.daerahId : undefined,
    desaId: user.value?.desaId ? user.value.desaId : undefined,
    kelompokId: user.value?.kelompokId ? user.value.kelompokId : undefined,
  });

  const state = ref(initialFormData());

  watch(modalOpen, () => {
    if (modalOpen.value === true) {
      state.value = initialFormData();
    }
  });
  const { data: dataDesa } = await useLazyFetch("/api/desa", {
    query: {
      daerahId: state.value.daerahId,
    },
  });
  const { data: dataKelompok } = await useLazyFetch("/api/kelompok", {
    query: {
      desaId: state.value.desaId,
    },
  });

  const modalLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      modalLoading.value = true;

      await $fetch("/api/user/edit", {
        method: "POST",
        body: event.data,
      });

      modalOpen.value = false;
      reloadNuxtApp();
    } catch (error: any) {
      useToastError(String(error.statusCode), error.statusMessage);
    } finally {
      modalLoading.value = false;
    }
  }
</script>

<template>
  <UModal v-model="modalOpen" :ui="{ width: 'sm:max-w-2xl' }" prevent-close>
    {{ state }}
    <div class="px-4 py-5">
      <div class="mb-4 flex items-center justify-between">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Profil Anda
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1 rounded-full"
          @click="modalOpen = false"
        />
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex gap-4">
          <div class="flex w-full flex-col gap-4">
            <UFormGroup label="Username" name="username" class="w-full">
              <UInput v-model="state.username" :disabled="modalLoading" />
            </UFormGroup>

            <UFormGroup label="Password" name="password" class="w-full">
              <UInput v-model="state.password" :disabled="modalLoading" />
            </UFormGroup>
            <UFormGroup label="Nama Daerah" name="daerahId" class="w-full">
              <USelectMenu
                v-model="state.daerahId"
                :options="dataDaerah"
                :disabled="modalLoading"
                option-attribute="name"
                value-attribute="id"
                searchable
              />
            </UFormGroup>
            <UFormGroup label="Nama Desa" name="desaId" class="w-full">
              <USelectMenu
                v-model="state.desaId"
                :options="dataDesa"
                :disabled="modalLoading"
                option-attribute="name"
                value-attribute="id"
                searchable
              />
            </UFormGroup>
            <UFormGroup label="Nama Kelompok" name="kelompokId" class="w-full">
              <USelectMenu
                v-model="state.kelompokId"
                :options="dataKelompok"
                :disabled="modalLoading"
                option-attribute="name"
                value-attribute="id"
                searchable
              />
            </UFormGroup>
          </div>
        </div>
        <div class="flex w-full justify-end gap-2">
          <UButton
            icon="i-heroicons-x-mark-16-solid"
            variant="ghost"
            :disabled="modalLoading"
            @click="modalOpen = false"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            icon="i-heroicons-check-16-solid"
            :loading="modalLoading"
          >
            Simpan
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>
