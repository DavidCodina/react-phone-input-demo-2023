import { Dispatch, SetStateAction } from 'react'
import { useState, useEffect, useRef } from 'react'
import './index.css'

interface IOffCanvas {
  children: React.ReactNode
  className?: string
  disableBackdrop?: boolean
  disableBodyClick?: boolean
  disableScrollLock?: boolean
  placement?: 'start' | 'end' | 'top' | 'bottom'
  showMenu: boolean
  setShowMenu: Dispatch<SetStateAction<boolean>>
  style?: React.CSSProperties
  transitionDuration?: number
}

interface IOffCanvasCloseButton {
  className?: string
  onClose?: () => void
  style: React.CSSProperties
}

/* ========================================================================
                                OffCanvas
======================================================================== */

const OffCanvas = ({
  children,
  className = '', // Used primarily to extend OffCanvas through styled-components.
  disableBackdrop = false,
  disableBodyClick = false,
  disableScrollLock = false,
  placement = 'start',
  showMenu,
  setShowMenu,
  style = {},
  transitionDuration = 300 // Must be type number as ms
}: IOffCanvas) => {
  const offCanvasRef = useRef<HTMLDivElement | null>(null)
  const [offCanvasClassName, setOffCanvasClassName] = useState(
    `xx-offcanvas xx-offcanvas-${placement}${className ? ` ${className}` : ''}`
  )

  if (typeof transitionDuration !== 'number') {
    transitionDuration = 300
  }

  /* ======================
        useEffect()
  ====================== */
  // This useEffect() watches for changes to showMenu.
  // When showMenu changes, it sets offCanvasClassName accordingly.

  useEffect(() => {
    if (showMenu) {
      setOffCanvasClassName(
        `xx-offcanvas xx-offcanvas-${placement} xx-offcanvas-showing${
          className ? ` ${className}` : ''
        }`
      )
      setTimeout(() => {
        setOffCanvasClassName(
          `xx-offcanvas xx-offcanvas-${placement} xx-offcanvas-show${
            className ? ` ${className}` : ''
          }`
        )
      }, transitionDuration) // Corresponds to the CSS transition speed.
    } else {
      setOffCanvasClassName(
        `xx-offcanvas xx-offcanvas-${placement} xx-offcanvas-hiding${
          className ? ` ${className}` : ''
        }`
      )
      setTimeout(() => {
        setOffCanvasClassName(
          `xx-offcanvas xx-offcanvas-${placement}${
            className ? ` ${className}` : ''
          }`
        )
      }, transitionDuration) // Corresponds to the CSS transition speed.
    }
  }, [className, placement, showMenu, transitionDuration])

  /* ======================
        useEffect()
  ====================== */
  // This useEffect() handles the closing of the menu on body click.

  useEffect(() => {
    if (disableBodyClick) {
      return
    }

    const body = document.getElementsByTagName('body')[0]

    const handleBodyClick = (e: MouseEvent) => {
      // Return early if it's already closed or if no ref.
      if (!showMenu || offCanvasRef.current === null || e.target === null) {
        return
      }

      ////////////////////////////////////////////////////////////////////////////////
      //
      // Return early if user clicks on an element marked as data-xx-toggle='offcanvas'
      // The actual name of the data attribute could be exposed as a configurable prop...
      // e.currentTarget will always be <body>.
      // e.target will be whatever the user actually clicks on.
      //
      // https://css-tricks.com/slightly-careful-sub-elements-clickable-things/
      // It'possible that the element will be obscured by whatever is in front of it.
      // In other words, if there's child elements in a button, they will obscure the
      // actual button element. The simplest solution is to use something like:
      // .xx-custom-toggle-button * { pointer-events: none; }
      //
      // As an added precaution here we can also check for the parentElement and the
      // parentElement.parentElement for the data attribute. If your toggler has more nested elements
      // than that, it's advisable to add data-xx-toggle='offcanvas' those child elements.
      //
      ////////////////////////////////////////////////////////////////////////////////

      const target = e.target as HTMLElement
      if (
        target.getAttribute('data-xx-toggle') === 'offcanvas' ||
        target.parentElement!.getAttribute('data-xx-toggle') === 'offcanvas' ||
        target.parentElement!.parentElement!.getAttribute('data-xx-toggle') ===
          'offcanvas'
      ) {
        // console.log('Returning early because user clicked the toggler.')
        return
      }

      // Similar logic for OffCanvas menu.
      if (
        offCanvasRef.current === target ||
        //  (offCanvasRef as HTMLDivElement).contains
        offCanvasRef.current.contains(target /*as Node */)
      ) {
        // console.log('Returning early because user clicked the offcanvas menu.')
        return
      }

      // In all other cases close the menu.
      setShowMenu(false)
    }

    body.addEventListener('click', handleBodyClick)

    // Clean up...
    return () => {
      body.removeEventListener('click', handleBodyClick)
    }
  }, [disableBodyClick, offCanvasRef, setShowMenu, showMenu])

  /* ======================
        useEffect()
  ====================== */
  // This useEffect() handles the backdrop implementation.
  //# Update this to use a fade in animation like the Modal has.

  useEffect(() => {
    if (disableBackdrop) {
      return
    }

    const body = document.getElementsByTagName('body')[0]

    const removeBackdrop = () => {
      const backdrops = document.getElementsByClassName('xx-offcanvas-backdrop')

      for (let i = 0; i < backdrops.length; i++) {
        const backdrop = backdrops[i]
        //backdrop.remove()

        // xx-offcanvas-bg-darken

        backdrop.classList.remove('xx-offcanvas-bg-darken')
        backdrop.classList.add('xx-offcanvas-bg-lighten')

        setTimeout(() => {
          if (backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop)
          }
        }, 750)
      }
      body.style.overflow = ''
    }

    if (offCanvasRef.current === null) {
      removeBackdrop()
      return
    }

    if (showMenu) {
      const backdrop = document.createElement('div')
      // The className is just used as an identifier.
      // There is no CSS, SCSS, or styled component logic that uses it.
      backdrop.className = 'xx-offcanvas-backdrop xx-offcanvas-bg-darken'
      // The z-index below just needs to be lower than the SCOffCanvas, which is currently 1045.
      // https://stackoverflow.com/questions/3968593/how-can-i-set-multiple-css-styles-in-javascript
      backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        opacity: 0.5;
        z-index: 1040; 
      `

      if (offCanvasRef.current.parentElement) {
        offCanvasRef.current.parentElement.appendChild(backdrop)
      }

      // Prevent scrolling of the content area when the backdrop is active
      if (!disableScrollLock) {
        body.style.overflow = 'hidden'
      }
    }

    return () => {
      removeBackdrop()
    }
  }, [disableBackdrop, disableScrollLock, showMenu])

  /* ======================
          return
  ====================== */

  return (
    <div
      className={offCanvasClassName}
      ref={offCanvasRef}
      style={{
        ...style,
        transitionDuration: transitionDuration ? `${transitionDuration}ms` : ''
      }}
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

/* ========================================================================
                              OffCanvasButton
======================================================================== */

const OffCanvasCloseButton = ({
  onClose,
  style = {},
  className = ''
}: IOffCanvasCloseButton) => {
  return (
    <button
      className={`xx-offcanvas-close-button${className ? ` ${className}` : ''}`}
      onClick={() => {
        if (typeof onClose === 'function') {
          onClose()
        }
      }}
      style={style}
    ></button>
  )
}

OffCanvas.CloseButton = OffCanvasCloseButton
export { OffCanvas, OffCanvasCloseButton }
