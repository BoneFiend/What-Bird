import { Bird, defaultBirds } from '../../lib/birds'

type Props = {
  birds?: Bird[]
}

export const PredictedTile = ({ birds = defaultBirds }: Props) => {
  return (
    <>
      {birds.map((b: Bird, i: any) => (
        <div className="mb-2" key={i}>
          <div>Name: {b.name}</div>
          <div>Confidence: {b.confidence}</div>
        </div>
      ))}
    </>
  )
}
