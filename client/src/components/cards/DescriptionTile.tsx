import { Bird, defaultBird } from '../../lib/birds'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { PhotoGallery } from '../photos/PhotoGallery'

type Props = {
  bird: Bird
}

export const DescriptionTile = ({ bird }: Props) => {
  const taxBCItemClasses = {
    item: 'text-lg text-black',
    separator: 'text-black',
  }
  return (
    // TODO fix the breadcrumbs appearing like links
    // or make them proper links
    <div>
      {bird !== defaultBird && (
        <>
          {bird.tax?.['scientific name'] && (
            <>
              <Breadcrumbs size="lg" itemClasses={taxBCItemClasses}>
                <BreadcrumbItem>Anamalia</BreadcrumbItem>
                <BreadcrumbItem>Chordata</BreadcrumbItem>
                <BreadcrumbItem>Aves</BreadcrumbItem>
                <BreadcrumbItem>{bird.tax?.order}</BreadcrumbItem>
                <BreadcrumbItem>{bird.tax?.family}</BreadcrumbItem>
                <BreadcrumbItem className="italic">
                  {bird.tax?.['scientific name']}
                </BreadcrumbItem>
              </Breadcrumbs>

              {bird.tax?.range && (
                <div className="mt-2">Found: {bird.tax?.range}</div>
              )}

              <div className="mt-2 flex justify-end pr-2 text-medium italic text-gray-500">
                Taxonomic information from&nbsp;
                <a href="https://ebird.org" target="_blank" rel="noreferrer">
                  eBird.org
                </a>
              </div>
            </>
          )}
          {!bird.tax?.['scientific name'] && (
            <>Could not find taxonomic information for {bird.name}.</>
          )}
          <PhotoGallery bird={bird} />
          <div className="mt-2 flex justify-end pr-2 text-medium italic text-gray-500">
            Photos from&nbsp;
            <a href="https://www.flickr.com/" target="_blank" rel="noreferrer">
              flikr.com
            </a>
          </div>
        </>
      )}
    </div>
  )
}
