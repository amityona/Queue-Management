import { useState, useEffect } from 'react'
import axios from 'axios'
import { GET_ALL_QUEUES_URL } from '../urls'
import { QueueInfo } from '../types/queue'
import toast from 'react-hot-toast'
import QueueList from './QueueList'
import QueueDetailsModal from './QueueDetailsModal'

interface QueueStatusProps {
  onRefreshTrigger?: (refreshFn: () => void) => void
}

const QueueStatus = ({ onRefreshTrigger }: QueueStatusProps) => {
  const [queues, setQueues] = useState<QueueInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null)

  const fetchQueues = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<QueueInfo[]>(GET_ALL_QUEUES_URL)
      console.log('Fetched queues:', data) 
      setQueues(data || [])
    } catch (error) {
      console.error('Error fetching queues:', error) 
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch queues'
        toast.error(errorMessage)
      } else {
        toast.error('An unexpected error occurred while fetching queues')
      }
      setQueues([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueueClick = (queueName: string) => {
    setSelectedQueue(queueName)
  }

  useEffect(() => {
    fetchQueues()
    onRefreshTrigger?.(fetchQueues)
  }, [onRefreshTrigger])

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Current Queues</h2>
        <button
          onClick={fetchQueues}
          className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          disabled={isLoading}
        >
          <RefreshIcon className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-32 space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <p className="text-gray-600">Loading queues...</p>
        </div>
      ) : (
        <QueueList queues={queues} onQueueClick={handleQueueClick} />
      )}

      {selectedQueue && (
        <QueueDetailsModal
          isOpen={!!selectedQueue}
          onClose={() => setSelectedQueue(null)}
          queueName={selectedQueue}
          onQueueUpdate={fetchQueues}
        />
      )}
    </div>
  )
}

// Refresh icon component
const RefreshIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

export default QueueStatus 