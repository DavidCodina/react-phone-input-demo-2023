// Third-party imports
import React, { useState } from 'react'
// https://gitlab.com/catamphetamine/react-phone-number-input
// https://catamphetamine.gitlab.io/react-phone-number-input/
// https://catamphetamine.gitlab.io/react-phone-number-input/docs/index.html#phoneinputwithcountry
// https://github.com/catamphetamine/react-phone-number-input
// Props: https://catamphetamine.gitlab.io/react-phone-number-input/docs/index.html#phoneinputwithcountry
import PhoneInput from 'react-phone-number-input/input'
import PhoneInputInternational, {
  getCountryCallingCode,
  isPossiblePhoneNumber
} from 'react-phone-number-input'

// Custom imports
import { IInputPhone, E164Number, CountryCode } from './types'
import './style.css'

/* ======================
    InputComponent
====================== */
// A custom component passed as inputComponen={InputComponent}.
// This allows us to pass in inputStyle and inputClassName props
// when using the international version.

const InputComponent = React.forwardRef((props: any, ref: any) => {
  const {
    className = '',
    inputStyle = {},
    inputClassName = '',
    ...otherProps
  } = props

  return (
    <input
      {...otherProps}
      className={`${className}${inputClassName ? ` ${inputClassName}` : ''}`}
      ref={ref}
      style={inputStyle}
    />
  )
})

/* =============================================================================
                                InputPhone
============================================================================= */

