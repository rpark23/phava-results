import { useEffect, useState } from 'react';
import { Button, Modal } from '@mantine/core';

export default function IRinfo (props) {
  const { opened, setOpened, ir } = props;
  
  return (
    <>
      {ir ? 
      <Modal opened={opened} onClose={() => setOpened(false)} title={`${ir.id}. ${ir.index}`} centered size="xl">
        <h3>{ir.species}</h3>
        <p>&nbsp;{ir.genome}</p>
        <br/>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '3rem' }}>
            <h4>IR Type 1:</h4>
            <p>&nbsp;{ir.type1}</p>
          </div>
          <div style={{ marginRight: '3rem' }}>
            <h4>IR Type 2:</h4>
            <p>&nbsp;{ir.type2}</p>
          </div>
          <div>
            <h4>IR Type 3:</h4>
            <p>&nbsp;{ir.type3}</p>
          </div>
          
        </div>
        <br/>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '2rem' }}>
            <h4>Forward Reads:</h4>
            <p>&nbsp;{ir.fReads}</p>
          </div>
          <div style={{ marginRight: '2rem' }}>
            <h4>Reverse Reads:</h4>
            <p>&nbsp;{ir.rReads}</p>
          </div>
          <div>
            <h4>Ratio:</h4>
            <p>&nbsp;{Math.round(ir.ratio*10000) / 10000}</p>
          </div>
        </div>
        <br/>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '1rem' }}>
            <h4>5&rsquo; Repeat Length:</h4>
            <p>&nbsp;{ir.index.split(':')[1].split('-')[1] - ir.index.split(':')[1].split('-')[0]} bps</p>
          </div>
          <div style={{ marginRight: '1rem' }}>
            <h4>IR Length:</h4>
            <p>&nbsp;{ir.index.split(':')[1].split('-')[2] - ir.index.split(':')[1].split('-')[1]} bps</p>
          </div>
          <div>
            <h4>3&rsquo; Repeat Length:</h4>
            <p>&nbsp;{ir.index.split(':')[1].split('-')[3] - ir.index.split(':')[1].split('-')[2]} bps</p>
          </div>
        </div>
        <br/>
        {ir.type1 == "intragenic" || ir.type1 == "partial" ? 
        <>
          <p><strong>Pfam 1:</strong> {ir.pfam1}</p>
          <p><strong>GenBank 1:</strong> {ir.gb1}</p>
        </> : null}
        {ir.type2 == "intragenic" || ir.type2 == "partial" ? 
        <>
          <p><strong>Pfam 2:</strong> {ir.pfam2}</p>
          <p><strong>GenBank 2:</strong> {ir.gb2}</p>
        </> : null}
        {ir.type3 == "intragenic" || ir.type3 == "partial" ? 
        <>
          <p><strong>Pfam 3:</strong> {ir.pfam3}</p>
          <p><strong>GenBank 3:</strong> {ir.gb3}</p>
        </> : null}
        
      </Modal> : null}
    </>
  )
}