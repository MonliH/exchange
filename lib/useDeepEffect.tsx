import isEqual from "lodash.isequal";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function deepCompareEquals(a: any, b: any) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export default function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
