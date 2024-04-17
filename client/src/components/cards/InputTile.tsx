import React from 'react'
import { Button, Textarea } from '@nextui-org/react'

type Props = {
  description: string
  setDescription: Function
  lastDescription: string
  handleSearch: (description: string) => void
  isLoading?: boolean
  information: string[]
}

export const InputTile = ({
  description,
  setDescription,
  lastDescription,
  handleSearch,
  isLoading = false,
  information,
}: Props) => {
  const handleChange = (event: any) => {
    setDescription(event.target.value)
  }

  const handleClear = () => {
    setDescription('')
  }

  return (
    <>
      <Textarea
        value={description}
        onChange={handleChange}
        size="lg"
        radius="full"
      />
      <div className="mt-2 flex justify-end">
        <Button
          color={'warning'}
          variant="solid"
          className="mx-4 text-lg"
          radius="full"
          onClick={() => handleClear()}
        >
          Clear
        </Button>
        <Button
          color={
            (lastDescription !== description && description !== '') || isLoading
              ? 'primary'
              : 'default'
          }
          className="text-lg"
          radius="full"
          variant="solid"
          isLoading={isLoading}
          disabled={lastDescription === description || description === ''}
          onClick={() => handleSearch(description)}
        >
          Search
        </Button>
      </div>
      {information.length > 0 && !isLoading && (
        <div className="mb-2 mt-4">
          <div className="font-bold">
            Include the following information for better predictions:
          </div>
          <ul className="ml-6 list-disc">
            {information.map((info: string, i: any) => (
              <li key={i}>{info}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
