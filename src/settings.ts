import { type App, PluginSettingTab, Setting } from 'obsidian';
import type RichtigPlugin from './plugin';
import type { Model } from './types';

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
			.setName('Model')
			.setDesc('Which model do you want to use?')
			.addDropdown((dropdown) => {
				const options = {
					'gpt-4o': 'GPT-4o',
					'gpt-4o-mini': 'GPT-4o Mini',
					'gpt-4-turbo': 'GPT-4 Turbo',
					'gpt-4.1': 'GPT-4.1',
					'gpt-3.5-turbo': 'GPT-3.5 Turbo',
					o1: '(OpenAI) o1',
					'o1-mini': '(OpenAI) o1 Mini',
					'o3-mini': '(OpenAI) o3 Mini',

					'claude-4-sonnet-20250514': 'Claude 4 Sonnet',
					'claude-3-7-sonnet-20250219': 'Claude 3.7 Sonnet',
					'claude-3-5-sonnet-latest': 'Claude 3.5 Sonnet',
					'claude-3-5-haiku-latest': 'Claude 3.5 Haiku',

					'gemini-2.5-pro-preview-05-06': 'Gemini 2.5 Pro',
					'gemini-2.5-flash-preview-04-17': 'Gemini 2.5 Flash',
					'gemini-2.0-flash': 'Gemini 2.0 Flash',
					'gemini-2.0-flash-lite-preview-02-05':
						'Gemini 2.0 Flash Lite (Preview)',
					'gemini-1.5-pro': 'Gemini 1.5 Pro',

					'deepseek-chat': 'Deepseek V3',
					'deepseek-reasoner': 'Deepseek R1',
				} satisfies Record<Model, string>;

				dropdown.addOptions(options);
				dropdown.setValue(this.plugin.settings.model);
				dropdown.onChange(async (option) => {
					this.plugin.settings.model = option as Model;
					await this.plugin.saveSettings();
				});
			});

		new Setting(containerEl)
			.setName('OpenAI API Key')
			.setDesc('Your valid OpenAI API key')
			.addText((text) => {
				text.inputEl.type = 'password';

				return text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.apiKeys.openai)
					.onChange(async (value) => {
						this.plugin.settings.apiKeys.openai = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Anthropic API Key')
			.setDesc('Your valid Anthropic API key')
			.addText((text) => {
				text.inputEl.type = 'password';

				return text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.apiKeys.anthropic)
					.onChange(async (value) => {
						this.plugin.settings.apiKeys.anthropic = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Gemini API Key')
			.setDesc('Your valid Google API key')
			.addText((text) => {
				text.inputEl.type = 'password';

				return text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.apiKeys.google)
					.onChange(async (value) => {
						this.plugin.settings.apiKeys.google = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Deepseek API Key')
			.setDesc('Your valid Deepseek API key')
			.addText((text) => {
				text.inputEl.type = 'password';

				return text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.apiKeys.deepseek)
					.onChange(async (value) => {
						this.plugin.settings.apiKeys.deepseek = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
