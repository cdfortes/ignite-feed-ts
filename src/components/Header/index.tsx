import styles from './styles.module.css'
import igniteLogoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogoImg} alt="Logo do Ignite" />
    </header>
  )
}
