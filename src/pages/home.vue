<template>
  <div class="home">
    <header>
      <h1>Welcome to the Home Page</h1>
    </header>
    <main>
      <p>This is the main content of the home page.</p>
    </main>
    <footer>
      <p>&copy; Angelyeast</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePage({
  name: 'home-test',
  meta: {
    title: '测试首页'
  }
})
</script>

<style scoped>
.home {
  text-align: center;
}

header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

main {
  margin: 20px 0;
}

footer {
  background-color: #f8f9fa;
  padding: 10px;
  border-top: 1px solid #dee2e6;
}
</style>
