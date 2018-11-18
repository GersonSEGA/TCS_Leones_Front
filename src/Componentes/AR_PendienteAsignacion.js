import React from 'react'
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'
import AR_tableHeaderRecibo from './AR_tableHeaderRecibo';

class AR_PendienteAsignacion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            objPendienteAsignacion: this.props.listPendienteAsignacion,
        }
    }

    render() {
        return(
            <div>
                <table className="table">
                    <AR_tableHeaderRecibo/>
                    <tbody>
                        {
                            this.state.objPendienteAsignacion.map((recaudaciones) => {
                                return(
                                    <tr>
                                        <td className="td1">{}</td>
                                        <td className="td1">{recaudaciones.ape_nom}</td>
                                        <td className="td1">{recaudaciones.concepto}</td>
                                        <td className="td1">{recaudaciones.numero}</td>
                                        <td className="td1">{recaudaciones.moneda}</td>
                                        <td className="td1">{recaudaciones.importe}</td>
                                        <td className="td1">{recaudaciones.fecha}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
export default AR_PendienteAsignacion