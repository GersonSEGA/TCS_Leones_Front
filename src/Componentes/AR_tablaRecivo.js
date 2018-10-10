import React from 'react'

class AR_tablaRecivo extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">ID</th>
                        <th className="th">Recibo</th>
                        <th className="th">Concepto</th>
                        <th className="th">Nombre</th>
                        <th className="th">Importe</th>
                        <th className="th">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="td">{this.props.listaRecaudaciones[0].idRec}</td>
                        <td className="td">{this.props.listaRecaudaciones[0].numero}</td>
                        <td className="td">{this.props.listaRecaudaciones[0].concepto}</td>
                        <td className="td">{this.props.listaRecaudaciones[0].apeNom}</td>
                        <td className="td">{this.props.listaRecaudaciones[0].importe}</td>
                        <td className="td">{this.props.listaRecaudaciones[0].fecha}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

}

export default AR_tablaRecivo