import Game from "@/pages/game.vue";
import Index from "@/pages/index.vue";

export const routes = [
  {
    name: 'Login',
    path: '/',
    component: Index,
  },
  {
    name: 'Game',
    path: '/game',
    component: Game,
  }
]