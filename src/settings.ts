import { type App, PluginSettingTab, Setting } from "obsidian";
import type RichtigPlugin from "./plugin";

export class RichtigSettingsTab extends PluginSettingTab {
	plugin: RichtigPlugin;

	constructor(app: App, plugin: RichtigPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Gemini API Key")
			.setDesc("Your valid Google API key")
			.addText((text) =>
				text
					.setPlaceholder("Enter your key")
					.setValue(this.plugin.settings.geminiApiKey)
					.onChange(async (value) => {
						this.plugin.settings.geminiApiKey = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
