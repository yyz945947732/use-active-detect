import React from 'react';

import { useActiveDetect } from 'use-active-detect';

const App = () => {
  useActiveDetect({
    onActive: () => {
      console.log('active');
    },
  });
  return <div>welcome to useActiveDetect</div>;
};
export default App;
