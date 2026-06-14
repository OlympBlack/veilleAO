<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if (username.value === 'admin' && password.value === 'admin123') {
    const token = useCookie('auth_token')
    token.value = 'fake_token_for_veille_ao'
    router.push('/')
  } else {
    errorMessage.value = 'Identifiants incorrects'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
    <div class="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary mb-2">VeilleAO</h1>
        <p class="text-zinc-500 dark:text-zinc-400">Connectez-vous à votre espace</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <UFormGroup label="Nom d'utilisateur" name="username">
          <UInput
            v-model="username"
            placeholder="admin"
            icon="i-lucide-user"
            size="lg"
            autocomplete="username"
            autofocus
            :disabled="isLoading"
          />
        </UFormGroup>

        <UFormGroup label="Mot de passe" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="••••••••"
            icon="i-lucide-lock"
            size="lg"
            autocomplete="current-password"
            :disabled="isLoading"
          />
        </UFormGroup>

        <UAlert
          v-if="errorMessage"
          icon="i-lucide-alert-circle"
          color="red"
          variant="soft"
          :title="errorMessage"
        />

        <UButton
          type="submit"
          color="primary"
          block
          size="lg"
          :loading="isLoading"
        >
          Se connecter
        </UButton>
      </form>
    </div>
  </div>
</template>
