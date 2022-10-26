import { serverPort } from "../api/constatns.cjs";
import { IFolder } from "./redux/store/FoldersStore";

class API {
  #uri: string;
  #inited: boolean;
  constructor() {
    this.#uri = document.location.href.replace(
      document.location.port,
      `${serverPort}`
    );
  }

  async getRequest (url: string) {
    const req = await fetch(`${this.#uri}${url}`)
    const body = await req.json();
    return body
  }

  initState(): Promise<IFolder[]> {
    return this.getRequest(`getFolders`);
  }

  addFolder(props: IFolder) {
    return this.getRequest(`addFolder?name=${props.name}&id=${props.id}`);
  }
}

export default API;
