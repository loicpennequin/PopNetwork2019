import React, { Component } from 'react';
import { subscribe } from 'daria-store';

class Test extends Component{
    static foo(){
        console.log('foo')
    }
    render(){
        const { greeter, name, setName, color } = this.props;
        return (
            <>
                <h1 style={{color: color}}>{greeter} {name}</h1>
                <button onClick={() => setName('Toto')}>test</button>
            </>
        )
    }
}

export default subscribe()(Test);
