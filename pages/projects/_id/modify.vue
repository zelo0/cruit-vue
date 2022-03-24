<template>
  <div class="ver-gap5-grid">
    <ProjectModifyForm />
    <hr />

    <NuxtLink to="/users" class="flex justify-between">
      <h2>지금 바로 함께 할 멤버를 찾아보세요</h2>
      <client-only>
        <unicon name="angle-right-b" />
      </client-only>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ProjectModifyPage',
  middleware: 'authenticated',
}
</script>
