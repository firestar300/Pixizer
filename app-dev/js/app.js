const Pixizer = {};

Pixizer.ElectronFramework               = {};
Pixizer.ElectronFramework.Electron      = require('electron');
Pixizer.ElectronFramework.Remote        = Pixizer.ElectronFramework.Electron.remote;
Pixizer.ElectronFramework.CurrentWindow = Pixizer.ElectronFramework.Remote.getCurrentWindow();
Pixizer.ElectronFramework.Fs            = require('fs');

Pixizer.FileIndex                       = 0;
Pixizer.ActiveFileIndex                 = 0;
Pixizer.TabsList                        = [];
Pixizer.Workzone                        = document.getElementById('workzone-0').innerHTML;

Pixizer.Config                          = {};
Pixizer.Config.DevMode                  = true;

Pixizer.Classes                         = {};
Pixizer.Classes.Document                = require('./../js/classes/Document.class.js');

Pixizer.Modules                         = {};
Pixizer.Modules.Toolbar                 = require('./../js/modules/toolbar');
Pixizer.Modules.Load                    = require('./../js/modules/drag');
Pixizer.Modules.Init                    = require('./../js/modules/init');
Pixizer.Modules.Tabs                    = require('./../js/modules/tabs');
Pixizer.Modules.Zoom                    = require('./../js/modules/zoom');

Pixizer.Functions                       = {};
Pixizer.Functions.Crop                  = require('./../js/functions/cropper.functions.js');
Pixizer.Functions.Overlay               = {};
Pixizer.Functions.Overlay.Dimensions    = require('./../js/functions/overlayDimensions.functions.js');

if(Pixizer.Config.DevMode) {
  // Open the DevTools.
  Pixizer.ElectronFramework.CurrentWindow.webContents.openDevTools();
}
