import { ipcRenderer, webFrame } from "electron";

ipcRenderer.invoke("_shelter_getBundle").then((bundle) => {
	webFrame.executeJavaScript(bundle);
});
