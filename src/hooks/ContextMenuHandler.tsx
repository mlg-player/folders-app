import React, { useEffect, useRef, useState } from 'react';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import useLocale from './useLocale';
import {RefreshIcon} from '@fluentui/react-icons-mdl2'

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
      const element = e?.target as HTMLElement;
      const hasOwnContext = element?.classList.contains("has-own-context")
      const isInput = element?.tagName?.toLocaleLowerCase() === "input"
      if (!hasOwnContext && !isInput) {
        ref.current = element;
        setContextEvent(e);
      }
    }
    window.addEventListener("contextmenu", listener, {
      passive: true
    })
    return () => {
      window.removeEventListener("contextmenu", listener)
    }
  }, [])

  return (
    <>
      {contextEvent &&
        <ContextMenu
          customRoot="global-context-root"
          action={contextEvent as any}
          onClose={() => setContextEvent(null)}
          list={[
            {
              id: "1",
              title: useLocale("app.label.reload"),
              left: <RefreshIcon />,
              onClick: () => {
                window?.electronApp?.reloadWindow()
              },
            },
            {
              id: "2",
              title: useLocale("app.label.reload"),
              left: <RefreshIcon />,
              onClick: () => {
                window?.electronApp?.reloadWindow()
              },
            },
            {
              id: "3",
              title: useLocale("app.label.reload"),
              left: <RefreshIcon />,
              onClick: () => {
                window?.electronApp?.reloadWindow()
              },
            },
            {
              id: "4",
              title: useLocale("app.label.reload"),
              left: <RefreshIcon />,
              onClick: () => {
                window?.electronApp?.reloadWindow()
              },
            },
            {
              id: "5",
              title: useLocale("app.label.reload"),
              left: <RefreshIcon />,
              onClick: () => {
                window?.electronApp?.reloadWindow()
              },
            },
          ]}
        />
      }
    </>
  )
}

export default React.memo(ContextMenuHandler)