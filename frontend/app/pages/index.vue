<script setup lang="ts">
import { mockOffres } from '~/data/offres'
import { VisXYContainer, VisBar, VisAxis, VisTooltip } from '@unovis/vue'

// Title
useSeoMeta({
  title: 'Tableau de bord - VeilleAO'
})

// KPIs
const totalDetectes = mockOffres.length
const qualifies = mockOffres.filter(o => o.score >= 80).length
const expirentVite = mockOffres.filter(o => o.joursRestants <= 7).length
const moyenne = Math.round(mockOffres.reduce((acc, o) => acc + o.score, 0) / mockOffres.length)

// Dernières opportunités (5 max, qualifiés)
const dernieres = mockOffres
  .filter(o => o.score > 60)
  // sort by id desc roughly
  .sort((a, b) => b.id - a.id)
  .slice(0, 5)

// Répartition par domaine
const domainCounts = mockOffres.reduce((acc, o) => {
  acc[o.domaine] = (acc[o.domaine] || 0) + 1
  return acc
}, {} as Record<string, number>)

const chartData = Object.entries(domainCounts).map(([domain, count], i) => ({
  id: i,
  domain,
  count
}))

// Chart config
const x = (d: any, i: number) => i
const y = (d: any) => d.count
const xTicks = (i: number) => chartData[i]?.domain || ''
const tooltipTemplate = (d: any) => `${d.domain}: ${d.count}`

// Synchronisation fake
const isSyncing = ref(false)
const lastSync = ref('aujourd\'hui à 09h34')
const toast = useToast()

const handleSync = async () => {
  isSyncing.value = true
  await new Promise(resolve => setTimeout(resolve, 3000))
  isSyncing.value = false
  const now = new Date()
  lastSync.value = `aujourd'hui à ${now.getHours().toString().padStart(2, '0')}h${now.getMinutes().toString().padStart(2, '0')}`
  toast.add({
    title: 'Recherche terminée — 3 nouvelles opportunités trouvées',
    color: 'green',
    icon: 'i-lucide-check-circle'
  })
}

// Columns for latest
const latestColumns = [
  { accessorKey: 'titre', header: 'Titre' },
  { accessorKey: 'domaine', header: 'Domaine' },
  { accessorKey: 'dateLimite', header: 'Date limite' },
  { accessorKey: 'joursRestants', header: 'Jours restants' },
  { accessorKey: 'score', header: 'Score' }
]

// Colors
const getJoursColor = (j: number) => j > 14 ? 'green' : (j > 7 ? 'orange' : 'red')
const getScoreColor = (s: number) => s >= 80 ? 'green' : (s >= 60 ? 'orange' : 'red')
</script>

<template>
  <div class="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      
      <!-- Top header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tableau de bord</h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Vue synthétique de vos appels d'offres.</p>
        </div>
        
        <div class="flex flex-col items-end gap-1">
          <UButton
            color="primary"
            icon="i-lucide-refresh-cw"
            :loading="isSyncing"
            @click="handleSync"
          >
            {{ isSyncing ? 'Recherche en cours...' : 'Lancer une recherche' }}
          </UButton>
          <span class="text-xs text-zinc-500 dark:text-zinc-400">Dernière synchronisation : {{ lastSync }}</span>
        </div>
      </div>

      <!-- KPIs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard :ui="{ body: 'p-4 sm:p-6' }">
          <div class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Total détectés</div>
          <div class="text-3xl font-bold text-zinc-900 dark:text-white">{{ totalDetectes }}</div>
        </UCard>
        <UCard :ui="{ body: 'p-4 sm:p-6' }">
          <div class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Qualifiés</div>
          <div class="text-3xl font-bold text-zinc-900 dark:text-white">{{ qualifies }}</div>
        </UCard>
        <UCard :ui="{ body: 'p-4 sm:p-6' }">
          <div class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Expirent ≤ 7j</div>
          <div class="text-3xl font-bold text-red-500">{{ expirentVite }}</div>
        </UCard>
        <UCard :ui="{ body: 'p-4 sm:p-6' }">
          <div class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Score moyen</div>
          <div class="text-3xl font-bold text-primary">{{ moyenne }}%</div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Dernières opportunités -->
        <UCard class="lg:col-span-2">
          <template #header>
            <h2 class="text-base font-semibold text-zinc-900 dark:text-white">Dernières opportunités qualifiées</h2>
          </template>
          
          <UTable
            :columns="latestColumns"
            :rows="dernieres"
          >
            <template #titre-cell="{ row }">
              <span class="font-medium truncate max-w-[200px] block" :title="row.original?.titre || row.titre">{{ row.original?.titre || row.titre }}</span>
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
          </UTable>
        </UCard>

        <!-- Répartition par domaine -->
        <UCard>
          <template #header>
            <h2 class="text-base font-semibold text-zinc-900 dark:text-white">Répartition par domaine</h2>
          </template>
          
          <div class="h-64 mt-4 relative">
            <!-- fallback UI as bar charts are easy via html too -->
            <div class="flex flex-col h-full justify-end gap-2 px-2 pb-6">
              <div v-for="item in chartData" :key="item.id" class="flex items-center gap-2">
                <div class="w-32 truncate text-xs text-zinc-500" :title="item.domain">{{ item.domain }}</div>
                <div class="flex-1 h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-primary" :style="{ width: `${(item.count / totalDetectes) * 100}%` }"></div>
                </div>
                <div class="text-xs font-medium">{{ item.count }}</div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>
