import React from 'react'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';
import swal from 'sweetalert'
import AR_buscarAlumno from './AR_buscarAlumno';

class Asignar_Recibo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            buscar:true,
            rec: '', //Variable para la solicitud del recibo
            objeto:[]
        };

        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Regresar = this.Regresar.bind(this);
    }

    onSubmit2=(e)=>{
        var recValidado= this.ValidarRecibo(this.state.rec);
        console.log(this.state.rec,"recibo")
        fetch(CONFIG + 'recaudaciones/rec/' + this.state.rec)
            .then(
              (response)=>{
                return response.json();
              })
            .then((recaudaciones)=>{
                console.log(recaudaciones,"recaudaciones");
                console.log(this.state.buscar,"estadoSucces")
                if(recaudaciones.length>0){
                    this.state.buscar=false;
                    this.setState((prevState, props) =>{
                        return {objeto:this.state.objeto.concat(recaudaciones)}
                    });
                    swal("Consulta realizada exitosamente!" ,"", "success")
                }else{
                    this.state.buscar=true;
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch(error => {
                this.state.buscar=true;
                console.log(this.state.buscar,"estadoError")
                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
            e.preventDefault();
    }

    ValidarRecibo (recibo) {
        if(!recibo){
          swal("Ingrese un numero de recibo", "", "info");
          return false;
        }else{
          return true;
        }
    }

    onChange = (e) => {
        this.setState({
            rec: e.target.value
        });
    }

    Regresar=(e)=>{
        browserHistory.push('/vista/loginNyA');
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h3>
                    Asignación de recibo por alumno
                    <ul id="nav-mobile" className="right  hide-on-med-and-down">
                        <li >
                            <a className="seleccionar" onClick={this.Regresar} >Regresar
                                <i className="material-icons right">reply</i>
                            </a>
                        </li>
                    </ul>
                </h3>
                <hr/>
                <div className="SplitPane row">
                    <div className="col-xs-6">
                        <form>
                            <div className="row justify-content-md-center">
                                <div className="col-xs-5 centrar">
                                <input className="autocomplete" value={this.state.rec} onChange={this.onChange} placeholder="Numero de recibo" ></input>
                                <button className="waves-effect waves-light btn-large btn-center" type="submit" onClick={this.onSubmit2}>
                                    Buscar <i className="large material-icons left">search</i>
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-6">
                        <form>
                            <div className="row justify-content-md-center">
                                <div className="col-xs-8 centrar">
                                <input className="autocomplete" value={this.state.dni} onChange={this.onChangeDni} placeholder="DNI"></input>
                                <input className="autoomplete" value={this.state.codigo} onChange={this.onChangeCodigo} placeholder="Código"></input>
                                <input className="autocomplete" value={this.state.apePat} onChange={this.onChangeApePaterno} placeholder="Apellido paterno"></input>
                                <input className="autocomplete" value={this.state.apeMat} onChange={this.onChangeApeMaterno} placeholder="Apellido Materno"></input>                                                
                                <input className="autocomplete" value={this.state.nombre} onChange={this.onChangeNombre} placeholder="Nombres"></input>
                                </div>
                            </div>
                        </form>
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

export default Asignar_Recibo