import { JSX, Show } from "solid-js";
import "./App.css";

import { Preset } from "./types";

import Life from "./Life";
import Settings from "./Settings";

import { useSettings } from "../context";

interface Props {
  presets: Preset[];
}

function App(props: Props): JSX.Element {
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

  console.log(engine);
  return (
    <div>
      <Settings presets={props.presets} />
      <hr />
      <div classList={{ ["playing"]: play() }}>
        <Show when={engine() === "html"}>
          <Life />
        </Show>
        {/* <LifeCanvas population={population} size={size} /> */}
      </div>
    </div>
  );
}

export default App;
