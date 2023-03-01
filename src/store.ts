import { Grid } from "./types";
import { createSignal, createRoot } from "solid-js";
import { getInitialState } from "./utils";
import { LifetimeValues } from "./Settings";

export type Renderer = "html" | "canvas";

function createPlayer() {
  const [play, setPlay] = createSignal(true);
  const togglePlay = () => {
    return setPlay(!play());
  };
  return { play, togglePlay };
}

export const player = createRoot(createPlayer);

function createRenderer() {
  const [engine, setRenderer] = createSignal<Renderer>("html");
  const toggleRenderer = (eng: Renderer) => {
    return setRenderer(eng);
  };
  return { engine, toggleRenderer };
}

export const renderer = createRoot(createRenderer);

function createWidth() {
  const [size, setWidth] = createSignal(1);
  return { size, setWidth };
}

export const width = createRoot(createWidth);

function createHeight() {
  const [size, setHeight] = createSignal(1);
  return { size, setHeight };
}

export const height = createRoot(createHeight);

function createSize() {
  const [size, setSize] = createSignal(30);
  return { size, setSize };
}

export const size = createRoot(createSize);

function createPop() {
  const [population, setPopulation] = createSignal<Grid>(
    getInitialState([], 1, 1)
  );
  return { population, setPopulation };
}

export const pop = createRoot(createPop);

function createLifetime() {
  const [lifetime, setLifetime] = createSignal(
    +Object.keys(LifetimeValues).reverse()[0]
  );
  return { lifetime, setLifetime };
}

export const lf = createRoot(createLifetime);

function createPreset() {
  const [value, setPreset] = createSignal("");
  return { value, setPreset };
}

export const preset = createRoot(createPreset);
