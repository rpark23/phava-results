import { useEffect, useState } from 'react';
import styles from '../../styles/Table.module.css'
import FullTable from '../../data/irTable.json'
import { cols }  from './TableCols';

import { ActionIcon, Table, TextInput } from '@mantine/core';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function ResultsTable (props) {
  const { included } = props;
  const { fReads, setFReads, rReads, setRReads, ratio, setRatio, runs, setRuns, 
    irLength, setIrLength, repeatLength, setRepeatLength } = props.variables;

  const [hits, setHits] = useState(FullTable);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [index, setIndex] = useState('');
  const [id, setID] = useState('');
  const [species, setSpecies] = useState('');
  const [intragenic, setIntragenic] = useState(false);

  const[minFReads, setMinFReads] = useState(fReads[0]);
  const[maxFReads, setMaxFreads] = useState(fReads[1]);

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
    ).filter(
      row => row.id.toString().indexOf(index) > -1
    ).filter(
      row => row.index.toLowerCase().indexOf(id.toLowerCase()) > -1
    ).filter(
      row => row.species.toLowerCase().indexOf(species.toLowerCase()) > -1
    );
    if (intragenic) {
      hits = hits.filter(
        row => 'intragenic'.indexOf(row.type1) > -1
      );
    }
    setHits(hits);
  }, [index, id, species, fReads, rReads, ratio, runs, irLength, repeatLength, intragenic]);

  // const changeMinFREads = (newValue) => {
  //   if (newValue) < value
  //   setMinFReads(newValue);
  //   if(newValue < 100) {

  //   }
  // }

  // useEffect(() => {

  // }, [fReads]);

  const handleFirstPageButtonClick = () => {
    setPage(1);
  }

  const handleBackButtonClick = () => {
    setPage(page-1);
  }

  const handleNextButtonClick = () => {
    setPage(page+1);
  }

  const handleLastPageButtonClick = () => {
    setPage(Math.ceil(hits.length / pageSize));
  }

  const headerProps = {...props.variables, index, setIndex, id, setID, species, setSpecies, intragenic, setIntragenic };

  return (
    <div className={styles.TableContainer}>
      <Table className={styles.header} style={{ marginTop: '5vh' }}>
        <thead>
          <tr>
            {included.length ? included.map((header, i) => (
              <th key={i}>
                {header}
                {cols[header].search ? cols[header].search(headerProps) : null}
              </th>
            )) : "No columns included"}
          </tr>
        </thead>
        <tbody>
          {included.length ? hits.slice(pageSize*(page-1), pageSize*page).map((row, i) => (
            <tr key={i}>
              {included.map((col, j) => (
                <td key={j}>{cols[col].get(row)}</td>
              ))}
            </tr>
          )) : null}
        </tbody>
      </Table>
      <div className={styles.tableFooter}>
        <p>{Math.min(hits.length, pageSize*page, pageSize*(page-1)+1)}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length == 1 ? "1 IR found" : hits.length + " IRs found" : null}</p>
        <div className={styles.pagination}>
          <ActionIcon onClick={handleFirstPageButtonClick} disabled={page === 1} variant="transparent"><FirstPageIcon /></ActionIcon>
          <ActionIcon onClick={handleBackButtonClick} disabled={page === 1} variant="transparent"><KeyboardArrowLeft /></ActionIcon>
          <p>Page {Math.min(Math.ceil(hits.length / pageSize), page)} of {Math.ceil(hits.length / pageSize)}</p>
          <ActionIcon onClick={handleNextButtonClick} disabled={page >=Math.ceil(hits.length / pageSize)} variant="transparent"><KeyboardArrowRight /></ActionIcon>
          <ActionIcon onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(hits.length / pageSize)} variant="transparent"><LastPageIcon /></ActionIcon>
        </div>
      </div>
    </div>
   
  )
}