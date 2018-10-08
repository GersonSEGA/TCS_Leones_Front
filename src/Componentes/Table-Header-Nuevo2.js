import React from 'react'

class TableHeaderNuevo2 extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
                <th className="th1">NOMBRE APELLIDO</th>
                <th className="th1">ID ALUMNO</th>
                <th className="th1">CODIGO</th> 
                <th className="th2"> CODIGO  /  PROGRAMA  A ESCOGER </th>
       </tr>
	</thead>
    )
  }
}

export default TableHeaderNuevo2