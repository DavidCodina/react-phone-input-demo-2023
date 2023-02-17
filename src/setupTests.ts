// https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/src/test/setup.ts
// The actual vitest example ONLY does this, and it works.
// What Robin Wieruch does in his tutorial also works, but is unnecessary.
import '@testing-library/jest-dom'

// The The Robin Wieruch tutorial does this
// import { expect, afterEach  } from 'vitest'
// import { cleanup } from '@testing-library/react'
// import matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
// expect.extend(matchers)

///////////////////////////////////////////////////////////////////////////
//
// The Robin Wieruch tutorial: https://www.robinwieruch.de/vitest-react-testing-library/
// adds in the logic for running a cleanup function after each test  (e.g. clearing jsdom).
// However, KCD lists this as a common mistake:
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-cleanup
// "For a long time now cleanup happens automatically (supported for most major testing frameworks)
// and you no longer need to worry about it."
//
// Moreover, the official example in vitest docs doesn't do this.
// For now, I'm omitting this.
//
///////////////////////////////////////////////////////////////////////////
// afterEach(() => { cleanup() })
