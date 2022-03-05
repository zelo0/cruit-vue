<template>
  <div>
    <TheHeader />
    <div class="container md:w-4/5 p-4">
      <MenuBar />
      <UserSearchFilter />
      <UserList />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
}
</script>
