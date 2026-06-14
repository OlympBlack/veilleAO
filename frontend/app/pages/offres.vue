<script setup lang="ts">
import { mockOffres, type AppelOffre } from '~/data/offres'

useSeoMeta({
  title: 'Appels d\'offres - VeilleAO'
})

// Options de domaines
const domainesList = [
  'Développement logiciel', 'Développement web et mobile', 'Transformation digitale',
  'GED', 'Archivage électronique', 'Cybersécurité', 'Réseaux et infrastructures',
  'Télécommunications', 'Maintenance informatique', 'Fourniture équipements',
  'Formation informatique', 'Conseil et assistance technique'
]

// State Filtres
const searchQ = ref('')
const selectedDomaines = ref<string[]>([])
const minScore = ref<number | ''>('')
const dateLimite = ref('')

const resetFilters = () => {
  searchQ.value = ''
  selectedDomaines.value = []
  minScore.value = ''
  dateLimite.value = ''
}

// Filtres
const filteredOffres = computed(() => {
  return mockOffres.filter((o) => {
    // text
    if (searchQ.value) {
      const qs = searchQ.value.toLowerCase()
      if (!o.titre.toLowerCase().includes(qs) && !o.organisme.toLowerCase().includes(qs)) return false
    }
    // domain
    if (selectedDomaines.value.length > 0) {
      if (!selectedDomaines.value.includes(o.domaine)) return false
    }
    // score
    if (minScore.value !== '') {
      if (o.score < Number(minScore.value)) return false
    }
    // date limit
    if (dateLimite.value) {
      if (new Date(o.dateLimite) < new Date(dateLimite.value)) return false
    }
    return true
  })
})

// Pagination
const page = ref(1)
const pageCount = ref(10)
const paginatedOffres = computed(() => {
  const start = (page.value - 1) * pageCount.value
  const end = start + pageCount.value
  return filteredOffres.value.slice(start, end)
})

// Actions header
const isSyncing = ref(false)
const toast = useToast()

const handleSync = async () => {
  isSyncing.value = true
  await new Promise(resolve => setTimeout(resolve, 3000))
  isSyncing.value = false
  toast.add({
    title: 'Recherche terminée — 0 nouvelles opportunités trouvées',
    color: 'green',
    icon: 'i-lucide-check-circle'
  })
}

const exportOptions = [
  [{
    label: 'Excel',
    icon: 'i-lucide-file-spreadsheet',
    click: () => { toast.add({ title: 'Export Excel généré avec succès !', color: 'green' }) }
  }],
  [{
    label: 'CSV',
    icon: 'i-lucide-file-text',
    click: () => { toast.add({ title: 'Export CSV généré avec succès !', color: 'green' }) }
  }],
  [{
    label: 'PDF',
    icon: 'i-lucide-file',
    click: () => { toast.add({ title: 'Export PDF généré avec succès !', color: 'green' }) }
  }]
]

// Table cols
const columns = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'titre', header: 'Titre' },
  { accessorKey: 'organisme', header: 'Organisme' },
  { accessorKey: 'domaine', header: 'Domaine' },
  { accessorKey: 'datePublication', header: 'Publié le' },
  { accessorKey: 'dateLimite', header: 'Date Limite' },
  { accessorKey: 'joursRestants', header: 'Jours' },
  { accessorKey: 'score', header: 'Score' },
  { accessorKey: 'lien', header: 'Lien' }
]

const getJoursColor = (j: number) => j > 14 ? 'green' : (j > 7 ? 'orange' : 'red')
const getScoreColor = (s: number) => s >= 80 ? 'green' : (s >= 60 ? 'orange' : 'red')

// Drawer state
const isDrawerOpen = ref(false)
const selectedOffre = ref<AppelOffre | null>(null)

const openDrawer = (row: any) => {
  selectedOffre.value = row.original || row
  isDrawerOpen.value = true
}

const handleLienClick = (e: MouseEvent, lien: string) => {
  e.stopPropagation()
  window.open(lien, '_blank')
}
</script>

