import React from 'react'
import { Button, Textarea } from '@nextui-org/react'

type Props = {
  description: string
  setDescription: Function
  handleSearch: (description: string) => void
}

export const InputTile = ({
  description,
  setDescription,
  handleSearch,
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
          color="primary"
          className="mt-2 text-lg"
          radius="full"
          onClick={() => handleSearch(description)}
        >
          Search
        </Button>
      </div>
    </>
  )
}
