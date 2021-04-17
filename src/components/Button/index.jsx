import { Component } from "react";
import "./style.css";
export class Button extends Component {
    render() {
        const { Qualquertexto, onClick, disabled } = this.props;/*para chamar função onclick precisa declarar aqui*/
        
        return (
           
            <button 
            disabled={disabled}
            className='button'
            onClick={onClick}
            >
            {Qualquertexto}
            </button>
            
        )
    }
}