import './index.css'

/* ========================================================================
                                Navicon2
======================================================================== */

export const Navicon2 = ({ onClick }: any) => {
  return (
    <button
      id='custom-toggler'
      className='navbar-toggler custom-toggler'
      type='button'
      onClick={onClick}
    >
      <span className='navbar-toggler-icon'></span>
    </button>
  )
}
