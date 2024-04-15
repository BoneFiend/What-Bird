type Props = {
  name?: string
  desc?: string
}

export const DescriptionTile = ({
  name = 'Untitled Bird',
  desc = 'No description',
}: Props) => {
  return <div>{desc}</div>
}
