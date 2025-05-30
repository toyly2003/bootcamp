 <template>
    <div class="relative w-full h-64 rounded-lg mb-8">
      <transition-group name="fade" tag="div" class="relative w-full h-screen">
        <div
          v-for="(img, index) in backgroundImages"
          v-show="index === currentBackgroundIndex"
          :key="img"
          class="absolute inset-0 bg-center bg-cover"
          :style="{ backgroundImage: `url(${img})` }"
        ></div>
      </transition-group>
    </div>
 </template>
 
 <script setup>
 const backgroundImages = [
  '/assets/swipe2.jpg',
  '/assets/swipe3.jpg',
  '/assets/swipe4.jpg',
]

const currentBackgroundIndex = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentBackgroundIndex.value =
      (currentBackgroundIndex.value + 1) % backgroundImages.length
  }, 15000) // 15 seconds
})

onUnmounted(() => {
  clearInterval(intervalId)
})
 </script>
 
 <style lang="scss" scoped>
 
 </style>
 
 
 