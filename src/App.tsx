import { ChangeEvent } from 'react'

import { useLocalStorage } from '@uidotdev/usehooks'
import { arrayMove } from '@dnd-kit/sortable'

import styles from './App.module.css'
import CutUpLinesContainer from './components/CutUpLinesContainer.tsx'
import { DragEndEvent } from '@dnd-kit/core/dist/types'

function App() {
  const [lines, setLines] = useLocalStorage<string[]>('lines', [])

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newLines = event.target.value.split(/\n+/)
    console.log(event.target.value, newLines)
    setLines(newLines)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setLines((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <main className={styles.container}>
      <textarea
        rows={40}
        cols={50}
        onChange={handleOnChange}
        placeholder="Enter some text to cut up"
        value={lines.join('\n')}
      ></textarea>
      <CutUpLinesContainer lines={lines} onDragEnd={handleDragEnd} />
    </main>
  )
}

export default App
