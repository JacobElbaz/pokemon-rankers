import RankedList from '@/components/RankedList'
import React from 'react'

function Ranking() {
  return (
    <div style={{marginTop: '47px', display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{padding: '50px', textAlign: 'center'}}>Pokémon Ranking</h1>
        <RankedList/>
    </div>
  )
}

export default Ranking