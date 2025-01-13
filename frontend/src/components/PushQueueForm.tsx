import { useState } from 'react'

interface PushQueueFormProps {
  onSubmit: (queueName: string, message: string) => void
  onCancel: () => void
  isLoading: boolean
}

const PushQueueForm = ({ onSubmit, onCancel, isLoading }: PushQueueFormProps) => {
  const [queueName, setQueueName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(queueName, message)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="queueName" className="block text-sm font-medium text-gray-700">
          Queue Name
        </label>
        <input
          type="text"
          id="queueName"
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Pushing...' : 'Push to Queue'}
        </button>
      </div>
    </form>
  )
}

export default PushQueueForm 