import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import styles from './CutUpLine.module.css'

type CutUpLineProps = {
  id: string
  text: string
}

export default function CutUpLine({ id, text }: CutUpLineProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className={styles.container}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <span className={styles.highlight}>{text}</span>
    </div>
  )
}
