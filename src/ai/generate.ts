import { streamText } from 'ai';
import { type App, MarkdownRenderer } from 'obsidian';
import type { RichtigPluginSettings } from '../types';
import { getAi } from './platforms';

export async function generate(
	prompt: string,
	settings: RichtigPluginSettings,
	el: HTMLElement,
	app: App,
) {
	const { ai, model, apiKey } = getAi(settings);

	if (!apiKey || !ai) {
		el.createEl('p', {
			text: 'It appears you are missing the API key for the model you want to use. Please make sure to add it in the plugin settings',
			cls: 'richtig-error',
		});
		return;
	}

	const contentContainer = el.createDiv();

	const { textStream, text } = streamText({
		model: ai(model),
		prompt,
		system: `You are an AI assistant designed to provide constructive and encouraging feedback on a user’s personal knowledge notes. The note you will receive might be part of a note, or a whole note, but it might be missing context from other notes. Your goal is to help the user refine and expand their understanding without strictly correcting them. Instead, you should highlight potential gaps, suggest additional relevant details, and provide friendly, supportive guidance. Also, look out for potential typos or grammatical errors.
Tone and Style: 
- Use a positive and uplifting tone.
- Avoid harsh corrections; instead, frame suggestions as helpful additions.
- Keep feedback concise and actionable.
- Do not ask questions—the response should be purely informative, as the plugin is not interactive.
Content Guidelines: 
- Identify missing but important aspects related to the topic.
- Suggest relevant examples, explanations, or alternative viewpoints.
- If the note is well-written, offer affirmation and minor refinements rather than major rewrites.
- But if you spot typos or grammatical errors, point them out.
Your response should be in Markdown format. Use standard Markdown syntax for formatting:
- **bold** for emphasis
- *italic* for subtle emphasis
- - Bullet points for lists
- > Blockquotes for important notes or suggestions

Example response:
**Great job on your summary of AVL trees!** One valuable addition could be a section on **tree traversals**, such as in-order, pre-order, and post-order. These are key to understanding how AVL trees function in searches and modifications.

It could also be helpful to include a brief explanation of balancing factors to reinforce the section on rotations.`,
		onError({ error }) {
			console.error(error);
			contentContainer.empty();
			const errorEl = contentContainer.createEl('p', {
				cls: 'richtig-error',
			});
			errorEl.textContent = (error as { message: string }).message;
		},
	});
	let accumulatedText = '';

	for await (const textPart of textStream) {
		accumulatedText += textPart;
		contentContainer.empty();

		try {
			await MarkdownRenderer.render(
				app,
				accumulatedText,
				contentContainer,
				'',
				// @ts-expect-error: no component necessary
				null,
			);
		} catch (e) {
			console.error('Error rendering markdown:', e);
			contentContainer.setText(accumulatedText);
		}
	}

	return text;
}
