import React, { useState, useEffect } from 'react'
import { Bird } from '../../lib/birds'
import { fetchPhotos } from '../../lib/apiutils'

interface Photo {
  src: string
  title: string
}

type Props = {
  bird: Bird
}

export const PhotoGallery = ({ bird }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const loadPhotos = async () => {
      setPhotos([])
      const photosFromAPI = await fetchPhotos(
        bird.name,
        bird.tax?.['scientific name'] ?? '',
        9 // Requests 9 photos
      )
      setPhotos(photosFromAPI)
    }

    loadPhotos()
  }, [bird])

  return (
    // TODO format these photos nicely. some get squished and stretched
    <div>
      <div className="flex flex-wrap justify-center">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            alt={photo.title}
            className="m-1 w-full border-3 border-black sm:w-[48%]  md:w-[32%]"
          />
        ))}
      </div>
    </div>
  )
}
