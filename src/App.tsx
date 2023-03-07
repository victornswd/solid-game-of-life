import { JSX, Show } from "solid-js";
import "./App.css";

import { Preset } from "./types";
import { settings } from "./actualStore";

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
      <div classList={{ ["playing"]: settings.play }}>
        <Show when={settings.renderer === "html"}>
          <Life population={settings.population} size={settings.size} />
        </Show>
        {/* <LifeCanvas population={population} size={size} /> */}
      </div>
    </div>
  );
}

export default App;
