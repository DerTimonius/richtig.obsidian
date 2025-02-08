import { ItemView, type WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_EXAMPLE } from "./constants";
import type RichtigPlugin from "./plugin";
import { generate } from "./ai/generate";

export class RichtigView extends ItemView {
	private text: string;
	private plugin: RichtigPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: RichtigPlugin) {
		super(leaf);
		this.text = plugin.textToCheck;
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Richtig?";
	}

	async onOpen() {
		const overall = this.containerEl;
		overall.style.minWidth = "240px";
		const container = overall.children[1];
		container.empty();
		container.createEl("h4", { text: "Richtig?" });

		const section = container.createEl("section");
		setImmediate(async () => {
			await generate(
				this.text,
				{
					apiKey: this.plugin.settings.geminiApiKey,
					vendor: "google",
					model: "gemini-2.0-flash-001",
				},
				section,
			);
		});
	}

	async onClose() {
		const container = this.containerEl.children[1];
		container.empty();
	}
}
