import { useRef, useCallback } from 'react'
import QueueStatus from './QueueStatus'
import QueueManagement from './QueueManagement'

const MainContent = () => {
  const refreshQueuesRef = useRef<(() => void) | undefined>()

  const handleQueueRefresh = useCallback(() => {
    refreshQueuesRef.current?.()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QueueStatus onRefreshTrigger={(refresh) => { refreshQueuesRef.current = refresh }} />
        <QueueManagement onQueueUpdate={handleQueueRefresh} />
      </div>
    </main>
  )
}

export default MainContent 