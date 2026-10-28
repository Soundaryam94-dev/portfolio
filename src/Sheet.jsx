import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Shared left-side card used by the pin popups: dimmed backdrop, close button, Esc / click-outside to close.
export default function Sheet({ open, onClose, labelId, compact = false, children }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={`me-sheet${compact ? ' compact' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ opacity: 0, x: -32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -32, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <button ref={closeRef} className="sheet-close" onClick={onClose} aria-label="Close">×</button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
