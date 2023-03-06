import type { JSX } from "solid-js";
import { For as Index } from "solid-js";
import "./Life.css";
import { useSettings } from "../context";

const SIZE_THRESHOLD = 15;

function Life(): JSX.Element {
  const [
    play,
    { togglePlay },
    engine,
    setRenderer,
    width,
    setWidth,
    height,
    setHeight,
    size,
    setSize,
    population,
    setPopulation,
    lifetime,
    setLifetime,
    value,
    setPreset,
  ] = useSettings();
  const style = { "--size": `${size()}px` };

  return (
    <div
      classList={{ ["small-size"]: size() < SIZE_THRESHOLD }}
      class={`life`}
      style={style}
    >
      <Index each={population()}>{(row) => <Row row={row} />}</Index>
    </div>
  );
}

interface RowProps {
  row: Array<boolean>;
}

function Row(props: RowProps): JSX.Element {
  return (
    <div class="row">
      <Index each={props.row}>{(cell) => <Cell alive={cell} />}</Index>
    </div>
  );
}

interface CellProps {
  alive: boolean;
}

function Cell(props: CellProps): JSX.Element {
  return (
    <span class={`cell`} classList={{ ["cell-alive"]: props.alive }}></span>
  );
}

export default Life;