const InputPhone = ({
  label = '',
  labelClassName = '',
  labelStyle = {},
  labelRequired = false,
  countries,
  defaultCountry = '',
  disabled = false,
  formGroupClassName = '',
  formGroupStyle = {},
  inputStyle = {},
  inputClassName = '', // 'form-control form-control-sm',
  international = false,
  onChange,
  placeholder = '',
  value = ''
}: IInputPhone) => {
  const country: CountryCode | '' = 'US'

  const [countryCode, setCountryCode] = useState<CountryCode | ''>(() => {
    if (international) {
      return defaultCountry || ''
    }
    return country || ''
  })

  /* ======================
      Format Raw Value
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // Gotcha: By default when react-phone-number-input is !international AND
  // the country code is set to 'US', IF the initial value lacks '+1' at first,
  // then it won't render the value.
  //
  // This might occur in cases where the database previously stored the
  // phone number in a different format, and we're now using
  // react-phone-number-input on the client. However, if we're trying
  // to render the initial value in an edit form, it will not output.
  //
  // What we need is for InputPhone to observe the [raw] value, and add
  // '+' or '+1' to it if it is lacking.
  //
  // Conversely, with the international version the number will still
  // appear in the UI (even if missing '+' and country), but it won't be
  // formatted. Unfortunately, with international numbers there's just no
  // way to know in advance what the country code is.
  //
  // That said, with the international version react-phone-number-input will
  // attempt to infer the country. Presumably, this is based both on the initial
  // number (i.e., presumed country code) and the total length of the number.
  //
  // If defaultCountry is provided, it will only default to that country
  // If the initial value is a partial or full match. For example, if we
  // set defaultCountry to 'US', the initial value can be '', '+', '+1',
  // '+12', etc. Conversely, '206', '5', etc. won't work, and will instead
  // just show the international option.
  //
  // The following block attempts to mitigate the non-rendering issue by
  // correcting for a possible lack of '+' or '+1'. One could argue that
  // this is potentially dangerous because what if the user does not
  // actually have a 'US' number. In that case we'd run into problems either
  // way because we're already using the 'US' countryCode, whih means
  // react-phone-number-input is already prepending '+1' to the raw value.
  //
  // Ultimately, I think it's preferable to opt for something simpler.
  // For example, a basic <input type='tel /> that allows the user to enter
  // whatever they want. Libraries like react-phone-number-input
  // just seem like they have the potential to incorrectly alter the number.
  // The other solution is to ALWAYS use the international version.
  //
  ///////////////////////////////////////////////////////////////////////////

  if (
    !international &&
    countryCode === 'US' &&
    typeof value === 'string' &&
    value.length > 0
  ) {
    if (value.startsWith('1')) {
      value = `+${value}`
    } else if (!value.startsWith('+1')) {
      value = `+1${value}`
    }
  }

  /* ======================
        handleChange()
  ====================== */

  const handleChange = (value: E164Number) => {
    if (typeof value === 'undefined') {
      value = ''
    }

    let countryCallingCode = ''
    if (countryCode) {
      countryCallingCode = getCountryCallingCode(countryCode)
    }

    const isCorrectLength = isPossiblePhoneNumber(value) // e.g., GB: 01782 849062 would be correct.
    if (typeof onChange === 'function') {
      onChange(value, countryCallingCode, countryCode, isCorrectLength)
    }
  }

  /* ======================
        renderLabel()
  ====================== */

  const renderLabel = () => {
    if (label) {
      return (
        <label className={labelClassName} style={labelStyle}>
          {label}
          {labelRequired && (
            <sup
              style={{
                color: '	#FF355E'
              }}
            >
              {' '}
              *
            </sup>
          )}
        </label>
      )
    }

    return null
  }

  /* ======================
       renderInput()
  ====================== */

  const renderInput = () => {
    if (international) {
      return (
        <PhoneInputInternational
          countries={countries} //If specified, only these countries will be available for selection.
          // By default, an initial value of '+12065554433' or typing '+12065554433'
          // will render as: '+1 206 555 4433'. Setting initialValueFormat='national'
          // will attempt to format it to: (206) 555-4433.
          // None of this affects the raw value. Moreover, if react-phone-number input
          // infers that the raw value is not consistent with the national number format, then
          // the formatting will be skipped.
          initialValueFormat='national'
          // react-phone-number-input looks like garbage when international + disabled.
          // Internally, the flags are removed and the <select> looks real bad.
          // In order to fix this, it's better to just hide that group.
          className={disabled ? 'hide-country-select' : ''}
          // style={{}}
          ///////////////////////////////////////////////////////////////////////////
          //
          // Unfortunately,  with react-phone-number-input's international version
          // one can't pass a className/style directly to the internal input.
          // Instead both props get applied to the top-level container.
          //
          // What IS provided is the option to pass a customInput.
          // The problem, however, is that the customInput prop's InputComponent
          // needs to be defined OUTSIDE of the component, and passed in as
          // inputComponent={InputComponent}. The actual component needs to be
          // implemented with forwardRef.
          //
          //   const InputComponent = React.forwardRef((props: any, ref: any) => {
          //     const { className = '', inputClassName = '', inputStyle = {}, ...otherProps } = props
          //     return (
          //       <input
          //         {...otherProps}
          //         className={`${className}${inputClassName ? ` ${inputClassName}` : ''}`}
          //         ref={ref}
          //         style={inputStyle}
          //       />
          //     )
          //   })
          //
          // The above implementation represents the final solution. However, initially I
          // had a problem. How do we merge props that are passed in from
          // InputPhone? Initially, I tried to use React.cloneElement(), but strugged with that.
          //
          // It turns out that you can pass additional props into PhoneInputInternational,
          // and it will pass them on to the <input /> :
          // https://stackoverflow.com/questions/73481687/is-there-any-way-to-pass-props-to-textfield-in-react-phone-number-input-library
          //
          ///////////////////////////////////////////////////////////////////////////

          inputComponent={InputComponent}
          // These props are custom and will be passed into the InputComponent.
          // Internally, InputComponent destructures them from props and passes
          // them as the value to the associated className and style. Otherwise,
          // it would result in a React error.
          inputStyle={inputStyle}
          inputClassName={inputClassName}
          placeholder={placeholder}
          autoComplete='off'
          defaultCountry={defaultCountry || undefined}
          disabled={disabled}
          // onChange() is actually also called when the user selects a country.
          // However, it fires BEFORE setCountryCode(country) is able to complete
          // in the onCountryChange() below. This means the countryCallingCode and
          // countryCode values below will still be empty strings at this point.
          onCountryChange={(country: CountryCode) => {
            setCountryCode(country)
          }}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            // Prevent user from pasting until they select a country.
            // Otherwise, if the defaultCountry prop is set, then
            // they will also be able to paste.
            if (!countryCode) {
              e.preventDefault()
            }
          }}
          onChange={handleChange}
          value={value}
        />
      )
    }

    // Otherwise return the normal input
    return (
      <PhoneInput
        autoComplete='off'
        className={inputClassName}
        // country: string? — If country is specified then the phone number can only be input in
        // "national" (not "international") format, and will be parsed as a phone number belonging to the country.
        // Must be a supported country code. Example: country="US".
        country={country}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        style={inputStyle}
        // No need to set type='tel'
        value={value}
      />
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <div style={formGroupStyle} className={formGroupClassName}>
      {renderLabel()}
      {renderInput()}
    </div>
  )
}

export { InputPhone }
