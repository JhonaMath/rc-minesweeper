import { TileStates } from "../../App";
import { palleteColor } from "../../helpers/Helper";
import { Bomb } from "../bomb/Bomb";
import { Flag } from "../flag/Flag";

import "./BoardTile.css";

interface BoardTileProps {
  nro: number;
  showed: number;
  flag: boolean;
  onClick: () => void;
}

export function BoardTile(props: BoardTileProps) {
  const { showed, nro, flag, onClick } = props;

  let content: any = <div />;

  if (showed === TileStates.SHOWED || showed === TileStates.EXPLODED) {
    if (nro === -1) content = <Bomb />;
    else if (nro !== 0) content = nro;
  } else if (showed !== TileStates.SHOWED && flag) {
    content = <Flag />;
  }

  return (
    <div
      className={`BoardTile-wrapper ${
        showed === TileStates.SHOWED ? "BoardTile-showed" : ""
      } ${showed === TileStates.EXPLODED ? "BoardTile-showed-fail" : ""}`}
      style={{ color: palleteColor[nro] }}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
