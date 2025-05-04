<template>
  <div id="app">
    <div class="top-bar">
      <img src="@/assets/logo.png" alt="Logo do Restaurante" class="logo" />
      <nav class="nav">
        <ul class="nav-list">
          <li><router-link to="/">Menu</router-link></li>
          <li><router-link to="/pedidos">Pedidos</router-link></li>
          <li><router-link to="/estoque">Estoque</router-link></li>
          <li><router-link to="/mesas">Mesas</router-link></li>
        </ul>
      </nav>
    </div>

    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.top-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  height: 100px;
  margin-top: 1rem;
}

.nav-list {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin-top: 4rem;
}

.nav-list a {
  text-decoration: none;
  color: black;
  background-color: #e0e0e0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  font-weight: 500;
}


.nav-list a:hover,
.nav-list a.router-link-exact-active {
  background-color: #bdbdbd;
}

.content-container {
  background-color: #f5f5f5;
  padding: 2rem;
  margin: 0 2rem 2rem 2rem;
  border-radius: 12px;
}
</style>
