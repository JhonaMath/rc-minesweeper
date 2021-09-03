import * as _ from "lodash";
import React, { useEffect, useState } from "react";

import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";

import { BoardTile } from "./components/boardTile/BoardTile";

import "./App.css";
import { BoardSettings } from "./components/boardSettings/BoardSettings";

export enum TileStates {
  HIDDEN = 0,
  SHOWED = 1,
  FLAG = 2,
  IDK = 3,
  EXPLODED = 5,
}

function TagA(props: any) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={"Button-container"}
      onClick={props.onClick}
    >
      {props.children} <div className={"tooltiptext"}>{props.toolTipText}</div>
    </a>
  );
}

function ContactSection() {
  return (
    <div className={"App-contact-container "}>
      <div className={"App-contact-container-buttons "}>
        <TagA
          href={"https://github.com/JhonaMath/rc-minesweeper"}
          toolTipText={"Code!"}
        >
          <GitHubIcon fontSize="small" />
        </TagA>
        <TagA
          href={"mailto:jhonathan.barreiro@gmail.com"}
          toolTipText={"Contact! :)"}
        >
          <MailIcon fontSize="small" />
        </TagA>
      </div>
      <div className={"App-contact-version"}>v 0.1.0 </div>
    </div>
  );
}

function createBoard(lengthX: number, lengthY: number, bombQty: number) {
  //Initialize M*N Board in 0
  let newBoard = [];
  for (let i = 0; i < lengthX + 2; i++) {
    let row = [];
    for (let j = 0; j < lengthY + 2; j++) {
      row.push(0);
    }
    newBoard.push(row);
  }

  const zeroBoard = _.cloneDeep(newBoard);

  //Pick Bomb Positions amd place  them

  let colocatedBombs = 0;
  while (colocatedBombs < bombQty) {
    const posX = Math.round(Math.random() * (lengthX - 1)) + 1;
    const posY = Math.round(Math.random() * (lengthY - 1)) + 1;

    if (newBoard[posX][posY] !== -1) {
      newBoard[posX][posY] = -1;

      newBoard[posX + 1][posY + 1] !== -1 && newBoard[posX + 1][posY + 1]++;
      newBoard[posX + 1][posY] !== -1 && newBoard[posX + 1][posY]++;
      newBoard[posX + 1][posY - 1] !== -1 && newBoard[posX + 1][posY - 1]++;
      newBoard[posX - 1][posY + 1] !== -1 && newBoard[posX - 1][posY + 1]++;
      newBoard[posX - 1][posY] !== -1 && newBoard[posX - 1][posY]++;
      newBoard[posX - 1][posY - 1] !== -1 && newBoard[posX - 1][posY - 1]++;
      newBoard[posX][posY + 1] !== -1 && newBoard[posX][posY + 1]++;
      newBoard[posX][posY - 1] !== -1 && newBoard[posX][posY - 1]++;

      colocatedBombs++;
    }
  }

  return { zeroBoard, newBoard };
}

