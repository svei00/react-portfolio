import React, { Component } from 'react';
import randomColor from 'randomcolor';
import CloudItem from './CloudItem';
import { TagCloud } from 'react-tagcloud';


const styles = {
    large: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    small: {
        opacity: 0.7,
        fontSize: 16
    }
};
class MyCloud extends Component {
    componentDidMount() {
        setInterval(() => {
            this.forceUpdate();
        }, 3000);
    }

    render() {
        return (
            <div className='app-outer'>
                <div className='app-inner' key="inner">
                    <TagCloud
                        className='tag-cloud'
                        style={{
                            fontFamily: 'sans-serif',
                            //fontSize: () => Math.round(Math.random() * 50) + 16,
                            fontSize: 20,
                            color: () => randomColor({
                                hue: 'blue'
                            }),
                            padding: 5,
                        }}>
                        <div className="ran"
                            style={{
                                fontFamily: 'serif',
                                fontSize: 30,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                color: randomColor()
                            }}>React</div>
                        <CloudItem className="clo-item-JS" text="JavaScript" />
                        <CloudItem className="clo-item-GIT" text="GIT" />
                        <div style={styles.large} className="clo-react">React</div>
                        <div style={styles.large} className="clo-css">CSS3</div>
                        <div style={styles.large} className="clo-redux">Redux</div>
                        <div style={styles.large} className="clo-jsx">JSX</div>
                        <div style={{ fontFamily: 'courier' }}>Bootstrap</div>
                        <div style={{ fontSize: 20 }}>Node.js</div>
                        <div style={{ fontStyle: 'italic' }}>WebPack</div>
                        <div style={{ fontWeight: 200 }}>npm</div>
                        <div style={{ color: 'green' }}>AJAX</div>
                        <div className="tag-item-wrapper" key="item-wrapper">
                        </div>
                        <div>HTML5</div>
                        <div>GitHub</div>
                        <div>SCSS</div>
                        <div>SPA</div>
                        <div>OOP</div>
                        <div>SASS</div>
                        <div>HTML5</div>
                        <div>CSS3</div>
                        <div style={styles.small}>WebPack</div>
                        <div style={styles.small}>Node.js</div>
                        <div style={styles.small}>npm</div>
                    </TagCloud>
                </div>
            </div>
        );
    }
}
export default MyCloud;