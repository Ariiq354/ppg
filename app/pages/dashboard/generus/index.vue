<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import {
    columns,
    genderOptions,
    getInitialFormData,
    schema,
    pengajianOptions,
    type Schema,
  } from "./_constants";
  import { json2Csv } from "#imports";

  onMounted(() => {
    defineTopbarTitle("Generus");
  });

  const table = useTemplateRef("tableRef");
  const user = useUser();
  const state = ref(getInitialFormData());
  const daerahId = computed(() => state.value.daerahId);
  const desaId = computed(() => state.value.desaId);
  const { data, status, refresh } = await useLazyFetch("/api/generus");
  const { data: dataDaerah } = await useLazyFetch("/api/daerah");
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

  const modalOpen = ref(false);
  const modalLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    modalLoading.value = true;
    try {
      await $fetch("/api/generus", {
        method: "POST",
        body: event.data,
      });

      modalOpen.value = false;
      await refresh();
    } catch (error: any) {
      useToastError(String(error.statusCode), error.data.message);
    } finally {
      modalLoading.value = false;
    }
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalOpen.value = true;
    if (user.value!.role! > 1) {
      state.value.daerahId = user.value?.daerahId;
    }
    if (user.value!.role! > 2) {
      state.value.desaId = user.value?.desaId;
    }
    if (user.value!.role! > 3) {
      state.value.kelompokId = user.value?.kelompokId;
    }
  }

  async function clickDelete() {
    async function onDelete() {
      const idArray = table.value?.selected.map((item) => item.id);
      await $fetch("/api/generus", {
        method: "DELETE",
        body: {
          id: idArray,
        },
      });
      if (table.value) {
        table.value.selected = [];
      }
      await refresh();
    }

    openConfirmModal(onDelete);
  }

  async function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
  }

  function disabledFunction() {
    return (
      (user.value?.role === 2 &&
        user.value.daerahId !== state.value.daerahId) ||
      (user.value?.role === 3 && user.value.desaId !== state.value.desaId) ||
      (user.value?.role === 4 &&
        user.value.kelompokId !== state.value.kelompokId)
    );
  }
</script>

<template>
  <main>
    <Title>Generus</Title>
    <UModal v-model="modalOpen" :ui="{ width: 'sm:max-w-4xl' }" prevent-close>
      <div class="px-4 py-5">
        <div class="mb-4 flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ state.id ? "Edit" : "Tambah" }} Generus
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1 rounded-full"
            :disabled="status === 'pending'"
            @click="modalOpen = false"
          />
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UFormGroup label="Nama Generus" name="nama" class="w-full">
              <UInput
                v-model="state.nama"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup label="Jenis Kelamin" name="gender" class="w-full">
              <USelectMenu
                v-model="state.gender"
                placeholder="Pilih jenis kelamin"
                :options="genderOptions"
                option-attribute="name"
                value-attribute="value"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup
              label="Kelas Sekolah"
              name="kelasSekolah"
              class="w-full"
            >
              <UInput
                v-model="state.kelasSekolah"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup
              label="Kelas Pengajian"
              name="kelasPengajian"
              class="w-full"
            >
              <USelectMenu
                v-model="state.kelasPengajian"
                placeholder="Pilih jenis kelamin"
                :options="pengajianOptions"
                option-attribute="name"
                value-attribute="value"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup label="Nama Orang Tua" name="namaOrtu" class="w-full">
              <UInput
                v-model="state.namaOrtu"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup label="Tempat Lahir" name="tempatLahir" class="w-full">
              <UInput
                v-model="state.tempatLahir"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup
              label="Tanggal Lahir"
              name="tanggalLahir"
              class="w-full"
            >
              <UInput
                v-model="state.tanggalLahir"
                type="date"
                :disabled="modalLoading || disabledFunction()"
              />
            </UFormGroup>
            <UFormGroup label="Daerah" name="daerahId" class="w-full">
              <USelectMenu
                v-model="state.daerahId!"
                :disabled="
                  !(user?.role! < 2) || modalLoading || disabledFunction()
                "
                placeholder="Masukkan nama daerah"
                searchable-placeholder="Cari nama daerah"
                :options="dataDaerah"
                option-attribute="name"
                value-attribute="id"
                searchable
                @change="
                  state.desaId = undefined;
                  state.kelompokId = undefined;
                "
              >
                <template #empty> Opsi tidak ada </template>
              </USelectMenu>
            </UFormGroup>
            <UFormGroup label="Desa" name="desaId" class="w-full">
              <USelectMenu
                v-model="state.desaId!"
                :disabled="
                  !(user?.role! < 3) || modalLoading || disabledFunction()
                "
                placeholder="Masukkan nama desa"
                searchable-placeholder="Cari nama desa"
                :options="dataDesa"
                option-attribute="name"
                value-attribute="id"
                searchable
                @change="state.kelompokId = undefined"
              >
                <template #empty> Opsi tidak ada </template>
              </USelectMenu>
            </UFormGroup>
            <UFormGroup label="Kelompok" name="kelompokId" class="w-full">
              <USelectMenu
                v-model="state.kelompokId!"
                :disabled="
                  !(user?.role! < 4) || modalLoading || disabledFunction()
                "
                placeholder="Masukkan nama kelompok"
                searchable-placeholder="Cari nama kelompok"
                :options="dataKelompok"
                option-attribute="name"
                value-attribute="id"
                searchable
              >
                <template #empty> Opsi tidak ada </template>
              </USelectMenu>
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
              icon="i-heroicons-check-16-solid"
              :loading="modalLoading"
            >
              Simpan
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>
    <UCard
      :ui="{
        body: {
          padding: 'sm:p-8',
        },
      }"
    >
      <h1 class="mb-2 text-xl font-bold text-red-500 underline">
        # Dalam periode testing, tolong laporkan bug & error!
      </h1>

      <div
        class="mb-6 flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
      >
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-plus"
            variant="soft"
            class="gap-2 text-xs text-black md:text-base dark:text-white"
            @click="clickAdd"
          >
            Tambah
          </UButton>
          <UButton
            v-if="user?.role === 1"
            icon="i-heroicons-trash"
            variant="soft"
            class="gap-2 text-xs text-black disabled:opacity-50 md:text-base dark:text-white"
            :disabled="table ? table?.selected.length === 0 : true"
            @click="clickDelete"
          >
            Hapus
          </UButton>
        </div>
        <UButton
          icon="i-heroicons-arrow-up-tray"
          variant="soft"
          class="gap-2 text-xs text-black disabled:opacity-50 md:text-base dark:text-white"
          :disabled="!(data && data.length > 0)"
          @click="json2Csv(data!)"
        >
          Ekspor
        </UButton>
      </div>
      <AppTable
        ref="tableRef"
        label="Kelola Generus"
        :columns="columns"
        :data="data"
        :loading="status === 'pending'"
        :selectable="user?.role === 1"
        @edit-click="(e) => clickUpdate(e)"
      >
        <template #kelasPengajian-data="{ row }">
          <div>
            {{
              pengajianOptions.find((item) => item.value == row.kelasPengajian)
                ?.name
            }}
          </div>
        </template>
        <template #gender-data="{ row }">
          <div>
            {{ genderOptions.find((item) => item.value == row.gender)?.name }}
          </div>
        </template>
      </AppTable>
    </UCard>
  </main>
</template>
