import { useEffect, useRef } from 'react';

/**
 * Keeps keyboard focus inside an open dialog and returns it to where it was on close.
 * Attach the returned ref to the dialog element, which needs tabIndex={-1}.
 */
export function useDialogFocus<T extends HTMLElement>(isOpen: boolean) {
  const dialogRef = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.contains(document.activeElement)) {
      dialog.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  return dialogRef;
}
