import { ActionIcon, Table, TextInput } from '@mantine/core';

export const cols = {
  'Index': {
    get: (row) => row.id,
    search: (props) => <>
      <TextInput size={25} value={props.index} onChange={(e) => props.setIndex(e.currentTarget.value)} styles={{ wrapper: {marginTop: '0.25rem', width: '5rem'}, input: {fontSize: 12} }}/>
    </>
  },
  'ID': {
    get: (row) => row.index,
    search: (props) => <>
      <TextInput size={25} value={props.id} onChange={(e) => props.setID(e.currentTarget.value)} styles={{ wrapper: {marginTop: '0.25rem'}, input: {fontSize: 12} }}/>
    </>
  },
  "Species": {
    get: (row) => row.species,
    search: (props) => <>
      <TextInput size={25} value={props.species} onChange={(e) => props.setSpecies(e.currentTarget.value)} styles={{ wrapper: {marginTop: '0.25rem'}, input: {fontSize: 12} }}/>
    </>
  },
  "Forward Reads": {
    get: (row) => row.fReads,
    // search: (props) => <div style={{ alignItems: 'center', display: 'flex' }}>
    //   <TextInput value={props.fReads[0]} size={25} styles={{ wrapper: {marginTop: '0.25rem', width: '5rem'}, input: {fontSize: 12} }}/>
    //   &nbsp; &#8211; &nbsp;
    //   <TextInput value={props.fReads[1]} size={25} styles={{ wrapper: {marginTop: '0.25rem', width: '5rem'}, input: {fontSize: 12} }}/>
    // </div>
  },
  "Reverse Reads": {
    get: (row) => row.rReads
  },
  "Ratio": {
    get: (row) => row.ratio
  },
  "Runs": {
    get: (row) => row.nRuns
  },
  "IR Length": {
    get: (row) => row.rStart - row.lEnd
  },
  "Repeat Length": {
    get: (row) => row.lEnd - row.lStart
  },
  "Type": {
    get: (row) => row.type1
  },
}