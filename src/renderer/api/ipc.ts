// const {ipcRenderer} = window.electron;

const { ipcRenderer, store } = window.electron;
export const maxWindow = () => {
  ipcRenderer.send('maxWindow');
};

export const minWindow = () => {
  ipcRenderer.send('minWindow');
};

export const closeWindow = () => {
  ipcRenderer.send('closeWindow');
};

export const createLoginWindow = () => {
  ipcRenderer.send('createLoginWindow');
};

export const loginSuccess = (user: any) => {
  ipcRenderer.send('loginSuccess', user);
}

type createWindowOptions = {
  height: number;
  width: number;
  minHeight?: number;
  minWidth?: number;
  hash: string;
};

export const createNewWindow = (options: createWindowOptions) => {
  ipcRenderer.send('create-new-window', options);
  // console.log(options);
};

export const closeHashWindow = (hash: string) => {
  ipcRenderer.send('close-hash-window', hash);
};

export const nativeStore = {
  get: store.get,
  set: store.set,
}

