'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

const Mermaid = ({ chart }: { chart: string }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.run()
  }, [chart])

  return <div className="mermaid">{chart}</div>
}

export default Mermaid
