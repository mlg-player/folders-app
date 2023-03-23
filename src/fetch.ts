import { getGlobalStorage, useGlobalDispatcher } from "./hooks/customState";
import { deleteToken } from "./hooks/tokenManagement";
import { IFolder } from "./redux/store/FoldersStore";

class API {
    #uri: string;
    constructor() {
        this.#uri =
            document.location.port?.length > 0
                ? "http://localhost:3000/"
                : `https://r18.ksixen.xyz`;
    }

    async getRequest(
        url: string,
        body?: object,
        method?: RequestInit["method"]
    ) {
        const req = await fetch(`${this.#uri}${url}`, {
            method: method ?? "GET",
            body: JSON.stringify(body),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (req.status === 401) {
            useGlobalDispatcher((state) => ({ ...state, logged: false }));
            deleteToken("token", "/", "localhost");
        } else {
        }
        if (req.ok === false) {
            return undefined;
        } else {
            const body = await req.json();
            return body;
        }
    }

    initState(): Promise<IFolder[]> {
        return this.getRequest(`getFolders`);
    }

    addFolder(props: IFolder) {
        return this.getRequest(
            `addFolder`,
            props,
            "POST"
        );
    }

    deleteFolder(id: string) {
        return this.getRequest(`folder`, { id: id }, "DELETE");
    }

    register(obj: { login: string; password: string, name: string }) {
        return this.getRequest(`register`, obj, "POST");
    }
    login(obj: { login: string; password: string }) {
        return this.getRequest(`login`, obj, "POST");
    }
}

export default API;
