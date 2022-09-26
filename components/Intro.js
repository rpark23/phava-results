import styles from '../styles/Intro.module.css'

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      {/*<button className={styles.tool}>Skip</button>*/}
      <h1 className={styles.title}>
        PhaVa
      </h1>
      <p className={styles.description}>
        PhaVa is a tool inspired by{' '}
        <a href='https://github.com/XiaofangJ/PhaseFinder' rel="noreferrer" target="_blank">PhaseFinder,</a> which was
        developed by <a href='https://dspace.mit.edu/handle/1721.1/124944' rel="noreferrer" target="_blank">Jiang et al. (2019)</a>{' '}
        to identify invertible DNA regions (invertons). Here, PhaVa was used to analyze data from 29,799 
        long read sequencing runs from 4,022 different strains and species of bacteria.
      </p>
      <p className={styles.scroll}>Scroll down to view results</p>
      <footer className={styles.footer}>
        <a  
          href="https://www.bhattlab.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bhatt Lab &#128169; Stanford School of Medicine
        </a>
      </footer>
    </div>
  )
}
