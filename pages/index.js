import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Intro from "../components/Intro"
import Charts from "../components/charts/Charts"
import ChooseCols from "../components/table/ChooseCols"
import Table from "../components/table/Table"
import Lists from "../components/lists/Lists"

export default function Home() {
  const [fReads, setFReads] = useState([0, 100]);
  const [rReads, setRReads] = useState([4, 100]);
  const [ratio, setRatio] = useState([0, 100]);
  const [runs, setRuns] = useState([1, 100]);
  const [irLength, setIrLength] = useState([0, 69]);
  const [repeatLength, setRepeatLength] = useState([0, 69]);

  const [ included, setIncluded ] = useState([]);

  const variables = { fReads, setFReads, rReads, setRReads, ratio, setRatio, runs, setRuns, 
    irLength, setIrLength, repeatLength, setRepeatLength }

  return (
    <div className={styles.container}>
      <Head>
        <title>PhaVa</title>
        <meta name="description" content="View latest results from PhaVa on nearly 30,000 long-read sequencing runs" />
        <link rel="icon" href="/images/dna.svg" />
      </Head>
      <Intro />
      <Charts variables={variables} />
      <ChooseCols included={included} setIncluded={setIncluded} /> 
      <Table included={included} variables={variables} />
      <Lists variables={variables} />
     </div>
  )
}
