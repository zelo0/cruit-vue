<template>
  <div>
    <MeForm />
  </div>
</template>

<script>
export default {
  name: 'MePage',
  middleware: 'authenticated',
}
</script>
