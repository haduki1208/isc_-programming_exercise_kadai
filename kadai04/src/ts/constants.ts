export type TState = "alive" | "dead" | "unknown";
export interface ICell {
  state: TState;
  nextState: TState;
}
