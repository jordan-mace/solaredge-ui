import { memo } from "react";

function Env() {
  return <div data-testid="envWidget">{JSON.stringify(process.env)}</div>;
}

export default memo(Env);
