import { Fragment, useState } from 'react'
import { InputPhone } from 'components'

/* ========================================================================
                           InternationalPhoneDemo 
======================================================================== */

export const InternationalPhoneDemo = () => {
  const [phone, setPhone] = useState('+12065554433')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  /* ======================
        validatePhone
  ====================== */
  // The handleSubmit() uses the return string value, and passes no arg.
  // The onChange() and onBlur() use the phoneError state and pass the
  // new value directly as an arg in order to avoid a race condition.
  // phoneError state is also important for setting any possible validation
  // errors that come back from a server.

  const validatePhone = (value?: string) => {
    value = typeof value === 'string' ? value : phone

    if (typeof value === 'string' && value.trim() === '') {
      setPhoneError('A valid phone number is required.')
      return 'A valid phone number is required.'
    }
    setPhoneError('')
    return ''
  }

  /* ======================
        handleSubmit()
  ====================== */

  const handleSubmit = () => {
    const errors: string[] = []

    // Set true on all toucher functions.
    const touchers: Function[] = [setPhoneTouched]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    // Manually call all validation functions.
    // Conversely, one could have error state like
    // textError, messageError, passwordError, etc.
    // Each of these could be set in the corresponding validator,
    // then one could read all of the error state here.
    // This approach just seems easier.
    const validators: Function[] = [validatePhone]

    validators.forEach((validator) => {
      const error = validator()
      if (error) {
        errors.push(error)
      }
    })

    // Return early if errors
    if (errors.length >= 1) {
      console.log(
        'Returning early from handleSubmit() because of errors.',
        errors
      )
      return
    }

    // Otherwise run submission code...
    console.log('No errors!')

    // Simulate setting a validation error returned by the server
    // setTimeout(() => { setPhoneError('That number is dumb!') }, 2000)
  }

  /* ======================
          return
  ====================== */

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: '#fafafa',
          border: '1px solid #333',
          borderRadius: 15,
          margin: '0 auto 25px auto',
          maxWidth: 800,
          padding: 15
        }}
      >
        <InputPhone
          // countries={['US', 'CA']}
          defaultCountry='US'
          // disabled
          feedback={phoneError || 'Looks Good!'}
          formGroupClassName=''
          formGroupStyle={{ marginBottom: 15 }}
          inputClassName='form-control form-control-sm'
          inputStyle={{}}
          international
          isInvalid={phoneError ? true : false}
          isValid={phoneError ? false : true}
          label='Phone Number:'
          labelClassName='text-sm font-bold text-blue-500'
          labelRequired
          labelStyle={{}}
          onBlur={(
            value,
            countryCallingCode,
            countryCode,
            isCorrectLength,
            e
          ) => {
            console.log({
              value,
              countryCallingCode,
              countryCode,
              isCorrectLength,
              target: e.target
            })
            setPhoneTouched(true)
            validatePhone(value)
          }}
          onChange={(
            value,
            countryCallingCode,
            countryCode,
            isCorrectLength
          ) => {
            // Example values passed back to consuming environment:
            // {newValue: '+15554443322', countryCallingCode: '1', countryCode: 'US', isCorrectLength: true}
            console.log({
              value,
              countryCallingCode,
              countryCode,
              isCorrectLength
            })
            setPhone(value)
            // Only validate onChange() if the <input /> has been touched.
            // This necessitates that we also setTouched(true) in the onBlur()
            if (phoneTouched) {
              validatePhone(value)
            }
          }}
          placeholder='Phone Number...'
          touched={phoneTouched}
          value={phone}
        />

        <button
          className='block w-full bg-green-500 font-bold text-white text-sm rounded hover:bg-green-600'
          onClick={handleSubmit}
          style={{ minHeight: 31 }}
        >
          Submit
        </button>
      </div>
    </Fragment>
  )
}
