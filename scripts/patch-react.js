import fs from 'node:fs';
import path from 'node:path';

// 1. Patch react/index.js with SSR Event shims
const reactIndexPath = path.resolve('node_modules/react/index.js');
if (fs.existsSync(reactIndexPath)) {
  const content = fs.readFileSync(reactIndexPath, 'utf-8');
  if (!content.includes('DummyEvent')) {
    const patch = `
const dummyEvent = class DummyEvent {};
module.exports.TouchEvent = dummyEvent;
module.exports.MouseEvent = dummyEvent;
module.exports.PointerEvent = dummyEvent;
module.exports.KeyboardEvent = dummyEvent;
module.exports.FocusEvent = dummyEvent;
module.exports.ChangeEvent = dummyEvent;
module.exports.FormEvent = dummyEvent;
module.exports.SyntheticEvent = dummyEvent;
module.exports.AnimationEvent = dummyEvent;
module.exports.TransitionEvent = dummyEvent;
module.exports.UIEvent = dummyEvent;
module.exports.WheelEvent = dummyEvent;
module.exports.DragEvent = dummyEvent;
module.exports.ClipboardEvent = dummyEvent;
module.exports.CompositionEvent = dummyEvent;
`;
    fs.appendFileSync(reactIndexPath, patch);
    console.log('[patch-react] Applied SSR event shims to react/index.js');
  }
}

// 2. Create native ESM .mjs files for jsx-dev-runtime and jsx-runtime
// Using import * as to support both Rollup/Rolldown strict CJS interop and esbuild
const reactDevRuntimeMjs = path.resolve('node_modules/react/jsx-dev-runtime.mjs');
const devRuntimeMjsContent = `import * as dev from './cjs/react-jsx-dev-runtime.development.js';
export const Fragment = dev.Fragment;
export const jsxDEV = dev.jsxDEV;
export default dev;
`;
fs.writeFileSync(reactDevRuntimeMjs, devRuntimeMjsContent);
console.log('[patch-react] Created native ESM react/jsx-dev-runtime.mjs');

const reactRuntimeMjs = path.resolve('node_modules/react/jsx-runtime.mjs');
const runtimeMjsContent = `import * as prod from './cjs/react-jsx-runtime.production.js';
export const Fragment = prod.Fragment;
export const jsx = prod.jsx;
export const jsxs = prod.jsxs;
export default prod;
`;
fs.writeFileSync(reactRuntimeMjs, runtimeMjsContent);
console.log('[patch-react] Created native ESM react/jsx-runtime.mjs');

// 3. Patch react/package.json exports to point import condition to .mjs files
const reactPkgPath = path.resolve('node_modules/react/package.json');
if (fs.existsSync(reactPkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf-8'));
  let changed = false;
  if (pkg.exports?.['./jsx-dev-runtime'] && !pkg.exports['./jsx-dev-runtime'].import) {
    pkg.exports['./jsx-dev-runtime'] = {
      'react-server': './jsx-dev-runtime.react-server.js',
      'import': './jsx-dev-runtime.mjs',
      'default': './jsx-dev-runtime.js'
    };
    changed = true;
  }
  if (pkg.exports?.['./jsx-runtime'] && !pkg.exports['./jsx-runtime'].import) {
    pkg.exports['./jsx-runtime'] = {
      'react-server': './jsx-runtime.react-server.js',
      'import': './jsx-runtime.mjs',
      'default': './jsx-runtime.js'
    };
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(reactPkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('[patch-react] Updated react/package.json exports with .mjs import targets');
  }
}
