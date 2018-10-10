import React from 'react'

class AR_tablaAsignacion extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Recibo</th>
                        <th className="th">Código</th>
                        <th className="th">Programa</th>
                        <th className="th">Nombres</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="td">{this.props.listaRecaudaciones[0].numero}</td>
                        <td className="td">{this.props.listaAlumnos.codAlumno}</td>
                        <td className="td">{this.props.listaAlumnos.nom_programa}</td>
                        <td className="td">{this.props.listaAlumnos.apePaterno + " " + this.props.listaAlumnos.apeMaterno + " " + this.props.listaAlumnos.nomAlumno}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default AR_tablaAsignacion