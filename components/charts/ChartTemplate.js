import React, { useEffect, useState } from 'react';
import styles from '../../styles/Charts.module.css'

import { ChartInfo } from "./ChartInfo";

import Chart from 'chart.js/auto';
import { RangeSlider } from '@mantine/core';

export default function ChartTemplate (props) {
  const { values, setValues, id } = props;
  const { title, getChart, getLabel, marks, min, max } = ChartInfo[id];
  const [ animation, setAnimation ] = useState(true);

  const buildChart = () => {
    let { data, labels } = getChart();

    let i = Math.round(values[0]); 
    let j = Math.round(values[1]);

    let test = Array(i-min).fill('rgba(224, 224, 224, 1)') //+ Array(j-i+1).fill('rgba(25, 118, 210, 1)') + Array(max-j).fill('rgba(224, 224, 224, 1)');
    // console.log(i-min, j-i+1, max-j);
    // console.log(Array(i-min).fill('rgba(224, 224, 224, 1)'));
    let background = test.concat(Array(j-i+1).fill('rgba(25, 118, 210, 1)'), Array(max-j).fill('rgba(224, 224, 224, 1)'));
    // console.log(test.length);

    // let background = Array(max-min+1).fill('rgba(224, 224, 224, 1)');
    // for (let i=Math.round(values[0]); i<=Math.round(values[1]); i++) {
    //   background[i-min] = 'rgba(25, 118, 210, 1)';
    // }

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
        }
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
        thumbSize={20}
        label={getLabel}
      />
    </div>
  )
}