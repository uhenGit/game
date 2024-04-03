<template>
  <v-container class="fill-height">
    <v-card
      title="Login page"
      text="Enter your email and password to access the game"
      class="w-75 mx-auto p-2"
    >
      <v-form
        class="w-100 pa-4"
        @submit.prevent="onLogin"
      >
        <v-text-field
          v-model="state.email"
          label="Email:"
          required
          :error-messages="v$.email.$errors.map((err) => err.$message)"
        />
        <v-text-field
          v-model="state.password"
          label="Password:"
          required
          :error-messages="v$.password.$errors.map((err) => err.$message)"
          class="mt-4"
        />
        <v-card-actions>
          <v-btn
            type="submit"
            variant="outlined"
            block
            class="mt-2"
          >
            Submit
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
      email: '',
      password: '',
    });
    const router = useRouter();
    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
    const v$ = useVuelidate(rules, state);
    const onLogin = async () => {
      const isFormValid = await v$.value.$validate();

      if (isFormValid) {
        router.push('/game');
      }
    }

    return { v$, state, onLogin }
  }
}
</script>
