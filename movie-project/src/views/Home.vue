
<template>
  <div class="relative w-full h-screen bg-cover bg-center" :style="heroBackground">
    <div
      class="absolute inset-0 flex flex-col justify-center items-center text-white px-8 bg-gradient-to-br from-black/60 to-black/20"
    >
      <h1 class="text-5xl md:text-6xl font-bold text-center leading-tight mb-4">
        Welcome to <span class="text-blue-500">MovieProject</span>
      </h1>
      <p class="text-xl text-center mb-2">
        Explore unforgettable stories and cinematic masterpieces.
      </p>
      <button
        @click="scrollPastHero"
        class="mt-6 bg-blue-700 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
      >
        Tap to Search ↓
      </button>
      
    </div>
  </div>

  <div class="p-10" ref="searchSection">
    <form
      @submit.prevent="searchMovies"
      class="flex flex-col md:flex-row gap-4 justify-center items-center pb-6"
    >
      <input
        v-model="searchQuery"
        placeholder="Search for a movie..."
        class="w-full md:w-[600px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div class="flex gap-5">
        <button
          type="submit"
          class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          type="button"
          @click="showCartoonMovies"
          class="bg-yellow-400 text-black px-5 py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          🎬 Cartoons
        </button>
        <router-link to="/favorites" class="mt-4 text-blue text-center hover:underline  w-32 bg-amber-300 rounded-lg"
        >❤️ View Favorites</router-link
      >
      </div>
    </form>

    <div v-if="loading" class="flex justify-center items-center">
      <div
        class="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
      ></div>
    </div>

    <div v-if="error" class="text-red-500 text-center font-semibold mb-4">{{ error }}</div>

    <div
      v-if="movies.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-gray-900 text-white rounded-lg p-4  hover:shadow-xl hover:scale-105 transition cursor-pointer relative"
        @click.stop="goToDetails(movie.id)"
      >
     
          <button
            @click.stop="toggleFavorite(movie)"
            class="absolute top-0 right-0 z-10 cursor-pointer"
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
        <img
          :src="getPosterUrl(movie)"
          :alt="movie.title"
          class="w-full h-64 object-cover rounded mb-4 pt-2"
        />
        <h3 class="text-lg font-semibold truncate">{{ movie.title }}</h3>
        <p class="text-sm text-gray-400">{{ movie.release_date?.split('-')[0] || 'N/A' }}</p>
        <div class="flex items-center text-yellow-400 mt-2">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.782.57-1.837-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
              />
            </svg>
          {{ movie.vote_average.toFixed(1) }}
        </div>
      </div>
    </div>

    <div v-if="movies.length" class="flex justify-center gap-4 pt-6">
      <button
        @click="goToPrevPage"
        :disabled="currentPage === 1 || loading"
        class="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span class="text-blue-800 font-semibold pt-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages || loading"
        class="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 "
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'
import { useMovieSearch } from '../composables/useMovieSearch'

const router = useRouter()
const {
  searchQuery,
  movies,
  loading,
  error,
  currentPage,
  totalPages,
  getPosterUrl,
  searchMovies,
  showCartoonMovies,
  goToNextPage,
  goToPrevPage,
  goToDetails,
} = useMovieSearch(router)

const { toggleFavorite, isFavorite } = useFavorites()

const scrollPastHero = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

const heroBackground = `
  background-image:
    linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3)),
    url('/assets/mainmovie.jpg');
  background-size: cover;
  background-position: center;
`
</script>