import { Bird, defaultBirds, confidenceChipStyles } from '../../lib/birds'
import { RadioGroup, Radio, Chip } from '@nextui-org/react'
import loadingBird from '../../assets/LOADING-BIRD-CROPPED.gif'

type Props = {
  birds?: Bird[]
  summary?: string
  setSelectedBird: Function
  handleGetTaxonomy: Function
  isLoading?: boolean
}

export const PredictedTile = ({
  birds = defaultBirds,
  summary,
  setSelectedBird,
  handleGetTaxonomy,
  isLoading = false,
}: Props) => {
  const handleChange = (event: any) => {
    setSelectedBird(event.target.value)
    handleGetTaxonomy(event.target.value)
  }

  return (
    // TODO add a button for "looks similar"
    // TODO add summary here
    <>
      {!isLoading && (
        <div className="mb-1 overflow-x-hidden pr-2">
          {summary && <div>{summary}</div>}
          {birds && (
            <RadioGroup
              className="mt-3 flex flex-wrap"
              onChange={handleChange}
              orientation="horizontal"
            >
              {birds.map((b: Bird, i: any) => (
                <Radio
                  // TODO add hover: colour and selected colour
                  // TODO if small screen w-full
                  // TODO redo this sizing and classnames
                  key={i}
                  value={i}
                  size="lg"
                  color="success"
                  className={'my-0 ml-2 rounded-xl border border-black'}
                >
                  <div className="flex grow flex-row">
                    <div>{b.name}</div>
                    <Chip
                      size="lg"
                      className={`ml-2 ${confidenceChipStyles(b.confidence)}`}
                    >
                      {b.confidence}
                    </Chip>
                  </div>
                </Radio>
              ))}
            </RadioGroup>
          )}
        </div>
      )}
      {isLoading && (
        <div className="flex w-full items-center justify-center sm:h-64">
          <img src={loadingBird} alt="Loading cockatoo" className="" />
        </div>
      )}
    </>
  )
}
