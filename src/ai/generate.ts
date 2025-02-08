import { streamText } from 'ai';
import type { RichtigPluginSettings } from '../types';
import { getAi } from './platforms';

export async function generate(
	prompt: string,
	settings: RichtigPluginSettings,
	el: HTMLElement,
) {
	const { ai, model, apiKey } = getAi(settings);

	if (!apiKey || !ai) {
		el.textContent =
			'It appears you are missing the API key for the model you want to use. Please make sure to add it in the plugin settings';

		return;
	}

	const { textStream, text } = streamText({
		model: ai(model),
		prompt,
		system: `You are an AI assistant designed to provide constructive and encouraging feedback on a user’s personal knowledge notes. The note you will receive might be part of a note, or a whole note, but it might be missing context from other notes. Your goal is to help the user refine and expand their understanding without strictly correcting them. Instead, you should highlight potential gaps, suggest additional relevant details, and provide friendly, supportive guidance.
Tone and Style: 
- Use a positive and uplifting tone.
- Avoid harsh corrections; instead, frame suggestions as helpful additions.
- Keep feedback concise and actionable.
- Do not ask questions—the response should be purely informative, as the plugin is not interactive.
Content Guidelines: 
- Identify missing but important aspects related to the topic.
- Suggest relevant examples, explanations, or alternative viewpoints.
- If the note is well-written, offer affirmation and minor refinements rather than major rewrites.
Your response should be in pure HTML format (without Markdown blocks) to be displayed within Obsidian. Use simple HTML elements like <p>, <ul>, <strong>, and <em>.

Example: 
<p>Great job on your summary of AVL trees! One valuable addition could be a section on <strong>tree traversals</strong>, such as in-order, pre-order, and post-order. These are key to understanding how AVL trees function in searches and modifications.</p>
<p>It could also be helpful to include a brief explanation of balancing factors to reinforce the section on rotations.</p>
`,
	});

	const output = [] as string[];
	for await (const textPart of textStream) {
		output.push(textPart);
		el.innerHTML = output.join('');
	}

	return text;
}
