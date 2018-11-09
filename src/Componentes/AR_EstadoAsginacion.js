import React from 'react'

class AR_EstadoAsignacion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            show: false,
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ 
            show: false 
        });
    }
    
    handleShow() {
        this.setState({ 
            show: true 
        });
    }

    render(){
        if(this.props.estadoAsignacion === true){
            return(
                <div className="row justify-content-md-center">
                    <div className="col-xs-4">
                        Asignado
                    </div>
                    <div className="col-xs-1">
                        <button  className="waves-effect waves-light btn-small" type="button" data-toggle="modal" data-target="#exampleModal">
                            <i className="large material-icons left">visibility</i>
                        </button>
                    </div>
                </div>
            )
        } else{
            return(
                <div>
                    -
                </div>
            )
        }
    }

}

export default AR_EstadoAsignacion