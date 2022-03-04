// declare module 'my-config' {
//   global {
//     interface Window {
//       electron: any
//     }
//   }
// }

export interface IRendererAPI {
  loadPreferences: () => Promise<void>;
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void;
        on: (channel: string, func: Function) => void;
        once: (channel: string, func: Function) => void;
        send: (channel: string, data?: any) => void; 
      };
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      };
    }
  }
}
