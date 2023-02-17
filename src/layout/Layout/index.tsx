import { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { NavBarContainer, NavBar, OffCanvas, Navicon1 } from '../'
import PageError from 'pages/PageError'

/* ========================================================================
                                 Layout
======================================================================== */

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleError = (_error: any, _errorInfo: any) => {
    // This is where you'd call your logging service.
    // console.log('Error: ', error)
    // console.log('Error Info: ', errorInfo)
  }

  const handleReset = () => {
    // console.log('handleReset() was called.')
  }

  /* ======================
          return
  ====================== */

  return (
    <Fragment>
      {/* <NavBarContainer>
        <NavBar />
      </NavBarContainer> */}

      <Navicon1
        onClick={() => setShowMenu((v) => !v)}
        data-xx-toggle='offcanvas'
        iconClassName='text-blue-500'
        show={showMenu}
        style={{ position: 'absolute', top: 10, right: 10 }}
      />

      <OffCanvas
        // className='hover:bg-lime-500 text-white w-6/12 border-r-2 border-r-red-500'
        disableBodyClick={false}
        disableBackdrop={false}
        disableScrollLock={false}
        placement='start'
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        style={
          {
            // width: 'auto & height: 'auto' don't work so well. They end
            // up defaulting to maxWidth & maxHeight which are 100vw
            // and 100vh, respectively. Thus, don't use 'auto'
          }
        }
        transitionDuration={200}
      >
        {/* The  OffCanvas does not have a div.offcanvas-body. It doesn't 
        really need one, but we can add it here if we want. */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto'
          }}
        >
          {/* <OffCanvas.CloseButton
            onClose={() => setShowMenu(false)}
            style={{ display: 'block', margin: '5px 5px 0px auto' }}
          /> */}

          {/* https://heroicons.com/ */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='block w-8 h-8 cursor-pointer opacity-50 hover:opacity-100 hover:text-blue-500'
            onClick={() => setShowMenu(false)}
            role='button'
            tabIndex={0}
            style={{ margin: '5px 5px 0px auto' }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <div
                key={item}
                className='mb-4 mx-1 p-3 bg-stone-100 text-xs border border-black rounded-xl'
              >
                <h6>Section {item}:</h6>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{' '}
              </div>
            )
          })}
        </div>
      </OffCanvas>

      <ErrorBoundary
        FallbackComponent={PageError}
        onError={handleError}
        onReset={handleReset}
      >
        <Outlet />
      </ErrorBoundary>
    </Fragment>
  )
}

export { Layout }
