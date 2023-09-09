# use-active-detect

> hook for detecting when a user is active.

[![NPM](https://img.shields.io/npm/v/use-active-detect.svg)](https://www.npmjs.com/package/use-active-detect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-active-detect
```

## Usage

```tsx
import * as React from 'react';

import { useActiveDetect } from 'use-active-detect';

const Example = () => {
  useActiveDetect({
    onActive: () => {
      console.log('active');
    },
  });
  return <div>useActiveDetect</div>;
};
```

## License

MIT © [https://github.com/yyz945947732/use-active-detect](https://github.com/https://github.com/yyz945947732/use-active-detect/LICENSE)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
