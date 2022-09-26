import { useEffect, useState } from 'react';
import styles from '../../styles/Lists.module.css'

import { ActionIcon, Table, TextInput } from '@mantine/core';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function List (props) {
  const { hits, name } = props;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

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

  return (
    <div className={styles.List}>
      <Table className={styles.header} style={{ marginTop: '5vh' }}>
        <thead>
          <tr>
            <th>{name}</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {hits.slice(pageSize*(page-1), pageSize*page).map((row, i) => (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.tableFooter}>
        <p>{Math.min(hits.length, pageSize*page, pageSize*(page-1)+1)}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length : null}</p>
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