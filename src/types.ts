import type { AI_MODELS } from './constants';

export type VendorType = 'openai' | 'anthropic' | 'google' | 'deepseek';

export type ApiKeys = Record<VendorType, string>;

export interface RichtigPluginSettings {
	apiKeys: ApiKeys;
	model: keyof typeof AI_MODELS;
}
