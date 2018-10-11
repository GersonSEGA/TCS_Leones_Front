import React from 'react'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';
import swal from 'sweetalert'
import AR_tablaRecivo from './AR_tablaRecivo';
import AR_tablaAsignacion from './AR_tablaAsignacion';

class Asignar_Recibo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            idAlum: '',
            codAlum: '',
            idPrograma: '',
            objAsignacion: [],
            //---------------------------------------------
            flag: false,
            buscar: false,
            //----------------------------------------------
            rec: '', 
            objRecaudaciones: [],
            //----------------------------------------------
            dni: '',
            codigo: '',
            apePat: '',
            apeMat: '',
            nombre: '',
            objAlumnos: [],
            //----------------------------------------------
            alumRecibo: {
                numero: '',
                codAlumno: '',
                nom_programa: '',
                nomAlumno: '',
            }
        };

        this.onSubmitRecibo = this.onSubmitRecibo.bind(this);
        this.onSubmitAlumno = this.onSubmitAlumno.bind(this);
        this.buscarDni = this.buscarDni.bind(this);
        this.buscarCodigo = this.buscarCodigo.bind(this);
        this.buscarApePaterno = this.buscarApePaterno.bind(this);
        this.buscarApeMaterno = this.buscarApeMaterno.bind(this);
        this.buscarNombre = this.buscarNombre.bind(this);
        this.asignar = this.asignar.bind(this);
        this.onChangeRecibo = this.onChangeRecibo.bind(this);
        this.onChangeDni = this.onChangeDni.bind(this);
        this.onChangeCodigo = this.onChangeCodigo.bind(this);
        this.onChangeApePaterno = this.onChangeApePaterno.bind(this);
        this.onChangeApeMaterno = this.onChangeApeMaterno.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.Regresar = this.Regresar.bind(this);
    }

    buscarAsignacion = (idAlum) => {
        fetch(CONFIG + 'alumnoalumnoprograma/buscar/' + idAlum)
            .then ((response) => {
                return response.json();
            })
            .then((asignacion) => {
                console.log(asignacion, "Asignacion");
                if(asignacion.length > 0){
                    this.setState((prevState, props) => {
                        return {objAsignacion: this.state.objAsignacion.concat(asignacion)}
                    });
                    if(this.state.objAsignacion.length > 0){
                        this.buscarCodigo(this.state.objAsignacion[0].codAlumno);
                    } else{
                        console.log("No Entró");
                    }
                }
                swal("El recibo ya está asignado a un alumno!" ,"", "success")
            })
            .catch((error) => {
                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
    }

    asignar = (e) => {
        for(let i = 0; i < this.state.objAlumnos.length; i++){
            this.setState({
                alumRecibo: {
                    numero: this.state.objRecaudaciones[i].numero,
                    codAlumno: this.state.objAlumnos[i].codAlumno,
                    nom_programa: this.state.objAlumnos[i].nom_programa,
                    nomAlumno: this.state.objAlumnos[i].apePaterno + " " + this.state.objAlumnos[i].apeMaterno + " " + this.state.objAlumnos[i].nomAlumno,
                }
            });
        }
        e.preventDefault();
    }

    onSubmitRecibo = (e) => {
        this.ValidarRecibo(this.state.rec);
        console.log(this.state.rec,"recibo")
        fetch(CONFIG + 'recaudaciones/rec/' + this.state.rec)
            .then((response )=> {
                return response.json();
              })
            .then((recaudaciones) => {
                console.log(recaudaciones,"recaudaciones");
                console.log(this.state.buscar,"estadoSuccess")
                if(recaudaciones.length > 0) {
                    this.state.buscar = true;
                    this.setState((prevState, props) =>{
                        return {objRecaudaciones: this.state.objRecaudaciones.concat(recaudaciones)}
                    });
                    swal("Consulta realizada exitosamente!" ,"", "success")
                    if(this.state.objRecaudaciones.length > 0){
                        this.buscarAsignacion(this.state.objRecaudaciones[0].idAlum);
                        this.asignar();
                    } 
                }else{
                    this.state.buscar=true;
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch(error => {
                this.state.buscar = false;
                console.log(this.state.buscar,"estadoError")
                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
            e.preventDefault();
    }

    onChangeRecibo = (e) => {
        this.setState({
            rec: e.target.value
        });
    }

    ValidarRecibo (recibo) {
        if(!recibo){
          swal("Ingrese un numero de recibo", "", "info");
          return false;
        }else{
          return true;
        }
    }

    //----------------------------------------------------------------------------------------

    buscarDni = (dni, e) => {
        fetch(CONFIG + 'alumnoprograma/buscard/' + dni)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log(alumnos, "alumnos");
                if(alumnos.length > 0){
                    this.setState((prevState, props) => {
                        return {objAlumnos: this.state.objAlumnos.concat(alumnos)}
                    });
                    swal("Consulta realizada exitosamente!", "", "success");
                } else{
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarCodigo = (codigo) => {
        console.log(codigo, "Codigo");
        fetch(CONFIG + 'alumnoprograma/buscarc/' + codigo)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log(alumnos, "alumnos");
                if(alumnos.length > 0){
                    this.setState((prevState, props) => {
                        return {objAlumnos: this.state.objAlumnos.concat(alumnos)}
                    });
                    console.log(this.state.objAlumnos);
                    swal("Consulta realizada exitosamente!", "", "success");
                } else{
                    console.log(this.state.objAlumnos);
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarApePaterno = (apePaterno, e) => {
        console.log(this.state.apePat, "Apellido Paterno");
        fetch(CONFIG + 'alumnoprograma/leer/' + apePaterno)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log(alumnos, "alumnos");
                if(alumnos.length > 0){
                    console.log("entró");
                    this.setState((prevState, props) => {
                        return {objAlumnos: this.state.objAlumnos.concat(alumnos)}
                    });
                    console.log(this.state.objAlumnos);
                    swal("Consulta realizada exitosamente!", "", "success");
                } else{
                    console.log(this.state.objAlumnos);
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarApeMaterno = (apeMaterno, e) => {
        console.log(this.state.apeMat, "Apellido Materno");
        fetch(CONFIG + 'alumnoprograma/leer/' + apeMaterno)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log(alumnos, "alumnos");
                if(alumnos.length > 0){
                    console.log("entró");
                    this.setState((prevState, props) => {
                        return {objAlumnos: this.state.objAlumnos.concat(alumnos)}
                    });
                    console.log(this.state.objAlumnos);
                    swal("Consulta realizada exitosamente!", "", "success");
                } else{
                    console.log(this.state.objAlumnos);
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarNombre = (nombre, e) => {
        console.log(this.state.apeMat, "Nombre");
        fetch(CONFIG + 'alumnoprograma/leer/' + nombre)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log(alumnos, "alumnos");
                if(alumnos.length > 0){
                    console.log("entró");
                    this.setState((prevState, props) => {
                        return {objAlumnos: this.state.objAlumnos.concat(alumnos)}
                    });
                    console.log(this.state.objAlumnos);
                    swal("Consulta realizada exitosamente!", "", "success");
                } else{
                    console.log(this.state.objAlumnos);
                    swal("No se encontró informacion", "", "info");
                }
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    onSubmitAlumno = (e) => {
        var dniValidado = this.Validar(this.state.dni, this.state.codigo, this.state.apePat, this.state.apeMat, this.state.nombre);
        if(this.state.dni != '' && this.state.codigo == '' && this.state.apePat == '' && this.state.apeMat == '' && this.state.nombre == ''){
            this.buscarDni(this.state.dni, e);
        } else if(this.state.dni == '' && this.state.codigo != '' && this.state.apePat == '' && this.state.apeMat == '' && this.state.nombre == ''){
           this.buscarCodigo(this.state.codigo, e);
        } else if(this.state.dni == '' && this.state.codigo == '' && this.state.apePat != '' && this.state.apeMat == '' && this.state.nombre == ''){
            this.buscarApePaterno(this.state.apePat, e);
        } else if(this.state.dni == '' && this.state.codigo == '' && this.state.apePat == '' && this.state.apeMat != '' && this.state.nombre == ''){
            this.buscarApeMaterno(this.state.apeMat, e);
        } else if(this.state.dni == '' && this.state.codigo == '' && this.state.apePat == '' && this.state.apeMat == '' && this.state.nombre != ''){
            this.buscarNombre(this.state.nombre, e);
        } else{
            swal("Lo sentimos, sólo puede llenar un campo para la búsqueda", "", "info");
        }
        e.preventDefault(); 
    }

    onChangeDni = (e) => {
        this.setState({
            dni: e.target.value
        });
    }

    onChangeCodigo = (e) => {
        this.setState({
            codigo: e.target.value
        });
    }

    onChangeApePaterno = (e) => {
        this.setState({
            apePat: e.target.value
        });
    }

    onChangeApeMaterno = (e) => {
        this.setState({
            apeMat: e.target.value
        });
    }

    onChangeNombre = (e) => {
        this.setState({
            nombre: e.target.value
        });
    }

    Validar(dni, codigo, apePat, apeMat, nombre){
        if(dni == '' && codigo == '' && apePat == '' && apeMat == '' && nombre == ''){
            swal("Ingrese uno de los campos para realizar la búsqueda", "", "info");
            return false;
        } else{
            return true;
        }
    } 

    //----------------------------------------------------------------------------------------

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
                <div className="container">
                <div className="SplitPane row">
                    <div className="col-xs-6">
                        <form>
                            <div className="row justify-content-md-center">
                                <div className="col-xs-5 centrar">
                                    <br/><h4>Buscar recibo</h4><br/><br/>
                                    <input className="autocomplete" value={this.state.rec} onChange={this.onChangeRecibo} placeholder="Numero de recibo" ></input>
                                    <button className="waves-effect waves-light btn-large btn-center" type="submit" onClick={this.onSubmitRecibo}>
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
                                    <br/><h4>Buscar alumno</h4><br/>
                                    <input className="autocomplete" value={this.state.dni} onChange={this.onChangeDni} placeholder="DNI"></input>
                                    <input className="autoomplete" value={this.state.codigo} onChange={this.onChangeCodigo} placeholder="Código"></input>
                                    <input className="autocomplete" value={this.state.apePat} onChange={this.onChangeApePaterno} placeholder="Apellido paterno"></input>
                                    <input className="autocomplete" value={this.state.apeMat} onChange={this.onChangeApeMaterno} placeholder="Apellido Materno"></input>                                                
                                    <input className="autocomplete" value={this.state.nombre} onChange={this.onChangeNombre} placeholder="Nombres"></input>
                                    <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitAlumno}>
                                        Buscar <i className="large material-icons left">search</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <hr/>
                <div className="SplitPane row">
                    {this.state.buscar?(
                        <AR_tablaAsignacion objeto={this.state.alumRecibo}/>
                    ): (null)}
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