// metadata and model configuration
// https://microsoft.github.io/genaiscript/reference/scripts/metadata/
script({
    title: "style-tester",
    system: ["system", "system.annotations", "system.functions", "system.fs_read_file"],
})

// use def to emit LLM variables
// https://microsoft.github.io/genaiscript/reference/scripts/context/#definition-def
const slides = def("SLIDES", env.files, { endsWith: ".md" })

// use $ to output formatted text to the prompt
// https://microsoft.github.io/genaiscript/reference/scripts/prompt/
$`You are an expert at creating Techinal presentation using markdown/MDX
usig the https://sli.dev/ format.

Review ${slides} for clarity, consistency, and conciseness. Use annotations
to report any issues or suggestions.

The slide format can reference other files as follows. Also analyze those files.

\`\`\`md
---
src: path/to/slide.md
---

`

// next, "Run GenAIScript" on a file or folder
// https://microsoft.github.io/genaiscript/getting-started/running-scripts/