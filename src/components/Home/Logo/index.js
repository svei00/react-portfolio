import './index.scss';
import letterV from '../../../assets/images/3D-Letter-V.png'
import { useRef } from 'react';

const Logo = () => {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();
    
    return (
        <div className='logo-container'>
            <img src={letterV} alt='V' />
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 559 897"
                width='559pt'
                height='897'>
                <g
                    className='svg-container'
                    transform='translate(0 457) scale(.1 -.1)'
                    fill='none'>
                    <polygon points="291.21 87.31 191.21 378.13 115.04 378.13 15.04 87.31 90.82 87.31 154.11 284.38 217.39 87.31 291.21 87.31" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                    <polyline points="217 86.87 248 63.87 322 63.87 290.05 90.68" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                    <polyline points="191 377.87 222 354.87 322 63.87" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                    <polyline points="91 86.87 122 63.87 46 63.87 15 86.87" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                    <line x1="172" y1="225.87" x2="122" y2="66.66" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                    <line x1="123.28" y1="70.73" x2="122" y2="63.87" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                </g>
            </svg>
        </div>
    )
}

export default Logo;