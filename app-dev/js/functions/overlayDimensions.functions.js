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
      borderTopWidth = getComputedStyle($overlay).getPropertyValue('border-top-width').substring(0, getComputedStyle($overlay).getPropertyValue('border-top-width').length - 2),
      borderRightWidth = getComputedStyle($overlay).getPropertyValue('border-right-width').substring(0, getComputedStyle($overlay).getPropertyValue('border-right-width').length - 2),
      borderBottomWidth = getComputedStyle($overlay).getPropertyValue('border-bottom-width').substring(0, getComputedStyle($overlay).getPropertyValue('border-bottom-width').length - 2),
      borderLeftWidth = getComputedStyle($overlay).getPropertyValue('border-left-width').substring(0, getComputedStyle($overlay).getPropertyValue('border-left-width').length - 2),
      onChange = false;

  let init = () => {
    $widthField.value = $overlay.offsetWidth;
    $heightField.value = $overlay.offsetHeight;

    // Listener on width field inuput
    $widthField.addEventListener('blur', () => {
      if($widthField.value != $overlay.offsetWidth) {
        onChange = true;
        setOverlayWidth($widthField.value);
      }
    });

    // Listener on height field inuput
    $heightField.addEventListener('blur', () => {
      if($heightField.value != $overlay.offsetHeight) {
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

    $overlay.style.width = `${parseInt(width) - parseInt(borderRightWidth) - parseInt(borderLeftWidth)}px`;
    $overlayBefore.style.width = `${parseInt(width) - parseInt(borderRightWidth) - parseInt(borderLeftWidth)}px`;
    $overlayAfter.style.width = `${parseInt(width) - parseInt(borderRightWidth) - parseInt(borderLeftWidth)}px`;

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

    $overlay.style.height = `${parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)}px`;
    $overlayInnerBefore.style.height = `${parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)}px`;
    $overlayInnerAfter.style.height = `${parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)}px`;

    onChange = true;
  }

  init();
}
