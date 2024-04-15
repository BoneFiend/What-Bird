import { Bird, defaultBirds, confidenceChipStyles } from '../../lib/birds'
import { RadioGroup, Radio, Chip } from '@nextui-org/react'

type Props = {
  birds?: Bird[]
}

export const PredictedTile = ({ birds = defaultBirds }: Props) => {
  return (
    // TODO add a button for "looks similar"
    <div className="overflow-x-hidden pr-2">
      {birds && (
        <RadioGroup className="flex flex-wrap" orientation="horizontal">
          {birds.map((b: Bird, i: any) => (
            <Radio
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
