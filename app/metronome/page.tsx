"use client"

import '../globals.css'
import '../range.css'
import './metronome.css'
import {handleRangeInput} from './metronome'
import { handleTempoButtons } from './metronome'
import { playMetronomeAudio } from './metronome'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'  
import Link from 'next/link'

export default function Home() {
    const [playImg, setPlayImg] = useState('/assets/play.png')
    const [clicked, setClicked] = useState(false)
    const clickedRef = useRef(clicked)
    
    // Updates whenever clicked changes value
    useEffect(() => {
        clickedRef.current = clicked;    
    }, [clicked]);
    
    useEffect(() => {    
        
        // Toggle the right play asset on enter or space
        function onKeyDown(e: KeyboardEvent) {
            if (e.code === 'Space' || e.code === 'Enter') {
                const newImage = clickedRef.current ? '/assets/play.png' : '/assets/pause.png';
                setPlayImg(newImage);  
                setClicked(prev => !prev);
            }
        }
        window.addEventListener('keydown', onKeyDown);
        
        handleRangeInput();
        const cleanupButtons = handleTempoButtons();
        const cleanupMetronome = playMetronomeAudio();
        
        return () => {
            cleanupButtons(); 
            cleanupMetronome(); 
            window.removeEventListener('keydown', onKeyDown)
        };
        
    }, []);
    
    // Toggles play/pause button images
    function handlePlayClick() {
        const newImage = clicked ? '/assets/play.png' : '/assets/pause.png';
        setPlayImg(newImage);  
        setClicked(prev => !prev);
    }
    
    return (
    <div>
        <div className="headingContainer">
            <Link href='/'>
            <Image
                className='heading2'
                src='/banners/Heading2.png'
                width={600}
                height={150}
                alt='metro clicker'
                draggable={false}
            />
            </Link>
        </div>
            <div className="metronomeSpecs">
                <div className="timeSignature">
                    <p className='specLabels'>Time Signature: </p>
                    <div className="timeSignatureContainer"> {/* Contains the time signature selector eg: 4 / 4 */}
                        <select name="upperValue" id="timeSignature-upper" className='timeSignature-selectors' defaultValue='four'>
                            <option value="two">2</option>
                            <option value="three">3</option>
                            <option value="four">4</option>
                            <option value="five">5</option>
                            <option value="six">6</option>
                            <option value="seven">7</option>
                            <option value="nine">9</option>
                            <option value="eleven">11</option>
                            <option value="thirteen">13</option>
                        </select>
                        <p className='unselectable'> / </p> 
                        <select name="upperValue" id="timeSignature-upper" className='timeSignature-selectors' defaultValue='four'>
                            <option value="two">2</option>
                            <option value="four">4</option>
                            <option value="eight">8</option>
                        </select>
                    </div>
                </div>
                <div className="tempo">
                    <p className='specLabels'>Tempo: </p>
                    <Image
                        className='tempoButtons'
                        id='plus'
                        src='/assets/plus.png'
                        width={30}
                        height={30}
                        alt='increase tempo'
                    />
                    <input id='tempoRange' type="range" defaultValue={120} min={33} max={250} />
                    <Image
                        className='tempoButtons'
                        id='minus'
                        src='/assets/minus.png'
                        width={30}
                        height={30}
                        alt='decrease tempo'
                        
                    />
                </div>
                <div className="tempoDisplayContainer">
                    <Image
                        className='playButton'
                        src={playImg}
                        width={100}
                        height={100}
                        alt='play metronome'
                        onClick={handlePlayClick}
                    />
                    <p id='displayTempo'>120</p>
                    <p id='bpm'>bpm</p>
                </div>
            </div>
    </div>
    )
}