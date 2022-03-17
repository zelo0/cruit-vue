<template>
  <div>
    <div class="">
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
