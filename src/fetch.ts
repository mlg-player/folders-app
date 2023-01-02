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

  async getRequest (url: string, method?: string) {
    const req = await fetch(`${this.#uri}${url}`, {
      method: method ?? "GET"
    })
    const body = await req.json();
    return body
  }

  initState(): Promise<IFolder[]> {
    return this.getRequest(`getFolders`);
  }

  addFolder(props: IFolder) {
    return this.getRequest(`addFolder?name=${props.name}&id=${props.id}`);
  }

  deleteFolder(id: string) {
    return this.getRequest(`folder?id=${id}`, 'DELETE')
  }
}

export default API;
