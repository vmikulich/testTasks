<template>
  <div id="app">
    <div class="wraper">
      <header>
        <h1 class="title">TODOLIST</h1>
      </header>
      <Todos/>
    </div>
    <footer>Created by Vlad Mikulich</footer>
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

html,
body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.wraper {
  flex: 1 0 auto;
  header {
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: rgb(42, 148, 74);
    .title {
        color: #fff;
    }
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  background-color: rgb(42, 148, 74);
  color: #fff;
  margin-top: 20px;
  height: 30px;
}
</style>
