<template>
  <div class="">
    <img src="/Background.png" alt="" class="absolute top-0 -z-10 w-full" />
    <div class="flex justify-between py-20 px-[200px]">
      <div
        class="w-[50%] flex flex-col items-start justify-center font-[Lexend]"
      >
        <div class="text-[90px] font-bold text-blue-700 leading-[120%]">
          Men Toyly, <br />
          Soul in IT
        </div>
        <div class="text-[30px] mt-10 font-medium">
          Men Toýly, 7/24 kompýuter bilen gyzyklanýan. Özumbarada gysgaça aýtsam
          Matematika, Informatika ugrundan 8 ýyl tejribäm bar. Geljekde programmist
          boljagyma ynamym uly.
        </div>
        <router-link to="/service"  class="px-16 mt-10 py-4 bg-black text-white font-medium rounded-md text-2xl font-sans cursor-pointer hover:bg-gray-800">Dowam ediň</router-link>
        <p class="mt-5 text-2xl font-medium">#software &nbsp; #frontend &nbsp; #backend &nbsp; #math &nbsp; #ML/AI</p>
      </div>

      <img
        src="/assets/toyly.jpg"
        class="translate-x-70 w-[40%] border-6 border-blue-700 rounded-full aspect-square object-cover hover:shadow-xl"
        alt=""
      />
    </div>
    <div class="flex justify-between py-10 px-[200px]">
      <div class="w-full bg-[#989bffbd] flex py-8 px-10 rounded-xl justify-between">
        <img v-for="item in images" :key="item" :src="item" alt="" class="w-20 h-20">
       
      </div>
    </div>
  </div>
</template>

<script setup>
const images=['/l1.svg', '/l2.svg', '/l3.svg', '/l5.svg','/l6.svg','/l7.svg' ,'/l4.svg']
</script>

<style lang="scss" scoped>
</style>