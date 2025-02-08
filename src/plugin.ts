import type { Editor, WorkspaceLeaf } from "obsidian";
import { Plugin } from "obsidian";
import { VIEW_TYPE_EXAMPLE, RichtigView } from "./view";

export default class RichtigPlugin extends Plugin {
	private textToCheck: string;
	async onload() {
		this.addCommand({
			id: "richtig.obsidian-selection-check",
			name: "Pass selection to check",
			editorCallback: (editor: Editor) => {
				const sel = editor.getSelection();

				this.textToCheck = sel;
				this.activateView();
			},
		});

		this.addCommand({
			id: "richtig.obsidian-file-check",
			name: "Pass complete file to check",
			editorCallback: (editor) => {
				const sel = editor.getValue();

				this.textToCheck = sel;
				this.activateView();
			},
		});

		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new RichtigView(leaf, this.textToCheck),
		);
	}

	onunload() {}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			await leaf?.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
		}

		if (!leaf) return;

		workspace.revealLeaf(leaf);
	}
}
