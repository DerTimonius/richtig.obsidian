import { createAnthropic } from "@ai-sdk/anthropic";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

export type VendorType = "openai" | "anthropic" | "google" | "deepseek";

// TODO: make this better
export function getAi(vendor: VendorType, apiKey: string) {
	switch (vendor) {
		case "openai":
			return createOpenAI({ apiKey });
		case "anthropic":
			return createAnthropic({ apiKey });
		case "google":
			return createGoogleGenerativeAI({ apiKey });
		case "deepseek":
			return createDeepSeek({ apiKey });
	}
}
