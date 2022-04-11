/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import {Card} from 'antd';
import lodash from 'lodash';

import './board.css';
import {SubCube} from './sub_cube';
import {
  DEFAULT_ARRAYS,
  TOTAL_SIZE,
  SMALL_CUBE_WIDTH,
  MID_CUBE_WIDTH,
} from './config';

interface BoardProps {
  input?: string;
}

const DELAY_MS: number = 100 * 2;
const EMPTY_2D_ARRAY: number[][] = new Array(9)
  .fill(0)
  .map(() => new Array(9).fill(0));
const generateRandomNumber = (size: number) => {
  return Math.floor(Math.random() * size);
};

const Board: React.FC<BoardProps> = props => {
  // const [array, setArray] = useState<number[]>(EMPTY_ARRAY);
  const [trueArray, setTrueArray] = useState<number[][]>(EMPTY_2D_ARRAY);
  const [displayArray, setDisplayArray] = useState<number[][]>(EMPTY_2D_ARRAY);
  const [score, setScore] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [xPos, setXPos] = useState<number>(-1);
  const [yPos, setYPos] = useState<number>(-1);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [box0, setBox0] = useState<number>(generateRandomNumber(TOTAL_SIZE));
  const [box1, setBox1] = useState<number>(generateRandomNumber(TOTAL_SIZE));
  const [box2, setBox2] = useState<number>(generateRandomNumber(TOTAL_SIZE));
  const [display0, setDisplay0] = useState<boolean>(true);
  const [display1, setDisplay1] = useState<boolean>(true);
  const [display2, setDisplay2] = useState<boolean>(true);
  const [editingCube, setEditingCube] = useState<boolean[][]>([[]]);
  const [cubeWidth, setCubeWidth] = useState<number>(MID_CUBE_WIDTH);
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    if (!display0 && !display1 && !display2) {
      setBox0(generateRandomNumber(TOTAL_SIZE));
      setBox1(generateRandomNumber(TOTAL_SIZE));
      setBox2(generateRandomNumber(TOTAL_SIZE));
      setDisplay0(true);
      setDisplay1(true);
      setDisplay2(true);
    }
  }, [display0, display1, display2]);

  useEffect(() => {
    if (width <= 620) {
      setCubeWidth(SMALL_CUBE_WIDTH);
    } else {
      setCubeWidth(MID_CUBE_WIDTH);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const btnColorV2 = (val: number) => {
    if (val === -1) {
      return 'green';
    } else if (val === 1) {
      return 'aqua';
    } else if (val === 2) {
      return 'aquamarine';
    } else if (val === 3) {
      return 'green';
    } else if (val === 4) {
      return 'red';
    }
    return 'gainsboro';
  };

  const borderRight = (idx: number) => {
    if ((idx + 1) % 3 === 0 && (idx + 1) % 9 !== 0) {
      return '5px solid';
    }
    return '1px solid';
  };

  const borderBottom = (idx: number) => {
    if ((idx >= 18 && idx <= 26) || (idx >= 45 && idx <= 53)) {
      return '5px solid';
    }
    return '1px solid';
  };

  const btnClassName = (val: number) => {
    if (val === 0) {
      return 'btn valid_btn';
    }
    return 'btn';
  };

  const onSetWidthLength = () => {
    const width: number = (cubeWidth + 5) * 9;
    return width + 'px';
  };

  const onSetCubeLength = () => {
    return cubeWidth + 5 + 'px';
  };

  const onFinishEdit = () => {
    if (editIndex === 0) {
      setDisplay0(false);
    } else if (editIndex === 1) {
      setDisplay1(false);
    } else if (editIndex === 2) {
      setDisplay2(false);
    }
    setEditIndex(-1);
    setEditing(false);
  };

  const checkScoreV2 = (matrix: number[][], cubeNum?: number) => {
    const tmpMatrix = lodash.cloneDeep(matrix);
    const flashMatrix = lodash.cloneDeep(matrix);
    setTrueArray(tmpMatrix);
    let cnt = 0;
    for (let i = 0; i < 9; i++) {
      if (
        tmpMatrix[i][0] &&
        tmpMatrix[i][1] &&
        tmpMatrix[i][2] &&
        tmpMatrix[i][3] &&
        tmpMatrix[i][4] &&
        tmpMatrix[i][5] &&
        tmpMatrix[i][6] &&
        tmpMatrix[i][7] &&
        tmpMatrix[i][8]
      ) {
        flashMatrix[i][0] = 2;
        flashMatrix[i][1] = 2;
        flashMatrix[i][2] = 2;
        flashMatrix[i][3] = 2;
        flashMatrix[i][4] = 2;
        flashMatrix[i][5] = 2;
        flashMatrix[i][6] = 2;
        flashMatrix[i][7] = 2;
        flashMatrix[i][8] = 2;
        cnt++;
      }
      if (
        tmpMatrix[0][i] &&
        tmpMatrix[1][i] &&
        tmpMatrix[2][i] &&
        tmpMatrix[3][i] &&
        tmpMatrix[4][i] &&
        tmpMatrix[5][i] &&
        tmpMatrix[6][i] &&
        tmpMatrix[7][i] &&
        tmpMatrix[8][i]
      ) {
        flashMatrix[0][i] = 2;
        flashMatrix[1][i] = 2;
        flashMatrix[2][i] = 2;
        flashMatrix[3][i] = 2;
        flashMatrix[4][i] = 2;
        flashMatrix[5][i] = 2;
        flashMatrix[6][i] = 2;
        flashMatrix[7][i] = 2;
        flashMatrix[8][i] = 2;
        cnt++;
      }
      const x = Math.floor(i / 3) * 3;
      const y = (i % 3) * 3;
      if (
        tmpMatrix[x][y] &&
        tmpMatrix[x + 1][y] &&
        tmpMatrix[x + 2][y] &&
        tmpMatrix[x][y + 1] &&
        tmpMatrix[x + 1][y + 1] &&
        tmpMatrix[x + 2][y + 1] &&
        tmpMatrix[x][y + 2] &&
        tmpMatrix[x + 1][y + 2] &&
        tmpMatrix[x + 2][y + 2]
      ) {
        flashMatrix[x][y] = 2;
        flashMatrix[x + 1][y] = 2;
        flashMatrix[x + 2][y] = 2;
        flashMatrix[x][y + 1] = 2;
        flashMatrix[x + 1][y + 1] = 2;
        flashMatrix[x + 2][y + 1] = 2;
        flashMatrix[x][y + 2] = 2;
        flashMatrix[x + 1][y + 2] = 2;
        flashMatrix[x + 2][y + 2] = 2;
        cnt++;
      }
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (tmpMatrix[i][j] && flashMatrix[i][j] === 2) {
          tmpMatrix[i][j] = 0;
        }
      }
    }
    if (cnt > 0) {
      setDisplayArray(flashMatrix);
      setTrueArray(tmpMatrix);
      const addScore: number = cnt * (9 + generateRandomNumber(10));
      setTimeout(() => setScore(score + addScore), DELAY_MS);
      setTimeout(() => setDisplayArray(tmpMatrix), DELAY_MS);
    }
  };

  const onMoveOverCube = (idx: number) => {
    if (editing && editingCube.length > 0) {
      const tmpTrueMatrix = lodash.cloneDeep(trueArray);
      const rowLen = editingCube.length;
      const colLen = editingCube[0].length;
      const rowOrigin = Math.floor(idx / 9);
      const colOrigin = idx % 9;
      const rowStart = rowOrigin - xPos;
      const colStart = colOrigin - yPos;
      for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
          const x = rowStart + i;
          const y = colStart + j;
          if (x >= 0 && x < 9 && y >= 0 && y < 9) {
            tmpTrueMatrix[x][y] += editingCube[i][j] ? 3 : 0;
          }
        }
      }
      setDisplayArray(tmpTrueMatrix);
    }
  };

  const onMoveOutCube = () => {
    if (editing && editingCube.length > 0) {
      setDisplayArray(trueArray);
    }
  };

  const onClickButtonV2 = (idx: number) => {
    if (editing && editingCube.length > 0) {
      const tmpTrueMatrix = lodash.cloneDeep(trueArray);
      let flag = true;
      const rowLen = editingCube.length;
      const colLen = editingCube[0].length;
      const rowOrigin = Math.floor(idx / 9);
      const colOrigin = idx % 9;
      const rowStart = rowOrigin - xPos;
      const colStart = colOrigin - yPos;
      for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
          const x = rowStart + i;
          const y = colStart + j;
          if (!(x >= 0 && x < 9 && y >= 0 && y < 9) && editingCube[i][j]) {
            flag = false;
            break;
          }
          if (editingCube[i][j] && tmpTrueMatrix[x][y] > 0) {
            flag = false;
            break;
          }
          if (editingCube[i][j] && tmpTrueMatrix[x][y] === 0) {
            tmpTrueMatrix[x][y] = 1; //TODO will add another color
          }
        }
        if (!flag) {
          break;
        }
      }
      if (flag) {
        onFinishEdit();
        setDisplayArray(tmpTrueMatrix);
        setTimeout(() => checkScoreV2(tmpTrueMatrix), DELAY_MS);
      } else {
        alert('No space for it');
      }
    } else if (!editing) {
      const tmpTrueMatrix = lodash.cloneDeep(trueArray);
      const x = Math.floor(idx / 9);
      const y = idx % 9;
      tmpTrueMatrix[x][y] = 1;
      setDisplayArray(tmpTrueMatrix);
      checkScoreV2(tmpTrueMatrix);
    }
  };

  const boardViewV2 = displayArray.flat().map((val, idx) => {
    return (
      <button
        onMouseOut={() => onMoveOutCube()}
        onMouseOver={() => onMoveOverCube(idx)}
        key={'btn' + idx}
        className={btnClassName(val)}
        style={{
          backgroundColor: btnColorV2(val),
          borderRight: borderRight(idx),
          borderBottom: borderBottom(idx),
          width: onSetCubeLength(),
          height: onSetCubeLength(),
        }}
        onClick={() => onClickButtonV2(idx)}
      ></button>
    );
  });

  return (
    <Card className="board" style={{width: onSetWidthLength()}}>
      <h1>Score: {score}</h1>
      <h2>
        <button
          onClick={() => {
            setScore(0);
            setTrueArray(EMPTY_2D_ARRAY);
            setDisplayArray(EMPTY_2D_ARRAY);
          }}
          // style={{display: 'none'}}
        >
          Reset
        </button>
        <button
          onClick={() => {
            console.log('box0: ' + box0);
            console.log('box1: ' + box1);
            console.log('box2: ' + box2);
            console.log(xPos);
            console.log(yPos);
          }}
          style={{display: 'none'}}
        >
          log
        </button>
        <button
          onClick={() => {
            setDisplayArray(trueArray);
          }}
          style={{display: 'none'}}
        >
          correct
        </button>
      </h2>
      <div>{boardViewV2}</div>
      <div style={{display: 'flex'}}>
        <SubCube
          inputArray={DEFAULT_ARRAYS[box0]}
          display={display0}
          editIndex={0}
          setEditIndex={setEditIndex}
          editing={editing}
          setEditing={setEditing}
          setXPos={setXPos}
          setYPos={setYPos}
          setEditingCube={setEditingCube}
          cubeWidth={cubeWidth}
          trueMatrix={trueArray}
        />
        <SubCube
          inputArray={DEFAULT_ARRAYS[box1]}
          display={display1}
          editIndex={1}
          setEditIndex={setEditIndex}
          editing={editing}
          setEditing={setEditing}
          setXPos={setXPos}
          setYPos={setYPos}
          setEditingCube={setEditingCube}
          cubeWidth={cubeWidth}
          trueMatrix={trueArray}
        />
        <SubCube
          inputArray={DEFAULT_ARRAYS[box2]}
          display={display2}
          editIndex={2}
          setEditIndex={setEditIndex}
          editing={editing}
          setEditing={setEditing}
          setXPos={setXPos}
          setYPos={setYPos}
          setEditingCube={setEditingCube}
          cubeWidth={cubeWidth}
          trueMatrix={trueArray}
        />
      </div>
    </Card>
  );
};

export {Board};
