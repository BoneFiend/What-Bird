import { BaseTile } from './BaseTile'

type Props = {
  handleSearch: () => void
}

export const InputTile = ({ handleSearch }: Props) => {
  return (
    <BaseTile title="Input Bird Data">
      <div>Describe the bird</div>
      <textarea className="relative mt-1 h-32 w-full rounded-md bg-yellow-300 p-1.5 text-black" />
      <div className="flex justify-end">
        <button
          onClick={handleSearch}
          className="mt-1 w-16 rounded-md bg-orange-400 text-black ring-orange-500 transition-all hover:bg-orange-500 hover:ring-1"
        >
          Search
        </button>
      </div>
    </BaseTile>
  )
}
