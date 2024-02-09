import Spinner from "./terminal/spinner";
import spinner from "cli-spinners";

const s = new Spinner(spinner.dots12, {
  loaderText: "Loading.....",
});

s.start();
