
<template>
  <div class="p-6 md:p-10 min-h-screen text-white" :style="movieBackdropStyle">
    <button @click="goBack" class="mb-6 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">← Back to Search</button>

    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div class="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>

    <div v-if="error" class="text-red-500 text-center font-semibold">{{ error }}</div>

    <div v-if="movie" class="max-w-5xl mx-auto bg-black/60 backdrop-blur-md rounded-lg p-6 md:flex gap-6 animate-fade-in">
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

      <img :src="posterUrl" :alt="movie.title" class="w-full md:w-1/3 rounded object-cover" />

      <div class="flex-1 mt-4 md:mt-0">
        <h2 class="text-3xl font-bold mb-2">{{ movie.title }}</h2>
        <p class="mb-4 text-lg">{{ movie.overview }}</p>
        <p v-if="movie.release_date"><strong>Release:</strong> {{ movie.release_date }}</p>
        <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
        <p v-if="movie.runtime"><strong>Runtime:</strong> {{ movie.runtime }} mins</p>
        <p><strong>Genres:</strong> {{ genres }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apikey } from '../env'
import { useFavorites } from '../composables/useFavorites'

const route = useRoute()
const router = useRouter()
const movie = ref(null)
const loading = ref(false)
const error = ref(null)

const { toggleFavorite, isFavorite } = useFavorites()

const fetchMovieDetails = async (id) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
    if (!res.ok) throw new Error(`Error ${res.status}`)
    movie.value = await res.json()
  } catch (e) {
    error.value = e.message || 'Failed to load movie details.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMovieDetails(route.params.id)
})

const goBack = () => router.back()

const genres = computed(() => movie.value?.genres?.map(g => g.name).join(', ') || '')

const posterUrl = computed(() => movie.value?.poster_path
  ? `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`
  : '/assets/movie.jpg')

const movieBackdropStyle = computed(() => {
  const url = movie.value?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.value.backdrop_path}`
    : '/assets/movie2.jpg'
  return {
    backgroundImage: `url('${url}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }
})
</script>
