exports.init = (id, remove) => {
  let $container,
      $body = document.querySelector('body'),
      $x_coor = document.querySelector('.x-value'),
      $y_coor = document.querySelector('.y-value'),
      $width = document.querySelector('.width-value'),
      $height = document.querySelector('.height-value'),
      $overlay = document.querySelector('#workzone-' + Pixizer.ActiveFileIndex + ' .overlay'),
      $cropBtn = document.querySelector('.js-crop'),
      orig_src = new Image(),
      image_target = document.getElementById('image-' + id),
      event_state = {},
      constrain = false,
      min_width = 0,
      min_height = 0,
      max_width = 3000,
      max_height = 3000,
      resize_canvas = document.createElement('canvas');

  let init = () => {
    // Create a new image with a copy of the original src
    // When resizing, we will always use this original copy as the base
    orig_src.src = image_target.src;

    // If handles doesn't existe, create them
    if(document.querySelector('#workzone-' + Pixizer.ActiveFileIndex + ' .resize-container') === null) {

      createElements();

      image_target.addEventListener('mousedown', startMoving);
      $cropBtn.addEventListener('click', crop);
    }

    // Get a variable for the container
    $container =  image_target.parentNode;
    // Add events
    let handles = document.querySelectorAll('#workzone-' + Pixizer.ActiveFileIndex + ' .resize-handle');

    [].forEach.call(handles, (e) => {
      e.addEventListener('mousedown', startResize);
    });

    console.log(image_target.width);

  };

  createElements = () => {
    // create wrapper container
    let wrapper = document.createElement('div');
    wrapper.className = 'resize-container';

    // insert wrapper before el in the DOM tree
    image_target.parentNode.insertBefore(wrapper, image_target);

    // move el into wrapper
    wrapper.appendChild(image_target);

    // Create span
    let handleNw = document.createElement('span');
    let handleNe = document.createElement('span');
    let handleSe = document.createElement('span');
    let handleSw = document.createElement('span');

    // Add classes to span
    handleNw.className = 'resize-handle resize-handle-nw';
    handleNe.className = 'resize-handle resize-handle-ne';
    handleSe.className = 'resize-handle resize-handle-se';
    handleSw.className = 'resize-handle resize-handle-sw';

    // Insert span before img
    image_target.parentNode.insertBefore(handleNw, image_target);
    image_target.parentNode.insertBefore(handleNe, image_target);

    // Insert span after img
    image_target.parentNode.appendChild(handleSe);
    image_target.parentNode.appendChild(handleSw);
  }

  saveEventState = (e) => {
    // Save the initial event details and container state
    event_state.container_width = $container.clientWidth;
    event_state.container_height = $container.clientHeight;
    event_state.container_left = $container.offsetLeft;
    event_state.container_top = $container.offsetTop;
    event_state.mouse_x = (e.clientX || e.pageX);
    event_state.mouse_y = (e.clientY || e.pageY);

    event_state.evnt = e;
  }

  startResize = (e) => {
      e.preventDefault();
      e.stopPropagation();
      saveEventState(e);

      document.addEventListener('mousemove', resizing);
      document.addEventListener('mouseup', endResize);
  };

  endResize = (e) => {
      e.preventDefault();
      document.removeEventListener('mouseup', endResize);
      document.removeEventListener('mousemove', resizing);
  };

  resizing = (e) => {
    let mouse = {}, width , height, left, top, offset = {"top" : $container.offsetTop, "left" : $container.offsetLeft}
    mouse.x = (e.clientX || e.pageX);
    mouse.y = (e.clientY || e.pageY);

    // Position image differently depending on the corner dragged and constraints

    // South East
    if (event_state.evnt.target.classList.contains('resize-handle-se')) {
      width = mouse.x - event_state.container_left;
      height = mouse.y  - event_state.container_top;
      left = event_state.container_left;
      top = event_state.container_top;
    // South West
    } else if(event_state.evnt.target.classList.contains('resize-handle-sw')) {
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = mouse.y  - event_state.container_top;
      left = mouse.x;
      top = event_state.container_top;
    // North West
    } else if(event_state.evnt.target.classList.contains('resize-handle-nw')) {
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = mouse.x;
      top = mouse.y;

      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    // North East
    } else if(event_state.evnt.target.classList.contains('resize-handle-ne')) {
      width = mouse.x - event_state.container_left;
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = event_state.container_left;
      top = mouse.y;

      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    }

    // Optionally maintain aspect ratio
    if(constrain || e.shiftKey){
      height = width / orig_src.width * orig_src.height;
    }

    if(width > min_width && height > min_height && width < max_width && height < max_height){
      // To improve performance you might limit how often resizeImage() is called
      resizeImage(width, height);

      // Apply left and top value on dragging span corners
      $container.style.top = `${top}px`;
      $container.style.left = `${left}px`;

      // Set X and Y values of the image position on Status Bar
      $x_coor.innerHTML = `${Math.round(left - $overlay.offsetLeft)}px`;
      $y_coor.innerHTML = `${Math.round(top - $overlay.offsetTop)}px`;
      $width.innerHTML = `${Math.round(width)}px`;
      $height.innerHTML = `${Math.round(height)}px`;
    }
  }

  resizeImage = (width, height) => {
    resize_canvas.width = width;
    resize_canvas.height = height;
    resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
    image_target.setAttribute('src', resize_canvas.toDataURL("image/png"));
  };

  startMoving = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    document.addEventListener('mousemove', moving);
    document.addEventListener('mouseup', endMoving);
  };

  endMoving = (e) => {
    e.preventDefault();
    document.removeEventListener('mouseup', endMoving);
    document.removeEventListener('mousemove', moving);
  };

  moving = (e) => {
    let  mouse = {};
    e.preventDefault();
    e.stopPropagation();

    mouse.x = (e.clientX || e.pageX)
    mouse.y = (e.clientY || e.pageY);

    let positionLeft = mouse.x - ( event_state.mouse_x - event_state.container_left );
    let positionTop = mouse.y - ( event_state.mouse_y - event_state.container_top );

    $container.style.left = `${positionLeft}px`;
    $container.style.top = `${positionTop}px`;

    // Set X and Y values of the image position on Status Bar
    $x_coor.innerHTML = `${positionLeft - $overlay.offsetLeft}px`;
    $y_coor.innerHTML = `${positionTop - $overlay.offsetTop}px`;
    $width.innerHTML = `${Math.round($container.clientWidth)}px`;
    $height.innerHTML = `${Math.round($container.clientHeight)}px`;
  };

  crop = () => {
    let activeDocumentID = $overlay.parentNode.getAttribute('id');
    if(activeDocumentID.substr(activeDocumentID.length - 1) == Pixizer.ActiveFileIndex) {
      let crop_canvas,
        left = $overlay.offsetLeft - $container.offsetLeft,
        top =  $overlay.offsetTop - $container.offsetTop,
        width = $overlay.offsetWidth,
        height = $overlay.offsetHeight;

      crop_canvas = document.createElement('canvas');
      crop_canvas.width = width;
      crop_canvas.height = height;

      console.log(image_target, left, top, width, height, 0, 0, width, height);
      crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);

      window.open(crop_canvas.toDataURL("image/png"));
    }
  }

  init();
};
