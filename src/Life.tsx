import type { JSX } from "solid-js";
import { Index } from "solid-js";
import { Grid } from "./types";
import "./Life.css";

interface Props {
  population: Grid;
  size: number;
}

const SIZE_THRESHOLD = 15;
// const OptimizedRow = React.memo(Row);
// const OptimizedCell = React.memo(Cell);

function Life(props: Props): JSX.Element {
  const style = { "--size": `${props.size}px` };

  return (
    <div
      classList={{ ["small-size"]: props.size < SIZE_THRESHOLD }}
      class={`life`}
      style={style}
    >
      <Index each={props.population}>{(row) => <Row row={row()} />}</Index>
    </div>
  );
};

interface RowProps {
  row: Array<boolean>;
}

function Row(props: RowProps): JSX.Element {
  return (
    <div class="row">
      <Index each={props.row}>{(cell) => <Cell alive={cell()} />}</Index>
    </div>
  );
};

interface CellProps {
  alive: boolean;
}

function Cell(props: CellProps): JSX.Element {
  return (
    <span class={`cell`} classList={{ ["cell-alive"]: props.alive }}></span>
  );
};

export default Life;
