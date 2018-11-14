import React from 'react'
import PagoListNuevo2 from './Pago-list-nuevo2'
import '../App2.css';
import BuscarNuevo from './BuscarNuevo';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'

class AppNueva2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nombre_select: '',
            conceptos: [],
            todos: false,
            nombre: '',
            apellido: '',
            checkbox_: [],
            filtros: [],
            pagocero: [],
            pagoOpciones: [],
            pagos: [],
            name: this.props.params.name,
            pageOfItems: [],
            estado: 0,
            filtroDel: new String(""),
            filtroAl: new String(""),
            filtroNumeros: [],
            programa: [],
            arregloInsertar: []
        }
        this.Regresar = this.Regresar.bind(this);
    }

    Regresar = (e) => {
        browserHistory.push('/');
        e.preventDefault();
    }

    render() {
        return(
            <div className= "">
                <h3>
                    Estado de pagos
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a className="Seleccionar" onClick={this.Regresar}>
                                Regresar
                                <i className="material-icons right">reply</i>
                            </a>
                        </li>
                    </ul>
                </h3>
                <hr/>
                <div className="SplitPane row">
                    <div className="col-xs-12">
                        <BuscarNuevo/>
                    </div>
                </div>
                <hr/>
                <footer>
                    <div className="row center-xs centrar color">
                        Realizado por Leones © 2018
                    </div>
                </footer>
            </div>
        )
    }

}
export default AppNueva2