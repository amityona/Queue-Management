import { QueueInfo } from '../types/queue'

interface QueueItemProps {
  queue: QueueInfo
  onClick?: (queueName: string) => void
}

const QueueItem = ({ queue, onClick }: QueueItemProps) => {
  return (
    <div
      onClick={() => onClick?.(queue.queueName)}
      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900">{queue.queueName}</h3>
          <span className="text-sm text-gray-500">Click to view details</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {queue.waitingMessages} messages
          </div>
          {queue.waitingMessages > 0 && (
            <span className="text-xs text-gray-500">
              Click to manage messages
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueueItem 