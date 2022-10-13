export const cols = {
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
  "Run": {
    get: (row) => row.run
  }
}