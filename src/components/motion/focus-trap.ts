// Traps Tab/Shift+Tab focus inside a container while it is open — used by
// the mobile nav overlay so a keyboard user cannot tab out to content
// hidden behind it. Returns a cleanup function; call it when the overlay
// closes to release the trap.
export function trapFocus(container: HTMLElement): () => void {
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

  function getFocusableElements(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  const firstFocusable = getFocusableElements()[0]
  firstFocusable?.focus()

  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}
