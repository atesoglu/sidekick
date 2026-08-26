import { invoke } from "@tauri-apps/api/core";
import type { GreetRequest, GreetResponse } from "../types";

/**
 * Thin, typed wrappers around Tauri `invoke` calls. Keeping IPC calls behind
 * this module (rather than calling `invoke` from components) gives the UI a
 * stable, typed data layer as more commands are added.
 */
export function greet(name: GreetRequest["name"]): Promise<GreetResponse> {
  return invoke("greet", { name });
}
