<template>
  <div id="app">
    <header>
      <h1 class="title">TODOLIST</h1>
    </header>
    <Todos/>
    <footer></footer>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'app',
  components: {
    Todos
  }
}
</script>

<style lang="scss">

$fontColor: #2c3e50;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
  width: 100%;
  margin: 0 auto;
}
header {
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: rgb(42, 148, 74);
  .title {
      color: #fff;
  }
}
</style>
