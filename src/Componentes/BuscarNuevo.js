import React from 'react'
import '../App.css';
import Select from 'react-select'
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config';
import AR_tableHeaderRecibo from './AR_tableHeaderRecibo'
import AR_tableHeaderReciboPendiente from './AR_tableHeaderReciboPendiente'

import AR_EstadoAsignacion from './AR_EstadoAsginacion'
import AR_BusquedaNombre from './AR_BusquedaNombre'

const opciones = [
    {value: 'Búsqueda por nombre', label: 'Búsqueda por nombre'},
    {value: 'Búsqueda por recibo', label: 'Búsqueda por recibo'},
    {value: 'Pendiente', label:'Pendiente'}
];

class BuscarNuevo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: {value: 'Búsqueda por nombre', label: 'Búsqueda por nombre'},
            nomB: true,
            recB: false,

            objRecaudaciones: [],
            objAlumnos: [],
            ObjAsignación: [],

            buscarRec: false,
            asignarRec: false,

            dni: '',
            codigo: '',
            apeNom: '',

            alumno: null,
            opcAlumno: [],

            btnGuardar: false,
            btnReasignar: false,

            detalleRecaudaciones: {
                ape_Nom:'',
                apeNom: '',
                concepto: '',
                recibo: '',
                moneda: '',
                importe: '',
                fecha: '',
            },

            estado: false,
        }

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);

        this.onSubmitNombre = this.onSubmitNombre.bind(this);
        this.onSubmitRecibo = this.onSubmitRecibo.bind(this);
        this.onSubmitPendiente=this.onSubmitPendiente.bind(this);

        this.onSubmitAsignar = this.onSubmitAsignar.bind(this);
        this.onSubmitReasignar = this.onSubmitReasignar.bind(this);

        this.onSubmitGuardar = this.onSubmitGuardar.bind(this);

        this.onChangeDni = this.onChangeDni.bind(this);
        this.onChangeCodigo = this.onChangeCodigo.bind(this);
        this.onChangeApeNom = this.onChangeApeNom.bind(this);

        this.onClickBuscar = this.onClickBuscar.bind(this);

        this.buscarDni = this.buscarDni.bind(this);
        this.buscarCodigo = this.buscarCodigo.bind(this);
        this.buscarApellidoNombre = this.buscarApellidoNombre.bind(this);

        this.getDetalleRecaudaciones = this.getDetalleRecaudaciones.bind(this);

        this.Validar = this.Validar.bind(this);

    }

    handleChange = (selectedOption) => {
        if(selectedOption.value == 'Búsqueda por nombre'){

            this.setState({
                value: selectedOption,
                nomB: true,
                recB: false,
                buscarRec: false,
                asignarRec: false,
            });
        } else if(selectedOption.value == 'Búsqueda por recibo'){
            this.setState({
                value: selectedOption,
                nomB: false,
                recB: true,
                buscarRec: false,
                asignarRec: false,
            });
        } else if(selectedOption.value == 'Pendiente'){
            this.setState({
                value: selectedOption,
                nomB: false,
                recB: true,
                buscarRec: false,
                asignarRec: false,
            });
            this.onSubmitPendiente();
        } else{
            this.setState({
                value: null,
                nomB: false,
                recB: false,
                buscarRec: false,
                asignarRec: false,
            });
        }
    }

    handleChangeAlumno = (selectedOption) => {
        this.setState({
            alumno: selectedOption
        });
    }

    onSubmitGuardar = (e) => {
        console.log("---DATA---");
        console.log(this.state.objRecaudaciones[0].idAlum);

        fetch(CONFIG + 'alumnoalumnoprograma/add', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify ({
                    'idAlumno': this.state.objRecaudaciones[0].idAlum,
                    'codAlumno': this.state.alumno.codAlumno,
                    'idPrograma': this.state.alumno.idPrograma
                })
            })
            .then((response) => {
                console.log(response);
                if(response){
                    swal("guardado exitosamente!", "","success");
                }else{
                    swal("Oops, Algo salió mal!!", "","error");
                }
            })
            .catch((error) => {
                swal("Oops, Algo salió mal!!", "","error");
                console.log(error);
            })
    } 

    onSubmitReasignar = (e) =>{
        fetch(CONFIG + 'alumnoalumnoprograma/actualizar/' + this.state.objRecaudaciones[0].idAlum + '/' + this.state.alumno.codAlumno + '/' + this.state.alumno.idPrograma)
            .then((response) => {
                if(response){
                    console.log(response);
                    swal("Guardado exitosamente", "", "success");
                } else{
                    swal("Oops, algo salió mal", "","error");
                }
            }) 
            .catch((error) => {
                swal("Oops, algo salió mal", "","error");
            })
        e.preventDefault();
    }
    onSubmitPendiente = (e) => {
        console.log("Holi")
            fetch(CONFIG + 'recaudaciones/listar/posgrado')
                .then((response) => {
                    return response.json();
                })
                .then((recaudaciones) => {
                    console.log("---Recaudaciones---");
                    console.log(recaudaciones);
                    this.setState({
                        objRecaudaciones: recaudaciones
                    });
                    console.log("---ObjRecaudaciones---");
                    console.log(this.state.objRecaudaciones);
                    if(this.state.objRecaudaciones.length > 0){
                        this.getDetalleRecaudaciones(this.state.objRecaudaciones);
                        this.setState({
                            buscarRecPen: true,
                        });
                        fetch(CONFIG + 'alumnoalumnoprograma/buscar/' + this.state.objRecaudaciones[0].idAlum)
                            .then((response) => {
                                return response.json();
                            })
                            .then((asignacion) => {
                                console.log("---Asignación---");
                                console.log(asignacion);
                                this.setState({
                                    ObjAsignación: asignacion
                                });
                                console.log("---ObjAsignación---");
                                console.log(this.state.ObjAsignación);
                                if(this.state.ObjAsignación.length != 0){
                                    fetch(CONFIG + 'alumnoprograma/buscarc/' + this.state.ObjAsignación.codAlumno)
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((alumnos) => {
                                            console.log("---Alumnos---");
                                            console.log(alumnos);
                                            this.setState({
                                                objAlumnos: alumnos
                                            });
                                            console.log("---ObjAlumnos---");
                                            console.log(this.state.objAlumnos);
                                            if(this.state.objAlumnos.length > 0){
                                                this.setState({
                                                    estado: true,
                                                });
                                                swal("Este numero ya ha sido asignado", "", "success");
                                            }else{
                                                console.log("Array de ObjAlumnos está vació");
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                } else{
                                    console.log("Array de ObjAsignacion está vació");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else{
                        console.log("Array de ObjRecaudaciones está vació");
                        swal("Número de recibo incorrecto", "", "warning");
                    }
                })
                .catch((error) => {
                    this.setState({
                        buscarRec: false
                    });
                    swal("Algo salió mal", "", "warning")
                    console.log(error);
                });
        
    }
    onSubmitNombre = (e) => {
        var nombres = this.nombre.value.toUpperCase();
        if(!nombres){
            swal("Ingrese nombre apellido a buscar", "", "info");
        } else{
            var busqueda = {nombres: nombres};
            this.props.Busqueda(busqueda);
        }
        e.preventDefault();
    }

    onSubmitRecibo = (e) => {
        var rec = this.recibo.value;
        if(!rec){
            swal("Ingrese numero de recibo a buscar", " ", "info");
        } else{
            fetch(CONFIG + 'recaudaciones/rec/' + rec)
                .then((response) => {
                    return response.json();
                })
                .then((recaudaciones) => {
                    console.log("---Recaudaciones---");
                    console.log(recaudaciones);
                    this.setState({
                        objRecaudaciones: recaudaciones
                    });
                    console.log("---ObjRecaudaciones---");
                    console.log(this.state.objRecaudaciones);
                    if(this.state.objRecaudaciones.length > 0){
                        this.getDetalleRecaudaciones(this.state.objRecaudaciones);
                        this.setState({
                            buscarRec: true,
                        });
                        fetch(CONFIG + 'alumnoalumnoprograma/buscar/' + this.state.objRecaudaciones[0].idAlum)
                            .then((response) => {
                                return response.json();
                            })
                            .then((asignacion) => {
                                console.log("---Asignación---");
                                console.log(asignacion);
                                this.setState({
                                    ObjAsignación: asignacion
                                });
                                console.log("---ObjAsignación---");
                                console.log(this.state.ObjAsignación);
                                if(this.state.ObjAsignación.length != 0){
                                    fetch(CONFIG + 'alumnoprograma/buscarc/' + this.state.ObjAsignación.codAlumno)
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((alumnos) => {
                                            console.log("---Alumnos---");
                                            console.log(alumnos);
                                            this.setState({
                                                objAlumnos: alumnos
                                            });
                                            console.log("---ObjAlumnos---");
                                            console.log(this.state.objAlumnos);
                                            if(this.state.objAlumnos.length > 0){
                                                this.setState({
                                                    estado: true,
                                                });
                                                swal("Este numero ya ha sido asignado", "", "success");
                                            }else{
                                                console.log("Array de ObjAlumnos está vació");
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                } else{
                                    console.log("Array de ObjAsignacion está vació");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else{
                        console.log("Array de ObjRecaudaciones está vació");
                        swal("Número de recibo incorrecto", "", "warning");
                    }
                })
                .catch((error) => {
                    this.setState({
                        buscarRec: false
                    });
                    swal("Algo salió mal", "", "warning")
                    console.log(error);
                });
        }
        e.preventDefault();
    }
    getDetalleRecaudaciones = (objRec) => {
        console.log("objRec",objRec)
        if(objRec[0].moneda == '108'){
            this.setState({
                detalleRecaudaciones: {
                    ape_nom:objRec[0].ape_nom,
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: 'Soles',
                    importe: objRec[0].importe,
                    fecha: objRec[0].fecha
                }
            });
        } else if(objRec[0].moneda == '113'){
            this.setState({
                detalleRecaudaciones: {
                    ape_nom:objRec[0].ape_nom,
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: 'Dólares',
                    importe: objRec[0].importe,
                    fecha: objRec[0].fecha
                }
            });
        } else{
            this.setState({
                detalleRecaudaciones: {
                    ape_nom:objRec[0].ape_nom,
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: '-',
                    importe: objRec[0].importe,
                    fecha: objRec[0].fecha
                }
            });
        }
    }
 
    onClickBuscar = (e) => {
        this.setState({
            asignarRec: true,
        });
        e.preventDefault();
    } 

    render () {
        return (
            <div>
                <div className="col-xs-3">
                    <Select value={this.state.value} onChange={this.handleChange} options={opciones}/>
                </div>
                {this.state.nomB?(
                    <form>
                        <div className="SplitPane row">
                            <div className="col-xs-3 margen2">
                                <input ref={ ( input ) => this.nombre = input } type="text" maxLength="100" placeholder="Nombres Apelllidos" /> 
                            </div>
                            <div className="col-xs-2 margen2">
                                <button  className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitNombre}>
                                    Buscar
                                    <i className="large material-icons left">search</i>
                                </button>
                            </div>
                        </div>
                    </form>
                ): (null)}
                {this.state.recB?(
                    <div>
                        <form>
                            <div className="SplitPane row">
                                <div className="col-xs-3 margen2">
                                    <input ref={ ( input ) => this.recibo = input } type="text" maxLength="100" placeholder="Número de recibo" /> 
                                </div>
                                <div className="col-xs-2 margen2">
                                    <button  className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitRecibo}>
                                        Buscar
                                        <i className="large material-icons left">search</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {this.state.buscarRec?(
                            <div className="row justify-content-md-center">
                                <table className="table">
                                    <AR_tableHeaderRecibo/>
                                    
                                    <tbody>
                                        <tr>
                                            <td className="td1">{1}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.apeNom}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.concepto}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.recibo}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.moneda}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.importe}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.fecha}</td>
                                            <td className="td1">
                                                <AR_EstadoAsignacion estadoAsignacion={this.state.estado} recibo={this.state.objRecaudaciones} alumno={this.state.objAlumnos}/>
                                            </td>
                                            <td className="td1">
                                                <form>
                                                    <div className="SplitPane row">
                                                        <div className="col-xs-10">
                                                            <Select value={this.state.alumno} onChange={this.handleChangeAlumno} options={this.state.opcAlumno}/>
                                                        </div>
                                                        <div className="col-xs-1">
                                                            <button className="waves-effect waves-light btn-small" onClick={this.onClickBuscar}>
                                                                <i className="large material-icons left">search</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-6">
                                        <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitGuardar}>
                                            Asignar <i className="large material-icons left">save</i>
                                        </button>
                                    </div>
                                    <div className="col col-lg-6">
                                        <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitReasignar}>
                                            Reasignar <i className="large material-icons left">save</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ): (null)}
                        {this.state.buscarRecPen?(
                            <div className="row justify-content-md-center">
                                <table className="table">
                                    <AR_tableHeaderReciboPendiente/>
                                    <tbody>
                                        <tr>
                                            <td className="td1">{1}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.ape_nom}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.concepto}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.recibo}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.moneda}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.importe}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.fecha}</td>
                                            <td className="td1">
                                                <form>
                                                    <div className="SplitPane row">
                                                        <div className="col-xs-10">
                                                            <Select value={this.state.alumno} onChange={this.handleChangeAlumno} options={this.state.opcAlumno}/>
                                                        </div>
                                                        <div className="col-xs-1">
                                                            <button className="waves-effect waves-light btn-small" onClick={this.onClickBuscar}>
                                                                <i className="large material-icons left">search</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-6">
                                        <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitGuardar}>
                                            Asignar <i className="large material-icons left">save</i>
                                        </button>
                                    </div>
                                    <div className="col col-lg-6">
                                        <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitReasignar}>
                                            Reasignar <i className="large material-icons left">save</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ): (null)}
                    </div>
                ): (null)}
                <hr/>
                {this.state.asignarRec?(
                    <div>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-2">
                                <input className="autocomplete" value={this.state.dni} onChange={this.onChangeDni} placeholder="DNI"></input>
                            </div>
                            <div className="col col-lg-2">
                                <input className="autoomplete" value={this.state.codigo} onChange={this.onChangeCodigo} placeholder="Código"></input>
                            </div>
                            <div className="col col-lg-4">
                                <input className="autocomplete" value={this.state.apeNom} onChange={this.onChangeApeNom} placeholder="Apellidos y Nombres"></input>
                            </div>
                        </div>
                        <br/>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-2">
                                <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitAsignar}>
                                    Buscar <i className="large material-icons left">search</i>
                                </button>
                            </div>
                        </div>
                    </div>
                ): (null)}
            </div>
        )
    }

    onSubmitAsignar = (e) => {
        this.Validar(this.state.dni, this.state.codigo, this.state.apePat, this.state.apeMat, this.state.nombre);
        if(this.state.dni != '' && this.state.codigo == '' && this.state.apeNom == ''){
            this.buscarDni(this.state.dni, e);
        } else if(this.state.dni == '' && this.state.codigo != '' && this.state.apeNom == ''){
           this.buscarCodigo(this.state.codigo, e);
        } else if(this.state.dni == '' && this.state.codigo == '' && this.state.apeNom != ''){
            this.buscarApellidoNombre(this.state.apeNom, e);
        } else{
            swal("Lo sentimos, sólo puede llenar un campo para la búsqueda", "", "info");
        }
        e.preventDefault();
    }

    onChangeDni = (e) => {
        this.setState({
            dni: e.target.value
        });
        e.preventDefault();
    }

    onChangeCodigo = (e) => {
        e.preventDefault();
        this.setState({
            codigo: e.target.value
        });
    }

    onChangeApeNom = (e) => {
        e.preventDefault();
        this.setState({
            apeNom: e.target.value
        });
    }

    buscarDni = (dni) => {
        fetch(CONFIG + 'alumnoprograma/buscard/' + dni)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                for(var i = 0; i < alumnos.length; i++){
                    var e = {
                        codAlumno: alumnos[i].codAlumno,
                        idPrograma: alumnos[i].idPrograma, 
                        value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                        label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                    }
                    Array.push(e);
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
                swal("Consulta realizada exitosamente!", "", "success");
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
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                for(var i = 0; i < alumnos.length; i++){
                    var e = {
                        codAlumno: alumnos[i].codAlumno,
                        idPrograma: alumnos[i].idPrograma, 
                        value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                        label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                    }
                    Array.push(e);
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
                swal("Consulta realizada exitosamente!", "", "success");
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarApellidoNombre = (apellidoNombre, e) => {
        console.log(this.state.apePat, "Apellidos y Nombres");

        var nombre = apellidoNombre;
        var separador = ' ';
        var arregloCadenas = nombre.split(separador);
        var arreglo = [];

        for(let i = 0; i < arregloCadenas.length; i++){
            if(arregloCadenas[i] != ''){
                arreglo.push(arregloCadenas[i]);
            }
        }
        var nuevoNombre = arreglo.join('&');

        fetch(CONFIG + 'alumnoprograma/leer/' + nuevoNombre)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                for(var i = 0; i < alumnos.length; i++){
                    var e = {
                        codAlumno: alumnos[i].codAlumno,
                        idPrograma: alumnos[i].idPrograma, 
                        value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                        label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                    }
                    Array.push(e);
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
                swal("Consulta realizada exitosamente!", "", "success");
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    Validar(dni, codigo, apellidoNombre){
        if(dni == '' && codigo == '' && apellidoNombre == ''){
            swal("Ingrese uno de los campos para realizar la búsqueda", "", "info");
            return false;
        } else{
            return true;
        }
    } 

}
export default BuscarNuevo