import React, { useState, useEffect } from 'react'
import { Bird } from '../../lib/birds'
import { fetchPhotos } from '../../lib/apiutils'
import loadingBird from '../../assets/LOADING-BIRD-CROPPED.gif'

interface Photo {
  src: string
  title: string
}

type Props = {
  bird: Bird
}

export const PhotoGallery = ({ bird }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO save these urls so they load faster on second click
    const loadPhotos = async () => {
      setIsLoading(true)
      setPhotos([])
      const photosFromAPI = await fetchPhotos(
        bird.name,
        bird.tax?.['scientific name'] ?? '',
        9 // Requests 9 photos
      )
      setPhotos(photosFromAPI)
      setIsLoading(false)
    }

    loadPhotos()
  }, [bird])

  return (
    // TODO format these photos nicely. some get squished and stretched
    <>
      {!isLoading && (
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
      )}
      {isLoading && (
        <div className="flex w-full items-center justify-center transition-all sm:h-64">
          <img src={loadingBird} alt="Loading cockatoo" className="" />
        </div>
      )}
    </>
  )
}
