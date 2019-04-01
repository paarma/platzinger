const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//Esta variable representará la ventana de la aplicacion
let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600}); //Dimensiones de la ventana de la app
    
    //Carga la ventana
    win.loadURL(url.format({

      //Este path hace referencia al path de los archivos para produccion
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    //Se libera la memoria de cualquier proceso del sistema operativo que se esté usando por la app
    win.on('closed', () => {
      win = null;
    });
  }

  //Cuando esté lista la app se llama a la funcion de crear la ventana de instalación
  app.on('ready', createWindow);


  /**
   * process.platform: obtiene el valor del sistema operativo.
   * Para el caso de windows sería 'win32'. Para mac sería 'darwin'
   */
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });


  /**
   * Si la ventana de la app es nula, se crea
   */
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });