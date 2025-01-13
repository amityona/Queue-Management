import { useState } from 'react'
import Modal from './Modal'
import PushQueueForm from './PushQueueForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import { PUSH_MESSAGE_URL } from '../urls'

interface QueueManagementProps {
  onQueueUpdate?: () => void
}

const QueueManagement = ({ onQueueUpdate }: QueueManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePushToQueue = async (queueName: string, message: string) => {
    try {
      setIsLoading(true)
      await axios.post(PUSH_MESSAGE_URL, {
        queueName,
        message
      })
      toast.success('Message pushed to queue successfully!')
      setIsModalOpen(false)
      onQueueUpdate?.()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to push message to queue'
        toast.error(errorMessage)
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Queue Management</h2>
      <div className="space-y-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Push to Queue
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="space-y-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Push to Queue
            </h3>
            <PushQueueForm 
              onSubmit={handlePushToQueue}
              onCancel={() => setIsModalOpen(false)}
              isLoading={isLoading}
            />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default QueueManagement 