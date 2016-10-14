const $workzone   = document.getElementById('workzone');
const $range      = document.getElementById('zoomRange');
const $zoomField  = document.getElementById('zoomField');

module.exports = () => {

  // Faire un module commun pour enlever les disavled de tous les el de la status bar
  $range.removeAttribute('disabled');
  $zoomField.removeAttribute('disabled');

  let changeScale = (zoomValue) => {
    let scaleValue = zoomValue / 100;

    $workzone.style.transform = `scale(${scaleValue})`;
  }

  let setValueOnZoomField = (zoomValue) => {
    $zoomField.value = zoomValue;
  }

  let setValueOnZoomRange = (zoomValue) => {
    $range.value = zoomValue;
  }

  $range.addEventListener('mousedown', () => {
    setValueOnZoomField($range.value);
    $range.addEventListener('mousemove', () => {
      setValueOnZoomField($range.value);
    });
  });

  $range.addEventListener('mouseup', () => {
    $range.removeEventListener('mousemove', () => {
      setValueOnZoomField($range.value);
    });

    changeScale($range.value);
  });

  $zoomField.addEventListener('blur', () => {
    let zoomValue = Math.round($zoomField.value / 10) * 10;

    setValueOnZoomField(zoomValue);
    setValueOnZoomRange(zoomValue);
    changeScale(zoomValue);
  });
}
