import { ItemView, type WorkspaceLeaf } from 'obsidian';
import { generate } from './ai/generate';
import { RICHTIG_VIEW_TYPE } from './constants';
import type RichtigPlugin from './plugin';

export class RichtigView extends ItemView {
	private text: string;
	private plugin: RichtigPlugin;
	private section: HTMLElement;

	constructor(leaf: WorkspaceLeaf, plugin: RichtigPlugin) {
		super(leaf);
		this.text = plugin.textToCheck;
		this.plugin = plugin;
	}

	getViewType() {
		return RICHTIG_VIEW_TYPE;
	}

	getDisplayText() {
		return 'Richtig?';
	}

	async onOpen() {
		const overall = this.containerEl;
		overall.style.minWidth = '240px';
		const container = overall.children[1];
		container.empty();
		container.createEl('h4', { text: 'Richtig?' });

		this.section = container.createEl('section');
		this.section.empty();
		this.section.innerHTML = '';
		setImmediate(async () => {
			await generate(this.text, this.plugin.settings, this.section);
		});
	}

	async onClose() {
		const container = this.containerEl.children[1];
		container.empty();
	}
}
