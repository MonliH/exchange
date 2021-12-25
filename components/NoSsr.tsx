import dynamic from "next/dynamic";
import React from "react";

const NoSsr = (props) => <React.Fragment>{props.children}</React.Fragment>;

const NoSsrW = dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export default function withNoSsr<P extends object>(
  Component: React.ComponentType<P>
) {
  return class WithNoSsr extends React.Component<P> {
    render() {
      return (
        <NoSsrW>
          <Component {...this.props} />
        </NoSsrW>
      );
    }
  };
}
