///////////////////////////////////////////////////////////////////////////
//
// https://vitest.dev/guide/coverage.html#coverage-providers
//When using vitest, it seems you need to also use
//
//   import { defineConfig } from 'vitest/config'
//
// instead of:
//
//  import { defineConfig } from 'vite'
//
// Otherwise, the 'test' property seems not to be recognized.
// Web Dev Simplified video at 7:05: https://www.youtube.com/watch?v=7f-71kYhK00
// statest that vitest adds additional config operations/properties on top of
// a normal vite project.
//
// That said, by default c8 will be used, and in that case we don't actually
// need to swtiched to 'vitest.config'
//
///////////////////////////////////////////////////////////////////////////
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

///////////////////////////////////////////////////////////////////////////
//
// In order to get absolute paths working, I did this in tsconfig.json: "baseUrl": "src",
// I also installed vite-tsconfig-paths and implemented the plugin here.
// The absolute paths setup that I'm using allows us to do this kind of thing:
// import { Title } from 'components'
// I'm not interested in the '@/components' path alias syntax.
// In any case, there's different approaches. What helped the most was just looking
// at the vite-tsconfig-paths docs:
//
//   https://www.npmjs.com/package/vite-tsconfig-paths
//   https://stackoverflow.com/questions/68241263/absolute-path-not-working-in-vite-project-react-ts
//   https://dev.to/avxkim/setup-path-aliases-w-react-vite-ts-poa
//
///////////////////////////////////////////////////////////////////////////

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-phone-input-demo-2023/',
  plugins: [react(), tsconfigPaths()],
  test: {
    // https://vitest.dev/config/ :  Allows global access to describe(), test(), it(), etc.
    // The docs indicate to also add this to tsconfig.json  "compilerOptions": { "types": ["vitest/globals"] }
    // However, that seems problematic because of the way types work. If you define
    // it explicitly, it will ONLY include those items included in types, rather than
    // everything in node_modules/@types. For example, specifying the above type will cause
    // the following error: Property 'toHaveTextContent' does not exist on type 'Assertion<HTMLElement>'.
    // Conversely, removing  "types": ["vitest/globals"] doesn't seem to cause any issues, so
    // for now I'm NOT doing that step. Alternatively, we'd have to look at our node_modules/@types and
    // manually add in every singe thing.
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true // https://vitest.dev/config/#css
    // coverage: { provider: 'c8' // No need for this if using 'c8'
  }
})
