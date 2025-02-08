import { type AnthropicProvider, createAnthropic } from '@ai-sdk/anthropic';
import { type DeepSeekProvider, createDeepSeek } from '@ai-sdk/deepseek';
import {
	type GoogleGenerativeAIProvider,
	createGoogleGenerativeAI,
} from '@ai-sdk/google';
import { type OpenAIProvider, createOpenAI } from '@ai-sdk/openai';
import { AI_MODELS } from '../constants';
import type { RichtigPluginSettings } from '../types';

export function getAi(settings: RichtigPluginSettings): {
	model: keyof typeof AI_MODELS;
	apiKey: string | undefined;
	ai:
		| OpenAIProvider
		| AnthropicProvider
		| GoogleGenerativeAIProvider
		| DeepSeekProvider
		| null;
} {
	const model = settings.model;
	const vendor = AI_MODELS[model];
	const apiKey = settings.apiKeys[vendor];

	if (!apiKey) {
		return { model, apiKey, ai: null };
	}

	let ai:
		| OpenAIProvider
		| AnthropicProvider
		| GoogleGenerativeAIProvider
		| DeepSeekProvider;

	switch (vendor) {
		case 'openai':
			ai = createOpenAI({ apiKey });
			break;
		case 'anthropic':
			ai = createAnthropic({ apiKey });
			break;
		case 'google':
			ai = createGoogleGenerativeAI({ apiKey });
			break;
		case 'deepseek':
			ai = createDeepSeek({ apiKey });
			break;
	}

	return { model, ai, apiKey };
}
