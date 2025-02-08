import { ItemView, type WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_EXAMPLE = "richtig.obsidian-example-view";

export class RichtigView extends ItemView {
	private text: string | null;

	constructor(leaf: WorkspaceLeaf, text: string) {
		super(leaf);
		this.text = text;
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
		this.text && container.createEl("section", { text: this.text });
	}

	async onClose() {
		this.text = null;

		const container = this.containerEl.children[1];
		container.empty();
	}
}
