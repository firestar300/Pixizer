const widthField = document.getElementById('width');
const heightField = document.getElementById('height');
const ratio = document.getElementById('ratio');

// Set Width Value on the Width Field
let setImageWidthValueToInputField = (imageWidth) => {
  widthField.setAttribute('value', parseInt(imageWidth));
  widthField.value = parseInt(imageWidth);
}

// Set Height Value on the Height Field
let setImageHeightValueToInputField = (imageHeight) => {
  heightField.setAttribute('value', parseInt(imageHeight));
  heightField.value = parseInt(imageHeight);
}

// Set Ratio Value on the Ratio Checkbox Field
let setRatioValueToCheckboxField = (ratioValue) => {
  ratio.setAttribute('value', ratioValue);
}

// Width Field Change Event
widthField.addEventListener('change', () => {
  setImageWidthValueToInputField(widthField.value);
  document.getElementById('mask').style.width = `${widthField.value}px`;

  if(ratio.checked) {
    let newHeightValue = Math.floor(widthField.value / ratio.value);

    setImageHeightValueToInputField(newHeightValue);
    document.getElementById('mask').style.height = `${heightField.value}px`;
  }
});

// Height Field Change Event
heightField.addEventListener('change', () => {
  setImageHeightValueToInputField(heightField.value);
  document.getElementById('mask').style.height = `${heightField.value}px`;

  if(ratio.checked) {
    let newWidthValue = Math.floor(heightField.value * ratio.value);

    setImageWidthValueToInputField(newWidthValue);

    document.getElementById('mask').style.width = `${widthField.value}px`;
  }
});
