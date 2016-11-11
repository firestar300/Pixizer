const $imageContainer = document.getElementById('workzone-' + Pixizer.ActiveFileIndex);
const Document        = Pixizer.Classes.Document;

module.exports = (() => {

  $imageContainer.ondragover = () => {
    $imageContainer.classList.add('ondrag');
    return false;
  }
  $imageContainer.ondragleave = $imageContainer.ondragend = () => {
    return false;
  }
  $imageContainer.ondrop = (e) => {
    e.preventDefault();

    $imageContainer.classList.remove('ondrag');

    for (let f of e.dataTransfer.files) {
      console.log(f);
      console.log('File(s) you dragged here: ', f.path);

      new Document(f.path, f.name, f.type);
    }

    return false;
  }
})();
