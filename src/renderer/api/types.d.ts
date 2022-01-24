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
    electron: any;
  }
}
