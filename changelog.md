## Changelogs List

## 0.0.6 - Altaev Nurzhan

### About

- Added authorization
- Backend was moved to repo [folders-backend](https://github.com/ksixen/folders-backend);
- Added custom global storage
### File Logs

### Added 
- src/hooks/CustomPortalRoot.tsx
- src/hooks/customEventListeners.tsx
- src/hooks/customState.tsx
- src/hooks/tokenManagement.ts
- src/Dialogs/LoginDialog/LoginDialog.module.scss
- src/Dialogs/LoginDialog/LoginDialog.tsx

### Deleted
- api/constatns.cjs
- api/index.cjs
- api/surreal.cjs
- api/socket/index.cjs

### Changed
- locales/en.json
- package.json
- public/index.html
- src/App.tsx
- src/CenterPanel/components/Header/Header.tsx
- src/Dialogs/index.ts
- src/LeftPanel/LeftPanel.module.scss
- src/LeftPanel/LeftPanel.tsx
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.tsx
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.tsx
- src/LeftPanel/components/LeftPanelItems/onContextMenu.tsx
- src/components/ContextMenu/ContextMenu.tsx
- src/fetch.ts
- src/fonts.scss
- src/hooks/ContextMenuHandler.tsx
- src/index.scss
- src/redux/store/FoldersStore.tsx
- src/socketClient.ts
- webpack.config.babel.ts
---
## 0.0.5 - Altaev Nurzhan

### About

- Added socket
- Added icons
### File Logs

### Changed 
- api/index.cjs
- src/App.tsx
- src/CenterPanel/CenterPanel.tsx
- src/CenterPanel/components/EmptyState/EmptyState.tsx
- src/CenterPanel/components/Header/Header.module.scss
- src/CenterPanel/components/Header/Header.tsx
- src/LeftPanel/LeftPanel.tsx
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.tsx
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.tsx
- src/LeftPanel/components/LeftPanelItems/onContextMenu.tsx
- src/components/ContextMenu/ContextItems.tsx
- src/components/ContextMenu/ContextMenu.module.scss
- src/components/ContextMenu/ContextMenu.tsx
- src/hooks/ContextMenuHandler.tsx
- src/redux/index.tsx
- src/redux/selectors/folders.tsx
- src/redux/socketEventListener.tsx
- src/redux/store/FolderItems.tsx
- src/redux/store/FoldersStore.tsx

### Added
- src/icons/Delete.tsx
- src/icons/Edit.tsx
- src/icons/Reload.tsx
---
## 0.0.4 - Altaev Nurzhan

### About

- Function to detete "folders"
- Added fonts, colors as variables
- Added icons
- Left Panel style changes
- Added request to remove folder
- Fix preventDefault in browsers
### File Logs

#### Added: 
- src/icons/Archive.tsx
- src/icons/Calendar.tsx
- src/icons/CalendarToday.tsx
- src/icons/More.tsx
- src/icons/Plus.tsx
- src/icons/RadioButton.tsx
- src/icons/RadioButtonSelected.tsx
- src/icons/Settings.tsx
- src/icons/Storage.tsx
- src/icons/index.ts
- src/components/Checkbox/Checkbox.scss
- src/components/Checkbox/Checkbox.tsx
- src/fonts.scss
#### Changed: 
- api/index.cjs
- api/surreal.cjs
- App.tsx
- LeftPanel/LeftPanel.module.scss
- LeftPanel/LeftPanel.tsx
- LeftPanelInput.module.scss
- LeftPanelInput.tsx
- LeftPanelItems.module.scss
- LeftPanelItems.tsx
- ContextItems.tsx
- ContextMenu.tsx
- fetch.ts
- hooks/ContextMenuHandler.tsx
- hooks/useLocale.tsx
- index.scss
- index.tsx
- redux/index.tsx
- redux/selectors/folders.tsx
- redux/store/FoldersStore.tsx
---
## 0.0.31 - Altaev Nurzhan

### About

- Fix ContextMenu positions
- Added custom Context Menu for page
- Small Left Panel style changes
---
### File Logs

#### Added: 
- src/hooks/ContextMenuHandler.tsx

- .eslintrc
- electron-starter.babel.ts
- locales/en.json
- package.json
- preload.babel.ts
- public/index.html
- src/App.tsx
- src/LeftPanel/LeftPanel.module.scss
- src/LeftPanel/LeftPanel.tsx
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.module.scss
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.tsx
- src/components/ContextMenu/ContextItems.tsx
- src/components/ContextMenu/ContextMenu.module.scss
- src/components/ContextMenu/ContextMenu.tsx
- src/hooks/useLocale.tsx
- src/index.tsx
- tsconfig.json
- webpack.config.babel.ts
---
## 0.0.3 - Altaev Nurzhan

### About

- Small Fixes for ContextMenu
- Remove folder from ContextMenu(currently only on localeDB)

### File Logs

#### Added:

- src/LeftPanel/components/LeftPanelItems/onContextMenu.tsx
- src/components/ContextMenu/ContextItems.tsx
- src/components/ContextMenu/ContextMenu.module.scss

#### Changed:

- api/index.cjs
- api/surreal.cjs
- electron-starter.babel.ts
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.module.scss
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.tsx
- src/components/ContextMenu/ContextMenu.scss
- src/components/ContextMenu/ContextMenu.tsx
- src/redux/store/FoldersStore.tsx
---
## 0.0.2 - Altaev Nurzhan

### About

- Added support for Locales
- Added simple ContextMenu for left panel
- Micro "restyilng"

### File Logs

#### Added:

- changelog.md
- locales/en.json
- public/main.css
- src/components/ContextMenu/ContextMenu.scss
- src/components/ContextMenu/ContextMenu.tsx
- src/hooks/useLocale.tsx

#### Changed:

- electron-starter.babel.ts
- package.json
- public/index.html
- src/App.tsx
- src/ConterPanel/ConterPanel.scss
- src/ConterPanel/components/EmptyState/EmptyState.tsx
- src/ConterPanel/components/Header/Header.module.scss
- src/LeftPanel/LeftPanel.module.scss
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.module.scss
- src/LeftPanel/components/LeftPanelInput/LeftPanelInput.tsx
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.module.scss
- src/LeftPanel/components/LeftPanelItems/LeftPanelItems.tsx
- tsconfig.json
---