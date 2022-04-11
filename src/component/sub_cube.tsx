import React, {useState, useEffect} from 'react';

import './board.css';

interface SubCubeProps {
  inputArray: boolean[][];
  editing: boolean;
  display: boolean;
  editIndex: number;
  setEditIndex: (e: number) => void;
  setEditing: (e: boolean) => void;
  setXPos: (e: number) => void;
  setYPos: (e: number) => void;
  setEditingCube: (e: boolean[][]) => void;
  cubeWidth: number;
  trueMatrix: number[][];
}

const SubCube: React.FC<SubCubeProps> = props => {
  const {
    inputArray,
    editing,
    display,
    editIndex,
    setEditIndex,
    setEditing,
    setXPos,
    setYPos,
    setEditingCube,
    cubeWidth,
    trueMatrix,
  } = props;
  const [chosen, setChosen] = useState<boolean>(false);
  const [hold, setHold] = useState<boolean>(true);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  useEffect(() => {
    if (!display) {
      setChosen(false);
    }
  }, [display]);

  useEffect(() => {
    if (display) {
      onCheckHold();
    }
  }, [trueMatrix, inputArray]);

  const onCheckHold = () => {
    let flag = false;
    for (let i = 0; i < trueMatrix.length; i++) {
      for (let j = 0; j < trueMatrix[0].length; j++) {
        let skipFlag = false;
        for (let x = 0; x < inputArray.length; x++) {
          for (let y = 0; y < inputArray[0].length; y++) {
            const row = i + x;
            const col = j + y;
            if (
              row < 0 ||
              row >= trueMatrix.length ||
              col < 0 ||
              col >= trueMatrix[0].length
            ) {
              skipFlag = true;
              break;
            }
            if (inputArray[x][y] && trueMatrix[i + x][j + y] > 0) {
              skipFlag = true;
              break;
            }
          }
          if (skipFlag) {
            break;
          }
        }
        if (!skipFlag) {
          flag = true;
        }
        if (flag) {
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    setHold(flag);
  };

  const btnColor = (val: boolean, idx: number) => {
    if (!val || !display) {
      return 'transparent';
    }
    if (chosen) {
      return idx === selectedIdx ? 'lime' : 'green';
    }
    if (!hold) {
      return 'grey';
    }
    return 'aqua';
  };

  const btnClassName = (val: boolean) => {
    if (val && display) {
      return 'sub_btn';
    }
    return 'sub_empty';
  };

  const onSetWidthLength = () => {
    const width: number = cubeWidth * inputArray[0].length;
    return width + 'px';
  };

  const onSetCubeLength = () => {
    return cubeWidth + 'px';
  };

  const onClickButton = (idx: number) => {
    if (chosen && editing && display && hold) {
      setSelectedIdx(-1);
      setChosen(false);
      setXPos(-1);
      setYPos(-1);
      setEditing(false);
      setEditingCube([[]]);
      setEditIndex(-1);
    } else if (!chosen && !editing && display && hold) {
      setSelectedIdx(idx);
      setChosen(true);
      const x = Math.floor(idx / inputArray[0].length);
      const y = idx % inputArray[0].length;
      setXPos(x);
      setYPos(y);
      setEditing(true);
      setEditingCube(inputArray);
      setEditIndex(editIndex);
    }
  };

  return (
    <div style={{padding: '10px'}}>
      <div className="basic_cube" style={{width: onSetWidthLength()}}>
        {inputArray.flat().map((val, idx) => {
          return (
            <button
              key={'sub_box_' + editIndex + '_btn_' + idx}
              className={btnClassName(val)}
              style={{
                backgroundColor: btnColor(val, idx),
                width: onSetCubeLength(),
                height: onSetCubeLength(),
              }}
              onClick={() => onClickButton(idx)}
            ></button>
          );
        })}
        <button
          onClick={() => console.log(onSetWidthLength())}
          style={{display: 'none'}}
        >
          log0
        </button>
        <button
          onClick={() => console.log(inputArray)}
          style={{display: 'none'}}
        >
          log1
        </button>
        <button
          onClick={() => console.log(onSetCubeLength())}
          style={{display: 'none'}}
        >
          log2
        </button>
        <button onClick={() => console.log(inputArray)}>log3</button>
      </div>
    </div>
  );
};

export {SubCube};
