import React, { useState } from 'react'
import { InputTile } from './components/cards/InputTile'
import { DescriptionTile } from './components/cards/DescriptionTile'
import { PredictedTile } from './components/cards/PredictedTile'
import { getBirdInfo } from './lib/apiutils'
import { Bird } from './lib/birds'

function App() {
  const [selectedBird, setSelectedBird] = useState<Bird>({})
  const [predictedBirds, setPredictedBirds] = useState('')

  const handleSearch = async (desc: string) => {
    getBirdInfo().then((data) => {
      setSelectedBird(data)
      setPredictedBirds('big bird, small bird')
    })
  }

  return (
    <div className="mx-2 mt-6 flex flex-wrap transition-all">
      <div className="h-min w-full sm:w-2/6">
        <InputTile handleSearch={() => handleSearch('')}></InputTile>
      </div>
      <div className="h-20 w-full sm:w-4/6">
        <PredictedTile birds={predictedBirds}></PredictedTile>
      </div>
      <div className="h-72 w-full sm:w-4/6">
        <DescriptionTile
          name={selectedBird.name}
          desc={selectedBird.description}
        ></DescriptionTile>
      </div>
    </div>
  )
}

export default App
