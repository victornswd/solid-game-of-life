import type { JSX } from "solid-js";
import { For, batch } from "solid-js";

import { Preset } from "./types";
import "./Life.css";
import { getInitialState, getNextPopulation } from "./utils";
import type { Renderer } from "./actualStore";
import {
  settings,
  togglePlay,
  setWidth,
  setHeight,
  setPreset,
  setPopulation,
  setLifetime,
  setSize,
  toggleRenderer,
} from "./actualStore";

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
      setWidth(newWidth);
      setPopulation(
        getInitialState(settings.population, newWidth, settings.height)
      );
    });
  }

  function updateHeight(value: number) {
    const newHeight = Math.max(value, MIN_LENGTH);
    batch(() => {
      setHeight(newHeight);
      setPopulation(
        getInitialState(settings.population, settings.width, newHeight)
      );
    });
  }

  function loadPreset(id: string) {
    const newPreset = props.presets.find((p: Preset) => p.id === id);
    const newWidth = newPreset?.width || settings.width;
    const newHeight = newPreset?.height || settings.height;
    const newSize = newPreset?.size || DEFAULT_SIZE;

    window.localStorage.setItem("presetId", id);

    batch(() => {
      setWidth(newWidth);
      setHeight(newHeight);
      setSize(newSize);
      setPreset(id);
      setPopulation(
        getInitialState(
          newPreset?.grid || settings.population,
          newWidth,
          newHeight
        )
      );
    });
  }
  let frameId = 0;

  const useInterval = (callback: Function, msDelay: number | null) => {
    console.log("here", msDelay);

    if (!settings.play) {
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
    return setPopulation(getNextPopulation(settings.population));
  }

  useInterval(
    nextGeneration,
    settings.play ? LifetimeValues[settings.lifetime].value : null
  );

  return (
    <div>
      Preset:{" "}
      <select
        value={settings.preset}
        onChange={(e) => loadPreset((e.target as HTMLInputElement).value)}
      >
        <option value="">Select a preset</option>
        <For each={props.presets}>
          {(preset) => <option value={preset.id}>{preset.description}</option>}
        </For>
      </select>
      <select
        value={settings.renderer}
        onChange={(e) =>
          toggleRenderer((e.target as HTMLInputElement).value as Renderer)
        }
        style={{ "margin-left": "-1px" }}
      >
        <option value="html">HTML</option>
        <option value="canvas">Canvas</option>
      </select>{" "}
      Width:{" "}
      <input
        type="number"
        value={settings.width}
        onChange={(e) => updateWidth(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      Height:{" "}
      <input
        type="number"
        value={settings.height}
        onChange={(e) => updateHeight(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      Size:{" "}
      <input
        type="number"
        value={settings.size}
        onChange={(e) => setSize(+(e.target as HTMLInputElement).value)}
        maxLength={3}
        class="input"
      />{" "}
      <br />
      <br />
      <div style={{ display: "flex", "align-items": "center" }}>
        <button
          onClick={() => {
            togglePlay();
            useInterval(
              nextGeneration,
              settings.play ? LifetimeValues[settings.lifetime].value : null
            );
          }}
        >
          {settings.play ? "Stop" : "Play"}
        </button>{" "}
        {settings.preset && (
          <button
            onClick={() => loadPreset(settings.preset)}
            style={{ "margin-left": "-1px" }}
          >
            ↺
          </button>
        )}
        <input
          type="range"
          value={settings.lifetime}
          min={1}
          max={5}
          onChange={(e) => setLifetime(+(e.target as HTMLInputElement).value)}
          list="lifetime-options"
          style={{ margin: "0 1em" }}
        />
        <datalist id="lifetime-options">
          {Object.entries(LifetimeValues).map(([k, v]) => (
            <option value={k} label={v.label} />
          ))}
        </datalist>{" "}
        <div>{LifetimeValues[settings.lifetime].label}</div>
      </div>
    </div>
  );
}

export default Settings;
