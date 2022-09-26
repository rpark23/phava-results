import FullTable from '../../data/irTable.json'

const scale1 = (value) => {
  if (value == 100) {
    value = '100+'
  }
  return `${value}`;
}

const scaleRatio = (value) => {
  return `${value/100}`;
}

const scaleIRLength = (value) => {
  if (value == 69) {
    return '729';
  }
  return `${10*value + 30}`;
}

const scaleRepeatLength = (value) => {
  if (value == 69) {
    return '360';
  }
  return `${5*value + 11}`;
}

export const ChartInfo = {
  "fReads": {
    title: "Forward Reads", 
    getChart: () => {
      let labels = [];
      let data = [];
      let max = 100
      for(let i=0; i<max; i++) {
        let temp = FullTable.filter(
          row => row.fReads >= i
        );
        temp = temp.filter(
          row => row.fReads < i+1
        );
        if(i == 1) {
          labels.push(`${i} read`);
        } else {
          labels.push(`${i} reads`);
        }
        data.push(temp.length);
      }
      let temp = FullTable.filter(
        row => row.fReads > max
      );
      data.push(temp.length);
      labels.push(`${max}+ reads`);
      return { data, labels }
    }, 
    marks: [
      {
        value: 0,
        label: '0 reads'
      },
      {
        value: 100,
        label: '100+ reads'
      }
    ],
    min: 0,
    max: 100,
    getLabel: scale1
  },
  "rReads": {
    title: "Reverse Reads", 
    getChart: () => {
      let labels = [];
      let data = [];
      let max = 100
      for(let i=0; i<max; i++) {
        let temp = FullTable.filter(
          row => row.rReads >= i
        );
        temp = temp.filter(
          row => row.rReads < i+1
        );
        if(i == 1) {
          labels.push(`${i} read`);
        } else {
          labels.push(`${i} reads`);
        }
        data.push(temp.length);
      }
      let temp = FullTable.filter(
        row => row.rReads > max
      );
      data.push(temp.length);
      labels.push(`${max}+ reads`);
      return { data, labels }
    },
    marks: [
      {
        value: 4,
        label: '4 reads'
      },
      {
        value: 100,
        label: '100+ reads'
      }
    ],
    min: 0,
    max: 100,
    getLabel: scale1
  },
  "ratio": {
    title: "Ratio", 
    getChart: () => {
      let labels = [];
      let data = [];
      const d = 100
      for(let i=0; i<d; i++) {
        let temp = FullTable.filter(
          row => row.ratio > i/d
        );
        temp = temp.filter(
          row => row.ratio <= (i+1)/d
        );
        labels.push(`${i/d}-${(i+1)/d}`);
        data.push(temp.length);
      }
      return { data, labels }
    },
    marks: [
      {
        value: 0,
        label: '0'
      },
      {
        value: 100,
        label: '1'
      }
    ],
    min: 0,
    max: 100,
    getLabel: scaleRatio
  },
  "runs": {
    title: "Runs", 
    getChart: () => {
      let labels = [];
      let data = [];
      let max = 100
      for(let i=1; i<max; i++) {
        let temp = FullTable.filter(
          row => row.nRuns >= i
        );
        temp = temp.filter(
          row => row.nRuns < i+1
        );
        if(i == 1) {
          labels.push(`${i} run`);
        } else {
          labels.push(`${i} runs`);
        }
        data.push(temp.length);
      }
      let temp = FullTable.filter(
        row => row.nRuns > max
      );
      data.push(temp.length);
      labels.push(`${max}+ runs`);
      return { data, labels }
    },
    marks: [
      {
        value: 1,
        label: '1 run'
      },
      {
        value: 100,
        label: '100+ runs'
      }
    ],
    min: 1,
    max: 100,
    getLabel: scale1
  },
  "irLength": {
    title: "IR Length", 
    getChart: () => {
      let labels = [];
      let data = [];
      let min = 30
      let max = 70
      for(let i=0; i<max; i++) {
        let temp = FullTable.filter(
          row => row.rStart - row.lEnd >= 10*i + min
        );
        temp = temp.filter(
          row => row.rStart - row.lEnd < 10*(i+1) + min
        );
        labels.push(`${10*i + min}-${10*i + min + 9} bps`);
        data.push(temp.length);
      }
      return { data, labels }
    },
    marks: [
      {
        value: 0,
        label: '30 bps'
      },
      {
        value: 69,
        label: '729 bps'
      }
    ],
    min: 0,
    max: 69,
    getLabel: scaleIRLength
  },
  "repeatLength": {
    title: "Repeat Length", 
    getChart: () => {
      let labels = [];
      let data = [];
      let min = 11
      let max = 360
      for(let i=0; 5*i<max-min; i++) {
        let temp = FullTable.filter(
          row => row.lEnd - row.lStart >= 5*i + min
        );
        temp = temp.filter(
          row => row.lEnd - row.lStart < 5*(i+1) + min
        );
        labels.push(`${5*i + min}-${5*i + min + 4} bps`);
        data.push(temp.length);
      }
      return { data, labels }
    },
    marks: [
      {
        value: 0,
        label: '11 bps'
      },
      {
        value: 69,
        label: '360 bps'
      }
    ],
    min: 0,
    max: 69,
    getLabel: scaleRepeatLength
  }
}