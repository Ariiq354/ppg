<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { initialFormData, schema, type Schema } from "./_constants";

  onMounted(() => {
    defineTopbarTitle("Daftar Wilayah");
  });

  const user = useUser();

  const daerahId = ref();
  const desaId = ref();
  const kelompokId = ref();
  const modalOpen = ref(false);
  const statusModal = ref("desa");
  const modalLoading = ref(false);

  const { data: daerahData, refresh: refreshDaerah } =
    await useFetch("/api/daerah");
  const { data: desaData, refresh: refreshDesa } = await useFetch("/api/desa", {
    query: {
      daerahId: daerahId,
    },
    immediate: false,
  });
  const { data: kelompokData, refresh: refreshKelompok } = await useFetch(
    "/api/kelompok",
    {
      query: {
        desaId: desaId,
      },
      immediate: false,
    }
  );

  const state = ref(initialFormData());

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      modalLoading.value = true;
      const body = {
        id: event.data.id,
        name: event.data.name,
        ...(statusModal.value === "desa"
          ? { daerahId: daerahId.value }
          : statusModal.value === "kelompok"
            ? { desaId: desaId.value }
            : undefined),
      };
      await $fetch(`/api/${statusModal.value}`, {
        method: "POST",
        body,
      });

      modalOpen.value = false;
      if (statusModal.value === "kelompok") {
        await refreshKelompok();
      } else if (statusModal.value === "desa") {
        await refreshDesa();
      } else {
        await refreshDaerah();
      }
    } catch (error: any) {
      useToastError(String(error.statusCode), error.data.message);
    } finally {
      modalLoading.value = false;
    }
  }

  function openAddModal(title: string) {
    modalOpen.value = true;
    state.value = initialFormData();
    statusModal.value = title;
  }

  function openEditModal(title: string, id: number, name: string) {
    modalOpen.value = true;
    state.value.id = id;
    state.value.name = name;
    statusModal.value = title;
  }
</script>

<template>
  <main>
    <UModal v-model="modalOpen">
      <div class="px-4 py-5">
        <div class="mb-4 flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Tambah {{ statusModal }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1 rounded-full"
            :disabled="modalLoading"
            @click="modalOpen = false"
          />
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="flex w-full gap-4">
            <UFormGroup label="Nama" name="name" class="w-full">
              <UInput v-model="state.name" placeholder="Silahkan isi nama" />
            </UFormGroup>
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
              :loading="modalLoading"
              icon="i-heroicons-check-16-solid"
            >
              Simpan
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>
    <Title>Wilayah</Title>
    <UCard>
      <h1 class="mb-4 text-xl font-bold">Detail Wilayah</h1>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div
          class="flex flex-col gap-1 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
        >
          <div class="mb-2 flex items-center justify-between">
            <h1 class="text-xl">Daerah</h1>
            <UButton
              v-if="user?.role! < 2"
              color="gray"
              variant="ghost"
              size="xs"
              icon="i-heroicons-plus"
              class="rounded-full"
              @click="openAddModal('daerah')"
            />
          </div>
          <div
            v-for="item in daerahData"
            :key="item.id"
            class="flex cursor-pointer items-center justify-between rounded-md border-gray-200 p-2 dark:border-gray-700"
            :class="{
              'border shadow-lg dark:bg-white/5': daerahId === item.id,
            }"
            @click="
              {
                daerahId = item.id;
                desaId = undefined;
                kelompokId = undefined;
              }
            "
          >
            {{ item.name }}
            <UIcon
              v-if="daerahId === item.id && user?.role! < 2"
              name="i-heroicons-pencil"
              @click.stop="openEditModal('daerah', item.id, item.name)"
            />
          </div>
        </div>
        <div
          class="flex flex-col gap-1 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
        >
          <div class="mb-2 flex items-center justify-between">
            <h1 class="text-xl">Desa</h1>
            <UButton
              v-if="
                daerahId &&
                (user?.role! < 2 ||
                  (daerahId === user?.daerahId && user?.role! < 3))
              "
              color="gray"
              variant="ghost"
              size="xs"
              icon="i-heroicons-plus"
              class="rounded-full"
              @click="openAddModal('desa')"
            />
          </div>
          <div
            v-for="item in desaData"
            :key="item.id"
            class="flex cursor-pointer items-center justify-between rounded-md border-gray-200 p-2 dark:border-gray-700"
            :class="{ 'border shadow-lg dark:bg-white/5': desaId === item.id }"
            @click="
              {
                desaId = item.id;
                kelompokId = undefined;
              }
            "
          >
            {{ item.name }}
            <UIcon
              v-if="
                desaId === item.id &&
                (user?.role! < 2 ||
                  (desaId === user?.desaId && user?.role! < 3))
              "
              name="i-heroicons-pencil"
              @click.stop="openEditModal('desa', item.id, item.name)"
            />
          </div>
        </div>
        <div
          class="flex flex-col gap-1 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
        >
          <div class="mb-2 flex items-center justify-between">
            <h1 class="text-xl">Kelompok</h1>
            <UButton
              v-if="
                desaId &&
                (user?.role! < 2 ||
                  (desaId === user?.desaId && user?.role! < 4))
              "
              color="gray"
              variant="ghost"
              size="xs"
              icon="i-heroicons-plus"
              class="rounded-full"
              @click="openAddModal('kelompok')"
            />
          </div>
          <div
            v-for="item in kelompokData"
            :key="item.id"
            class="flex cursor-pointer items-center justify-between rounded-md border-gray-200 p-2 dark:border-gray-700"
            :class="{
              'border shadow-lg dark:bg-white/5': kelompokId === item.id,
            }"
            @click="kelompokId = item.id"
          >
            {{ item.name }}
            <UIcon
              v-if="
                kelompokId === item.id &&
                (user?.role! < 2 || kelompokId === user?.kelompokId)
              "
              name="i-heroicons-pencil"
              @click.stop="openEditModal('kelompok', item.id, item.name)"
            />
          </div>
        </div>
      </div>
    </UCard>
  </main>
</template>
