import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, timeout, token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,
    timeout: timeout
})

if (!writeClient.config().token) {
    throw new Error('Missing SANITY_WRITE_TOKEN in environment variables')
}