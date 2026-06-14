<script setup lang="ts">
useSeoMeta({
  title: 'Paramètres - VeilleAO'
})

const toast = useToast()

// Section 1: Identifiants
const username = ref('admin')

const modifierMotDePasse = () => {
  toast.add({
    title: 'Lien de réinitialisation envoyé',
    description: 'Veuillez vérifier vos emails pour modifier votre mot de passe.',
    color: 'green'
  })
}

// Section 2: Préférences de recherche
const delaiMinimum = ref(14)

const domainesActifs = ref([
  { id: 'dev', label: 'Développement web et mobile', checked: true },
  { id: 'logiciel', label: 'Développement logiciel', checked: true },
  { id: 'transfo', label: 'Transformation digitale', checked: true },
  { id: 'ged', label: 'GED', checked: true },
  { id: 'archivage', label: 'Archivage électronique', checked: true },
  { id: 'cyber', label: 'Cybersécurité', checked: true },
  { id: 'res', label: 'Réseaux et infrastructures', checked: false },
  { id: 'telecom', label: 'Télécommunications', checked: false },
  { id: 'maint', label: 'Maintenance informatique', checked: false },
  { id: 'equip', label: 'Fourniture équipements', checked: false },
  { id: 'form', label: 'Formation informatique', checked: false },
  { id: 'conseil', label: 'Conseil et assistance technique', checked: true }
])

const isSaving = ref(false)

const sauvegarderPreferences = async () => {
  isSaving.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isSaving.value = false
  toast.add({
    title: 'Préférences enregistrées',
    description: 'Vos critères de recherche ont été mis à jour avec succès.',
    color: 'green'
  })
}

</script>

<template>
  <div class="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
    <div class="p-6 max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Paramètres</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">Gérez votre compte et vos préférences de recherche.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1">
          <h2 class="text-lg font-semibold text-zinc-900 dark:text-white">Identifiants de connexion</h2>
          <p class="text-sm text-zinc-500 mt-1">Vos informations d'accès à la plateforme VeilleAO.</p>
        </div>
        
        <UCard class="md:col-span-2">
          <div class="space-y-6">
            <UFormGroup label="Nom d'utilisateur" help="Ce champ n'est pas modifiable pour le moment.">
              <UInput v-model="username" disabled icon="i-lucide-user" />
            </UFormGroup>

            <UFormGroup label="Mot de passe">
              <div class="flex items-center gap-4">
                <UInput value="••••••••" type="password" disabled class="flex-1" icon="i-lucide-lock" />
                <UButton color="white" @click="modifierMotDePasse">Modifier</UButton>
              </div>
            </UFormGroup>
          </div>
        </UCard>
      </div>

      <UDivider />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1">
          <h2 class="text-lg font-semibold text-zinc-900 dark:text-white">Préférences de recherche</h2>
          <p class="text-sm text-zinc-500 mt-1">Définissez vos critères par défaut pour la détection des opportunités.</p>
        </div>
        
        <UCard class="md:col-span-2">
          <div class="space-y-6">
            <UFormGroup label="Délai minimum restant (jours)" help="Les appels d'offres expirant avant ce délai ne seront pas priorisés.">
              <UInput v-model="delaiMinimum" type="number" min="0" />
            </UFormGroup>

            <UFormGroup label="Domaines actifs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <UCheckbox
                  v-for="domaine in domainesActifs"
                  :key="domaine.id"
                  v-model="domaine.checked"
                  :name="domaine.id"
                  :label="domaine.label"
                />
              </div>
            </UFormGroup>

            <div class="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <UButton
                color="primary"
                :loading="isSaving"
                @click="sauvegarderPreferences"
              >
                Enregistrer les préférences
              </UButton>
            </div>
          </div>
        </UCard>

      </div>

    </div>
  </div>
</template>
