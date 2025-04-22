<template>
  <v-container class="fill-height justify-center align-center">
    <v-card min-width="400" class="pa-4">
      <v-card-title class="text-center text-h5 mb-4">Inscription</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
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
          <v-text-field
            v-model="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            required
            variant="outlined"
            class="mb-3"
            prepend-inner-icon="mdi-lock-check-outline"
          ></v-text-field>
          <v-btn type="submit" block color="primary" size="large" variant="tonal">S'inscrire</v-btn>
        </v-form>
        <div class="text-center mt-4">
            Déjà un compte ? <NuxtLink to="/login">Se connecter</NuxtLink>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'auth'
});

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleRegister = () => {
  // Validation simple côté client (exemple)
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas !');
    return;
  }
  console.log("Tentative d'inscription (UI seulement):", { email: email.value });
  // Logique d'inscription backend viendra ici

  // Simulation de redirection après inscription réussie
  alert("Inscription réussie (simulation)!");
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