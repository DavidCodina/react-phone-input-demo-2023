import { useState } from 'react'
import { useTitle } from 'hooks'
import { HR, Title, Waves } from 'components'

/* ========================================================================
                              PageErrorDemo
======================================================================== */
//////////////////////////////////////////////////////////////////////////
//
// Test react-error-boundary synchronous:
//
//   let condition = false
//   condition = true
//   if (condition) {
//     throw Error('Error: A page in the app crashed!')
//   }
//
// Test react-error-boundary asynchronous:
// (needs: import { useErrorHandler } from 'react-error-boundary')
//
//   const handleError = useErrorHandler()
//   setTimeout(() => {
//     try {
//       throw new Error('Kaboom!')
//     } catch (err) {
//       handleError(err)
//     }
//   }, 3000)
//
// Test react-error-boundary rerender:
// In the async example above, we manually had to catch the error then set it using
// react-error-boundary's useErrorHandler. That said, react error boundary will
// trigger on rerender when something goes wrong (no  need to manually set anything).
// The point being that async code itself will not trigger an error boundary, but
// the potential results of an async API call would possibly trigger the error boundary
// once the data was set in state.
//
//   const [items, setItems] = useState<any>([])
//
//   <button
//     className='d-block mx-auto btn btn-success btn-sm fw-bold'
//     onClick={() => { setItems(undefined) }}
//   >
//     Break The Page!
//   </button>
//
//   {items.map(() => null)}
//
// Note: React error boundaries do not handle compilation time errors.
// For example, putting abc123 in your code (i.e. an undefined variable)
// Thus, an uncaught reference error will NEVER trigger react error boundary.
// Instead this triggers the webpack error overlay.
//
///////////////////////////////////////////////////////////////////////////

const PageErrorDemo = () => {
  useTitle('Error Demo')

  const [items, setItems] = useState<any>([])

  /* ======================
          return
  ====================== */

  return (
    <div
      // The parent is <div id='root'>, which has display: flex; flex-direction: column; min-height: 100vh;
      // 'flex-1' is used to make the page stretch vertically and fill up remaining space.
      // 'mx-auto' is used to center the container horizontally.
      // However, because the page element is a flex child, mx-auto may inadvertantly squish the content.
      // Conversely, 'mx-auto' can also cause content to bleed out of the bounds of the viewport.
      // To correct for this, we can use 'w-full'.
      // 'container' will overwrite 'w-full' when needed.
      className='2xl:container flex-1 mx-auto w-full p-6'
    >
      <Title
        style={{
          marginBottom: 50,
          textAlign: 'center'
        }}
      >
        Error Boundary Demo
      </Title>

      <HR style={{ marginBottom: 50 }} />

      <button
        className='btn btn-red btn-sm font-bold'
        onClick={() => {
          setItems(undefined)
        }}
        style={{ cursor: 'pointer', display: 'block', margin: '0 auto' }}
      >
        Break The Page!
      </button>

      {items.map(() => null)}

      <Waves />
    </div>
  )
}

export default PageErrorDemo
