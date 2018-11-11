import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

class AR_EstadoAsignacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          detalle: {
              codigo: '',
              nombre: '',
              programa: ''
          },
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = (e) => {
        var prog = this.props.alumno[0].nom_programa;
        var separador = ' ';
        var arrayCadenas = prog.split(separador);
        var arreglo = [];
        for(let i = 0; i < arrayCadenas.length; i++){
            if(arrayCadenas[i] != ' ' && arrayCadenas[i] != 'DE' && arrayCadenas[i] != 'LA' && arrayCadenas[i] != 'EL' && arrayCadenas[i] != 'EN' &&
               arrayCadenas[i] != ' ' && arrayCadenas[i] != 'DEL' && arrayCadenas[i] != 'LAS'){
                arreglo.push(arrayCadenas[i]);
            }
        }
        console.log('---PROGRAMA---');
        var newPrograma = '';
        for(let i = 0; i < arreglo.length; i++){
            newPrograma += arreglo[i].substr(0, 1);
            console.log(newPrograma);
        }
        this.setState({
            detalle: {
                codigo: this.props.alumno[0].codAlumno,
                nombre: this.props.recibo[0].apeNom,
                programa: newPrograma,
            },
            modal: !this.state.modal
        });
        e.preventDefault();
    }

    render(){
        if(this.props.estadoAsignacion === true){
            return(
                <div>
                    <Button color="success" onClick={this.toggle}>
                        Asignado
                        <i className="large material-icons left">visibility</i>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Detalles del Recibo Asignado</ModalHeader>
                        <ModalBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="th">Código</th>
                                        <th className="th">Apellidos y Nombres</th>
                                        <th className="th">Programa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="td">{this.state.detalle.codigo}</td>
                                        <td className="td">{this.state.detalle.nombre}</td>
                                        <td className="td">{this.state.detalle.programa}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Aceptar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        } else{
            return(
                <div>
                    No Asignado
                </div>
            )
        }
    }

}

export default AR_EstadoAsignacion