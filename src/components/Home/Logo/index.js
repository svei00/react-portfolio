import './index.scss';
import letterV from '../../../assets/images/LogoExcelTrim.png'
import { useEffect, useRef } from 'react';
import gsap from 'gsap-trial'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'


const Logo = () => {
    const bgRef = useRef();
    const outlineLogoRef = useRef();
    const solidLogoRef = useRef();

    useEffect(() => {
        gsap.registerPlugin(DrawSVGPlugin)

        gsap
        .timeline()
        .to(bgRef.current, {
            duration: 1,
            opacity: 1,
        })
        .from(outlineLogoRef.current, {
            drawSVG: 0,
            duration: 20,
        })

        gsap.fromTo(
            solidLogoRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                delay: 4,
                duration: 4,
            }
        )
    },[])
    
    return (
        <div className='logo-container' ref={bgRef}>
            <img className='solid-logo' ref={solidLogoRef} src={letterV} alt='V' />
            {/* 
            <svg 
                width='559px'
                height='897px'
                version='1.2'
                viewBox="0 0 559 897"
                xmlns="http://www.w3.org/2000/svg" 
                >
                <g
                    className='svg-container'
                    //transform='translate(0 457) scale(.1 -.1)'
                    fill='none'
                    >
                    <polygon 
                    ref={outlineLogoRef}
                    points="291.21 87.31 191.21 378.13 115.04 378.13 15.04 87.31 90.82 87.31 154.11 284.38 217.39 87.31 291.21 87.31" fill="none" />
                    <polyline ref={outlineLogoRef} points="217 86.87 248 63.87 322 63.87 290.05 90.68" fill="none" />
                    <polyline ref={outlineLogoRef} points="191 377.87 222 354.87 322 63.87" fill="none" />
                    <polyline ref={outlineLogoRef} points="91 86.87 122 63.87 46 63.87 15 86.87" fill="none" />
                    <line ref={outlineLogoRef} x1="172" y1="225.87" x2="122" y2="66.66" fill="none" />
                    <line ref={outlineLogoRef} x1="123.28" y1="70.73" x2="122" y2="63.87" fill="none" />
                </g>
            </svg> 
            */}
        </div>
    )
}

export default Logo;