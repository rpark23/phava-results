import { useEffect, useState } from 'react';
import styles from '../../styles/Charts.module.css'
import FullTable from '../../data/irTable.json'
// import { FullTableCols } from '../tables/cols/FullTableCols'

import Chart from './ChartTemplate'

import { Button, Card } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Bluetooth, CaretLeft, CaretRight, ChevronsDown } from 'tabler-icons-react';

export default function Charts(props) {
  const { fReads, setFReads, rReads, setRReads, ratio, setRatio, runs, setRuns, 
    irLength, setIrLength, repeatLength, setRepeatLength } = props.variables;

  const [hits, setHits] = useState(FullTable);
  const [species, setSpecies] = useState(null);
  const [counts, setCounts] = useState(null);

  const scrollRight = () => {
    const variables = document.getElementById('variables');
    variables.scrollTo({
      top: 100
    }); // += 100;
    // variables.scrollLeft += variables.scrollHeight;
    //variables.scrollTo(variables.scrollHeight, 0);
    //variables.scrollTo(20, 0);
    //console.log(variables.scrollHeight);
  }

  const scrollLeft = () => {
    const variables = document.getElementById('variables');
    console.log(variables.scrollHeight);
  }

  useEffect(() => {
    let [minFReads, maxFReads] = fReads;
    if (maxFReads == 100) {
      maxFReads = 135283;
    }
    let [minRReads, maxRReads] = rReads;
    if (maxRReads == 100) {
      maxRReads = 58456;
    }
    let [minRuns, maxRuns] = runs;
    if (maxRuns == 100) {
      maxRuns = 336;
    }
    let hits = FullTable.filter(
      row => row.fReads >= minFReads
    ).filter(
      row => row.fReads <= maxFReads
    ).filter(
      row => row.rReads >= minRReads
    ).filter(
      row => row.rReads <= maxRReads
    ).filter(
      row => row.ratio >= ratio[0]/100
    ).filter(
      row => row.ratio <= ratio[1]/100
    ).filter(
      row => row.nRuns >= minRuns
    ).filter(
      row => row.nRuns <= maxRuns
    ).filter(
      row => row.rStart - row.lEnd >= 10*irLength[0] + 30
    ).filter(
      row => row.rStart - row.lEnd < 10*(irLength[1]+1) + 30
    ).filter(
      row => row.lEnd - row.lStart >= 5*repeatLength[0] + 11
    ).filter(
      row => row.lEnd - row.lStart < 5*(repeatLength[1]+1) + 11
    );
    setHits(hits);

    let species = new Map();
    hits.forEach(row => {
      if (species.get(row.taxID)) {
        species.set(row.taxID, species.get(row.taxID)+1)
      } else {
        species.set(row.taxID, 1)
      }
    })
    setSpecies(Array.from(species.keys()));
    setCounts(Array.from(species.values()));

    // console.log(hits);
    // console.log(species);
    
    // for (let species in hits.taxID) {
    //   console.log(species);
    // }
    // console.log(hits.filter(x => x==2).length);
  }, [fReads, rReads, ratio, runs, irLength, repeatLength])

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.description}>
        <h2 style= {{ paddingTop: '6vh' }}>Filtering Results</h2>
        <div style= {{ width: '50rem', margin: '3vh 0 0' }}>
          <p style= {{ marginBottom: '2vh' }}>
            &emsp; Displayed below are all <strong>49,221 putative IRs</strong> identified plotted according to their 
            distribution with respect to several different variables (use arrows). IRs that appear in multiple runs have their 
            statistics aggregated into a single data point.
          </p>
        </div>
      </div>
      <Carousel sx={{ maxWidth: '80rem' }} draggable={false} controlsOffset="lg" styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default',
          },
        }
      }}>
        <Carousel.Slide>
          <Card className={styles.page} p="md" radius="md">
            <ul style= {{ margin: '0 0 2vh 2rem' }}>
              <li><strong>Forward Reads</strong>: Number of reads that map to the reference genome (in the same orientation)</li>
              <li><strong>Reverse Reads</strong>: Number of reads that when flipped (reverse orientation), map to the reference genome</li>
              <li><strong>Ratio</strong>: Ratio of reverse reads to the total number of reads [reverse / (forward + reverse)]</li>
            </ul>
            <div className={styles.row}>
              <p>Number of IRs</p>
              <div className={styles.charts}>
                <Chart values={fReads} setValues={setFReads} id="fReads" />
                <Chart values={rReads} setValues={setRReads} id="rReads" />
                <Chart values={ratio} setValues={setRatio} id="ratio" />
              </div>
            </div>
            <p style={{ color: '#555', marginTop: '2.5rem' }}>
              *Filter the dataset by adjusting the domain for each plot<br/>
            </p>
          </Card>
         
        </Carousel.Slide>
        <Carousel.Slide>
          <Card className={styles.page} p="md" radius="md">
            <ul style= {{ marginLeft: '2rem' }}>
              <li><strong>Runs</strong>: Number of PhaVa runs that found at least one reverse read for the IR</li>
              <li><strong>IR Length</strong>: Length of the inverted repeat (section that flips) in base pairs (bps)</li>
              <li><strong>Repeat Length</strong>: Base pair length of the repeated region for the IR</li>
            </ul>
            <div className={styles.row}>
              <p>Number of IRs</p>
              <div className={styles.charts}>
                <Chart values={runs} setValues={setRuns} id="runs" />
                <Chart values={irLength} setValues={setIrLength} id="irLength" />
                <Chart values={repeatLength} setValues={setRepeatLength} id="repeatLength" />
              </div>
            </div>
            <p style={{ color: '#555', marginTop: '2.5rem' }}>
              *Filter the dataset by adjusting the domain for each plot<br/>
            </p>
          </Card>
        </Carousel.Slide>
      </Carousel>
      <ChevronsDown color={'#555'} strokeWidth={1} style= {{ marginTop: '1.5rem' }}/>

      {/* <div className={styles.variables} id="variables">
        <div className={styles.left} id="left">
          <Button className={styles.leftArrow} onClick={scrollLeft} variant="outline" compact><CaretLeft size={20} strokeWidth={1}/></Button>
        </div>
        <div className={styles.pages}>
          <div className={styles.page} id="page1">
            <ul style= {{ margin: '0 0 2vh 2rem' }}>
              <li><strong>Forward Reads</strong>: Number of reads that map to the reference genome (in the same orientation).</li>
              <li><strong>Reverse Reads</strong>: Number of reads that when flipped (reverse orientation), map to the reference genome.</li>
              <li><strong>Ratio</strong>: Ratio of reverse reads to the total number of reads [reverse / (forward + reverse)].</li>
            </ul>
            <div className={styles.row}>
              <p>Number of IRs</p>
              <div className={styles.charts}>
                <Chart values={fReads} setValues={setFReads} id="fReads" />
                <Chart values={rReads} setValues={setRReads} id="rReads" />
                <Chart values={ratio} setValues={setRatio} id="ratio" />
              </div>
            </div>
            <p style= {{ color: '#555', marginTop: '8vh' }}>
              *Filter the dataset by adjusting the domain for each plot.<br/>
            </p>
            <ChevronsDown color={'#555'} strokeWidth={1} style= {{ marginTop: '2vh' }}/>
          </div>
          <div className={styles.page}>
            <ul style= {{ marginLeft: '2rem' }}>
              <li><strong>Runs</strong>: Number of PhaVa runs that found at least one reverse read for the IR.</li>
              <li><strong>IR Length</strong>: Length of the inverted repeat (section that flips) in base pairs (bps).</li>
              <li><strong>Repeat Length</strong>: Base pair length of the repeated region for the IR.</li>
            </ul>
            <div className={styles.row}>
              <p>Number of IRs</p>
              <div className={styles.charts}>
                <Chart values={runs} setValues={setRuns} id="runs" />
                <Chart values={irLength} setValues={setIrLength} id="irLength" />
                <Chart values={repeatLength} setValues={setRepeatLength} id="repeatLength" />
              </div>
            </div>
            <p style= {{ color: '#555', marginTop: '8vh' }}>
              *Filter the dataset by using the sliders to adjust the domain for each plot.<br/>
            </p>
            <ChevronsDown color={'#555'} strokeWidth={1} style= {{ marginTop: '2vh' }}/>
          </div>
        </div>
        <div className={styles.right}>
          <Button className={styles.rightArrow} onClick={scrollRight} variant="outline" compact disabled={false}><CaretRight size={20} strokeWidth={1}/></Button>
        </div>
      </div> */}
    </div>
  )
}