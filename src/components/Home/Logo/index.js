import { useRef } from 'react';
import LogoEx from '../../../assets/images/LogoExcelv2_1850x650.png'
import './index.scss';

const Logo = () => {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();
    
    return (
        <div className='logo-container'>
            <img className='solid-logo' src={LogoEx} alr='Excel Solutionsv' />
            <svg
                width='559pt'
                height='897pt'
                version='1.0'
                viewBox='0 0 559 897'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g
                    className='svg-container'
                    transform='translate(0 457) scale(.1 -.1)'
                    fill='none'
                >
                    <path></path>
                </g>
            </svg>
        </div>
    )
}

export default Logo;