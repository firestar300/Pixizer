module.exports = {
  enableEditingTools: () => {
    // Toolbar
    document.getElementById('width').removeAttribute('disabled');
    document.getElementById('height').removeAttribute('disabled');
    document.getElementById('ratio').removeAttribute('disabled');
    document.querySelector('.js-crop').removeAttribute('disabled');

    // Statusbar
    document.getElementById('zoomRange').removeAttribute('disabled');
    document.getElementById('zoomField').removeAttribute('disabled');
  },
  disableEditingTools: () => {
    // Toolbar
    document.getElementById('width').setAttribute('disabled', 'disabled');
    document.getElementById('width').value = '';
    document.getElementById('height').setAttribute('disabled', 'disabled');
    document.getElementById('height').value = '';
    document.getElementById('ratio').setAttribute('disabled', 'disabled');
    document.querySelector('.js-crop').setAttribute('disabled', 'disabled');

    // Statusbar
    document.getElementById('zoomRange').setAttribute('disabled', 'disabled');
    document.getElementById('zoomRange').value = 100;
    document.getElementById('zoomField').setAttribute('disabled', 'disabled');
    document.getElementById('zoomField').value = 100;
  }
};
