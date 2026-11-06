// Search shortcut as shown to the user: Command on Apple devices, Ctrl everywhere else.
export const SEARCH_SHORTCUT_LABEL = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';
