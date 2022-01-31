<template lang="">
  <div @click="onclick" :class="{'selected': isSelected, 'notSelected': !isSelected}" class="flex flex-wrap p-2 ring-2 rounded-md hover:bg-blue-100 duration-400">
    <img :src="data.image" class="w-10 h-10 object-contain"></img>
    <div class="leading-10 ml-2 font-bold">{{ data.name }}</div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  props: ['data'],
  data() {
    return {
      isSelected: false,
    }
  },
  methods: {
    ...mapMutations ({
      addStackFilter: 'filter/addStackFilter',
      removeStackFilter: 'filter/removeStackFilter'
    }),
    onclick: function (event ,target){
      this.isSelected = !this.isSelected
      if (this.isSelected) {
        this.addStackFilter(this.data.name)
      } else {
        this.removeStackFilter(this.data.name)
      }
    }
  },
}
</script>
<style lang="css">
  .selected {
    background-color: #bfdbfe;
  }
  .notSelected {
    background-color: white;
  }
</style>
