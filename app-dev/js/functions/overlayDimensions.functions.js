const $workzone           = document.getElementById('workzone-' + Pixizer.ActiveFileIndex);
const $overlay            = document.querySelector('.overlay');
const $overlayBefore      = document.querySelector('.overlay-before');
const $overlayAfter       = document.querySelector('.overlay-after');
const $overlayInnerBefore = document.querySelector('.overlay-inner-before');
const $overlayInnerAfter  = document.querySelector('.overlay-inner-after');
const $widthField         = document.getElementById('width');
const $heightField        = document.getElementById('height');
const $ratio              = document.getElementById('ratio');

module.exports = () => {

  let $container = document.querySelector('.resize-container'),
      $x_coor = document.querySelector('.x-value'),
      $y_coor = document.querySelector('.y-value'),
      onChange = false;

  let init = () => {
    $widthField.value = $overlay.clientWidth;
    $heightField.value = $overlay.clientHeight;

    // Listener on width field inuput
    $widthField.addEventListener('blur', () => {
      if($widthField.value != $overlay.clientWidth) {
        onChange = true;
        setOverlayWidth($widthField.value);
      }
    });

    // Listener on height field inuput
    $heightField.addEventListener('blur', () => {
      if($heightField.value != $overlay.clientHeight) {
        onChange = true;
        setOverlayHeight($heightField.value);
      }
    });
  }

  let setOverlayWidth = (width) => {
    if($ratio.checked && onChange) {
      onChange = false;

      // Get the last width value
      let lastWidth = $overlay.clientWidth;

      // Define the ratio value
      let ratioValue = $widthField.value / lastWidth;

      // Set the auto height value to the height input field value
      $heightField.value = $overlay.clientHeight * ratioValue;

      // Set the overlay height
      setOverlayHeight($overlay.clientHeight * ratioValue);
    }

    $overlay.style.width = `${width}px`;
    $overlayBefore.style.width = `${width}px`;
    $overlayAfter.style.width = `${width}px`;

    onChange = true;
  }

  let setOverlayHeight = (height) => {
    if($ratio.checked && onChange) {
      onChange = false;

      // Get the last width value
      let lastHeight = $overlay.clientHeight;

      // Define the ratio value
      let ratioValue = $heightField.value / lastHeight;

      // Set the auto height value to the height input field value
      $widthField.value = $overlay.clientWidth * ratioValue;

      // Set the overlay height
      setOverlayWidth($overlay.clientWidth * ratioValue);
    }

    $overlay.style.height = `${height}px`;
    $overlayInnerBefore.style.height = `${height}px`;
    $overlayInnerAfter.style.height = `${height}px`;

    onChange = true;
  }

  init();
}
