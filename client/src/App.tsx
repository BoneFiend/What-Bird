import React, { useState } from 'react'
import { InputTile } from './components/cards/InputTile'
import { DescriptionTile } from './components/cards/DescriptionTile'
import { PredictedTile } from './components/cards/PredictedTile'
import { getPredictions } from './lib/apiutils'
import { GptPredictions } from './lib/birds'

function App() {
  // const [selectedBird, setSelectedBird] = useState<Bird>({})
  const [gptPredictions, setGptPredictions] = useState<GptPredictions>({})

  const handleSearch = async (description: string) => {
    getPredictions(description).then((data) => {
      setGptPredictions(data)
    })
  }

  return (
    <div className="mx-2 mt-6 flex flex-wrap transition-all">
      <div className="h-min w-full sm:w-2/6">
        <InputTile handleSearch={handleSearch}></InputTile>
      </div>

      <div className="h-14 w-full sm:w-4/6">
        <DescriptionTile
          // name={selectedBird.name}
          desc={gptPredictions.summary}
        ></DescriptionTile>
      </div>
      <div className="h-20 w-full sm:w-4/6">
        <PredictedTile birds={gptPredictions.birds}></PredictedTile>
      </div>
    </div>
  )
}

export default App
