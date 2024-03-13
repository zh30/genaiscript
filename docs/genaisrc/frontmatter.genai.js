script({
    title: "SEO front matter",
    description:
        "Update or generate SEO-optimized front matter for a markdown file.",
    categories: ["samples"],
    system: ["system", "system.files"],
    maxTokens: 2000,
    temperature: 0,
    model: "gpt-4",
})

defFileMerge((fn, label, before, generated) => {
    if (!/.mdx?$/i.test(fn)) return undefined
    const start = 0
    let end = 0
    const lines = (before || "").split("\n")
    if (lines[0] === "---") end = lines.indexOf("---", 1)
    const gstart = 0
    let gend = 0
    const glines = generated.split("\n")
    if (glines[0] === "---") gend = glines.indexOf("---", 1)
    if (gend > 0) {
        const res = lines.slice(0)
        const newfm = glines.slice(gstart, gend + 1)
        res.splice(start, end > 0 ? end + 1 - start : 0, ...newfm)
        return res.join("\n")
    }
    return before
})

// filter out files that don't have a front matter.description
const files = env.files.filter(
    (f) => !parsers.frontmatter(f.content)?.description
)
if (!files.length) cancel("No files to process")

def("FILE", files, { glob: "**/*.{md,mdx}" })

$`
You are a search engine optimization expert at creating front matter for markdown document.

For each FILE, re-generate the front matter content as the new file content.

## Guidance

- ONLY generate the front matter section. This is important.
- Update description as needed.
- Update keywords as needed, only 5 keywords or less. Use comma separated list for keywords.
- use yaml format, do not use quotes
- optimize for search engine optimization.
- If no front matter is present, generate it.

## Things to avoid

- DO NOT RESPOND the rest of the markdown content beyond the front matter.
- Do NOT modify the markdown content after the front matter
- Do NOT repeat project name (GenAIScript) in 'title' field
- DO NOT modify the existing 'title' or 'sidebar' fields.
- Do NOT use 'Guide' in title.
`