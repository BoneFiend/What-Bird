import { BaseTile } from './BaseTile'

type Props = {
  name?: string
  desc?: string
}

export const DescriptionTile = ({
  name = 'Untitled Bird',
  desc = 'No description',
}: Props) => {
  return (
    <BaseTile title={name}>
      <div>{desc}</div>
    </BaseTile>
  )
}
