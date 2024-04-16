import React, { useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { InputTile } from './components/cards/InputTile'
import { DescriptionTile } from './components/cards/DescriptionTile'
import { PredictedTile } from './components/cards/PredictedTile'
import { Navbar } from './components/navbar/Navbar'
import { InfoModal } from './components/modals/InfoModal'
import {
  fetchPredictions,
  fetchTestPredictions,
  fetchTaxonomy,
} from './lib/apiutils'
import { GptPredictions, updateBirdTaxonomy, defaultBird } from './lib/birds'

function App() {
  const debuggingMode = false

  const [selectedBird, setSelectedBird] = useState(-1)
  const [description, setDescription] = useState('')
  const [lastDescription, setLastDescription] = useState('')
  const [gptPredictions, setGptPredictions] = useState<GptPredictions>({
    birds: [],
  })
  const [gptLoading, setGptLoading] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const handleSearch = async (description: string) => {
    // Gets predictions from GPT and puts saves them to gptPredictions
    setGptLoading(true)
    setLastDescription(description)
    if (debuggingMode) {
      fetchTestPredictions().then((data) => {
        setGptPredictions(data)
        setGptLoading(false)
      })
    } else {
      fetchPredictions(description).then((data) => {
        setGptPredictions(data)
        setGptLoading(false)
      })
    }
  }

  const handleGetTaxonomy = async (i: number) => {
    // Fetches the taxonomic data the updates the bird's taxonomy
    // TODO this sometimes can't find the right bird. perhaps a better prompt
    // or another json property would help
    if (!gptPredictions.birds[i].tax) {
      fetchTaxonomy(gptPredictions.birds[i].name).then((taxonomy) => {
        setGptPredictions(updateBirdTaxonomy(gptPredictions, i, taxonomy))
      })
    }
  }

  const accordianItemClasses = {
    base: '!bg-slate-300',
    title: 'text-3xl font-bold',
    content: 'text-lg',
  }

  return (
    // TODO redo sizing
    <div className="mx-auto flex h-1/2 max-w-5xl flex-col">
      <Navbar setIsInfoModalOpen={setIsInfoModalOpen} />
      <div className="flex flex-col items-center justify-center transition-all">
        <Accordion
          variant="splitted"
          selectionMode="multiple"
          className="pb-4"
          itemClasses={accordianItemClasses}
          defaultExpandedKeys={['1', '2']}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Describe the Bird"
          >
            <InputTile
              description={description}
              setDescription={setDescription}
              lastDescription={lastDescription}
              handleSearch={handleSearch}
              isLoading={gptLoading}
            />
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Predictions">
            <PredictedTile
              birds={gptPredictions.birds}
              setSelectedBird={setSelectedBird}
              handleGetTaxonomy={handleGetTaxonomy}
              isLoading={gptLoading}
            />
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title={gptPredictions.birds[selectedBird]?.name ?? 'Select a bird'}
          >
            <DescriptionTile
              bird={gptPredictions.birds[selectedBird] ?? defaultBird}
            />
          </AccordionItem>
        </Accordion>
      </div>
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => {
          setIsInfoModalOpen(false)
        }}
      />
    </div>
  )
}

export default App
