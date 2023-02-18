import { useState } from 'react'
import { useTitle } from 'hooks'
import { InputPhone, HR, Title, Waves } from 'components'

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Demo')

  const [phoneValue, setPhoneValue] = useState('+12065554433')
  const [intPhoneValue, setIntPhoneValue] = useState('+12065554433')

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
        Demo
      </Title>

      <HR style={{ marginBottom: 50 }} />

      <InputPhone
        label='Phone Number:'
        labelClassName='text-sm font-bold text-blue-500'
        labelStyle={{}}
        labelRequired
        // disabled
        // Strategy to render number with incorrect raw value. Has precedence over formatRawValue
        // enableFallbackInput
        // Other strategy to render number with incorrect raw value.
        // formatRawValue
        defaultCountry='US'
        formGroupStyle={{ marginBottom: 25, maxWidth: 800 }}
        formGroupClassName='mx-auto shadow-sm'
        inputClassName='form-control form-control-sm'
        inputStyle={{}}
        onChange={(
          newValue,
          countryCallingCode,
          countryCode,
          isCorrectLength
        ) => {
          // Example values passed back to consuming environment:
          // {newValue: '+15554443322', countryCallingCode: '1', countryCode: 'US', isCorrectLength: true}
          console.log({
            newValue,
            countryCallingCode,
            countryCode,
            isCorrectLength
          })
          setPhoneValue(newValue)
        }}
        placeholder='Phone Number...'
        value={phoneValue}
      />

      <InputPhone
        label='Phone Number:'
        labelClassName='text-sm font-bold text-blue-500'
        labelStyle={{}}
        labelRequired
        // disabled
        international
        // countries={['US', 'CA']}
        defaultCountry='US'
        formGroupStyle={{ marginBottom: 25, maxWidth: 800 }}
        formGroupClassName='mx-auto shadow-sm'
        inputClassName='form-control form-control-sm'
        inputStyle={{}}
        onChange={(
          newValue,
          countryCallingCode,
          countryCode,
          isCorrectLength
        ) => {
          // Example values passed back to consuming environment:
          // {newValue: '+15554443322', countryCallingCode: '1', countryCode: 'US', isCorrectLength: true}
          console.log({
            newValue,
            countryCallingCode,
            countryCode,
            isCorrectLength
          })
          setIntPhoneValue(newValue)
        }}
        value={intPhoneValue}
      />

      <section
        className='bg-white mx-auto p-4 border border-gray-100 rounded-xl text-sm'
        style={{ maxWidth: 800 }}
      >
        <p>
          <span className='font-bold text-blue-500'>Gotcha:</span> Suppose that{' '}
          <code>react-phone-number-input</code> is set to{' '}
          <code>{`international={false}`}</code>, and the country code is set to{' '}
          <code>'US'</code>. In that case, if the initial value (i.e., value on
          mount) lacks <code>'+1'</code>, then{' '}
          <code>react-phone-number-input</code> won't render the value. This is
          the default behavior of the library.
        </p>

        <p>
          This might occur in cases where the database previously stored the{' '}
          <em>raw value</em> in a different format, and we're now using{' '}
          <code>react-phone-number-input</code> on the client. However, if we're
          trying to render the initial value in an edit form,{' '}
          <em>it will not output</em>.
        </p>

        <p className='mx-10'>
          <span className='text-blue-500 font-bold'>
            Solution 1: <code>enableFallbackInput</code>:
          </span>{' '}
          The above component is called <code>InputPhone</code>, and is an
          abstraction of <code>react-phone-number-input</code>. By setting{' '}
          <code>enableFallbackInput</code> to <code>true</code> it allows{' '}
          <code>InputPhone</code> to fallback to a standard{' '}
          <code>{`<input type='tel' />`}</code>.
        </p>

        <p className='mx-10'>
          <span className='text-blue-500 font-bold'>
            Solution 2 <code>formatRawValue</code>:
          </span>{' '}
          By setting <code>formatRawValue</code> to <code>true</code>,{' '}
          <code>InputPhone</code> will observe the raw value, and add{' '}
          <code>'+'</code> or <code>'+1'</code> to it if it is lacking (when{' '}
          <code>'US'</code>/<code>!international</code>). The <code>'+1'</code>{' '}
          is never observable in the formatted UI, but will exist on the raw
          state value. <strong className='text-blue-500'>Note:</strong>{' '}
          <code>enableFallbackInput</code> has precedence over{' '}
          <code>formatRawValue</code>. Thus, if both are set to{' '}
          <code>true</code>, only <code>enableFallbackInput</code> will be
          implemented.
        </p>

        <p className='text-center'>---</p>

        <p>
          By default, with the international version the number will still
          appear in the UI (even if missing <code>'+'</code> and country), but
          it won't be formatted. Unfortunately, with international numbers
          there's just no way to know in advance what the country code is.
        </p>

        <p>
          That said, <code>react-phone-number-input</code> does attempt to infer
          the country code and formatting. Presumably, this is based both on the
          initial number (i.e., presumed country code) and the total length of
          the number.
        </p>

        <p>
          If <code>defaultCountry</code> is provided to the international
          version, it will only default to that country If the initial value is
          a partial or full match. For example, if we set{' '}
          <code>defaultCountry</code> to
          <code>'US'</code>, the initial value can be <code>''</code>,{' '}
          <code>'+'</code>, <code>'+1'</code>, <code>'+12'</code>, etc.
          Conversely, <code>'206'</code>, <code>'5'</code>, etc. won't work, and
          will instead just show the international option.
        </p>

        <p>
          Ultimately, it seems preferable to opt for something simpler. For
          example, a basic <code>{`<input type='tel />`}</code> that allows the
          user to enter whatever they want. Libraries like{' '}
          <code>react-phone-number-input</code> just seem like they have the
          potential to incorrectly alter the user's number. The other solution
          is to <em>always</em> use the international version.
        </p>
      </section>

      <Waves />
    </div>
  )
}

export default PageHome
