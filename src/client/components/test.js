import React from 'react';
import { subscribe } from './Store';

const Test = props => {
    return (
        <>
            <h1>{props.greeter} {props.name}</h1>
            <button onClick={() => props.setName('Toto')}>test</button>
        </>
    )
}


export default subscribe()(Test);
