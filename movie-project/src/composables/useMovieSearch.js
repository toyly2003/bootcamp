
import { ref, watch } from 'vue'
import { apikey } from '../env'

export function useMovieSearch(router) {
  const searchQuery = ref(localStorage.getItem('searchQuery') || '')
  const movies = ref(JSON.parse(localStorage.getItem('movies')) || [])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const showCartoonsOnly = ref(false)

  const getPosterUrl = (movie) => {
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : '/assets/movie.jpg'
  }

  const fetchMovies = async (page = 1, extraParams = {}) => {
    if (!searchQuery.value.trim() && !showCartoonsOnly.value) {
      movies.value = []
      totalPages.value = 1
      currentPage.value = 1
      return
    }

    loading.value = true
    error.value = null

    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&page=${page}`

      
      if (searchQuery.value.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(searchQuery.value)}&page=${page}`
      }

      
      if (showCartoonsOnly.value) {
        url += `&with_genres=16&certification_country=US&certification.lte=PG`
      }

      
      for (const [key, value] of Object.entries(extraParams)) {
        url += `&${key}=${value}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (!data.results || data.results.length === 0) {
        error.value = 'No movies found.'
        movies.value = []
        totalPages.value = 1
        currentPage.value = 1
      } else {
        movies.value = data.results
        totalPages.value = data.total_pages
        currentPage.value = data.page
      }
    } catch (err) {
      error.value = 'Something went wrong. Please try again.'
    } finally {
      loading.value = false
    }
  }

  const searchMovies = () => {
    if (!searchQuery.value.trim()) return
    currentPage.value = 1
    showCartoonsOnly.value = false
    fetchMovies(1)
  }

  const showCartoonMovies = () => {
    showCartoonsOnly.value = true
    searchQuery.value = ''
    fetchMovies(1)
  }

  const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const goToPrevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToDetails = (movieId) => {
    router.push({ name: 'movie-details', params: { id: movieId } })
  }

  // Watchers
  watch(searchQuery, (newVal) => {
    localStorage.setItem('searchQuery', newVal)
  })

  watch(movies, (newVal) => {
    localStorage.setItem('movies', JSON.stringify(newVal))
  })

  watch(currentPage, (newPage) => {
    fetchMovies(newPage)
  })

  return {
    searchQuery,
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    showCartoonsOnly,
    getPosterUrl,
    fetchMovies,
    searchMovies,
    showCartoonMovies,
    goToNextPage,
    goToPrevPage,
    goToDetails,
  }
}