<template>
  <div class="flex-1 flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
    
    <!-- Pannel Drawer -->
    <USlideover v-model="isDrawerOpen" prevent-close class="w-full sm:w-[40vw] max-w-2xl bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 absolute top-0 bottom-0 right-0 shadow-2xl">
      <div v-if="selectedOffre" class="flex flex-col h-full">
        <!-- Drawer Header -->
        <div class="flex justify-between items-start p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <UBadge color="gray" variant="solid">{{ selectedOffre.domaine }}</UBadge>
              <UBadge v-if="selectedOffre.isNew" color="blue" variant="subtle">Nouveau</UBadge>
            </div>
            <h2 class="text-xl font-bold text-zinc-900 dark:text-white leading-tight">{{ selectedOffre.titre }}</h2>
            <p class="text-sm text-zinc-500 mt-1">{{ selectedOffre.organisme }}</p>
          </div>
          <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="isDrawerOpen = false" />
        </div>

        <!-- Drawer Body -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
              <div class="text-xs text-zinc-500 mb-1 tracking-wide uppercase">Jours restants</div>
              <UBadge :color="getJoursColor(selectedOffre.joursRestants)" size="lg">{{ selectedOffre.joursRestants }} jours</UBadge>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
              <div class="text-xs text-zinc-500 mb-1 tracking-wide uppercase">Score Pertinence</div>
              <UBadge :color="getScoreColor(selectedOffre.score)" size="lg" :variant="selectedOffre.score >= 80 ? 'solid' : 'subtle'">{{ selectedOffre.score }}%</UBadge>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
              <div class="text-xs text-zinc-500 mb-1 tracking-wide uppercase">Publié le</div>
              <div class="font-medium font-mono text-sm">{{ selectedOffre.datePublication }}</div>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
              <div class="text-xs text-zinc-500 mb-1 tracking-wide uppercase">Date Limite</div>
              <div class="font-medium font-mono text-sm text-red-600 dark:text-red-400">{{ selectedOffre.dateLimite }}</div>
            </div>
          </div>

          <div>
            <h3 class="text-md font-semibold text-zinc-900 dark:text-white mb-2">Description Originale</h3>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">
              {{ selectedOffre.description }}
            </div>
          </div>

          <div>
            <h3 class="flex items-center gap-2 text-md font-semibold text-primary mb-2">
              <UIcon name="i-lucide-sparkles" class="w-5 h-5" />
              Résumé IA
            </h3>
            <div class="bg-primary-50 dark:bg-primary-950/30 p-4 rounded-lg border border-primary-200 dark:border-primary-800/30 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {{ selectedOffre.resumeIA }}
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
          <UButton color="gray" variant="ghost" @click="isDrawerOpen = false">Fermer</UButton>
          <UButton color="primary" @click="handleLienClick($event, selectedOffre.lien)" icon="i-lucide-external-link">Consulter l'appel d'offres</UButton>
        </div>
      </div>
    </USlideover>

    <div class="p-6 h-full flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Appels d'offres</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Consultez et filtrez les opportunités détectées.</p>
        </div>
        
        <div class="flex gap-2">
          <UDropdown :items="exportOptions" :popper="{ placement: 'bottom-end' }">
            <UButton color="white" variant="solid" icon="i-lucide-download" label="Exporter" />
          </UDropdown>
          
          <UButton
            color="primary"
            icon="i-lucide-refresh-cw"
            :loading="isSyncing"
            @click="handleSync"
          >
            Lancer une recherche
          </UButton>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 mb-6 flex flex-wrap gap-4 items-end">
        <UFormGroup label="Recherche" class="flex-1 min-w-[200px]">
          <UInput v-model="searchQ" icon="i-lucide-search" placeholder="Titre ou organisme..." />
        </UFormGroup>
        
        <UFormGroup label="Domaine" class="flex-1 min-w-[200px]">
          <USelectMenu v-model="selectedDomaines" :options="domainesList" multiple placeholder="Tous les domaines" />
        </UFormGroup>
        
        <UFormGroup label="Score min" class="w-24">
          <UInput v-model="minScore" type="number" min="0" max="100" placeholder="0" />
        </UFormGroup>
        
        <UFormGroup label="Date limite (à partir de)" class="w-48">
          <UInput v-model="dateLimite" type="date" />
        </UFormGroup>
        
        <div class="pt-6">
          <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="resetFilters">Réinitialiser</UButton>
        </div>
      </div>

      <!-- Table Section -->
      <UCard class="flex-1 flex flex-col overflow-hidden" :ui="{ body: 'flex-1 overflow-hidden p-0 sm:p-0', header: 'hidden', footer: 'py-3' }">
        <div class="overflow-y-auto h-full relative">
          <UTable
            :columns="columns"
            :rows="paginatedOffres"
            @select="openDrawer"
            class="w-full"
          >
            <template #titre-cell="{ row }">
              <div class="flex items-center gap-2">
                <span class="font-medium whitespace-normal max-w-sm line-clamp-2">{{ row.original?.titre || row.titre }}</span>
                <UBadge v-if="row.original?.isNew || row.isNew" size="xs" color="blue" variant="subtle">Nouveau</UBadge>
              </div>
            </template>
            <template #domaine-cell="{ row }">
              <span class="text-xs text-zinc-500 whitespace-nowrap">{{ row.original?.domaine || row.domaine }}</span>
            </template>
            <template #joursRestants-cell="{ row }">
              <UBadge :color="getJoursColor(row.original?.joursRestants || row.joursRestants)" variant="subtle">
                {{ row.original?.joursRestants || row.joursRestants }} j
              </UBadge>
            </template>
            <template #score-cell="{ row }">
              <UBadge :color="getScoreColor(row.original?.score || row.score)" variant="solid">
                {{ row.original?.score || row.score }}%
              </UBadge>
            </template>
            <template #lien-cell="{ row }">
              <UButton
                icon="i-lucide-external-link"
                color="gray"
                variant="ghost"
                size="xs"
                @click="(e) => handleLienClick(e, row.original?.lien || row.lien)"
                title="Ouvrir le lien"
              />
            </template>
          </UTable>
        </div>
        
        <!-- Pagination -->
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-zinc-500">
              Affichage de {{ paginatedOffres.length }} sur {{ filteredOffres.length }}
            </span>
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="filteredOffres.length"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
