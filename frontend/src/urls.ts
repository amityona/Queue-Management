const BASE_URL = 'http://localhost:3000/api'

export const PUSH_MESSAGE_URL = `${BASE_URL}`
export const GET_ALL_QUEUES_URL = `${BASE_URL}/queues`

export const FETCH_MESSAGE_URL = (queueName: string) => `${BASE_URL}/${queueName}`