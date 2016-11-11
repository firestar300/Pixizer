module.exports = {
  init: () => {
    let $tabs = document.querySelectorAll('a.item[data-id]');

    $tabs.forEach((el, i, tabs) => {
      let tabId = el.getAttribute('data-id');

      if(i == tabs.length - 1) {
        el.addEventListener('click', () => {
          Pixizer.Modules.Tabs.switchTab(tabId);
        });

        el.querySelector('i').addEventListener('click', (e) => {
          e.stopPropagation();

          let tabId = e.target.parentNode.getAttribute('data-id')

          Pixizer.Modules.Tabs.closeTab(tabId);
        });
      }
    });
  },
  newEmptyTab: () => {
    $emptyTab = document.createElement('div');

    $emptyTab.setAttribute('id', 'workzone-0');
    $emptyTab.classList.add('workzone', 'inactive');

    $emptyTab = document.getElementById('workzones').appendChild($emptyTab);

    // Generate workzone-start and overlay
    $emptyTab.innerHTML = Pixizer.Workzone;

    // Create welcome tab
    $tabs = document.getElementById('tabs');
    $tabs.innerHTML = `<a class="item active" data-id="0">Welcome</a>`;

    Pixizer.Modules.Init.disableEditingTools();
  },
  switchTab: (tabID) => {
    if(typeof tabID == 'undefined') {
      tabID = Pixizer.ActiveFileIndex;
    }

    // Init Crop function on the active tab
    Pixizer.Functions.Crop.init(Pixizer.ActiveFileIndex);

    // Update the active tab index
    Pixizer.ActiveFileIndex = tabID;

    let workzones = document.querySelectorAll('.workzone'),
        $tabs = document.querySelectorAll('a.item[data-id]');

    workzones.forEach((el) => {
      let id = el.getAttribute('id');

      if(id.substr(id.length - 1) == tabID) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    $tabs.forEach((el, i, tabs) => {
      if(el.getAttribute('data-id') == tabID) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  },
  closeTab: (tabID) => {
    $tab = document.querySelector('a.item[data-id="' + tabID + '"]');
    $tab.parentNode.removeChild($tab);

    $workzone = document.getElementById('workzone-' + tabID);
    $workzone.parentNode.removeChild($workzone);

    let indexOfPreviousTab,
        indexOfNextTab;

    Pixizer.TabsList.forEach((tab, i, array) => {
      if(tab.id == tabID) {
        array.splice(i, 1);

        indexOfPreviousTab = i - 1;
        indexOfNextTab = i;
      }
    });

    if(tabID == Pixizer.ActiveFileIndex) {
      if(typeof Pixizer.TabsList[indexOfPreviousTab] != 'undefined') {
        // If it exists, display the previous tab
        Pixizer.Modules.Tabs.switchTab(Pixizer.TabsList[indexOfPreviousTab].id);
      } else if(typeof Pixizer.TabsList[indexOfNextTab] != 'undefined') {
        // Else if it exists, display the next tab
        Pixizer.Modules.Tabs.switchTab(Pixizer.TabsList[indexOfNextTab].id);
      } else {
        // Else display a new Welcome tab
        Pixizer.FileIndex = 0;
        Pixizer.ActiveFileIndex = 0;
        Pixizer.Modules.Tabs.newEmptyTab();
      }
    }
  }
}
