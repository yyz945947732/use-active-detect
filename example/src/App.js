import React from 'react'

import { useMyHook } from 'use-active-detect'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
