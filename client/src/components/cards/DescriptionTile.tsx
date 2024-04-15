import { Bird } from '../../lib/birds'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

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

          {bird.tax?.range && <div className="mt-2">{bird.tax?.range}</div>}

          <div className="text-medium mt-2 flex justify-end pr-2 italic text-gray-500">
            Taxonomic information from&nbsp;
            <a href="https://ebird.org" target="_blank" rel="noreferrer">
              eBird.org
            </a>
          </div>
        </>
      )}
      {!bird.tax?.['scientific name'] && (
        <>Could not find taxonomic data for {bird.name}.</>
      )}
    </div>
  )
}
