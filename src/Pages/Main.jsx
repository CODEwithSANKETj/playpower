import React from 'react'
import Headers from '../Component/Headers'
import Draggable from '../Component/Draggable'
import { useSelector } from 'react-redux';

function Main() {
  const theme = useSelector((store) => store.theme.theme);
  return (
    <div style={{minWidth:'730px',margin:'15px',backgroundColor:theme=='light'?'white':'grey'}}>
      Time Converter
        <Headers/>
        <Draggable/>
    </div>
  )
}

export default Main