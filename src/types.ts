import type { AI_MODELS } from './constants';

export type VendorType = 'openai' | 'anthropic' | 'google' | 'deepseek';

export type ApiKeys = Record<VendorType, string>;

export type Model = keyof typeof AI_MODELS;

export interface RichtigPluginSettings {
	apiKeys: ApiKeys;
	model: Model;
}
