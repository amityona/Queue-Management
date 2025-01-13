import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from './Modal'
import { FETCH_MESSAGE_URL } from '../urls'

interface QueueDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  queueName: string
  onQueueUpdate?: () => void
}

const QueueDetailsModal = ({ isOpen, onClose, queueName, onQueueUpdate }: QueueDetailsModalProps) => {
  const [fetchedMessage, setFetchedMessage] = useState<string | null>(null)
  const [isFetchingMessage, setIsFetchingMessage] = useState(false)
  const [timeout, setTimeout] = useState<number>(1000)

  const handleFetchMessage = async () => {
    try {
      setIsFetchingMessage(true)
      const { data } = await axios.get(FETCH_MESSAGE_URL(queueName), {
        params: { timeout }
      })
      setFetchedMessage(data)
      toast.success('Message fetched successfully!')
      onQueueUpdate?.()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch message'
        toast.error(errorMessage)
      } else {
        toast.error('An unexpected error occurred')
      }
      setFetchedMessage(null)
    } finally {
      setIsFetchingMessage(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Queue Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage messages for queue: <span className="font-medium text-blue-600">{queueName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="timeout" className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (ms)
              </label>
              <input
                type="number"
                id="timeout"
                min="0"
                step="100"
                value={timeout}
                onChange={(e) => setTimeout(Math.max(0, parseInt(e.target.value) || 0))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter timeout in milliseconds"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleFetchMessage}
                disabled={isFetchingMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isFetchingMessage ? 'Fetching...' : 'Fetch Next Message'}
              </button>
              {fetchedMessage && (
                <button
                  onClick={() => setFetchedMessage(null)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Content:
            </label>
            <div className="bg-white p-3 rounded border min-h-[100px]">
              {isFetchingMessage ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                </div>
              ) : fetchedMessage ? (
                <p className="text-gray-800 whitespace-pre-wrap">{fetchedMessage}</p>
              ) : (
                <p className="text-gray-500 italic">No message fetched yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default QueueDetailsModal 