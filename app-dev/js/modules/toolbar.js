module.exports = (() => {

  const $OpenBtn = document.querySelector('.open');
  const $SaveBtn = document.querySelector('.save');
  const {dialog} = Pixizer.ElectronFramework.Remote;

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
          const path = file[0];

          // Create Image
        } else {
          // Error
        }
      }
    );
  });

  // Save file
  $SaveBtn.addEventListener('click', () => {
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
  });

})();
