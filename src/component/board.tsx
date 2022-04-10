import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

import "./board.css";
import { SubCube } from "./sub_cube"
import { DEFAULT_ARRAYS, TOTAL_SIZE, SMALL_CUBE_WIDTH, MID_CUBE_WIDTH } from "./config"

interface BoardProps {
}

const DELAY_MS: number = 100 * 2
const EMPTY_ARRAY: number[] = Array(81).fill(0)
const generateRandomNumber = (size: number) => {
  return Math.floor(Math.random() * size);
}

const Board: React.FC<BoardProps> = props => {
  const [array, setArray] = useState<number[]>(EMPTY_ARRAY);
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
      setBox0(generateRandomNumber(TOTAL_SIZE))
      setBox1(generateRandomNumber(TOTAL_SIZE))
      setBox2(generateRandomNumber(TOTAL_SIZE))
      setDisplay0(true);
      setDisplay1(true);
      setDisplay2(true);
    }
  }, [display0, display1, display2]);

  useEffect(() => {
    if (width <= 620) {
      setCubeWidth(SMALL_CUBE_WIDTH)
    } else {
      setCubeWidth(MID_CUBE_WIDTH)
    }
  }, [width]);

  useEffect(() => {  
    window.addEventListener("resize", () => setWidth(window.innerWidth));  
  }, []);  

  const btnColor = (val: number) => {
    if (val === -1) {
      return 'green'
    } else if (val === 1) { return 'aqua' }
    else if (val === 2) {
      return "aquamarine"
    }
    return 'gainsboro'
  }

  const borderRight = (idx: number) => {
    if ((idx + 1) % 3 === 0 && (idx + 1) % 9 !== 0) { return "5px solid" }
    return "1px solid"
  }

  const borderBottom = (idx: number) => {
    if ((idx >= 18 && idx <= 26) || (idx >= 45 && idx <= 53)) { return "5px solid" }
    return "1px solid"
  }

  const btnClassName = (val: number) => {
    if (val === 0) {
      return "btn valid_btn"
    }
    return "btn"
  }

  const onSetWidthLength = () => {
    const width: number = ((cubeWidth+5) * 9);
    return width + 'px';
}

