import React, { useCallback, useEffect, useRef, useState } from 'react';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import Reload from '../icons/Reload';
import useLocale from './useLocale';


declare global {
  interface Window  {
    electronApp: {
      onDownload: () => void;
      reloadWindow: () => void;
    }
  }
}

const ContextMenuHandler = () => {
  const ref = useRef<HTMLElement>(null)
  const [contextEvent, setContextEvent] = useState(null)
  useEffect(() => {

    const listener = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const element = e?.target as HTMLElement;
      const hasOwnContext = element?.classList.contains("has-own-context")
      const isInput = element?.tagName?.toLocaleLowerCase() === "input"
      if (!hasOwnContext && !isInput) {
        ref.current = element;
        setContextEvent(e);
      }
    }
    window.addEventListener("contextmenu", listener)
    return () => {
      window.removeEventListener("contextmenu", listener)
    }
  }, [])
  const onReloadHandle = useCallback(() => {
    window.location.reload()
  }, [])
  return (
    <>
      {contextEvent &&
        <ContextMenu
          customRoot="global-context-root"
          event={contextEvent as any}
          closeClickInside
          onClose={() => setContextEvent(null)}
          list={[
            {
              id: "1",
              title: useLocale("app.label.reload"),
              left: <Reload />,
              onClick: () => {
                onReloadHandle()
              },
            },
            {
              id: "2",
              title: useLocale("app.label.reload"),
              left: <Reload />,
              onClick: () => {
                onReloadHandle()
              },
            },
            {
              id: "3",
              title: useLocale("app.label.reload"),
              left: <Reload />,
              onClick: () => {
                onReloadHandle()
              },
            },
            {
              id: "4",
              title: useLocale("app.label.reload"),
              left: <Reload />,
              onClick: () => {
                onReloadHandle()
              },
            },
            {
              id: "5",
              title: useLocale("app.label.reload"),
              left: <Reload />,
              onClick: () => {
                onReloadHandle()
              },
            },
          ]}
        />
      }
    </>
  )
}

export default React.memo(ContextMenuHandler)