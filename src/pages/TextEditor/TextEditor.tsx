import { useState, type ReactNode } from "react";
import {
  TextArea,
  TextInput,
  Button,
  ContentSwitcher,
  Switch,
  FormLabel,
} from "@carbon/react";
import {
  Copy,
  TrashCan,
  Filter,
  FilterRemove,
  TextAlignLeft,
  TextAlignRight,
  SortAscending,
  SortDescending,
  CharacterLowerCase,
  CharacterUpperCase,
  CharacterPatterns,
  CharacterSentenceCase,
  JoinFull,
  TextNewLine,
  Renew,
} from "@carbon/icons-react";
import {
  breakLines,
  generateSampleLines,
  joinLines,
  prefixLines,
  removeDuplicateLines,
  removeEmptyLines,
  removeLinesContaining,
  removeLinesNotContaining,
  sortLinesAscending,
  sortLinesDescending,
  suffixLines,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toUpperCase,
  type BreakPosition,
} from "./textOperations";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel>{title}</FormLabel>
      {children}
    </div>
  );
}

/**
 * Line-oriented text manipulation tool. The default landing page: a
 * self-contained, immediately useful utility while the dashboard proper is
 * still to be built.
 */
export function TextEditor() {
  const [value, setValue] = useState("");
  const [removeKeyword, setRemoveKeyword] = useState("");
  const [affixKeyword, setAffixKeyword] = useState("");
  const [breakKeyword, setBreakKeyword] = useState("");
  const [breakPosition, setBreakPosition] = useState<BreakPosition>("after");

  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      <TextArea
        id="text-editor-input"
        labelText="Text to manipulate"
        hideLabel
        placeholder="Enter a value to manipulate"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={24}
        className="flex-1"
      />

      <div className="flex w-full flex-col gap-6 lg:w-96 lg:flex-shrink-0">
        <Section title="Remove Empty Or Duplicate Lines">
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={Copy}
              onClick={() => setValue(removeDuplicateLines(value))}
            >
              Remove Duplicate Lines
            </Button>
            <Button
              kind="primary"
              renderIcon={TrashCan}
              onClick={() => setValue(removeEmptyLines(value))}
            >
              Remove Empty Lines
            </Button>
          </div>
        </Section>

        <Section title="Remove Lines">
          <TextInput
            id="remove-lines-keyword"
            labelText="Keyword"
            hideLabel
            placeholder="Keyword"
            value={removeKeyword}
            onChange={(event) => setRemoveKeyword(event.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={Filter}
              onClick={() =>
                setValue(removeLinesContaining(value, removeKeyword))
              }
            >
              Containing
            </Button>
            <Button
              kind="primary"
              renderIcon={FilterRemove}
              onClick={() =>
                setValue(removeLinesNotContaining(value, removeKeyword))
              }
            >
              Not Containing
            </Button>
          </div>
        </Section>

        <Section title="Prefix / Suffix Lines">
          <TextInput
            id="affix-keyword"
            labelText="Keyword"
            hideLabel
            placeholder="Keyword"
            value={affixKeyword}
            onChange={(event) => setAffixKeyword(event.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={TextAlignLeft}
              onClick={() => setValue(prefixLines(value, affixKeyword))}
            >
              Prefix
            </Button>
            <Button
              kind="primary"
              renderIcon={TextAlignRight}
              onClick={() => setValue(suffixLines(value, affixKeyword))}
            >
              Suffix
            </Button>
          </div>
        </Section>

        <Section title="Sort Lines">
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={SortAscending}
              onClick={() => setValue(sortLinesAscending(value))}
            >
              Sort Ascending
            </Button>
            <Button
              kind="primary"
              renderIcon={SortDescending}
              onClick={() => setValue(sortLinesDescending(value))}
            >
              Sort Descending
            </Button>
          </div>
        </Section>

        <Section title="Change Letter Case">
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={CharacterLowerCase}
              onClick={() => setValue(toLowerCase(value))}
            >
              Lower
            </Button>
            <Button
              kind="primary"
              renderIcon={CharacterUpperCase}
              onClick={() => setValue(toUpperCase(value))}
            >
              Upper
            </Button>
            <Button
              kind="primary"
              renderIcon={CharacterPatterns}
              onClick={() => setValue(toTitleCase(value))}
            >
              Title
            </Button>
            <Button
              kind="primary"
              renderIcon={CharacterSentenceCase}
              onClick={() => setValue(toSentenceCase(value))}
            >
              Sentence
            </Button>
          </div>
        </Section>

        <Section title="Add / Remove Line Breaks">
          <div className="grid grid-cols-2 gap-2">
            <Button
              kind="primary"
              renderIcon={JoinFull}
              onClick={() => setValue(joinLines(value))}
            >
              Join Lines
            </Button>
            <ContentSwitcher
              selectedIndex={1}
              onChange={({ name }) =>
                setBreakPosition(name as BreakPosition)
              }
            >
              <Switch name="before" text="Before" />
              <Switch name="after" text="After" />
            </ContentSwitcher>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <TextInput
              id="break-keyword"
              labelText="Keyword"
              hideLabel
              placeholder="Keyword"
              value={breakKeyword}
              onChange={(event) => setBreakKeyword(event.target.value)}
            />
            <Button
              kind="primary"
              renderIcon={TextNewLine}
              onClick={() =>
                setValue(breakLines(value, breakKeyword, breakPosition))
              }
            >
              Break Lines
            </Button>
          </div>
        </Section>

        <Section title="Generate Lines">
          <Button
            kind="primary"
            renderIcon={Renew}
            className="w-full"
            onClick={() => setValue(generateSampleLines())}
          >
            Generate Data
          </Button>
        </Section>

        <FormLabel className="mt-auto rounded bg-[color:var(--cds-layer)] px-3 py-2">
          Content length: {value.length}
        </FormLabel>
      </div>
    </div>
  );
}
