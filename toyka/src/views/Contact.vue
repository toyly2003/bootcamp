<template>
  <div>
    <img src="/Background.png" alt="" class="absolute top-0 -z-10 w-full" />
    <div
      class="min-h-screen flex flex-col items-center justify-center relative"
    >
      <img
        src="/assets/images.png"
        class="w-[200px] h-[200px]"
        alt="Contact Us"
      />
      <p class="text-4xl font-semibold">
        Havarlasmak ucin asakdaky knopka basyn!
      </p>
      <button
        class="w-[100px] h-[60px] bg-[purple] rounded-lg font-bold mt-5 text-white"
        @click="showmynumber"
      >
        Contact us
      </button>
      <p v-if="isNumberVisible" class="mt-10 text-2xl">Phone number: {{ number }}</p>
      <!-- This will display the number when it's visible -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const number = ref("+99365192339");
const isNumberVisible = ref(false); // Variable to toggle the visibility of the number

const showmynumber = () => {
  isNumberVisible.value = !isNumberVisible.value; // Toggle visibility when the button is clicked
};
</script>