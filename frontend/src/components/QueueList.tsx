import { QueueInfo } from '../types/queue'
import QueueItem from './QueueItem'

interface QueueListProps {
  queues: QueueInfo[]
  onQueueClick?: (queueName: string) => void
}

const QueueList = ({ queues, onQueueClick }: QueueListProps) => {
  if (queues.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">No active queues</p>
    )
  }

  return (
    <div className="space-y-4">
      {queues.map((queue) => (
        <QueueItem
          key={queue.queueName}
          queue={queue}
          onClick={onQueueClick}
        />
      ))}
    </div>
  )
}

export default QueueList 