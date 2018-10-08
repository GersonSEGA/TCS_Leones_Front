import React from 'react'

class BuscarNuevo extends React.Component {
  addNewFiltro(e) {
    e.preventDefault();
    var nombres = this.nombre.value.toUpperCase();

    if(!nombres){
      alert("Ingrese nombre apellido a buscar");
    }else{
      var busqueda = {nombres: nombres}
      this.props.Busqueda( busqueda);
    }
    
}

  render() {
    return(
      <form onSubmit={(e) => this.addNewFiltro(e)}>
         <div className="SplitPane row">
            <div className="col-xs-4 margen2">
            <input id="autocomplete-input" className="autocomplete" ref={ ( input ) => this.nombre = input } type="text" maxLength="100" placeholder="Nombres Apelllidos" /> 
            </div>
            <div className="col-xs-2 margen2">
              <button  className="waves-effect waves-light btn-large center"type="submit">Buscar<i className="large material-icons left">search</i></button>
            </div>
         </div>
        
        
        
      </form>
    )
  }
}

export default BuscarNuevo