import { Component } from "solid-js";
import { Show } from "solid-js";
import "./App.css";

import { Preset } from "./types";
import { player, renderer, size, pop } from "./store";

import Life from "./Life";
import Settings from "./Settings";

interface Props {
  presets: Preset[];
}

const App: Component<Props> = (props) => {
  return (
    <div>
      <Settings presets={props.presets} />
      <hr />
      <div classList={{ ["playing"]: player.play() }}>
        <Show when={renderer.engine() === "html"}>
          <Life population={pop.population()} size={size.size()} />
          {/* <div>Hello</div> */}
        </Show>
        {/* <LifeCanvas population={population} size={size} /> */}
      </div>
    </div>
  );
};

export default App;
