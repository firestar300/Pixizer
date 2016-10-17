module.exports = (() => {

  const $OpenBtn    = document.querySelector('.open');
  const $SaveBtn    = document.querySelector('.save');
  const $SaveAsBtn  = document.querySelector('.save-as');
  const {dialog}    = Pixizer.ElectronFramework.Remote;
  const fs          = Pixizer.ElectronFramework.Fs;
  const Document    = Pixizer.Classes.Document;

  // Read file
  function readFile(filepath){
      fs.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
            // Change how to handle the file content
            console.log("The file content is : " + data);
      });
  }

  // Open file
  $OpenBtn.addEventListener('click', () => {
    dialog.showOpenDialog(
      {
        title: 'Choose your image file',
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'gif']
          }
        ],
        properties: ['openFile', 'openDirectory']
      },
      (file) => {
        if(file !== undefined) {
          const filepath = file[0];
          const filename = filepath.replace(/^.*[\\\/]/, '');

          new Document(filepath, filename);
          // Create Image
        } else {
          // Error
        }
      }
    );
  });

  // Save file
  // http://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework
  $SaveAsBtn.addEventListener('click', () => {
    dialog.showSaveDialog(
      {
        title: 'Save your image file',
        defaultPath: '~/Copie',
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png', 'gif']
          }
        ]
      },
      (file) => {
        console.log(file);
      }
    );

    fs.writeFile(fileName, content, function (err) {
       if(err){
           alert("An error ocurred creating the file "+ err.message)
       }

       alert("The file has been succesfully saved");
    });
  });

})();
