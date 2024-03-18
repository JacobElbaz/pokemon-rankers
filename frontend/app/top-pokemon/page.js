import RankedList from '@/components/RankedList'
import React from 'react'

function TopPokemon() {
  return (
    <div style={{marginTop: '47px', display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{padding: '50px', textAlign: 'center'}}>Most Popular Pokémon</h1>
        <RankedList/>
    </div>
  )
}

export default TopPokemon