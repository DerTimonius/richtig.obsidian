import type { Editor, WorkspaceLeaf } from 'obsidian';
import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, RICHTIG_VIEW_TYPE } from './constants';
import { RichtigSettingsTab } from './settings';
import type { RichtigPluginSettings } from './types';
import { RichtigView } from './view';

export default class RichtigPlugin extends Plugin {
	public textToCheck: string;
	public settings: RichtigPluginSettings;

	async onload() {
		this.loadSettings();

		this.addCommand({
			id: 'richtig.obsidian-selection-check',
			name: 'Pass selection to check',
			editorCallback: async (editor: Editor) => {
				const sel = editor.getSelection();

				this.textToCheck = sel;
				this.activateView();
			},
		});

		this.addCommand({
			id: 'richtig.obsidian-file-check',
			name: 'Pass complete file to check',
			editorCallback: (editor) => {
				const sel = editor.getValue();

				this.textToCheck = sel;
				this.activateView();
			},
		});

		this.registerView(RICHTIG_VIEW_TYPE, (leaf) => new RichtigView(leaf, this));

		this.addSettingTab(new RichtigSettingsTab(this.app, this));
	}

	onunload() {}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(RICHTIG_VIEW_TYPE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			await leaf?.setViewState({ type: RICHTIG_VIEW_TYPE, active: true });
		}

		if (!leaf) return;

		workspace.revealLeaf(leaf);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
