<template>
  <section class="p-4 min-h-screen text-white bg-white ">
    <div class="pb-3">
    <button @click="goBack" class="mb-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white">
      ← Back to Search
    </button>
</div>
    <div v-if="favorites.length === 0" class="text-gray-400">
      You haven't added any favorites yet.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="movie in favorites"
        :key="movie.id"
        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <router-link :to="`/movie/${movie.id}`">
          <img :src="getPosterUrl(movie)" :alt="movie.title" class="w-full h-64 object-cover" />
        </router-link>

        <button
          @click.stop="toggleFavorite(movie)"
          class="top-0 right-0 cursor-pointer"
          :aria-label="isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'"
        >
          <svg
            v-if="isFavorite(movie.id)"
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            stroke="red"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
        <div class="p-3">
          <h3 class="text-lg text-gray-400 font-semibold truncate">{{ movie.title }}</h3>
          <p class="text-sm text-gray-400">{{ movie.release_date?.split('-')[0] || 'N/A' }}</p>
          <div class="flex items-center text-yellow-400 mt-1">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.782.57-1.837-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
              />
            </svg>
            {{ movie.vote_average.toFixed(1) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFavorites } from '@/composables/useFavorites'
import { useRouter } from 'vue-router' 
const { toggleFavorite, isFavorite } = useFavorites()
const { favorites } = useFavorites()
const router = useRouter()
const goBack = () => router.back()
const getPosterUrl = (movie) => {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : '/assets/movie.jpg'
}
</script>
