<template>
  <div class="app">
    <header>
      <h1>Welcome to Llama Zero</h1>
    </header>
    <main>
      <p>Hello, Vue 3!</p>
      <p>This is a basic Vue 3 application running in a Docker container.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eaeaea;
}

h1 {
  color: #42b983;
  margin: 0;
}

main {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
