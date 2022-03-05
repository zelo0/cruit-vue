<template>
  <div>
    <TheHeader />
    <div class="container md:w-4/5 p-4">
      <ProjectModifyForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectModifyPage',
  middleware: 'authenticated',
}
</script>
