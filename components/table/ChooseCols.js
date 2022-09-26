import { useEffect, useState } from 'react';
import styles from '../../styles/Table.module.css'

import { Switch, Table } from '@mantine/core';

export default function ResultsTable (props) {
  const { included, setIncluded } = props;

  const [ fReads, setFReads ] = useState(true);
  const [ rReads, setRReads ] = useState(true);
  const [ ratio, setRatio ] = useState(true);
  const [ runs, setRuns ] = useState(true);
  const [ irLength, setIRLength ] = useState(false);
  const [ repeatLength, setRepeatLength ] = useState(false);

  const [ num, setNum ] = useState(true);
  const [ id, setID ] = useState(false);
  const [ species, setSpecies ] = useState(true);
  const [ type, setType ] = useState(true);

  useEffect(() => {
    let newIncluded = [];
    num ? newIncluded.push(["#", "id"]) : null;
    id ? newIncluded.push(["ID", "index"]) : null;
    species ? newIncluded.push(["Species", "species"]) : null;
    fReads ? newIncluded.push(["Forward Reads", "fReads"]) : null;
    rReads ? newIncluded.push(["Reverse Reads", "rReads"]) : null;
    ratio ? newIncluded.push(["Ratio", "ratio"]) : null;
    runs ? newIncluded.push(["Runs", "nRuns"]) : null;
    irLength ? newIncluded.push(["IR Length", ""]) : null;
    repeatLength ? newIncluded.push(["Repeat Length", ]) : null;
    type ? newIncluded.push(["Type", "type1"]) : null;
    setIncluded(newIncluded);
  }, [num, id, fReads, rReads, ratio, runs, irLength, repeatLength, type, species])

  return (
    <div className={styles.TableContainer}>
      <div className={styles.chooseColumns}>
        <h2>Choose columns to display</h2>
        <div className={styles.row} style={{ marginTop: '4vh' }}>
          <div className={styles.column}>
            <Switch checked={fReads} onChange={(e) => setFReads(e.currentTarget.checked)} label="Forward Reads"/>
            <Switch checked={rReads} onChange={(e) => setRReads(e.currentTarget.checked)} label="Reverse Reads"/>
          </div>
          <div className={styles.column}>
            <Switch checked={ratio} onChange={(e) => setRatio(e.currentTarget.checked)} label="Ratio"/>
            <Switch checked={runs} onChange={(e) => setRuns(e.currentTarget.checked)} label="Runs"/>
          </div>
          <div className={styles.column}>
            <Switch checked={irLength} onChange={(e) => setIRLength(e.currentTarget.checked)} label="IR Length"/>
            <Switch checked={repeatLength} onChange={(e) => setRepeatLength(e.currentTarget.checked)} label="Repeat Length"/>
          </div>
        </div>
        <div className={styles.column} style={{ marginTop: '3vh' }}>
          <Switch checked={num} onChange={(e) => setNum(e.currentTarget.checked)} label={<span><strong>#</strong> - Assigned index based on number of runs</span>}/>
          <Switch checked={id} onChange={(e) => setID(e.currentTarget.checked)} label={<span><strong>ID</strong> - Unique identifier: &#123;genome name&#125;:&#123;IR indices&#125;</span>}/>
          <Switch checked={species} onChange={(e) => setSpecies(e.currentTarget.checked)} label={<span><strong>Species</strong> - Species that IR was found in</span>}/>
          <Switch checked={type} onChange={(e) => setType(e.currentTarget.checked)} label={<span><strong>Type</strong> (of IR) - Intragenic, partial (part of IR is within a gene), or intergenic</span>}/>
        </div>
      </div>
      <Table style={{ marginTop: '6vh', width: '60%' }}>
        <thead>
          <tr>
            {included.length ? included.map((col, i) => (
              <th key={i}>{col[0]}</th>
            )) : "No columns included"}
          </tr>
        </thead>
      </Table>
      <p style={{ color: '#555', marginTop: '2rem' }}>Scroll down to view full table</p>
    </div>
   
  )
}