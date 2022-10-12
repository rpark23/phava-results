import { ActionIcon, Table, TextInput, Checkbox } from '@mantine/core';

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
  "Total Runs": {
    get: (row) => row.totalRuns
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
    get: (row) => Math.round(row.ratio*10000) / 10000
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
  "Type 1": {
    get: (row) => row.type1,
    search: (props) => <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Checkbox checked={props.intragenic1} onChange={(e) => props.setIntragenic1(e.target.checked)} size="xs" style={{ marginTop: '0.25rem' }} label={<p style={{ fontWeight: 500, marginLeft: '-0.4rem' }}>Intragenic</p>} />
      <Checkbox checked={props.partial1} onChange={(e) => props.setPartial1(e.target.checked)} size="xs" style={{ marginTop: '0.25rem' }} label={<p style={{ fontWeight: 500, marginLeft: '-0.4rem' }}>Partial</p>} />
      <Checkbox checked={props.intergenic1} onChange={(e) => props.setIntergenic1(e.target.checked)} size="xs" style={{ marginTop: '0.25rem' }} label={<p style={{ fontWeight: 500, marginLeft: '-0.4rem' }}>Intergenic</p>} />
    </div>
  },
  "Genbank 1": {
    get: (row) => row.gb1
  },
  "Pfam 1": {
    get: (row) => row.pfam1
  },
  "Type 2": {
    get: (row) => row.type2
  },
  "Genbank 2": {
    get: (row) => row.gb2
  },
  "Pfam 2": {
    get: (row) => row.pfam2
  },
  "Type 3": {
    get: (row) => row.type3,
  },
  "Genbank 3": {
    get: (row) => row.gb3
  },
  "Pfam 3": {
    get: (row) => row.pfam3
  }
}