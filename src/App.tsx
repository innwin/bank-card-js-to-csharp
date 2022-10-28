import React from 'react';
import './App.css';
import {bankCardExplainToCSharp} from "./bankCardExplain";

function App() {
    return (
        <div className="App">
            <span>
                {bankCardExplainToCSharp()}
            </span>
        </div>
    );
}

export default App;
