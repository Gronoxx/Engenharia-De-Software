module.exports = {
    devServer: {
      // Habilitar CORS (Cross-Origin Resource Sharing) para permitir a comunicação entre Electron e o Vue
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      port: 3000, 
      open: true,  // Abrir o navegador automaticamente
    },
    chainWebpack: config => {
      config.entry('app').clear().add('./src/renderer/main.js');
    },
  };
  