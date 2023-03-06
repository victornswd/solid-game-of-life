import { createSignal, createContext, useContext } from "solid-js";

const SettingsContext = createContext();
import { getInitialState } from "./src/utils";
import { LifetimeValues } from "./src/Settings";

import { Grid } from "./src/types";
export type Renderer = "html" | "canvas";

export function SettingsProvider(props: any) {
  const [play, setPlay] = createSignal(props.play || true);
  const [engine, setRenderer] = createSignal<Renderer>(
    props.renderer || "html"
  );
  const [width, setWidth] = createSignal(1);
  const [height, setHeight] = createSignal(1);
  const [size, setSize] = createSignal(30);
  const [population, setPopulation] = createSignal<Grid>(
    getInitialState([], 1, 1)
  );
  const [lifetime, setLifetime] = createSignal(+Object.keys(LifetimeValues)[0]);
  const [value, setPreset] = createSignal("");

  const settings = [
    play,
    {
      togglePlay() {
        return setPlay(!play());
      },
    },
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
  ];

  return (
    <SettingsContext.Provider value={settings}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
