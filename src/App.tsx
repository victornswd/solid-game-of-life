import { JSX, Show } from "solid-js";
import "./App.css";

import { Preset } from "./types";
import { player, renderer, size, pop } from "./store";

import Life from "./Life";
import Settings from "./Settings";

interface Props {
  presets: Preset[];
}

function App(props: Props): JSX.Element {
  return (
    <div>
      <Settings presets={props.presets} />
      <hr />
      <div classList={{ ["playing"]: player.play() }}>
        <Show when={renderer.engine() === "html"}>
          <Life population={pop.population()} size={size.size()} />
        </Show>
        {/* <LifeCanvas population={population} size={size} /> */}
      </div>
    </div>
  );
}

export default App;
