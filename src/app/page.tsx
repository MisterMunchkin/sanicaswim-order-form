import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p className="text-lg">
          Please fill out the form below! After you submit the form, @SanicaSwim will DM to confirm your order!
        </p>
      </div>
    </main>
  )
}
