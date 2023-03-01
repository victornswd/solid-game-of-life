import type { Component } from "solid-js";
import { For } from "solid-js";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  size: number;
}

const SIZE_THRESHOLD = 15;
// const OptimizedRow = React.memo(Row);
// const OptimizedCell = React.memo(Cell);

const Life: Component<Props> = (props) => {
  const style = { "--size": `${props.size}px` };

  return (
    <div
      classList={{ ["small-size"]: props.size < SIZE_THRESHOLD }}
      class={`life`}
      style={style}
    >
      <For each={props.population}>{(row) => <Row row={row} />}</For>
    </div>
  );
};

interface RowProps {
  row: Array<boolean>;
}

const Row: Component<RowProps> = (props) => {
  return (
    <div class="row">
      <For each={props.row}>{(cell) => <Cell alive={cell} />}</For>
    </div>
  );
};

interface CellProps {
  alive: boolean;
}

const Cell: Component<CellProps> = (props) => {
  return (
    <span class={`cell`} classList={{ ["cell-alive"]: props.alive }}></span>
  );
};

export default Life;
