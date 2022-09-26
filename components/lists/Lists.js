import { useEffect, useState } from 'react';
import styles from '../../styles/Lists.module.css'
import FullTable from '../../data/irTable.json'

import List from "./List"
import { ActionIcon, Table, TextInput } from '@mantine/core';

export default function ResultsTable (props) {
  const { fReads, setFReads, rReads, setRReads, ratio, setRatio, runs, setRuns, 
    irLength, setIrLength, repeatLength, setRepeatLength } = props.variables;

  const [hits, setHits] = useState(FullTable);

  const [allCount, setAllCount] = useState(null);
  const [speciesCount, setSpeciesCount] = useState(null);
  const [genusCount, setGenusCount] = useState(null);

  useEffect(() => {
    let [minFReads, maxFReads] = fReads;
    if (maxFReads == 100) {
      maxFReads = 324025; // 135283
    }
    let [minRReads, maxRReads] = rReads;
    if (maxRReads == 100) {
      maxRReads = 13936; // 58456
    }
    let [minRuns, maxRuns] = runs;
    if (maxRuns == 100) {
      maxRuns = 619;
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
    let allCount = {};
    let speciesCount = {};
    let genusCount = {};
    for(let i=0; i<hits.length; i++) {
      const name = hits[i].species;
      const species = name.split(' ').slice(0, 2).join(' ');
      const genus = name.split(' ')[0];
      if (name in allCount){
        allCount[name] += 1;
      } else {
        allCount[name] = 1;
      }
      if (species in speciesCount){
        speciesCount[species] += 1;
      } else {
        speciesCount[species] = 1;
      }
      if (genus in genusCount){
        genusCount[genus] += 1;
      } else {
        genusCount[genus] = 1;
      }
    }
    allCount = Object.entries(allCount);
    allCount.sort(function(a, b){
      return b[1] - a[1]
    });
    speciesCount = Object.entries(speciesCount);
    speciesCount.sort(function(a, b){
      return b[1] - a[1]
    });
    genusCount = Object.entries(genusCount);
    genusCount.sort(function(a, b){
      return b[1] - a[1]
    });
    setAllCount(allCount);
    setSpeciesCount(speciesCount);
    setGenusCount(genusCount);
  }, [fReads, rReads, ratio, runs, irLength, repeatLength]);

  return (
    <div className={styles.ListsContainer}>
      <div style={{ display: 'flex'}}>
        {speciesCount ? <List hits={speciesCount} name="Species" /> : null}
        {genusCount ? <List hits={genusCount} name="Genus" /> : null}
        {allCount ? <List hits={allCount} name="Specific Name" /> : null}
      </div>
    </div>
   
  )
}