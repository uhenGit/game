<template>
  <v-container class="fill-height">
    <v-card
      title="Login page"
      text="Enter your email and password to access the game"
      class="w-auto mx-auto p-2"
    >
      <v-form
        class="w-100 pa-4"
        @submit.prevent="onLogin"
      >
        <v-text-field
          v-model="state.userEmail"
          label="Email:"
          required
          :error-messages="v$.userEmail.$errors.map((err) => err.$message)"
        />
        <v-text-field
          v-model="state.userPassword"
          label="Password:"
          required
          type="password"
          :error-messages="v$.userPassword.$errors.map((err) => err.$message)"
          class="mt-4"
        />
        <v-card-actions>
          <v-btn
            type="submit"
            variant="outlined"
            block
            class="mt-2"
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  setup() {
    const state = reactive({
      userEmail: '',
      userPassword: '',
    });
    const router = useRouter();
    const rules = {
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(6) },
    };
    const v$ = useVuelidate(rules, state);
    const onLogin = async () => {
      const isFormValid = await v$.value.$validate();

      if (isFormValid) {
        await router.push('/game');
      }
    }

    return { v$, state, onLogin }
  }
}
</script>
