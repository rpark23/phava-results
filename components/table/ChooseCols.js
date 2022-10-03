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
  const [ totalRuns, setTotalRuns ] = useState(true);
  const [ type1, setType1 ] = useState(true);
  const [ gb1, setGB1 ] = useState(false);
  const [ pfam1, setPfam1 ] = useState(false);
  const [ type2, setType2 ] = useState(false);
  const [ gb2, setGB2 ] = useState(false);
  const [ pfam2, setPfam2 ] = useState(false);
  const [ type3, setType3 ] = useState(false);
  const [ gb3, setGB3 ] = useState(false);
  const [ pfam3, setPfam3 ] = useState(false);

  useEffect(() => {
    let newIncluded = [];
    num ? newIncluded.push("Index") : null;
    id ? newIncluded.push("ID") : null;
    species ? newIncluded.push("Species") : null;
    fReads ? newIncluded.push("Forward Reads") : null;
    rReads ? newIncluded.push("Reverse Reads") : null;
    ratio ? newIncluded.push("Ratio") : null;
    runs ? newIncluded.push("Runs") : null;
    totalRuns ? newIncluded.push("Total Runs") : null;
    irLength ? newIncluded.push("IR Length") : null;
    repeatLength ? newIncluded.push("Repeat Length") : null;
    type1 ? newIncluded.push("Type 1") : null;
    gb1 ? newIncluded.push("Genbank 1") : null;
    pfam1 ? newIncluded.push("Pfam 1") : null;
    type2 ? newIncluded.push("Type 2") : null;
    gb2 ? newIncluded.push("Genbank 2") : null;
    pfam2 ? newIncluded.push("Pfam 2") : null;
    type3 ? newIncluded.push("Type 3") : null;
    gb3 ? newIncluded.push("Genbank 3") : null;
    pfam3 ? newIncluded.push("Pfam 3") : null;
    setIncluded(newIncluded);
  }, [num, id, species, totalRuns, fReads, rReads, ratio, runs, irLength, repeatLength, type1, gb1, pfam1, type2, gb2, pfam2, type3, gb3, pfam3])

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
        <div style={{ display: 'flex', marginTop: '4vh' }}>
          <div className={styles.column} style={{ marginRight: '1.5vw' }}>
            <Switch checked={num} onChange={(e) => setNum(e.currentTarget.checked)} label={<span><strong>Index</strong> - Assigned based on number of runs</span>}/>
            <Switch checked={id} onChange={(e) => setID(e.currentTarget.checked)} label={<span><strong>ID</strong> - Unique identifier: &#123;genome name&#125;:&#123;IR indices&#125;</span>}/>
            <Switch checked={species} onChange={(e) => setSpecies(e.currentTarget.checked)} label={<span><strong>Species</strong> - Species that IR was found in</span>}/>
            <Switch checked={totalRuns} onChange={(e) => setTotalRuns(e.currentTarget.checked)} label={<span><strong>Total Runs</strong> - Total number of PhaVa runs for this taxa</span>}/>
            <Switch checked={type1} onChange={(e) => setType1(e.currentTarget.checked)} label={<span><strong>Type 1</strong> - Type* of IR with respect to first appearing gene</span>}/>
            <Switch checked={gb1} onChange={(e) => setGB1(e.currentTarget.checked)} label={<span><strong>Genbank 1</strong> - Genbank gene annotation (if available) for first appearing gene</span>}/>
            <Switch checked={pfam1} onChange={(e) => setPfam1(e.currentTarget.checked)} label={<span><strong>Pfam 1</strong> - Pfam gene annotation (if available) for first appearing gene</span>}/>
          </div>
          <div className={styles.column}>
          <Switch checked={type2} onChange={(e) => setType2(e.currentTarget.checked)} label={<span><strong>Type 2</strong> - Type* of IR (if present) with respect to second appearing gene</span>}/>
            <Switch checked={gb2} onChange={(e) => setGB2(e.currentTarget.checked)} label={<span><strong>Genbank 2</strong> - Genbank gene annotation (if available) for second appearing gene</span>}/>
            <Switch checked={pfam2} onChange={(e) => setPfam2(e.currentTarget.checked)} label={<span><strong>Pfam 2</strong> - Pfam gene annotation (if available) for second appearing gene</span>}/>
            <Switch checked={type3} onChange={(e) => setType3(e.currentTarget.checked)} label={<span><strong>Type 3</strong> - Type* of IR (if present) with respect to third appearing gene</span>}/>
            <Switch checked={gb3} onChange={(e) => setGB3(e.currentTarget.checked)} label={<span><strong>Genbank 3</strong> - Genbank gene annotation (if available) for third appearing gene</span>}/>
            <Switch checked={pfam3} onChange={(e) => setPfam3(e.currentTarget.checked)} label={<span><strong>Pfam 3</strong> - Pfam gene annotation (if available) for third appearing gene</span>}/>
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', marginTop: '2vh' }}>*Type can be either intragenic, partial (part of IR is within a gene), or intergenic</p>
      </div>
      <Table style={{ marginTop: '4vh', width: '60%' }}>
        <thead>
          <tr>
            {included.length ? included.map((header, i) => (
              <th key={i}>{header}</th>
            )) : "No columns included"}
          </tr>
        </thead>
      </Table>
      <p style={{ color: '#555', marginTop: '2rem' }}>Scroll down to view full table</p>
    </div>
   
  )
}