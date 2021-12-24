import { Flex, Text } from "@chakra-ui/react";
import { CardInfo } from "lib/card";

export function LocationPath(props: any) {
  return (
    <g>
      <g id="svg_1">
        <path
          id="svg_2"
          {...props}
          d="m84.2973,126.92006c-22.258,0 -39.781,-17.996 -39.781,-39.781s17.996,-39.781 39.781,-39.781c21.785,0 39.781,17.996 39.781,39.781s-17.52,39.781 -39.781,39.781zm0,-65.355c-14.207,0 -25.574,11.367 -25.574,25.574c0,14.207 11.367,25.574 25.574,25.574s25.574,-11.367 25.574,-25.574c0.47266,-14.207 -11.363,-25.574 -25.574,-25.574z"
        />
        <path
          id="svg_3"
          {...props}
          d="m86.1873,212.64006c-1.4219,0 -3.3164,-0.47266 -4.7344,-1.8945c-50.199,-42.625 -68.668,-75.301 -74.824,-90.457l0,-0.47266c-0.94531,-2.3672 -1.4219,-3.7891 -1.8945,-5.2109c-3.3164,-8.9961 -4.7344,-18.469 -4.7344,-27.941c0,-47.832 38.832,-86.664 86.664,-86.664c47.832,0 86.664,38.832 86.664,86.664c0,9.4727 -1.4219,18.941 -4.7344,28.414c-0.47266,1.4219 -0.94531,2.8398 -1.8945,4.7344l0,0.47266c-6.1562,15.629 -24.625,47.832 -75.301,90.926c-1.8945,0.95312 -3.7891,1.4297 -5.2109,1.4297l0.0001,-0.0007zm-66.773,-98.031c5.6836,13.734 21.785,42.621 66.773,81.457c44.516,-38.832 61.094,-67.723 66.773,-81.457l0.47266,-0.47266c0.47266,-1.4219 0.94531,-2.8398 1.4219,-4.2617c2.8398,-8.0508 4.2617,-15.629 4.2617,-23.68c0,-39.781 -32.676,-72.457 -72.457,-72.457s-72.457,32.676 -72.457,72.457c0,8.0508 1.4219,16.102 3.7891,23.68c0.47266,1.4219 0.94531,2.3672 1.4219,4.2617l0.00074,0.47266z"
        />
      </g>
    </g>
  );
}

export function LocationIcon({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 173 213`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <LocationPath className="grey-filter" />
    </svg>
  );
}

export default function Location({
  location,
  remote,
}: {
  location: CardInfo["location"];
  remote: boolean;
}) {
  const locations = [];
  if (remote) {
    locations.push("Remote");
  }
  if (location !== null) {
    locations.push(location);
  }
  return (
    <Flex alignItems="center">
      <LocationIcon width={15} height={19} />
      <Text ml="3px">{locations.join("/")}</Text>
    </Flex>
  );
}
