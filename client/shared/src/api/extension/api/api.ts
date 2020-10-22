import { ProxyMarked } from "comlink";

import { FlatExtensionHostAPI } from "../../contract";
import { InitData } from "../extensionHost";

import { ExtensionDocumentsAPI } from "./documents";
import { ExtensionExtensionsAPI } from "./extensions";
import { ExtensionWindowsAPI } from "./windows";

export type ExtensionHostAPIFactory = (initData: InitData) => ExtensionHostAPI;

export interface ExtensionHostAPI extends ProxyMarked, FlatExtensionHostAPI {
  ping(): "pong";

  documents: ExtensionDocumentsAPI;
  extensions: ExtensionExtensionsAPI;
  windows: ExtensionWindowsAPI;
}
