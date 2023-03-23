import { useEffect } from "react";

type AnyArgsFuncType = (...e: any) => void
interface ISystemEvents { [event: string]: Set<(...event: any) => void> }
const events: ISystemEvents = {};
export const addCustomEventListeners = (type: string, func: AnyArgsFuncType) => {
    if (!events[type]) events[type] = new Set();
    events[type].add(func)
    return () => {
        events[type].delete(func)
    }
}

export const dispatchCustomEvent = (type: string, data?: any) => {
    if (events[type] && events[type].size > 0) {
        events[type].forEach(async (func) => {
            try {
                func(data)
            } catch (err) {
                console.groupCollapsed(`DISPATCH ERROR: ${type}`)
                console.log(data)
                console.log(err)
                console.trace()
                console.groupEnd()
            }
        })
    }
}
export const useCustomEventListener = (type: string, callback: AnyArgsFuncType, deps: React.DependencyList = []) => {
    useEffect(() => {
        return addCustomEventListeners(type, callback)
    }, [...deps])
}