const onSetCubeLength = () => {
    return (cubeWidth+5) + 'px';
}

  const onFinishEdit = () => {
    if (editIndex === 0) {
      setDisplay0(false);
    } else if (editIndex === 1) {
      setDisplay1(false);
    } else if (editIndex === 2) {
      setDisplay2(false);
    }
    setEditIndex(-1)
    setEditing(false)
  }

  const checkScore = (arrayList: number[], cubeNum?: number) => {
    let tmpArray = [...arrayList];
    let flashArray = [...arrayList];
    let visitArray: boolean[] = Array(81).fill(false);
    let cnt = 0;
    for (let i = 0; i < 9; i++) {
      if (tmpArray[i * 9] && tmpArray[i * 9 + 1] && tmpArray[i * 9 + 2] && tmpArray[i * 9 + 3] && tmpArray[i * 9 + 4] && tmpArray[i * 9 + 5] && tmpArray[i * 9 + 6] && tmpArray[i * 9 + 7] && tmpArray[i * 9 + 8]) {
        visitArray[i * 9] = true;
        visitArray[i * 9 + 1] = true;
        visitArray[i * 9 + 2] = true;
        visitArray[i * 9 + 3] = true;
        visitArray[i * 9 + 4] = true;
        visitArray[i * 9 + 5] = true;
        visitArray[i * 9 + 6] = true;
        visitArray[i * 9 + 7] = true;
        visitArray[i * 9 + 8] = true;
        flashArray[i * 9] = 2;
        flashArray[i * 9 + 1] = 2;
        flashArray[i * 9 + 2] = 2;
        flashArray[i * 9 + 3] = 2;
        flashArray[i * 9 + 4] = 2;
        flashArray[i * 9 + 5] = 2;
        flashArray[i * 9 + 6] = 2;
        flashArray[i * 9 + 7] = 2;
        flashArray[i * 9 + 8] = 2;
        cnt++;
      }
      if (tmpArray[i] && tmpArray[i + 1 * 9] && tmpArray[i + 2 * 9] && tmpArray[i + 3 * 9] && tmpArray[i + 4 * 9] && tmpArray[i + 5 * 9] && tmpArray[i + 6 * 9] && tmpArray[i + 7 * 9] && tmpArray[i + 8 * 9]) {
        visitArray[i] = true;
        visitArray[i + 1 * 9] = true;
        visitArray[i + 2 * 9] = true;
        visitArray[i + 3 * 9] = true;
        visitArray[i + 4 * 9] = true;
        visitArray[i + 5 * 9] = true;
        visitArray[i + 6 * 9] = true;
        visitArray[i + 7 * 9] = true;
        visitArray[i + 8 * 9] = true;
        flashArray[i] = 2;
        flashArray[i + 1 * 9] = 2;
        flashArray[i + 2 * 9] = 2;
        flashArray[i + 3 * 9] = 2;
        flashArray[i + 4 * 9] = 2;
        flashArray[i + 5 * 9] = 2;
        flashArray[i + 6 * 9] = 2;
        flashArray[i + 7 * 9] = 2;
        flashArray[i + 8 * 9] = 2;
        cnt++;
      }
      const j = 27 * Math.floor(i / 3) + (i % 3) * 3;
      if (tmpArray[j] && tmpArray[j + 1] && tmpArray[j + 2] && tmpArray[j + 9] && tmpArray[j + 10] && tmpArray[j + 11] && tmpArray[j + 18] && tmpArray[j + 19] && tmpArray[j + 20]) {
        visitArray[j] = true;
        visitArray[j + 1] = true;
        visitArray[j + 2] = true;
        visitArray[j + 9] = true;
        visitArray[j + 10] = true;
        visitArray[j + 11] = true;
        visitArray[j + 18] = true;
        visitArray[j + 19] = true;
        visitArray[j + 20] = true;
        flashArray[j] = 2;
        flashArray[j + 1] = 2;
        flashArray[j + 2] = 2;
        flashArray[j + 9] = 2;
        flashArray[j + 10] = 2;
        flashArray[j + 11] = 2;
        flashArray[j + 18] = 2;
        flashArray[j + 19] = 2;
        flashArray[j + 20] = 2;
        cnt++;
      }
    }
    for (let i = 0; i < 81; i++) {
      if (tmpArray[i] && visitArray[i]) {
        tmpArray[i] = 0
      }
    }
    if (cnt > 0) {
      setArray(flashArray)
      const add_score: number = cnt * (9 + generateRandomNumber(10))
      // message.success(add_score+' points', 3)
      setTimeout(() => setScore(score + add_score), DELAY_MS)
      setTimeout(() => setArray(tmpArray), DELAY_MS)
    }
  }

  const onClickButton = (idx: number) => {
    if (editing && editingCube.length > 0) {
      let tmpArray = [...array];
      let flag: boolean = true;
      const x_len = editingCube[0].length
      const y_len = editingCube.length
      const x_orig = idx % 9
      const y_orig = Math.floor(idx / 9)
      const x_start = x_orig - xPos;
      const y_start = y_orig - yPos;
      for (let i = 0; i < x_len; i++) {
        for (let j = 0; j < y_len; j++) {
          const x = x_start + i;
          const y = y_start + j;
          const index = 9 * y + x;
          console.log("i: " + i + " j:" + j + " x:" + x + " y:" + y)
          if (editingCube[j][i] && (x < 0 || x >= 9 || y < 0 || y >= 9)) {
            flag = false;
            break
          }
          if (editingCube[j][i] && array[index] > 0) {
            flag = false;
            break
          }
          console.log("i: " + i + " j:" + j + " val:" + editingCube[j][i])
          if (editingCube[j][i]) {
            tmpArray[index] = 2
          }
        }
        if (!flag) {
          break
        }
      }
      if (flag) {
        for (let i = 0; i < tmpArray.length; i++) {
          if (tmpArray[i] > 1) {
            console.log(i)
            tmpArray[i] = 1;
          }
        }
        setArray(tmpArray)
        setTimeout(() => checkScore(tmpArray), DELAY_MS)
        onFinishEdit();
      } else {
        alert('No space for it')
      }
    }
    else {
      let tmpArray = [...array];
      if (idx >= 0 && idx < array.length) {
        tmpArray[idx] = 1 - tmpArray[idx]
        setArray(tmpArray)
        setTimeout(() => checkScore(tmpArray), DELAY_MS)
      }
    }
  }

  let boardView = (
    array.map((val, idx) => { return (<button className={btnClassName(val)} style={{ backgroundColor: btnColor(val), borderRight: borderRight(idx), borderBottom: borderBottom(idx), width: onSetCubeLength(), height: onSetCubeLength() }} onClick={() => onClickButton(idx)}></button>) })
  )

  return (
    <Card className="board" style={{ width: onSetWidthLength() }}>
      <h1>Score: {score}</h1>
      <h2><button onClick={() => { setScore(0); setArray(EMPTY_ARRAY) }}>Reset</button><button onClick={() => {
        console.log('box0: ' + box0);
        console.log('box1: ' + box1)
        console.log('box2: ' + box2)
        console.log(window.innerWidth)
      }}>log</button></h2>
      <div>{boardView}</div>
      <div style={{ display: 'flex' }}>
        <SubCube inputArray={DEFAULT_ARRAYS[box0]} display={display0} editIndex={0} setEditIndex={setEditIndex} editing={editing} setEditing={setEditing} setXPos={setXPos} setYPos={setYPos} setEditingCube={setEditingCube} cubeWidth={cubeWidth}/>
        <SubCube inputArray={DEFAULT_ARRAYS[box1]} display={display1} editIndex={1} setEditIndex={setEditIndex} editing={editing} setEditing={setEditing} setXPos={setXPos} setYPos={setYPos} setEditingCube={setEditingCube} cubeWidth={cubeWidth}/>
        <SubCube inputArray={DEFAULT_ARRAYS[box2]} display={display2} editIndex={2} setEditIndex={setEditIndex} editing={editing} setEditing={setEditing} setXPos={setXPos} setYPos={setYPos} setEditingCube={setEditingCube} cubeWidth={cubeWidth}/>
      </div>
    </Card>
  );
}

export { Board }