class StorageManager {
  constructor() {
    const content = document.createElement('div');
    content.classList.add('d-flex', 'justify-content-between', 'mb-3');
    this.content = content;
    
    const switchingButton = document.createElement('button');
    switchingButton.classList.add('btn', 'btn-primary');
    this.switchingButton = switchingButton;
    
    let currentStorage = 'localStorage';
    this.currentStorage = currentStorage;
    
    if (window.localStorage.getItem('storageAddress')) this.currentStorage = JSON.parse(window.localStorage.getItem('storageAddress'));
    else window.localStorage.setItem('storageAddress', JSON.stringify(this.currentStorage));
    
    this.switchingButton.textContent = this.currentStorage;
    this.content.append(this.switchingButton);
  
    const switchStorageManager = () => {
      if (this.currentStorage === 'localStorage') this.currentStorage = 'none';
      else this.currentStorage = 'localStorage';
    }
  
    this.switchingButton.addEventListener(
      'click',
      () => {
        switchStorageManager();
        this.switchingButton.textContent = this.currentStorage;
        window.localStorage.setItem('storageAddress', JSON.stringify(this.currentStorage));
      }
    )
  }


  saveData(pageTitle, storage) {
    if (this.currentStorage === 'localStorage') {
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  addData(pageTitle, storage, data) {
    if (this.currentStorage === 'localStorage') {
      storage = [...storage, data];
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  deleteData (pageTitle, storage, data) {
    if (this.currentStorage === 'localStorage') {
      storage = storage.filter(item => item.id !== data.id);
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  getData(pageTitle) {
    let storage = [];
    if (this.currentStorage === 'localStorage') {
      storage = JSON.parse(window.localStorage.getItem(pageTitle));
    } else {
      console.log('localStorage inactive');
    }
    return storage;
  }

  // return {
  //   currentStorage: currentStorage,
  //   content,
  //   switchingButton,
  //   saveData,
  //   getData,
  //   addData,
  //   deleteData
  // }
}

const storageManager = new StorageManager();

const createStorageManager = () => {
  const content = document.createElement('div');
  content.classList.add('d-flex', 'justify-content-between', 'mb-3');
  const switchingButton = document.createElement('button');
  switchingButton.classList.add('btn', 'btn-primary');
  content.append(switchingButton);

  let currentStorage = 'localStorage';

  if (window.localStorage.getItem('storageAddress')) currentStorage = JSON.parse(window.localStorage.getItem('storageAddress'));
  else window.localStorage.setItem('storageAddress', JSON.stringify(currentStorage));

  switchingButton.textContent = currentStorage;

  const switchStorageManager = () => {
    if (currentStorage === 'localStorage') currentStorage = 'none';
    else currentStorage = 'localStorage';
  }

  switchingButton.addEventListener(
    'click',
    () => {
      switchStorageManager();
      switchingButton.textContent = currentStorage;
      window.localStorage.setItem('storageAddress', JSON.stringify(currentStorage));
    }
  )

  function saveData(pageTitle, storage) {
    if (currentStorage === 'localStorage') {
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  function addData(pageTitle, storage, data) {
    if (currentStorage === 'localStorage') {
      storage = [...storage, data];
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  function deleteData (pageTitle, storage, data) {
    if (currentStorage === 'localStorage') {
      storage = storage.filter(item => item.id !== data.id);
      window.localStorage.setItem(pageTitle, JSON.stringify(storage));
    } else {
      console.log('localStorage inactive');
    }
  }

  function getData(pageTitle) {
    let storage = [];
    if (currentStorage === 'localStorage') {
      storage = JSON.parse(window.localStorage.getItem(pageTitle));
    } else {
      console.log('localStorage inactive');
    }
    return storage;
  }

  return {
    content,
    switchingButton,
    saveData,
    getData,
    addData,
    deleteData
  }
}

const configTasksStorage = (taskAddButton, taskInput, tasksStorage) => {
  taskAddButton.addEventListener(
    'click',
    () => {
      tasksStorage.addNewTask({
        task: taskInput.value,
        done: false,
        id: Date.now().toString()
      });
      taskAddButton.disabled = true;
      taskInput.value = '';
    }
  )
}

// export { createStorageManager, configTasksStorage};
export { storageManager, configTasksStorage};

