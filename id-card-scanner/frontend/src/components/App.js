import React, { useState, useRef, useEffect } from 'react';
import Scanner from './Scanner';
import Result from './Result';

const App = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const [currentCode, setCurrentCode] = useState(null);
    const scannerRef = useRef(null);

    const handleDetection = (code) => {
        if(code != currentCode)
            setCurrentCode(code);
    }

    useEffect(() => {
        fetch(`/readCode?barcodeValue=${currentCode}`);
    }, [currentCode])

    return (
        <div>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
            <ul className="results">
                {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
            </ul>
            <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    // left: '0px',
                    // height: '100%',
                    // width: '100%',
                    border: '3px solid green',
                }} width="640" height="480" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={handleDetection} /> : null}
            </div>
        </div>
    );
};

export default App;
