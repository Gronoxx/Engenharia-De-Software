// vue.config.js
module.exports = {
    devServer: {
      // Habilitar CORS (Cross-Origin Resource Sharing) para permitir a comunicação entre Electron e o Vue
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // Alterar a porta para não conflitar com outras instâncias de servidor
      port: 3000, 
      open: true,  // Abrir o navegador automaticamente (opcional)
    },
    chainWebpack: config => {
      // Garanta que o Electron se conecte ao arquivo correto do Vue
      config.entry('app').clear().add('./src/renderer/main.js');
    },
  };
  