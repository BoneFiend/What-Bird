import React, { useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { InputTile } from './components/cards/InputTile'
import { DescriptionTile } from './components/cards/DescriptionTile'
import { PredictedTile } from './components/cards/PredictedTile'
import { getPredictions } from './lib/apiutils'
import { GptPredictions } from './lib/birds'

function App() {
  // const [selectedBird, setSelectedBird] = useState<Bird>({})
  const [description, setDescription] = useState('')
  const [gptPredictions, setGptPredictions] = useState<GptPredictions>({})

  const handleSearch = async (description: string) => {
    getPredictions(description).then((data) => {
      setGptPredictions(data)
    })
  }

  const accordianItemClasses = {
    base: '!bg-slate-300',
    title: 'text-3xl font-bold',
    content: 'text-lg',
  }

  return (
    <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center transition-all">
      <Accordion
        variant="splitted"
        selectionMode="multiple"
        className="py-4"
        itemClasses={accordianItemClasses}
        defaultExpandedKeys={['1', '2', '3']}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Describe the Bird"
        >
          <InputTile
            description={description}
            setDescription={setDescription}
            handleSearch={handleSearch}
          />
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Predicted">
          <PredictedTile birds={gptPredictions.birds} />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Selected Bird">
          <DescriptionTile // name={selectedBird.name}
            desc={gptPredictions.summary}
          />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default App
