import { BaseTile } from './BaseTile'

type Props = {
  birds?: any
}

export const PredictedTile = ({ birds }: Props) => {
  return (
    <BaseTile title={'Predicted Birds'}>
      <div>{birds}</div>
    </BaseTile>
  )
}
