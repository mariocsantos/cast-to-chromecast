import { IpcRenderer } from 'electron';
import { any } from 'prop-types';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'google-cast-launcher': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
