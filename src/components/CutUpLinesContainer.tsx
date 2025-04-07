import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import CutUpLine from './CutUpLine.tsx'

import styles from './CutUpLinesContainer.module.css'
import type { DragEndEvent } from '@dnd-kit/core/dist/types'
import { Line } from '../App.tsx'

type CutUpLinesContainerProps = {
  lines: Line[]
  onDragEnd: (event: DragEndEvent) => void
}

export default function CutUpLinesContainer({
  lines,
  onDragEnd,
}: CutUpLinesContainerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={lines} strategy={verticalListSortingStrategy}>
        <div className={styles.container}>
          {lines.map(({ id, text }) => (
            <CutUpLine key={id} id={id} text={text} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
