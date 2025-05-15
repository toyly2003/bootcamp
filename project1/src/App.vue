<template>
  <!-- Wrapper div with background image -->
  <div id="container">
    <div
      class="bg-cover bg-center relative top-0 left-0 min-w-full min-h-screen"
      style="background-image: url('/images/navigaition.webp')"
    >
      <img
        id="chevron"
        @click="scrollToTop"
        class="fixed bottom-10 right-10 z-20 transition-all duration-300 cursor-pointer"
        :class="scrollTop > 300 ? 'opacity-100' : 'opacity-0'"
        src="/images/chevron.svg"
        alt="Chevron"
      />
      <!-- Navigation with flexbox to center the items, applying a semi-transparent background -->
      <div class="bg-black">
        <div
          class="flex justify-between bg-opacity-80 md:px-8 px-2 py-4 inner-width mx-auto items-center border-b-2 border-white"
        >
          <!-- Logo Image -->
          <div class="flex gap-5 items-center">
            <img src="/images/logo.svg" alt="Logo" class="opacity-80 h-[40px]" />

            <!-- Navigation Links -->
            <nav class="text-white md:text-[20px] text-[7px] pl-4">
              <ul class="flex gap-8 justify-between">
                <li
                  v-for="(element, index) in elements"
                  :key="index"
                  class="nav-item cursor-pointer relative"
                >
                  {{ element.name }}
                </li>
              </ul>
            </nav>
          </div>

          <!-- Images aligned to the right -->
          <div class="flex gap-4 cursor-pointer ">
            <div class="nav-item">
            <img src="/images/person.svg" alt="Person" class="rounded-md h-[25px] text-white " /></div>
            <div class="nav-item">
            <img src="/images/location.svg" alt="Location" class="rounded-md h-[25px] text-white" /></div>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute w-full h-100 top-0 z-10 bg-gradient-to-b from-black from-20% to-[#00000000] md:text-6xl text-3xl text-white pt-20"
          >
            <div class="w-[90%]  mx-auto">Everything changes, values remain</div>
          </div>
        </div>
      </div>
    </div>
    <Testimon />
    <Swipe />
    <Third />
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Testimon from './components/Testimon.vue'
import Swipe from './components/Swipe.vue'
import Third from './components/Third.vue'
import Footer from './components/Footer.vue'
const elements = ref([
  { name: 'Cars' },
  { name: 'Electric cars' },
  { name: 'To owners' },
  { name: 'Online purchase' },
  { name: 'More about BMW' },
])
const scrollTop = ref(0)
const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  })
}
const updateScrollTop = () => {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}

// Add event listener for scroll when component is mounted
onMounted(() => {
  window.addEventListener('scroll', updateScrollTop)
})
</script>

<style scoped>
.inner-width {
  width: 90%;
  margin: 0 auto;
}

.nav-item {
  position: relative;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: -20px; /* Adjust this to control how far below the text the underline will appear */
  left: 0;
  width: 100%;
  height: 3px; /* Thickness of the underline */
  background-color: blue; /* Set the underline color */
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
