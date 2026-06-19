<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const open = ref(false);

const links = [
  [
    {
      label: "Tableau de bord",
      icon: "i-lucide-home",
      to: "/",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Appels d'offres",
      icon: "i-lucide-clipboard-list",
      to: "/offres",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Paramètres",
      icon: "i-lucide-settings",
      to: "/parametres",
      onSelect: () => {
        open.value = false;
      },
    },
  ],
] satisfies NavigationMenuItem[][];

const colorMode = useColorMode();

const handleLogout = () => {
  const token = useCookie("auth_token");
  token.value = null;
  router.push("/login");
};

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Re-use UserMenu template directly with "Se déconnecter" logic
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2 p-4">
          <img
          src="/logo_veilleAO.png"
          alt="VeilleAO Logo"
          class="h-15 w-auto mb-4 mt-4 object-contain rounded-full shadow-sm border border-zinc-100"
        />
        </div>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />
      </template>

      <template #footer="{ collapsed }">
        <div class="flex flex-col gap-2 w-full">
          <UButton
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            :icon="
              colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'
            "
            :label="
              collapsed
                ? undefined
                : colorMode.value === 'dark'
                  ? 'Mode sombre'
                  : 'Mode clair'
            "
            @click="toggleColorMode"
          />
          <UButton
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            icon="i-lucide-log-out"
            :label="collapsed ? undefined : 'Se déconnecter'"
            @click="handleLogout"
          />
        </div>
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
