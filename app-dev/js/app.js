const Pixizer = {};

Pixizer.ElectronFramework               = {};
Pixizer.ElectronFramework.Electron      = require('electron');
Pixizer.ElectronFramework.Remote        = Pixizer.ElectronFramework.Electron.remote;
Pixizer.ElectronFramework.CurrentWindow = Pixizer.ElectronFramework.Remote.getCurrentWindow();

Pixizer.Config                          = {};
Pixizer.Config.DevMode                  = true;

Pixizer.Modules                         = {};
Pixizer.Modules.Toolbar                 = require('./../js/modules/toolbar');
Pixizer.Modules.Load                    = require('./../js/modules/drag');
Pixizer.Modules.Init                    = require('./../js/modules/init');
Pixizer.Modules.Zoom                    = require('./../js/modules/zoom');

Pixizer.Functions                       = {};
Pixizer.Functions.Crop                  = require('./../js/functions/cropper.functions.js');

if(Pixizer.Config.DevMode) {
  // Open the DevTools.
  Pixizer.ElectronFramework.CurrentWindow.webContents.openDevTools();
}
