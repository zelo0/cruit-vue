<template>
  <div>
    <div class="container md:w-4/5 p-4">
      <ProjectCreateForm />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCreatePage',
  middleware: 'authenticated',
}
</script>
