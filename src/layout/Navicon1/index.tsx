import './index.css'

/* ========================================================================
                                Navicon1
======================================================================== */

export const Navicon1 = ({
  className = '',
  style = {},
  iconClassName = '',
  iconStyle = {},
  show,
  onClick,
  ...otherProps
}: any) => {
  /* ======================
      getButtonClasses()
  ====================== */

  const getButtonClasses = () => {
    let classes = 'btn hamburger-container hamburger-squeeze select-none'

    if (show) {
      classes = `${classes} active`
    }

    if (className) {
      classes = `${classes} ${className}`
    }

    return classes
  }

  /* ======================
          return
  ====================== */
  return (
    <button
      onClick={onClick}
      className={getButtonClasses()}
      style={style}
      {...otherProps}
    >
      <div
        className={`hamburger-inner${iconClassName ? ` ${iconClassName}` : ''}`}
        style={iconStyle}
      ></div>
    </button>
  )
}
