import React from 'react'
import { Button, Textarea } from '@nextui-org/react'

type Props = {
  description: string
  setDescription: Function
  lastDescription: string
  handleSearch: (description: string) => void
  isLoading?: boolean
}

export const InputTile = ({
  description,
  setDescription,
  lastDescription,
  handleSearch,
  isLoading = false,
}: Props) => {
  const handleChange = (event: any) => {
    setDescription(event.target.value)
  }

  return (
    <>
      <Textarea
        value={description}
        onChange={handleChange}
        size="lg"
        radius="full"
      />
      <div className="flex justify-end">
        {/* TODO when clicked make this loading and then disabled until change */}
        <Button
          color={
            lastDescription === description && !isLoading
              ? 'default'
              : 'primary'
          }
          className="mt-2 text-lg"
          radius="full"
          isLoading={isLoading}
          disabled={lastDescription === description}
          onClick={() => handleSearch(description)}
        >
          Search
        </Button>
      </div>
    </>
  )
}
