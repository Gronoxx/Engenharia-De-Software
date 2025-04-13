const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Criação da janela principal
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, 
      preload: path.join(__dirname, 'preload.js'), // Arquivo de preload (se necessário)
    }
  });

  // Carregar o conteúdo do frontend 
  mainWindow.loadURL('http://localhost:3000'); 

  // Caso esteja em desenvolvimento, abre as ferramentas de desenvolvedor
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Quando a janela for fechada, limpar a referência
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(() => {
  createWindow();

  // No macOS, se não houver janelas abertas, cria uma nova
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Fechar a aplicação quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
