<template>
  <div class="relative overflow-hidden">
    <div class="w-full block">
      <div class="bg-[#989bffbd] w-fit mx-auto rounded-[10px] px-20 py-4 mt-10">
        <nav class="flex justify-center gap-[30px] text-2xl text-white">
          <router-link
          class="#home"
            to="/"
            active-class="text-blue-600 font-bold border-b-3 border-blue-600"
            >Home</router-link
          >
          <router-link
          class="#service"
            to="/service"
            active-class="text-blue-600 font-bold  border-b-3 border-blue-600"
            >Projects</router-link
          >
          <router-link
          class="#about"
            to="/about"
            active-class="text-blue-600 font-bold  border-b-3 border-blue-600"
            >About</router-link
          >
          <router-link
          class="#contact"
            to="/contact"
            active-class="text-blue-600 font-bold border-b-3 border-blue-600"
            >Contact</router-link
          >
        </nav>
      </div>
    </div>

    <!-- Main Content (this will change depending on the active route) -->
    <router-view></router-view>


    <!-- Contact Section -->
  
    <!-- Footer -->
    <footer class="w-full h-[150px] bg-[#989bffc2] flex flex-col bottom-0">
      <div class="flex justify-center items-center text-sm pt-5">
        <p>Contact me on:</p>
      </div>
      <div class="flex justify-center items-center gap-5 pt-2">
        <ul class="flex gap-5">
          <li
            v-for="(contact, index) in contacts"
            :key="index"
            class="flex items-center gap-2"
          >
            <img :src="contact.logo" alt="Logo" class="w-6 h-6" />
            <a :href="'https://' + contact.name + '.com'">{{ contact.name }}</a>
          </li>
        </ul>
      </div>
      <div class="flex justify-center items-center text-sm pt-5">
        <p>
          © 2025 Toyka. All rights reserved. <br />
          @toylygaryagdyyew081@gmail.com
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>

const contacts = [
  { name: "imo", logo: "../assets/imo.png" },
  { name: "instagram", logo: "../assets/insta.jpg" },
  { name: "telegram", logo: "../assets/telegram.png" },
];
</script>