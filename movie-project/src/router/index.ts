import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // The page where the movies are listed
import MovieDetails from '../views/MovieDetail.vue'; // The page to show movie details
import FavoritesView from '../components/FavoritesView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home, 
  },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
  {
    path: '/movie/:id', 
    name: 'movie-details',
    component: MovieDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
