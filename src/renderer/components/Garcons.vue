<template>
<h2>Mesas Ocupadas</h2>
      <div class="menu-layout">
        <div class="produtos">
      <div class="grid">
          <div v-if="mesasOcupadas.length === 0">Nenhuma mesa ocupada.</div>
          <div v-for="mesa in mesasOcupadas" :key="mesa.id" class="card">
            <MesaCard :mesa="mesa" :pedidos="pedidos"/>
          </div>
          </div>
        </div>
      </div>

</template>

<script>
import api from '@/services/api';

export default{ 

}
</script>

<style scoped>

/* Geral */
.menu-layout {
  display: flex;
  padding: 20px;
  gap: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.produtos {
  flex: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group{
  display: flex;
  gap: 10px; 
  justify-content: center; 
  margin-bottom: 10px;
}

.input-group button {
  padding: 8px 12px;
  border: none;
  background: #4CAF50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}

.input-group button:disabled{
  background: #d3d3d3; /* Grey background */
  color: #a0a0a0; /* Light grey text */
  cursor: not-allowed;
}

.card-content {
  padding: 10px;
}

.greyed-out {
  background-color: #d3d3d3;
  color: #a0a0a0;
  cursor: not-allowed;
}

</style>