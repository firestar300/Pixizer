const $imageContainer = document.getElementById('workzone');

exports.destroyImage = () => {

};

exports.createImage = (path) => {
  
  const image = document.createElement('img');

  $imageContainer.appendChild(image);

  image.classList.add('resize-image');
  image.setAttribute('id', 'image');
  image.setAttribute('src', path);

  Pixizer.Functions.Crop.resizeableImage(image);


  // Crop : http://dev.vizuina.com/cropper/
  // http://tympanus.net/codrops/2014/10/30/resizing-cropping-images-canvas/

  // const edit = document.getElementsByClassName('edit')[0];
  // const reset = document.getElementsByClassName('reset')[0];
  // const save = document.getElementsByClassName('save')[0];
  // const cancel = document.getElementsByClassName('cancel')[0];
  // const imageWidth = image.getAttribute('data-original-width');
  // const imageHeight = image.getAttribute('data-original-height');
  // const ratioValue = imageWidth / imageHeight;
  //
  // setImageWidthValueToInputField(imageWidth);
  // setImageHeightValueToInputField(imageHeight);
  // setRatioValueToCheckboxField(ratioValue);
};
