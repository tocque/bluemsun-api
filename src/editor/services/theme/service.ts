import { ColorDefaults, ColorIdentifier } from "./color"

export class ColorRegistry {
	registerColor(id: string, defaults: ColorDefaults | null, needsTransparency?: boolean, deprecationMessage?: string): ColorIdentifier {
		return "";
	}
}
