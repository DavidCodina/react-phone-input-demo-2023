import { Fragment, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './'

const PageHome = lazy(() => import('pages/PageHome'))
const PageAbout = lazy(() => import('pages/PageAbout'))
const PageErrorDemo = lazy(() => import('pages/PageErrorDemo'))
const PageNotFound = lazy(() => import('pages/PageNotFound'))

/* ========================================================================
                                  Router
======================================================================== */

const Router = () => {
  return (
    <Suspense fallback={<Fragment />}>
      <Routes>
        <Route
          path='/outlier'
          element={
            <div>
              <h1 className='text-primary fw-bold text-center py-5'>Outlier</h1>
              <p className='text-center'>
                This content exists outside of the main <code>Layout</code>.
              </p>
            </div>
          }
        />
        {/* https://www.robinwieruch.de/react-router/ */}
        <Route element={<Layout />}>
          <Route path='/' element={<PageHome />} />
          <Route path='/about' element={<PageAbout />} />
          <Route path='/error-demo' element={<PageErrorDemo />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export { Router }
