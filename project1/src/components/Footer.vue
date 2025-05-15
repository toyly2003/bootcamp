<template>
  <div class="w-full h-full ">
  <div class="px-[70px] h-[400px] bg-gray-100">

    <div class="flex pt-[80px] lg:flex-row flex-col gap-y-10">
      <div class="flex flex-1">
        <div class="flex-1">
          <p class="font-[12px] text-[#4D4D4D]">Selection and Purchase</p>
          <div
            v-for="(element, index) in footelements"
            :key="index"
            class="text-[16px] hover:text-blue-400 cursor-pointer"
          >
            {{ element.name }}
          </div>
        </div>
        <div class="flex-1">
          <p class="font-[12px] text-[#4D4D4D]">Service and Accessories</p>
          <div
            v-for="(element, index) in elements"
            :key="index"
            class="text-[16px] hover:text-blue-400 cursor-pointer"
          >
            {{ element.name }}
          </div>
        </div>
      </div>
      <div class="flex flex-1">
        <div class="flex-1">
          <p class="font-[12px] text-[#4D4D4D]">BMW Russia</p>
          <div
            v-for="(element, index) in third"
            :key="index"
            class="text-[16px] hover:text-blue-400 cursor-pointer"
          >
            {{ element.name }}
          </div>
        </div>

        <div class="flex-1">
          <p class="font-[12px] text-[#4D4D4D]">BMW Group</p>
          <div
            v-for="(element, index) in last"
            :key="index"
            class="text-[16px] hover:text-blue-400 cursor-pointer"
          >
            {{ element.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-[7px] pt-18">
      <div class="w-[32px] h-[32px]">
        <img src="/images/youtube.png" alt="" />
      </div>
      <div class="w-[32px] h-[32px] ">
        <img src="/images/vk.png" alt="" />
      </div>
    </div>
    </div>
    <div class="flex justify-between w-full h-[80px] px-[70px] ">
      <p class="font-[19px] text-[#262626] py-[30px]">© BMW AG 2025</p>
      <div
        class="flex gap-[16px] text-[#262626] text-[12px] items-center cursor-pointer hover:text-blue-400"
      >
        <p>Contacts</p>
        <p>Copyright</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const footelements = ref([
  { name: 'Model Range' },
  { name: 'Test Drive' },
  { name: 'Pre-Owned Vehicles' },
  { name: 'BMW Premium Selection' },
  { name: 'Financial Services' },
  { name: 'Corporate Sales' },
])
const elements = ref([
  { name: 'Service Appointment' },
  { name: 'BMW Accessories Store' },
  { name: 'Roadside Assistance Program' },
  { name: 'BMW Lifestyle' },
])
const third = ref([
  { name: 'Contacts' },
  { name: 'Feedback' },
  { name: 'FAQ' },
  { name: 'Dealer Network' },
  { name: 'Become a Quality Partner' },
])
const last = ref([
  { name: 'BMW.com' },
  { name: 'BMW Group' },
  { name: 'BMW M Driving Experience' },
  { name: 'BMW Motorrad' },
  { name: 'MINI' },
  { name: 'Brand Experience Centre' },
  { name: 'BMW Excellence Club' },
])
</script>

<style lang="scss" scoped>
</style>
