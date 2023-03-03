import type { JSX } from "solid-js";
import { For, batch } from "solid-js";

import { Preset } from "./types";
import "./Life.css";
import { getInitialState, getNextPopulation } from "./utils";
import type { Renderer } from "./store";
import {
  player,
  renderer,
  size,
  pop,
  lf,
  preset,
  width,
  height,
} from "./store";

type Props = {
  presets: Preset[];
};

const MIN_LENGTH = 4;
const DEFAULT_SIZE = 30;

export const LifetimeValues: Record<number, { value: number; label: string }> =
  Object.freeze({
    1: { value: 1, label: "requestAnimationFrame()" },
    2: { value: 16, label: "16ms" },
    3: { value: 100, label: "100ms" },
    4: { value: 300, label: "300ms" },
    5: { value: 500, label: "0.5s" },
  });

function Settings(props: Props): JSX.Element {
  const initialPreset = window.localStorage.getItem("presetId") || "";
  initialPreset && loadPreset(initialPreset);

  function updateWidth(value: number) {
    const newWidth = Math.max(value, MIN_LENGTH);
    batch(() => {
      width.setWidth(newWidth);
      pop.setPopulation(
        getInitialState(pop.population(), newWidth, height.size())
      );
    });
  }

  function updateHeight(value: number) {
    const newHeight = Math.max(value, MIN_LENGTH);
    batch(() => {
      height.setHeight(newHeight);
      pop.setPopulation(
        getInitialState(pop.population(), width.size(), newHeight)
      );
    });
  }

  function loadPreset(id: string) {
    const newPreset = props.presets.find((p: Preset) => p.id === id);
    const newWidth = newPreset?.width || width.size();
    const newHeight = newPreset?.height || height.size();
    const newSize = newPreset?.size || DEFAULT_SIZE;

    window.localStorage.setItem("presetId", id);

    batch(() => {
      width.setWidth(newWidth);
      height.setHeight(newHeight);
      size.setSize(newSize);
      preset.setPreset(id);
      pop.setPopulation(
        getInitialState(
          newPreset?.grid || pop.population(),
          newWidth,
          newHeight
        )
      );
    });
  }
  let frameId = 0;

  const useInterval = (callback: Function, msDelay: number | null) => {
    console.log("here", msDelay);

    if (!player.play()) {
      window.cancelAnimationFrame(frameId);
      return;
    }

    function tick() {
      callback();
      frameId = window.requestAnimationFrame(tick);
    }
    tick();
  };

  function nextGeneration() {
    return pop.setPopulation(getNextPopulation(pop.population()));
  }

  useInterval(
    nextGeneration,
    player.play() ? LifetimeValues[lf.lifetime()].value : null
  );

  return (
    <div>
      Preset:{" "}
      <select
        value={preset.value()}
        onChange={(e) => loadPreset((e.target as HTMLInputElement).value)}
      >
        <option value="">Select a preset</option>
        <For each={props.presets}>
          {(preset) => <option value={preset.id}>{preset.description}</option>}
        </For>
      </select>
      <select
        value={renderer.engine()}
        onChange={(e) =>
          renderer.toggleRenderer(
            (e.target as HTMLInputElement).value as Renderer
          )
        }
        style={{ "margin-left": "-1px" }}
      >
        <option value="html">HTML</option>
        <option value="canvas">Canvas</option>
      </select>{" "}
      Width:{" "}
      <input
        type="number"
        value={width.size()}
        onChange={(e) => updateWidth(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      Height:{" "}
      <input
        type="number"
        value={height.size()}
        onChange={(e) => updateHeight(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      Size:{" "}
      <input
        type="number"
        value={size.size()}
        onChange={(e) => size.setSize(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      <br />
      <br />
      <div style={{ display: "flex", "align-items": "center" }}>
        <button
          onClick={() => {
            player.togglePlay();
            useInterval(
              nextGeneration,
              player.play() ? LifetimeValues[lf.lifetime()].value : null
            );
          }}
        >
          {player.play() ? "Stop" : "Play"}
        </button>{" "}
        {preset && (
          <button
            onClick={() => loadPreset(preset.value())}
            style={{ "margin-left": "-1px" }}
          >
            ↺
          </button>
        )}
        <input
          type="range"
          value={lf.lifetime()}
          min={1}
          max={5}
          onChange={(e) =>
            lf.setLifetime(+(e.target as HTMLInputElement).value)
          }
          list="lifetime-options"
          style={{ margin: "0 1em" }}
        />
        <datalist id="lifetime-options">
          {Object.entries(LifetimeValues).map(([k, v]) => (
            <option value={k} label={v.label} />
          ))}
        </datalist>{" "}
        <div>{LifetimeValues[lf.lifetime()].label}</div>
      </div>
    </div>
  );
}

export default Settings;
