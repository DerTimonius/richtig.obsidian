import type { App, Editor, PluginManifest, WorkspaceLeaf } from 'obsidian';
import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, RICHTIG_VIEW_TYPE } from './constants';
import { RichtigSettingsTab } from './settings';
import type { RichtigPluginSettings } from './types';
import { RichtigView } from './view';

export default class RichtigPlugin extends Plugin {
	public textToCheck: string;
	public settings: RichtigPluginSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.textToCheck = '';
		this.settings = DEFAULT_SETTINGS;
	}

	async onload() {
		this.loadSettings();

		this.addCommand({
			id: 'richtig.obsidian-selection-check',
			name: 'Analyze selection',
			editorCallback: async (editor: Editor) => {
				this.deactivateView();
				const sel = editor.getSelection();

				this.textToCheck = sel;
				this.activateView();
			},
		});

		this.addCommand({
			id: 'richtig.obsidian-file-check',
			name: 'Analyze full note',
			editorCallback: (editor) => {
				this.deactivateView();
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

	deactivateView() {
		const { workspace } = this.app;
		workspace.detachLeavesOfType(RICHTIG_VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
