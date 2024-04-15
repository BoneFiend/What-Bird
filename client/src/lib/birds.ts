export type Confidence =
  | 'null'
  | 'Very Low'
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Very High'

export type Bird = {
  name?: string
  confidence?: Confidence
  description?: string
}

export const defaultBird: Bird = {
  name: 'Untitled Bird',
  confidence: 'null',
  description: 'Nodescription ',
}

export const defaultBirds: Bird[] = [defaultBird, defaultBird, defaultBird]

export type GptPredictions = {
  summary?: string
  birds?: Bird[]
  information?: string[]
}
