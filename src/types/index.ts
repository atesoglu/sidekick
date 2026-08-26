/** Shared TypeScript types used across the frontend. */

/** Request/response shape for the `greet` Tauri command. */
export interface GreetRequest {
  name: string;
}

export type GreetResponse = string;
