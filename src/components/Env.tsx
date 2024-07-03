import { memo } from "react";
import { API_HOST } from "../Globals";

function Env() {
  return (
    <div data-testid="envWidget">
      <p>API Host: {API_HOST}</p>
      <p>{JSON.stringify(process.env)}</p>
    </div>
  );
}

export default memo(Env);
