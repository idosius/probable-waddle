import { ChangeEvent } from 'react'

import { useLocalStorage } from '@uidotdev/usehooks'
import { arrayMove } from '@dnd-kit/sortable'

import styles from './App.module.css'
import CutUpLinesContainer from './components/CutUpLinesContainer.tsx'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import generateId from './utils/generateId.ts'

export type Line = { id: number; text: string }

function App() {
  const [lines, setLines] = useLocalStorage<Line[]>('lines', [])

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const textLines = event.target.value.split('\n')
    // Ugly hack: keep generating IDs rather than reusing them, works for now
    const newLines = textLines.map((text) => ({ id: generateId(), text }))
    setLines(newLines)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setLines((lines) => {
        const oldIndex = lines.findIndex(({ id }) => id === active.id)
        const newIndex = lines.findIndex(({ id }) => id === over?.id)

        return arrayMove(lines, oldIndex, newIndex)
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
        value={lines.map(({ text }) => text).join('\n')}
      ></textarea>
      <CutUpLinesContainer lines={lines} onDragEnd={handleDragEnd} />
    </main>
  )
}

export default App
