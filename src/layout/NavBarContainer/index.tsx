import { useEffect, useState, useRef } from 'react'
import { SCNavBarContainer } from './styles'

/* ======================
      throttle()
====================== */
// https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/

const throttle = (cb: any, delay = 1000) => {
  let shouldWait = false
  let waitingArgs: any

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

/* =============================================================================
                                NavBarContainer
============================================================================= */
// Technically, this should be named TransitionOnScrollContainer, but
// that's a bit too verbose.

const NavBarContainer = ({ children }: any) => {
  const navBarContainerRef = useRef<HTMLElement | null>(null)
  const [className, setClassName] = useState('')

  /* ======================
        useEffect()
  ====================== */
  // On mount, programatically set the paddingTop of the parentElement to account
  // for the NavBarContainer obscuring content due to being position:fixed.

  useEffect(() => {
    const navBarContainer = navBarContainerRef.current
    if (navBarContainer === null) {
      return
    }
    const navBarContainerHeight = navBarContainer.offsetHeight
    // It will never be null, so we can safely use the non-null assertion operator.
    const navBarContainerParent = navBarContainer.parentElement!
    navBarContainerParent.style.paddingTop = `${navBarContainerHeight}px`
  }, [])

  /* ======================
        useEffect()
  ====================== */
  // Set up a scroll listener to move NavBar off canvas when scrolling down,
  // and back on canvas when scrolling up

  useEffect(() => {
    const navBarContainer = navBarContainerRef.current

    if (navBarContainer === null) {
      return
    }

    const nav = navBarContainer.firstElementChild as HTMLElement

    if (!nav) {
      return
    }

    let previousWindowScrollY = 0
    // Why delta? It's a fancy mathematical synonym for 'difference'. We
    // could also just call this offset. Essentially, it represents how close
    // or far away from top the scroll must be before triggering the effect.
    let delta = 5
    const navbarHeight = nav.offsetHeight

    const handleScroll = () => {
      const windowScrollY = window.scrollY
      const windowHeight = window.innerHeight

      // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
      // https://developer.mozilla.org/en-US/docs/Web/API/document/documentElement
      // documentElement may not be usable in IE11...
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )

      // Make sure that user scrolls more than delta
      if (Math.abs(previousWindowScrollY - windowScrollY) <= delta) {
        return
      }

      if (
        windowScrollY > previousWindowScrollY &&
        windowScrollY > navbarHeight
      ) {
        setClassName('ms-hide-nav')
      } else {
        if (windowScrollY + windowHeight < documentHeight) {
          setClassName('')
        }
      }

      previousWindowScrollY = windowScrollY
    }

    const throttledHandleScroll = throttle(() => {
      handleScroll()
    }, 100)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <SCNavBarContainer className={className} ref={navBarContainerRef}>
      {children}
    </SCNavBarContainer>
  )
}

export { NavBarContainer }
