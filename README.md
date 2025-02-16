# richtig?

**richtig?** is an Obsidian plugin that helps you refine your notes by providing constructive feedback using an LLM. Whether you're summarizing concepts, writing explanations, or documenting ideas, this plugin ensures your notes are clear and comprehensive, or if they are missing important information.

## Features

- **Whole File Analysis**: Send the entire note to the LLM for feedback.
- **Selection-Based Feedback**: Send only a highlighted section for a more focused review.
- **Encouraging Suggestions**: The LLM offers supportive recommendations without strict corrections.
- **Non-Interactive**: The plugin provides a single response per request—no chat functionality.

## Installation

(Currently, manual installation instructions will be provided until listed in the Obsidian Community Plugins.)

### Download the release

1. Go to the [Releases](https://github.com/DerTimonius/richtig.obsidian/releases) page.
2. Download the latest `richtig.obsidian.zip` file.
3. Extract the contents into `<path-to-vault>/.obsidian/plugins/richtig.obsidian`.
4. Enable `richtig?` in Obsidian settings under "Community Plugins."

### Build it yourself

1. Run the following commands

```sh copy
cd <path-to-vault>/.obsidian/plugins
git clone https://github.com/DerTimonius/richtig.obsidian.git
cd richtig.obsidian
pnpm run build
```

2. Enable `richtig?` in Obsidian settings under "Community Plugins."
3. Select an LLM model and provide the associated API key in the plugin settings

## Usage

1. Open a note in Obsidian.
2. Use the command palette (`Ctrl/Cmd + P`) and select:
   - `richtig? - Analyze Full Note` to pass the entire note.
   - `richtig? - Analyze Selection` to send only the highlighted text.
3. The feedback will appear in a side panel.

## Notes

- The plugin does **not** ask or answer questions; it simply provides feedback.
- No local processing—your text is sent to an external LLM for analysis.

## License

MIT License
