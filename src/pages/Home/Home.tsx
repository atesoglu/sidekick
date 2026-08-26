import { useState } from "react";
import {
  Grid,
  Column,
  Tile,
  TextInput,
  Button,
  Stack,
  Tag,
} from "@carbon/react";
import { greet } from "../../services";

/**
 * Placeholder landing page. Demonstrates the Carbon shell + Tauri IPC wiring;
 * replace with real dashboard content once that work starts.
 */
export function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  async function handleGreet(event: React.FormEvent) {
    event.preventDefault();
    setGreeting(await greet(name));
  }

  return (
    // Tailwind here only positions the grid within the page (centering,
    // responsive padding) — it doesn't touch Carbon's own component styles.
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <Grid className="home-page">
        <Column lg={8} md={6} sm={4}>
          <Tile>
            <Stack gap={5}>
              <h1>Welcome to Sidekick</h1>
              <p>
                This is a placeholder page confirming the Carbon Design
                System and Tauri IPC are wired up correctly.
              </p>
              <form onSubmit={handleGreet}>
                <Stack gap={5}>
                  <TextInput
                    id="greet-input"
                    labelText="Name"
                    placeholder="Enter a name..."
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Button type="submit">Greet</Button>
                </Stack>
              </form>
              {greeting && <p>{greeting}</p>}
              {/* Tailwind flex/gap arranges Carbon's own Tag components; the
                  tags' colors/typography are entirely Carbon's. */}
              <div className="flex flex-wrap gap-2">
                <Tag type="green">Carbon</Tag>
                <Tag type="blue">Tailwind</Tag>
                <Tag type="purple">Tauri</Tag>
              </div>
            </Stack>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
}

