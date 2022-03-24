<template>
  <div>
    <div class="ver-gap5-grid">
      <PartModifyForm />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>
