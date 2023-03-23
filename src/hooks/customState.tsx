import _ from "lodash";
import { useCallback, useSyncExternalStore } from "react";

type globalStorage = {
    logged: boolean;
};
const listeners = new Set<() => void>();
const emitChanges = () => {
    for (let item of listeners.values()) {
        try {
            item();
        } catch (e) {
            console.log(e);
        }
    }
};
const storage: {
    state: globalStorage;
    getState: () => globalStorage;
    setState: (
        newValue: (e: globalStorage) => globalStorage | globalStorage
    ) => Promise<void>;
    [field: string]: any;
} = {
    state: {
        logged: true,
    },
    emitAll() {
        emitChanges();
    },
    getState: function () {
        return storage.state;
    },
    subscribe: function (listener: any) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
    setState: async function (
        newValue: (e: globalStorage) => globalStorage | globalStorage
    ) {
        if (_.isFunction(newValue)) {
            try {
                storage.state = newValue(storage.state);
                emitChanges();
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                if (newValue !== storage.state) {
                    storage.state = newValue;
                    emitChanges();
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
};
const useGlobalSelector = () => {
    const contacts = useSyncExternalStore(
        storage.subscribe,
        useCallback(() => storage.getState(), [])
    );
    return contacts;
};
export const getGlobalStorage = () => storage.getState()
export const useGlobalDispatcher = (
    callback?: (store: globalStorage) => globalStorage
) => {
    storage.setState((storage) => callback(storage));
};
export const useGlobalStorage: () => [
    globalStorage,
    typeof useGlobalDispatcher
] = () => [useGlobalSelector(), useGlobalDispatcher];
