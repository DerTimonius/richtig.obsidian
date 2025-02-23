import type { RichtigPluginSettings, VendorType } from './types';

export const RICHTIG_VIEW_TYPE = 'richtig-sidebar-view';
export const DEFAULT_SETTINGS: RichtigPluginSettings = {
	model: 'o3-mini',
	apiKeys: {
		anthropic: '',
		deepseek: '',
		google: '',
		openai: '',
	},
};

export const AI_MODELS = {
	// OpenAI models
	'gpt-4o': 'openai',
	'gpt-4o-mini': 'openai',
	'gpt-4-turbo': 'openai',
	'gpt-3.5-turbo': 'openai',
	o1: 'openai',
	'o1-mini': 'openai',
	'o3-mini': 'openai',

	// Anthropic models
	'claude-3-5-sonnet-latest': 'anthropic',
	'claude-3-5-haiku-latest': 'anthropic',

	// Gemini models
	'gemini-2.0-flash': 'google',
	'gemini-2.0-flash-lite-preview-02-05': 'google',
	'gemini-1.5-pro': 'google',

	// Deepseek models
	'deepseek-chat': 'deepseek',
	'deepseek-reasoner': 'deepseek',
} as const satisfies Record<string, VendorType>;
