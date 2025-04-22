<template>
  <v-container class="fill-height justify-center align-center">
    <v-card min-width="400" class="pa-4">
      <v-card-title class="text-center text-h5 mb-4">Connexion</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            variant="outlined"
            class="mb-3"
            prepend-inner-icon="mdi-email-outline"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            required
            variant="outlined"
             class="mb-3"
             prepend-inner-icon="mdi-lock-outline"
          ></v-text-field>
          <v-btn type="submit" block color="primary" size="large" variant="tonal">Se connecter</v-btn>
        </v-form>
        <div class="text-center mt-4">
            Pas encore de compte ? <NuxtLink to="/register">S'inscrire</NuxtLink>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Définit un layout spécifique si nécessaire (ex: sans les panneaux latéraux)
definePageMeta({
  layout: 'auth'
});

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  console.log('Tentative de connexion (UI seulement):', { email: email.value });
  // Logique de connexion backend viendra ici

  // Simulation de redirection après connexion réussie
  alert('Connexion réussie (simulation)!');
  router.push('/'); // Redirige vers la page principale
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
.v-card {
    border-radius: 8px;
}
.v-btn {
    border-radius: 4px;
}
</style> 