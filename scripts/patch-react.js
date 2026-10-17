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
// Using import * as to support both Rollup/Rolldown strict CJS interop, dev/prod NODE_ENV, and esbuild
const reactDevRuntimeMjs = path.resolve('node_modules/react/jsx-dev-runtime.mjs');
const devRuntimeMjsContent = `import * as dev from './cjs/react-jsx-dev-runtime.development.js';
import * as prod from './cjs/react-jsx-runtime.production.js';

export const Fragment = dev.Fragment || dev.default?.Fragment || prod.Fragment || prod.default?.Fragment || Symbol.for('react.fragment');
const rawDev = dev.jsxDEV || dev.default?.jsxDEV;
const rawProd = prod.jsx || prod.default?.jsx;
export const jsxDEV = rawDev || rawProd || function(type, config, maybeKey) {
  var key = null;
  if (maybeKey !== undefined) key = '' + maybeKey;
  if (config && config.key !== undefined) key = '' + config.key;
  var props = config ? Object.assign({}, config) : {};
  delete props.key;
  return {
    $$typeof: Symbol.for('react.transitional.element'),
    type: type,
    key: key,
    ref: config?.ref || null,
    props: props
  };
};
export default {
  Fragment,
  jsxDEV
};
`;
fs.writeFileSync(reactDevRuntimeMjs, devRuntimeMjsContent);
console.log('[patch-react] Created native ESM react/jsx-dev-runtime.mjs');

const reactRuntimeMjs = path.resolve('node_modules/react/jsx-runtime.mjs');
const runtimeMjsContent = `import * as prod from './cjs/react-jsx-runtime.production.js';

export const Fragment = prod.Fragment || prod.default?.Fragment || Symbol.for('react.fragment');
export const jsx = prod.jsx || prod.default?.jsx;
export const jsxs = prod.jsxs || prod.default?.jsxs || prod.jsx || prod.default?.jsx;
export default prod;
`;
fs.writeFileSync(reactRuntimeMjs, runtimeMjsContent);
console.log('[patch-react] Created native ESM react/jsx-runtime.mjs');

// 2b. Patch react/jsx-dev-runtime.js CJS fallback
const reactDevRuntimeCjs = path.resolve('node_modules/react/jsx-dev-runtime.js');
if (fs.existsSync(reactDevRuntimeCjs)) {
  let content = fs.readFileSync(reactDevRuntimeCjs, 'utf-8');
  if (!content.includes('fallback_jsx')) {
    content += `
// fallback_jsx
if (!exports.jsxDEV) {
  try {
    const prodRuntime = require('./cjs/react-jsx-runtime.production.js');
    exports.jsxDEV = prodRuntime.jsx;
  } catch (e) {}
}
`;
    fs.writeFileSync(reactDevRuntimeCjs, content);
    console.log('[patch-react] Added fallback to react/jsx-dev-runtime.js');
  }
}

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
