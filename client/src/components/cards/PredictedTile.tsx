import { Bird, defaultBirds, confidenceChipStyles } from '../../lib/birds'
import { RadioGroup, Radio, Chip } from '@nextui-org/react'

type Props = {
  birds?: Bird[]
  setSelectedBird: Function
  handleGetTaxonomy: Function
}

export const PredictedTile = ({
  birds = defaultBirds,
  setSelectedBird,
  handleGetTaxonomy,
}: Props) => {
  const handleChange = (event: any) => {
    setSelectedBird(event.target.value)
    handleGetTaxonomy(event.target.value)
  }

  return (
    // TODO add a button for "looks similar"
    <div className="mb-2 overflow-x-hidden pr-2">
      {birds && (
        <RadioGroup
          className="flex flex-wrap"
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
  )
}
