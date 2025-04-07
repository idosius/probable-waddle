import styles from './App.module.css'
import { ChangeEvent } from 'react'
import CutUpLine from './components/CutUpLine.tsx'
import { useLocalStorage } from '@uidotdev/usehooks'

function App() {
  const [text, setText] = useLocalStorage('text', '')
  const cutUpText = text.split('\n').filter((line) => line.trim().length > 0)

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value)
  }

  return (
    <main className={styles.root}>
      <textarea rows={40} cols={50} onChange={handleOnChange}>
        {text}
      </textarea>
      <div className={styles.lines}>
        {cutUpText.map((text) => (
          <CutUpLine key={text} text={text} />
        ))}
      </div>
    </main>
  )
}

export default App
