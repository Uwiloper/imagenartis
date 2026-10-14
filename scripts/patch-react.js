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

// 2. Patch react/jsx-dev-runtime.js with explicit named exports for Rolldown/Vite
const reactDevRuntimePath = path.resolve('node_modules/react/jsx-dev-runtime.js');
if (fs.existsSync(reactDevRuntimePath)) {
  const devRuntimePatch = `'use strict';

const runtime = process.env.NODE_ENV === 'production'
  ? require('./cjs/react-jsx-dev-runtime.production.js')
  : require('./cjs/react-jsx-dev-runtime.development.js');

module.exports = runtime;
exports.Fragment = runtime.Fragment;
exports.jsxDEV = runtime.jsxDEV;
`;
  fs.writeFileSync(reactDevRuntimePath, devRuntimePatch);
  console.log('[patch-react] Applied explicit named exports to react/jsx-dev-runtime.js');
}

// 3. Patch react/jsx-runtime.js with explicit named exports for Rolldown/Vite
const reactRuntimePath = path.resolve('node_modules/react/jsx-runtime.js');
if (fs.existsSync(reactRuntimePath)) {
  const runtimePatch = `'use strict';

const runtime = process.env.NODE_ENV === 'production'
  ? require('./cjs/react-jsx-runtime.production.js')
  : require('./cjs/react-jsx-runtime.development.js');

module.exports = runtime;
exports.Fragment = runtime.Fragment;
exports.jsx = runtime.jsx;
exports.jsxs = runtime.jsxs;
`;
  fs.writeFileSync(reactRuntimePath, runtimePatch);
  console.log('[patch-react] Applied explicit named exports to react/jsx-runtime.js');
}
