import { fetchTaxonomy } from './apiutils'

export type Confidence =
  | 'null'
  | 'Very Low'
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Very High'

export const confidenceChipStyles = (confidence?: Confidence) => {
  switch (confidence) {
    case 'Very High':
      return 'bg-green-500'
    case 'High':
      return 'bg-green-400'
    case 'Medium':
      return 'bg-yellow-300'
    case 'Low':
      return 'bg-orange-300'
    case 'Very Low':
      return 'bg-red-400'
    case 'null':
    default:
      return 'gray'
  }
}

export type Taxonomy = {
  'English name'?: string
  'scientific name'?: string
  species_code?: string
  category?: string
  order?: string
  family?: string
  range?: string
  extinct?: string // TODO do something with this information
  'extinct year'?: string
  error?: boolean
}

export const failedTaxonomy = { error: true }

export type Bird = {
  name: string
  confidence?: Confidence
  description?: string
  tax?: Taxonomy
}

export const defaultBird: Bird = {
  name: 'Untitled Bird',
  confidence: 'null',
  description: 'Nodescription ',
}

export const defaultBirds: Bird[] = [defaultBird, defaultBird, defaultBird]

export type GptPredictions = {
  summary?: string
  birds: Bird[]
  information?: string[]
}

export const getBirdTaxonomy = (name: string) => {
  fetchTaxonomy(name).then((data) => {
    return data
  })
  return 'not done'
}

export const updateBirdTaxonomy = (
  gptPredictions: GptPredictions,
  i: number,
  taxonomy: Taxonomy
) => {
  const newGptPredictions = { ...gptPredictions }
  newGptPredictions.birds[i].tax = taxonomy
  return newGptPredictions
}
