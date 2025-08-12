import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, timeout } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  timeout: timeout
})
