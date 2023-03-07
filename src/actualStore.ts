import { createStore } from "solid-js/store";
import { Grid } from "./types";
import { LifetimeValues } from "./Settings";
import { getInitialState } from "./utils";

export type Renderer = "html" | "canvas";
export type Store = {
  play: boolean;
  renderer: Renderer;
  lifetime: number;
  width: number;
  height: number;
  size: number;
  preset: string;
  population: Grid;
};

const initialStore: Store = {
  play: true,
  renderer: "html",
  lifetime: +Object.keys(LifetimeValues)[0],
  width: 1,
  height: 1,
  size: 30,
  preset: "",
  population: getInitialState([], 1, 1),
};

export const [settings, setSettings] = createStore(initialStore);

export const togglePlay = () => {
  setSettings({ play: !settings.play });
};

export const setWidth = (width: number) => {
  setSettings({ width });
};
export const setHeight = (height: number) => {
  setSettings({ height });
};
export const setSize = (size: number) => {
  setSettings({ size });
};
export const setPreset = (preset: string) => {
  setSettings({ preset });
};
export const setLifetime = (lifetime: number) => {
  setSettings({ lifetime });
};
export const setPopulation = (population: Grid) => {
  setSettings({ population });
};
export const toggleRenderer = (renderer: Renderer) => {
  setSettings({ renderer });
};