function App() {
  const [boardSettings, setBoardSettings] = useState({
    lenghX: 24,
    lenghY: 32,
    bombsQty: 99,
  });

  const { lenghX, lenghY, bombsQty } = boardSettings;

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [numberBoard, setNumberBoard] = useState([
    [0, 0, 1],
    [0, -1, 1],
    [1, 1, 1],
  ]);

  const [losedGame, setLosedGame] = useState(false);

  useEffect(() => {
    const lbor = createBoard(lenghX, lenghY, bombsQty);

    setNumberBoard(lbor.newBoard);
    setBoard(lbor.zeroBoard);
  }, [lenghX, lenghY, bombsQty]);

  const auxBoard = board;

  const boardCleaner = (row: number, column: number) => {
    if (row + 1 < lenghX + 1 && auxBoard[row + 1][column] === 0) {
      auxBoard[row + 1][column] = 1;
      if (numberBoard[row + 1][column] === 0) boardCleaner(row + 1, column);
    }

    if (row - 1 > 0 && auxBoard[row - 1][column] === 0) {
      auxBoard[row - 1][column] = 1;
      if (numberBoard[row - 1][column] === 0) boardCleaner(row - 1, column);
    }

    if (column + 1 < lenghY + 1 && auxBoard[row][column + 1] === 0) {
      auxBoard[row][column + 1] = 1;
      if (numberBoard[row][column + 1] === 0) boardCleaner(row, column + 1);
    }

    if (column - 1 > 0 && auxBoard[row][column - 1] === 0) {
      auxBoard[row][column - 1] = 1;
      if (numberBoard[row][column - 1] === 0) boardCleaner(row, column - 1);
    }

    //corners
    if (column - 1 > 0 && row - 1 > 0 && auxBoard[row - 1][column - 1] === 0) {
      auxBoard[row - 1][column - 1] = 1;
      if (numberBoard[row - 1][column - 1] === 0)
        boardCleaner(row - 1, column - 1);
    }

    if (
      column - 1 > 0 &&
      row + 1 < lenghX + 1 &&
      auxBoard[row + 1][column - 1] === 0
    ) {
      auxBoard[row + 1][column - 1] = 1;
      if (numberBoard[row + 1][column - 1] === 0)
        boardCleaner(row + 1, column - 1);
    }

    if (
      column + 1 < lenghY + 1 &&
      row + 1 < lenghX + 1 &&
      auxBoard[row + 1][column + 1] === 0
    ) {
      auxBoard[row + 1][column + 1] = 1;
      if (numberBoard[row + 1][column + 1] === 0)
        boardCleaner(row + 1, column + 1);
    }

    if (
      column + 1 < lenghY + 1 &&
      row - 1 > 0 &&
      auxBoard[row - 1][column + 1] === 0
    ) {
      auxBoard[row - 1][column + 1] = 1;
      if (numberBoard[row - 1][column + 1] === 0)
        boardCleaner(row - 1, column + 1);
    }
  };

  const isGameDone = () => {
    let cellShowed: number = 0;

    board.forEach((v) => {
      v.forEach((value) => {
        if (value === 1) cellShowed++;
      });
    });

    if (bombsQty === lenghX * lenghY - cellShowed) alert("You win!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={"App-contact-container "} style={{ width: "60px" }} />
        MineSweeper
        <ContactSection />
      </header>
      <div className={"App-options"}>
        <BoardSettings
          lenghX={lenghX}
          lenghY={lenghY}
          bombsQty={bombsQty}
          onReset={() => {
            const lbor = createBoard(lenghX, lenghY, bombsQty);

            setNumberBoard(lbor.newBoard);
            setBoard(lbor.zeroBoard);
            setLosedGame(false);
          }}
          onChange={(value: any) => {
            if (value.lenghX * value.lenghY <= value.bombsQty) return;

            setBoardSettings(value);
            const lbor = createBoard(
              value.lenghX,
              value.lenghY,
              value.bombsQty
            );

            setNumberBoard(lbor.newBoard);
            setBoard(lbor.zeroBoard);
            setLosedGame(false);
          }}
        />
      </div>
      <body
        className="App-body"
        style={{
          gridTemplateRows: `repeat(${lenghX}, 25px)`,
          gridTemplateColumns: `repeat(${lenghY}, 25px)`,
        }}
      >
        {numberBoard.map((row, indexR) => {
          return row.map((item, index) => {
            return (
              indexR !== 0 &&
              index !== 0 &&
              indexR !== lenghX + 1 &&
              index !== lenghY + 1 && (
                <BoardTile
                  nro={item}
                  showed={board[indexR][index]}
                  flag={board[indexR][index] === TileStates.FLAG}
                  onClick={() => {
                    if (losedGame) return;

                    //Click bomb
                    if (numberBoard[indexR][index] === -1) {
                      numberBoard.forEach((r, ir) => {
                        r.forEach((c, ic) => {
                          if (c === -1) auxBoard[ir][ic] = TileStates.SHOWED;
                        });
                      });

                      auxBoard[indexR][index] = TileStates.EXPLODED;

                      setBoard(_.cloneDeep(auxBoard));
                      setLosedGame(true);
                      return;
                    }

                    auxBoard[indexR][index] = TileStates.SHOWED;

                    if (numberBoard[indexR][index] === 0)
                      boardCleaner(indexR, index);

                    setBoard(_.cloneDeep(auxBoard));
                    isGameDone();
                  }}
                />
              )
            );
          });
        })}
      </body>
    </div>
  );
}

export default App;
