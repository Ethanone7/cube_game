import React, { useState, useEffect } from 'react';
import "./board.css";

interface SubCubeProps {
    inputArray: boolean[][]
    editing: boolean
    display: boolean
    editIndex: number
    setEditIndex: (e: number) => void
    setEditing: (e: boolean) => void
    setXPos: (e: number) => void
    setYPos: (e: number) => void
    setEditingCube: (e: boolean[][]) => void
}

const CUBE_WIDTH = 45;

const SubCube: React.FC<SubCubeProps> = props => {
    const { inputArray, editing, display, editIndex, setEditIndex, setEditing, setXPos, setYPos, setEditingCube } = props;
    const [chosen, setChosen] = useState<boolean>(false);
    const [selectedIdx, setSelectedIdx] = useState<number>(-1);

    useEffect(() => {
        if (!display) {
            setChosen(false)
        }
    }, [display]);


    const btnColor = (val: boolean, idx: number) => {
        if (!val || !display) {
            return "transparent"
        }
        if (chosen) {
            return idx === selectedIdx ? 'lime' : 'green'
        }
        return 'aqua'
    }

    const btnClassName = (val: boolean) => {
        if (val && display) {
            return "sub_btn"
        }
        return "sub_empty"
    }

    const onSetWidthLength = () => {
        const width: number = (CUBE_WIDTH * inputArray[0].length);
        return width + 'px';
    }

    const onSetCubeLength = () => {
        return CUBE_WIDTH + 'px';
    }

    const onClickButton = (idx: number) => {
        if (chosen && editing && display) {
            setSelectedIdx(-1);
            setChosen(false);
            setXPos(-1);
            setYPos(-1);
            setEditing(false)
            setEditingCube([[]])
            setEditIndex(-1)
        } else if (!chosen && !editing && display) {
            setSelectedIdx(idx);
            setChosen(true);
            const x = idx % (inputArray[0].length)
            const y = Math.floor(idx / (inputArray[0].length))
            setXPos(x)
            setYPos(y)
            setEditing(true)
            setEditingCube(inputArray)
            setEditIndex(editIndex)
        }
    }

    return (
        <div style={{ padding: "10px" }}>
            <div className="basic_cube" style={{ width: onSetWidthLength() }}>
                {inputArray.flat().map((val, idx) => {
                    return (<button className={btnClassName(val)} style={{ backgroundColor: btnColor(val, idx), width: onSetCubeLength(), height: onSetCubeLength() }} onClick={() => onClickButton(idx)}></button>)
                })}
                <button onClick={() => console.log(onSetWidthLength())} style={{display: 'none'}}>log0</button>
                <button onClick={() => console.log(inputArray)} style={{display: 'none'}}>log1</button>
                <button onClick={() => console.log(onSetCubeLength())} style={{display: 'none'}}>log2</button>
            </div>
        </div>
    );
}

export { SubCube }