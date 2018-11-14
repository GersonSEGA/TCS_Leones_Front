import React from 'react'
import PagoListNuevo2 from './Pago-list-nuevo2'
import '../App2.css';
import BuscarNuevo from './BuscarNuevo';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'

class AR_BusquedaNombre extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            nombre_select: '',
            conceptos : [],
            todos:false,
            nombre: '',
            apellido: '',
            checkbox_:[],
            filtros: [],
            pagocero: [],
            pagoOpciones:[],
            pagos: [],
            name: this.props.params.name,
            pageOfItems: [],
            estado:0,
            filtroDel:new String(""),
            filtroAl:new String(""),
            filtroNumeros: [],
            programa:[],
            arregloInsertar:[]
        }

        this.enviar=this.enviar.bind(this);
        this.BuscarNombre = this.BuscarNombre.bind(this);
        this.Asignar = this.Asignar.bind(this);
        this.PagoAsignar=this.PagoAsignar.bind(this);
    }

    render() {
        return(
            <div className="row center-xs centrar">
                <div className="center-xs-12 margin_top ">
                    <PagoListNuevo2 Opcion={this.BuscarNombre} nombreBusqueda={this.state.nombre} nombre={this.state.nombre_select} funcion={this.Funcion} listado={this.state.pagocero}/>
                </div>
            </div>
        )
    }

    PagoAsignar = (opcion) => {
        if(opcion != null){
            this.setState({
                arregloInsertar: opcion
            });
        }
    }

    Asignar = (e) => {
        var check = [];
        var opcionesSeleccionadas = [];
        var listadoAlumnoPrograma = [];

        check = document.getElementsByClassName("opcion2");

        for(var item of check){
            opcionesSeleccionadas.push(item.id);
        }

        var listado2 = this.state.pagocero;
        var indices = [];

        for(let i = 0; i < listado2.length; i++){
            var index = opcionesSeleccionadas[i];
            if(!index){
                listadoAlumnoPrograma.push(null);
            } else{
                var ap = listado2[i].alumnoPrograma[index];
                listadoAlumnoPrograma.push(ap);
            }
        }

        var pagoInsertar = [];
        var pagosActualizados = this.state.pagocero;
        for(let i = 0; i < pagosActualizados.length; i++){
            var ap = listadoAlumnoPrograma[i];
            if(ap != null){
                var listadoRec = {
                    'idAlumno': pagosActualizados[i].idAlum,
                    'codAlumno': ap.codAlumno,
                    'idPrograma': ap.idPrograma
                }
                pagoInsertar.push(listadoRec);
            }
        }
    }

}
export default AR_BusquedaNombre 