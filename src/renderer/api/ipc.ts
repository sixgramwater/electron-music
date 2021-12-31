// const {ipcRenderer} = window.electron;
// import { message } from 'antd';
const { ipcRenderer, db } = window.electron;
export const maxWindow = () => {
  ipcRenderer.send('maxWindow');
}

export const minWindow = () => {
  ipcRenderer.send('minWindow');
}

export const closeWindow = () => {
  ipcRenderer.send('closeWindow');
}

export const createLoginWindow = () => {
  ipcRenderer.send('createLoginWindow');
}

type createWindowOptions = {
  height: number;
  width: number;
  minHeight?: number;
  minWidth?: number;
  hash: string;
}

export const createNewWindow = (options: createWindowOptions) => {
  ipcRenderer.send('create-new-window', options);
  // console.log(options);
}

export const closeHashWindow = (hash: string) => {
  ipcRenderer.send('close-hash-window', hash);
}

type DownloadItemType = {
  paused: boolean,
  recievedBytes: number,
  savePath: string,
  startTime: number,
  state: 'progressing' | 'completed',
  totalBytes: number,
  url: string,
  id: number,
}

export const triggerDownload = (url: string) => {
  ipcRenderer.send('trigger-download', url);
}

export const createDownloadItem = (item: DownloadItemType) => {
  return db.create(item);
}

export const findDownloadItem = (id: number) => {
  return db.read(id);
}

export const findAllDownloadItems = () => {
  return db.readAll();
}

export const deleteDownloadItem = (id: number) => {
  return db.remove(id);
}

export const updateDownloadItem = (id: number, item: any) => {
  return db.update(id, item);
}

export const dbInstance = {
  createDownloadItem,
  findDownloadItem,
  findAllDownloadItems,
  deleteDownloadItem,
  updateDownloadItem,
}



