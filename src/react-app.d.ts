declare module "react" {
  export type ReactNode = any;
  export type CSSProperties = Record<string, string | number | undefined>;

  export interface HTMLAttributes<T> {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    [key: string]: any;
  }

  export type DetailedHTMLProps<E, T> = E & { ref?: any; key?: any };

  export type FunctionComponent<P = {}> = (props: P & { children?: ReactNode }) => any;
  export type FC<P = {}> = FunctionComponent<P>;

  export function useState<S>(
    initialState: S | (() => S)
  ): [S, (value: S | ((previousState: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useMemo<T>(factory: () => T, deps?: readonly any[]): T;
  export function useRef<T>(initialValue: T): { current: T };

  const React: {
    createElement: (...args: any[]) => any;
    Fragment: any;
    useState: typeof useState;
    useEffect: typeof useEffect;
    useMemo: typeof useMemo;
    useRef: typeof useRef;
  };

  export default React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
