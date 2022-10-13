import { useEffect, useState } from 'react';
import styles from '../../styles/Table.module.css'
import FullTable from '../../data/irTable.json'
import { cols }  from './TableCols';
import IRinfo from './IRinfo';

import { ActionIcon, Table, TextInput } from '@mantine/core';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function RunTable (props) {
  const { data } = props;

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

  const handleOpen = (e, i) => {
    console.log(hits[i]);
    setIR(hits[i]);
    setOpened(true);
  }

  return (
    <>
      <div className={styles.TableContainer}>
        <Table className={styles.header} style={{ marginTop: '5vh' }}>
          <thead>
            <tr>
              {cols.forEach((header, i) => (
                <th key={i}>
                  {header}Test
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data ? data.slice(pageSize*(page-1), pageSize*page).map((row, i) => (
              <tr className={styles.row} key={i} onClick={(e) => handleOpen(e, i)}>
                {data[row].map((col, j) => (
                  <td key={j}>{col}</td>
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
        <IRinfo opened={opened} setOpened={setOpened} ir={ir} />
      </div>
    </>
  )
}