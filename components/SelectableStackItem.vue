<template lang="">
  <div @click="onclick" :class="{'bg-blue-300': isSelected, 'bg-white': !isSelected}" class="cursor-pointer flex flex-wrap p-2 ring-2 rounded-md  active:bg-blue-50 duration-400">
    <img :src="data.image" class="w-10 h-10 object-contain"></img>
    <div class="leading-10 ml-2 font-bold">{{ data.name }}</div>
  </div>
</template>
<script>
export default {
  props: ['data', 'iniSelected'],
  data() {
    return {
      isSelected: this.iniSelected,
    }
  },
  methods: {
    onclick() {
      this.isSelected = !this.isSelected
      if (this.isSelected) {
        this.$emit('onSelectStackItem', this.data)
      } else {
        this.$emit('onUnselectStackItem', this.data)
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
