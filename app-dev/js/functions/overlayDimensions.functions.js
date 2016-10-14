const $workzone     = document.getElementById('workzone');
const $overlay      = document.querySelector('.overlay');
const $widthField   = document.getElementById('width');
const $heightField  = document.getElementById('height');
const $ratio        = document.getElementById('ratio');

module.exports = () => {

  let $container = document.querySelector('.resize-container'),
      $x_coor = document.querySelector('.x-value'),
      $y_coor = document.querySelector('.y-value');

  let init = () => {
    $widthField.value = $overlay.clientWidth;
    $heightField.value = $overlay.clientHeight;

    // Listener on width field inuput
    $widthField.addEventListener('blur', () => {
      if($widthField.value != $overlay.clientWidth) {
        setOverlayWidth($widthField.value);
      }
    });

    // Listener on height field inuput
    $heightField.addEventListener('blur', () => {
      if($heightField.value != $overlay.clientHeight) {
        setOverlayHeight($heightField.value);
      }
    });
  }

  let setOverlayWidth = (width) => {
    $overlay.style.width = `${width}px`;
  }

  let setOverlayHeight = (height) => {
    $overlay.style.height = `${height}px`;
  }

  init();
}


// const widthField = document.getElementById('width');
// const heightField = document.getElementById('height');
// const ratio = document.getElementById('ratio');
//
// // Set Width Value on the Width Field
// let setImageWidthValueToInputField = (imageWidth) => {
//   widthField.setAttribute('value', parseInt(imageWidth));
//   widthField.value = parseInt(imageWidth);
// }
//
// // Set Height Value on the Height Field
// let setImageHeightValueToInputField = (imageHeight) => {
//   heightField.setAttribute('value', parseInt(imageHeight));
//   heightField.value = parseInt(imageHeight);
// }
//
// // Set Ratio Value on the Ratio Checkbox Field
// let setRatioValueToCheckboxField = (ratioValue) => {
//   ratio.setAttribute('value', ratioValue);
// }
//
// // Width Field Change Event
// widthField.addEventListener('change', () => {
//   setImageWidthValueToInputField(widthField.value);
//   document.getElementById('mask').style.width = `${widthField.value}px`;
//
//   if(ratio.checked) {
//     let newHeightValue = Math.floor(widthField.value / ratio.value);
//
//     setImageHeightValueToInputField(newHeightValue);
//     document.getElementById('mask').style.height = `${heightField.value}px`;
//   }
// });
//
// // Height Field Change Event
// heightField.addEventListener('change', () => {
//   setImageHeightValueToInputField(heightField.value);
//   document.getElementById('mask').style.height = `${heightField.value}px`;
//
//   if(ratio.checked) {
//     let newWidthValue = Math.floor(heightField.value * ratio.value);
//
//     setImageWidthValueToInputField(newWidthValue);
//
//     document.getElementById('mask').style.width = `${widthField.value}px`;
//   }
// });
