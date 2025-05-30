
import { ref, watch } from 'vue'

 const favorites = ref([])


const stored = localStorage.getItem('favorites')
if (stored) {
  favorites.value = JSON.parse(stored)
}

function getFavoritesArray() {
  return Array.from(favorites.value.values())
}
function toggleFavorite(movie) {
  const index = favorites.value.findIndex((fav) => fav.id === movie.id)
  if (index === -1) {
    favorites.value.push(movie)
    console.log('Added to favorites:', movie)
  } else {
    favorites.value.splice(index, 1)
    console.log('Removed from favorites:', movie)
  }
}

function isFavorite(movieId) {
  return favorites.value.some((fav) => fav.id === movieId)
}
watch(
  favorites,
  (newVal) => {
    localStorage.setItem('favorites', JSON.stringify(newVal))
  },
  { deep: true },
)

export function useFavorites() {
  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesArray,
  }
}
