module.exports = class Document {

  constructor(filepath, filename) {
    let ThisDoc = this;

    const ImageDatas = {
      "id" : Pixizer.FileIndex,
      "filepath" : filepath,
      "filename" : filename,
      "overlay" : {
        "width" : 200,
        "height" : 200
      },
      "active" : true
    };

    Pixizer.FileIndex++;

    // Create a new tab
    ThisDoc.newTab(ImageDatas);

    // Create a new workzone linked to the new tab
    ThisDoc.newWorkzone(ImageDatas);

    //Switch tab
    Pixizer.Modules.Tabs.switchTab();
  }

  newTab(ImageDatas) {
    let $tabContainer = document.getElementById('tabs');
    let $tabs = Array.from($tabContainer.children);

    Pixizer.TabsList.push(ImageDatas);

    $tabs.every((el) => {
      if(el.getAttribute('data-id') == ImageDatas.id) {
        // Replace the Welcome tab
        el.setAttribute('title', ImageDatas.filepath);
        el.innerHTML = `${ImageDatas.filename}<i class="remove icon"></i>`;
      } else {
        // Create a new tab
        Pixizer.TabsList.forEach((tab) => {
          if(tab.id !== ImageDatas.id) {
            tab.active = false;

            document.querySelector('a.item[data-id="'+ tab.id +'"]').classList.remove('active');
          }
        });

        let $tab = document.createElement('a');
        $tab.classList.add('item');
        $tab.setAttribute('data-id', ImageDatas.id);
        $tab.setAttribute('title', ImageDatas.filepath);

        // Set the active file index to the current document ID
        Pixizer.ActiveFileIndex = ImageDatas.id;

        $tabContainer.appendChild($tab);
        $tab.innerHTML = `${ImageDatas.filename}<i class="remove icon"></i>`;

        console.log(Pixizer.TabsList);

        return false;
      }
    });
  }

  newWorkzone(ImageDatas) {
    let $workzones = document.getElementById('workzones');
    if(ImageDatas.id != 0) {
      let $newWorkzone = document.createElement('div');
      $newWorkzone.setAttribute('id', 'workzone-' + ImageDatas.id);
      $newWorkzone.classList.add('workzone');

      let $overlay = document.querySelector('.overlay').cloneNode(true);
      $newWorkzone.appendChild($overlay);

      $workzones.appendChild($newWorkzone);
    }

    let $imageContainer = document.getElementById('workzone-' + Pixizer.ActiveFileIndex);
    $imageContainer.classList.remove('inactive');

    let $image = document.createElement('img');
    $imageContainer.appendChild($image);
    $image.classList.add('resize-image');
    $image.setAttribute('id', 'image-' + ImageDatas.id);
    $image.setAttribute('src', ImageDatas.filepath);

    // Modules
    Pixizer.Modules.Init.enableEditingTools();
    Pixizer.Modules.Tabs.init();
    Pixizer.Modules.Zoom();

    // Functions
    //Pixizer.Functions.Crop.resizeableImage($image);
    Pixizer.Functions.Overlay.Dimensions();
  }
}
