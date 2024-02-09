import { stdout } from "node:process";
import { cursor } from "sisteransi";
import { SpinnerPattern } from "../types/global";

// const LoaderPatternSchema = z.object({
//   interval: z.number(),
//   frames: z.array(z.string()),
// });
// type LoaderPattern = z.infer<typeof LoaderPatternSchema>;

class Spinner {
  pattern: SpinnerPattern;
  loaderText: string;
  color: string;
  private interval: NodeJS.Timeout | null;
  private currentFrameIndex: number;
  endingText: string;
  constructor(
    pattern: SpinnerPattern,
    properties?: {
      loaderText?: string;
      color?: string;
      endingText?: string;
    }
  ) {
    this.pattern = pattern;
    this.loaderText = (properties && properties?.loaderText) || "";
    this.color = (properties && properties?.color) || "";
    this.interval = null;
    this.currentFrameIndex = 0;
    this.endingText = (properties && properties?.endingText) || "";
  }

  private updateFrame(): void {
    stdout.write(
      cursor.left +
        `${this.pattern.frames[this.currentFrameIndex]} ${this.loaderText}` +
        cursor.hide
    );
    if (this.currentFrameIndex >= this.pattern.frames.length - 1) {
      this.currentFrameIndex = 0;
    } else {
      this.currentFrameIndex += 1;
    }
  }
  start(): void {
    if (!this.interval) {
      this.interval = setInterval(
        () => this.updateFrame(),
        this.pattern.interval
      );
    }
  }
  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      stdout.write(this.endingText);
    }
  }
}

export default Spinner;
