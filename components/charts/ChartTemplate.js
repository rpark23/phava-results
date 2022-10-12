import React, { useEffect, useState } from 'react';
import styles from '../../styles/Charts.module.css'

import { ChartInfo } from "./ChartInfo";

import Chart from 'chart.js/auto';
import { RangeSlider } from '@mantine/core';
import { Tallymark3 } from 'tabler-icons-react';

// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import { blue } from '@mui/material/colors';
// import Slider, { SliderThumb } from '@mui/material/Slider';

// const theme = createTheme({
//   palette: {
//     primary: blue,
//   },
// });

// const AirbnbSlider = styled(Slider)(({ theme }) => ({
//   height: 3,
//   padding: '13px 0',
//   '& .MuiSlider-thumb': {
//     height: 27,
//     width: 27,
//     backgroundColor: '#fff',
//     border: '1px solid currentColor',
//     '&:hover': {
//       boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
//     },
//     '& .airbnb-bar': {
//       height: 9,
//       width: 1,
//       backgroundColor: 'currentColor',
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   '& .MuiSlider-track': {
//     height: 3,
//   },
// }));

// function AirbnbThumbComponent(props) {
//   const { children, ...other } = props;
//   return (
//     <SliderThumb {...other}>
//       {children}
//       <span className="airbnb-bar" />
//       <span className="airbnb-bar" />
//       <span className="airbnb-bar" />
//     </SliderThumb>
//   );
// }

export default function ChartTemplate (props) {
  const { values, setValues, id } = props;
  const { title, getChart, getLabel, marks, min, max } = ChartInfo[id];
  const [ animation, setAnimation ] = useState(true);

  const buildChart = () => {
    let { data, labels } = getChart();

    console.log(data, labels);

    let i = Math.round(values[0]); 
    let j = Math.round(values[1]);

    let test = Array(i-min).fill('rgba(224, 224, 224, 1)')
    let background = test.concat(Array(j-i+1).fill('rgba(25, 118, 210, 1)'), Array(max-j).fill('rgba(224, 224, 224, 1)'));

    const ctx = document.getElementById(id);
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "IRs found",
          data: data,
          backgroundColor: background,
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          x: {
            display: false,
          },
          y: {
            type: 'logarithmic',
            min: 0.1,
            max: 100000,
            ticks: {
              callback: function(value, index, ticks) {
                if (value == 0.1) {
                  return 0;
                }
                return value;
              }
            }
          }
        },
        animation: animation,
        plugins: {
          legend: {
            display: false,
          }
        },
        normalized: true
        // parsing: false
      }
    });
    return myChart;
  };

  useEffect(() => {
    let myChart = buildChart();
    setAnimation(false);
    return () => {
      myChart.destroy();
    };
  }, [ values ]);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setAnimation(false);
  //   const { value } = e.target;
  //   setValues(value);
  // };

  return (
    <div className={styles.chart}>
      <p className={styles.title}>{title}</p>
      <canvas id={id} width="400" height="225" />
      <RangeSlider
        min={min}
        max={max}
        value={values}
        onChange={setValues}
        size={3}
        marks={marks}
        minRange={0}
        mt={4}
        ml="3.3rem"
        styles={(theme) => ({ thumb: { borderWidth: 2, padding: 3 }, 
        markLabel: { marginTop: 10, color: "#777", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontSize: '0.8rem' },
        mark: { borderColor: "#999", borderRadius: 1, height: 5, width: 1, transform: 'translateX(-1px) translateY(-1px)' },
        label: { backgroundColor: "#777" } })}
        thumbChildren={<Tallymark3 size={20} />}
        thumbSize={24}
        label={getLabel}
      />
      {/* <div className={styles.slider}>
        <ThemeProvider theme={theme}>
          <AirbnbSlider
            components={{ Thumb: AirbnbThumbComponent }}
            value={values}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={getLabel}
            disableSwap
            marks={marks}
            color="primary"
          />
         </ThemeProvider>
      </div> */}
    </div>
  )
}