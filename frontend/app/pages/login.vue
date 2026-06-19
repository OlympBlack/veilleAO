<script setup lang="ts">
definePageMeta({
  layout: false,
});

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (username.value === "admin" && password.value === "admin123") {
    const token = useCookie("auth_token");
    token.value = "fake_token_for_veille_ao";
    router.push("/");
  } else {
    errorMessage.value = "Identifiants incorrects";
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4"
  >
    <div
      class="w-full max-w-[420px] p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800"
    >
      <div class="text-center mb-10 flex flex-col items-center">
        <!-- Remplacer logo.png par le nom exact de ton image dans le dossier public/ -->
        <img
          src="/logo_veilleAO.png"
          alt="VeilleAO Logo"
          class="h-20 w-auto mb-4 object-contain rounded-full shadow-sm border border-zinc-100"
        />
        <p class="text-zinc-500 dark:text-zinc-400 font-medium font-sans">
          Connectez-vous à votre espace
        </p>
      </div>

      <form
        @submit.prevent="handleLogin"
        class="flex flex-col items-center gap-4 w-full px-2 sm:px-6"
      >
        <div class="w-full">
          <label
            class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >Identifiant</label
          >
          <UInput
            v-model="username"
            placeholder="admin"
            icon="i-lucide-user"
            size="lg"
            autocomplete="username"
            autofocus
            :disabled="isLoading"
            class="w-full"
            :ui="{
              base: 'font-sans',
              color: {
                white: {
                  outline: 'focus:ring-[#00b86b] dark:focus:ring-[#00b86b]',
                },
              },
            }"
          />
        </div>

        <div class="w-full">
          <label
            class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >Mot de passe</label
          >
          <UInput
            v-model="password"
            type="password"
            placeholder="••••••••"
            icon="i-lucide-lock"
            size="lg"
            autocomplete="current-password"
            :disabled="isLoading"
            class="w-full"
            :ui="{
              base: 'font-sans',
              color: {
                white: {
                  outline: 'focus:ring-[#00b86b] dark:focus:ring-[#00b86b]',
                },
              },
            }"
          />
        </div>

        <UAlert
          v-if="errorMessage"
          icon="i-lucide-alert-circle"
          color="red"
          variant="soft"
          :title="errorMessage"
          class="mt-2 w-full"
        />

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          class="mt-2 w-full text-md font-semibold bg-[#00b86b] hover:bg-[#009b5a] text-white dark:bg-[#00b86b] dark:hover:bg-[#009b5a] flex justify-center"
        >
          Se connecter
        </UButton>
      </form>
    </div>
  </div>
</template>
