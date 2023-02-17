import { useState } from 'react'

/* ========================================================================
                                ClickCounter
======================================================================== */

export const ClickCounter = () => {
  const [count, setCount] = useState(0)
  return (
    <button
      onClick={() => setCount((v) => v + 1)}
      className='btn btn-blue btn-sm'
    >
      Count: {count}
    </button>
  )
}
