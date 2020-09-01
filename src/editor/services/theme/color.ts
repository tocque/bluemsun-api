/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Color, RGBA } from "../../utils"
import { ColorRegistry } from "./service"
import { ITheme } from "./theme"

//  ------ API types

export type ColorIdentifier = string;

export interface ColorContribution {
	readonly id: ColorIdentifier;
	readonly description: string;
	readonly defaults: ColorDefaults | null;
	readonly needsTransparency: boolean;
	readonly deprecationMessage: string | undefined;
}


export interface ColorFunction {
	(theme: ITheme): Color | undefined;
}

/**
 * A Color Value is either a color literal, a refence to other color or a derived color
 */
export type ColorValue = Color | string | ColorIdentifier | ColorFunction;


export interface ColorDefaults {
	light: ColorValue | null;
	dark: ColorValue | null;
	hc: ColorValue | null;
}

const colorRegistry = new ColorRegistry();

export function registerColor(id: string, defaults: ColorDefaults | null, needsTransparency?: boolean, deprecationMessage?: string): ColorIdentifier {
	return colorRegistry.registerColor(id, defaults, needsTransparency, deprecationMessage);
}

export function getColorRegistry(): ColorRegistry {
	return colorRegistry;
}

// ----- base colors

export const foreground = registerColor('foreground', { dark: '#CCCCCC', light: '#616161', hc: '#FFFFFF' });
export const errorForeground = registerColor('errorForeground', { dark: '#F48771', light: '#A1260D', hc: '#F48771' });
export const descriptionForeground = registerColor('descriptionForeground', { light: '#717171', dark: transparent(foreground, 0.7), hc: transparent(foreground, 0.7) });
export const iconForeground = registerColor('icon.foreground', { dark: '#C5C5C5', light: '#424242', hc: '#FFFFFF' });

export const focusBorder = registerColor('focusBorder', { dark: Color.fromHex('#0E639C').transparent(0.8), light: Color.fromHex('#007ACC').transparent(0.4), hc: '#F38518' });

export const contrastBorder = registerColor('contrastBorder', { light: null, dark: null, hc: '#6FC3DF' });
export const activeContrastBorder = registerColor('contrastActiveBorder', { light: null, dark: null, hc: focusBorder });

export const selectionBackground = registerColor('selection.background', { light: null, dark: null, hc: null });

// ------ text colors

export const textSeparatorForeground = registerColor('textSeparator.foreground', { light: '#0000002e', dark: '#ffffff2e', hc: Color.black });
export const textLinkForeground = registerColor('textLink.foreground', { light: '#006AB1', dark: '#3794FF', hc: '#3794FF' });
export const textLinkActiveForeground = registerColor('textLink.activeForeground', { light: '#006AB1', dark: '#3794FF', hc: '#3794FF' });
export const textPreformatForeground = registerColor('textPreformat.foreground', { light: '#A31515', dark: '#D7BA7D', hc: '#D7BA7D' });
export const textBlockQuoteBackground = registerColor('textBlockQuote.background', { light: '#7f7f7f1a', dark: '#7f7f7f1a', hc: null });
export const textBlockQuoteBorder = registerColor('textBlockQuote.border', { light: '#007acc80', dark: '#007acc80', hc: Color.white });
export const textCodeBlockBackground = registerColor('textCodeBlock.background', { light: '#dcdcdc66', dark: '#0a0a0a66', hc: Color.black });

// ----- widgets
export const widgetShadow = registerColor('widget.shadow', { dark: '#000000', light: '#A8A8A8', hc: null });

export const inputBackground = registerColor('input.background', { dark: '#3C3C3C', light: Color.white, hc: Color.black });
export const inputForeground = registerColor('input.foreground', { dark: foreground, light: foreground, hc: foreground });
export const inputBorder = registerColor('input.border', { dark: null, light: null, hc: contrastBorder });
export const inputActiveOptionBorder = registerColor('inputOption.activeBorder', { dark: '#007ACC00', light: '#007ACC00', hc: contrastBorder });
export const inputActiveOptionBackground = registerColor('inputOption.activeBackground', { dark: transparent(focusBorder, 0.5), light: transparent(focusBorder, 0.3), hc: null });
export const inputPlaceholderForeground = registerColor('input.placeholderForeground', { light: transparent(foreground, 0.5), dark: transparent(foreground, 0.5), hc: transparent(foreground, 0.7) });

export const inputValidationInfoBackground = registerColor('inputValidation.infoBackground', { dark: '#063B49', light: '#D6ECF2', hc: Color.black });
export const inputValidationInfoForeground = registerColor('inputValidation.infoForeground', { dark: null, light: null, hc: null });
export const inputValidationInfoBorder = registerColor('inputValidation.infoBorder', { dark: '#007acc', light: '#007acc', hc: contrastBorder });
export const inputValidationWarningBackground = registerColor('inputValidation.warningBackground', { dark: '#352A05', light: '#F6F5D2', hc: Color.black });
export const inputValidationWarningForeground = registerColor('inputValidation.warningForeground', { dark: null, light: null, hc: null });
export const inputValidationWarningBorder = registerColor('inputValidation.warningBorder', { dark: '#B89500', light: '#B89500', hc: contrastBorder });
export const inputValidationErrorBackground = registerColor('inputValidation.errorBackground', { dark: '#5A1D1D', light: '#F2DEDE', hc: Color.black });
export const inputValidationErrorForeground = registerColor('inputValidation.errorForeground', { dark: null, light: null, hc: null });
export const inputValidationErrorBorder = registerColor('inputValidation.errorBorder', { dark: '#BE1100', light: '#BE1100', hc: contrastBorder });

export const selectBackground = registerColor('dropdown.background', { dark: '#3C3C3C', light: Color.white, hc: Color.black });
export const selectListBackground = registerColor('dropdown.listBackground', { dark: null, light: null, hc: Color.black });
export const selectForeground = registerColor('dropdown.foreground', { dark: '#F0F0F0', light: null, hc: Color.white });
export const selectBorder = registerColor('dropdown.border', { dark: selectBackground, light: '#CECECE', hc: contrastBorder });

export const simpleCheckboxBackground = registerColor('checkbox.background', { dark: selectBackground, light: selectBackground, hc: selectBackground });
export const simpleCheckboxForeground = registerColor('checkbox.foreground', { dark: selectForeground, light: selectForeground, hc: selectForeground });
export const simpleCheckboxBorder = registerColor('checkbox.border', { dark: selectBorder, light: selectBorder, hc: selectBorder });


export const pickerGroupForeground = registerColor('pickerGroup.foreground', { dark: '#3794FF', light: '#0066BF', hc: Color.white });
export const pickerGroupBorder = registerColor('pickerGroup.border', { dark: '#3F3F46', light: '#CCCEDB', hc: Color.white });

export const buttonForeground = registerColor('button.foreground', { dark: Color.white, light: Color.white, hc: Color.white });
export const buttonBackground = registerColor('button.background', { dark: '#0E639C', light: '#007ACC', hc: null });
export const buttonHoverBackground = registerColor('button.hoverBackground', { dark: lighten(buttonBackground, 0.2), light: darken(buttonBackground, 0.2), hc: null });

export const badgeBackground = registerColor('badge.background', { dark: '#4D4D4D', light: '#C4C4C4', hc: Color.black });
export const badgeForeground = registerColor('badge.foreground', { dark: Color.white, light: '#333', hc: Color.white });

export const scrollbarShadow = registerColor('scrollbar.shadow', { dark: '#000000', light: '#DDDDDD', hc: null });
export const scrollbarSliderBackground = registerColor('scrollbarSlider.background', { dark: Color.fromHex('#797979').transparent(0.4), light: Color.fromHex('#646464').transparent(0.4), hc: transparent(contrastBorder, 0.6) });
export const scrollbarSliderHoverBackground = registerColor('scrollbarSlider.hoverBackground', { dark: Color.fromHex('#646464').transparent(0.7), light: Color.fromHex('#646464').transparent(0.7), hc: transparent(contrastBorder, 0.8) });
export const scrollbarSliderActiveBackground = registerColor('scrollbarSlider.activeBackground', { dark: Color.fromHex('#BFBFBF').transparent(0.4), light: Color.fromHex('#000000').transparent(0.6), hc: contrastBorder });

export const progressBarBackground = registerColor('progressBar.background', { dark: Color.fromHex('#0E70C0'), light: Color.fromHex('#0E70C0'), hc: contrastBorder });

export const editorErrorForeground = registerColor('editorError.foreground', { dark: '#F48771', light: '#E51400', hc: null });
export const editorErrorBorder = registerColor('editorError.border', { dark: null, light: null, hc: Color.fromHex('#E47777').transparent(0.8) });

export const editorWarningForeground = registerColor('editorWarning.foreground', { dark: '#CCA700', light: '#E9A700', hc: null });
export const editorWarningBorder = registerColor('editorWarning.border', { dark: null, light: null, hc: Color.fromHex('#FFCC00').transparent(0.8) });

export const editorInfoForeground = registerColor('editorInfo.foreground', { dark: '#75BEFF', light: '#75BEFF', hc: null });
export const editorInfoBorder = registerColor('editorInfo.border', { dark: null, light: null, hc: Color.fromHex('#75BEFF').transparent(0.8) });

export const editorHintForeground = registerColor('editorHint.foreground', { dark: Color.fromHex('#eeeeee').transparent(0.7), light: '#6c6c6c', hc: null });
export const editorHintBorder = registerColor('editorHint.border', { dark: null, light: null, hc: Color.fromHex('#eeeeee').transparent(0.8) });

/**
 * Editor background color.
 * Because of bug https://monacotools.visualstudio.com/DefaultCollection/Monaco/_workitems/edit/13254
 * we are *not* using the color white (or #ffffff, rgba(255,255,255)) but something very close to white.
 */
export const editorBackground = registerColor('editor.background', { light: '#fffffe', dark: '#1E1E1E', hc: Color.black });

/**
 * Editor foreground color.
 */
export const editorForeground = registerColor('editor.foreground', { light: '#333333', dark: '#BBBBBB', hc: Color.white });

/**
 * Editor widgets
 */
export const editorWidgetBackground = registerColor('editorWidget.background', { dark: '#252526', light: '#F3F3F3', hc: '#0C141F' });
export const editorWidgetForeground = registerColor('editorWidget.foreground', { dark: foreground, light: foreground, hc: foreground });

export const editorWidgetBorder = registerColor('editorWidget.border', { dark: '#454545', light: '#C8C8C8', hc: contrastBorder });

export const editorWidgetResizeBorder = registerColor('editorWidget.resizeBorder', { light: null, dark: null, hc: null });

/**
 * Editor selection colors.
 */
export const editorSelectionBackground = registerColor('editor.selectionBackground', { light: '#ADD6FF', dark: '#264F78', hc: '#f3f518' });
export const editorSelectionForeground = registerColor('editor.selectionForeground', { light: null, dark: null, hc: '#000000' });
export const editorInactiveSelection = registerColor('editor.inactiveSelectionBackground', { light: transparent(editorSelectionBackground, 0.5), dark: transparent(editorSelectionBackground, 0.5), hc: transparent(editorSelectionBackground, 0.5) }, true);
export const editorSelectionHighlight = registerColor('editor.selectionHighlightBackground', { light: lessProminent(editorSelectionBackground, editorBackground, 0.3, 0.6), dark: lessProminent(editorSelectionBackground, editorBackground, 0.3, 0.6), hc: null }, true);
export const editorSelectionHighlightBorder = registerColor('editor.selectionHighlightBorder', { light: null, dark: null, hc: activeContrastBorder });


/**
 * Editor find match colors.
 */
export const editorFindMatch = registerColor('editor.findMatchBackground', { light: '#A8AC94', dark: '#515C6A', hc: null });
export const editorFindMatchHighlight = registerColor('editor.findMatchHighlightBackground', { light: '#EA5C0055', dark: '#EA5C0055', hc: null }, true);
export const editorFindRangeHighlight = registerColor('editor.findRangeHighlightBackground', { dark: '#3a3d4166', light: '#b4b4b44d', hc: null }, true);
export const editorFindMatchBorder = registerColor('editor.findMatchBorder', { light: null, dark: null, hc: activeContrastBorder });
export const editorFindMatchHighlightBorder = registerColor('editor.findMatchHighlightBorder', { light: null, dark: null, hc: activeContrastBorder });
export const editorFindRangeHighlightBorder = registerColor('editor.findRangeHighlightBorder', { dark: null, light: null, hc: transparent(activeContrastBorder, 0.4) }, true);

/**
 * Editor hover
 */
export const editorHoverHighlight = registerColor('editor.hoverHighlightBackground', { light: '#ADD6FF26', dark: '#264f7840', hc: '#ADD6FF26' }, true);
export const editorHoverBackground = registerColor('editorHoverWidget.background', { light: editorWidgetBackground, dark: editorWidgetBackground, hc: editorWidgetBackground });
export const editorHoverForeground = registerColor('editorHoverWidget.foreground', { light: editorWidgetForeground, dark: editorWidgetForeground, hc: editorWidgetForeground });
export const editorHoverBorder = registerColor('editorHoverWidget.border', { light: editorWidgetBorder, dark: editorWidgetBorder, hc: editorWidgetBorder });
export const editorHoverStatusBarBackground = registerColor('editorHoverWidget.statusBarBackground', { dark: lighten(editorHoverBackground, 0.2), light: darken(editorHoverBackground, 0.05), hc: editorWidgetBackground });
/**
 * Editor link colors
 */
export const editorActiveLinkForeground = registerColor('editorLink.activeForeground', { dark: '#4E94CE', light: Color.blue, hc: Color.cyan });

/**
 * Editor lighbulb icon colors
 */
export const editorLightBulbForeground = registerColor('editorLightBulb.foreground', { dark: '#FFCC00', light: '#DDB100', hc: '#FFCC00' });
export const editorLightBulbAutoFixForeground = registerColor('editorLightBulbAutoFix.foreground', { dark: '#75BEFF', light: '#007ACC', hc: '#75BEFF' });

/**
 * Diff Editor Colors
 */
export const defaultInsertColor = new Color(new RGBA(155, 185, 85, 0.2));
export const defaultRemoveColor = new Color(new RGBA(255, 0, 0, 0.2));

export const diffInserted = registerColor('diffEditor.insertedTextBackground', { dark: defaultInsertColor, light: defaultInsertColor, hc: null }, true);
export const diffRemoved = registerColor('diffEditor.removedTextBackground', { dark: defaultRemoveColor, light: defaultRemoveColor, hc: null }, true);

export const diffInsertedOutline = registerColor('diffEditor.insertedTextBorder', { dark: null, light: null, hc: '#33ff2eff' });
export const diffRemovedOutline = registerColor('diffEditor.removedTextBorder', { dark: null, light: null, hc: '#FF008F' });

export const diffBorder = registerColor('diffEditor.border', { dark: null, light: null, hc: contrastBorder });

/**
 * List and tree colors
 */
export const listFocusBackground = registerColor('list.focusBackground', { dark: '#062F4A', light: '#D6EBFF', hc: null });
export const listFocusForeground = registerColor('list.focusForeground', { dark: null, light: null, hc: null });
export const listActiveSelectionBackground = registerColor('list.activeSelectionBackground', { dark: '#094771', light: '#0074E8', hc: null });
export const listActiveSelectionForeground = registerColor('list.activeSelectionForeground', { dark: Color.white, light: Color.white, hc: null });
export const listInactiveSelectionBackground = registerColor('list.inactiveSelectionBackground', { dark: '#37373D', light: '#E4E6F1', hc: null });
export const listInactiveSelectionForeground = registerColor('list.inactiveSelectionForeground', { dark: null, light: null, hc: null });
export const listInactiveFocusBackground = registerColor('list.inactiveFocusBackground', { dark: null, light: null, hc: null });
export const listHoverBackground = registerColor('list.hoverBackground', { dark: '#2A2D2E', light: '#F0F0F0', hc: null });
export const listHoverForeground = registerColor('list.hoverForeground', { dark: null, light: null, hc: null });
export const listDropBackground = registerColor('list.dropBackground', { dark: listFocusBackground, light: listFocusBackground, hc: null });
export const listHighlightForeground = registerColor('list.highlightForeground', { dark: '#0097fb', light: '#0066BF', hc: focusBorder });
export const listInvalidItemForeground = registerColor('list.invalidItemForeground', { dark: '#B89500', light: '#B89500', hc: '#B89500' });
export const listErrorForeground = registerColor('list.errorForeground', { dark: '#F88070', light: '#B01011', hc: null });
export const listWarningForeground = registerColor('list.warningForeground', { dark: '#CCA700', light: '#855F00', hc: null });
export const listFilterWidgetBackground = registerColor('listFilterWidget.background', { light: '#efc1ad', dark: '#653723', hc: Color.black });
export const listFilterWidgetOutline = registerColor('listFilterWidget.outline', { dark: Color.transparent, light: Color.transparent, hc: '#f38518' });
export const listFilterWidgetNoMatchesOutline = registerColor('listFilterWidget.noMatchesOutline', { dark: '#BE1100', light: '#BE1100', hc: contrastBorder });
export const listFilterMatchHighlight = registerColor('list.filterMatchBackground', { dark: editorFindMatchHighlight, light: editorFindMatchHighlight, hc: null });
export const listFilterMatchHighlightBorder = registerColor('list.filterMatchBorder', { dark: editorFindMatchHighlightBorder, light: editorFindMatchHighlightBorder, hc: contrastBorder });
export const treeIndentGuidesStroke = registerColor('tree.indentGuidesStroke', { dark: '#585858', light: '#a9a9a9', hc: '#a9a9a9' });

/**
 * Menu colors
 */
export const menuBorder = registerColor('menu.border', { dark: null, light: null, hc: contrastBorder });
export const menuForeground = registerColor('menu.foreground', { dark: selectForeground, light: foreground, hc: selectForeground });
export const menuBackground = registerColor('menu.background', { dark: selectBackground, light: selectBackground, hc: selectBackground });
export const menuSelectionForeground = registerColor('menu.selectionForeground', { dark: listActiveSelectionForeground, light: listActiveSelectionForeground, hc: listActiveSelectionForeground });
export const menuSelectionBackground = registerColor('menu.selectionBackground', { dark: listActiveSelectionBackground, light: listActiveSelectionBackground, hc: listActiveSelectionBackground });
export const menuSelectionBorder = registerColor('menu.selectionBorder', { dark: null, light: null, hc: activeContrastBorder });
export const menuSeparatorBackground = registerColor('menu.separatorBackground', { dark: '#BBBBBB', light: '#888888', hc: contrastBorder });

/**
 * Snippet placeholder colors
 */
export const snippetTabstopHighlightBackground = registerColor('editor.snippetTabstopHighlightBackground', { dark: new Color(new RGBA(124, 124, 124, 0.3)), light: new Color(new RGBA(10, 50, 100, 0.2)), hc: new Color(new RGBA(124, 124, 124, 0.3)) });
export const snippetTabstopHighlightBorder = registerColor('editor.snippetTabstopHighlightBorder', { dark: null, light: null, hc: null });
export const snippetFinalTabstopHighlightBackground = registerColor('editor.snippetFinalTabstopHighlightBackground', { dark: null, light: null, hc: null });
export const snippetFinalTabstopHighlightBorder = registerColor('editor.snippetFinalTabstopHighlightBorder', { dark: '#525252', light: new Color(new RGBA(10, 50, 100, 0.5)), hc: '#525252' });

/**
 * Breadcrumb colors
 */
export const breadcrumbsForeground = registerColor('breadcrumb.foreground', { light: transparent(foreground, 0.8), dark: transparent(foreground, 0.8), hc: transparent(foreground, 0.8) });
export const breadcrumbsBackground = registerColor('breadcrumb.background', { light: editorBackground, dark: editorBackground, hc: editorBackground });
export const breadcrumbsFocusForeground = registerColor('breadcrumb.focusForeground', { light: darken(foreground, 0.2), dark: lighten(foreground, 0.1), hc: lighten(foreground, 0.1) });
export const breadcrumbsActiveSelectionForeground = registerColor('breadcrumb.activeSelectionForeground', { light: darken(foreground, 0.2), dark: lighten(foreground, 0.1), hc: lighten(foreground, 0.1) });
export const breadcrumbsPickerBackground = registerColor('breadcrumbPicker.background', { light: editorWidgetBackground, dark: editorWidgetBackground, hc: editorWidgetBackground });

/**
 * Merge-conflict colors
 */

const headerTransparency = 0.5;
const currentBaseColor = Color.fromHex('#40C8AE').transparent(headerTransparency);
const incomingBaseColor = Color.fromHex('#40A6FF').transparent(headerTransparency);
const commonBaseColor = Color.fromHex('#606060').transparent(0.4);
const contentTransparency = 0.4;
const rulerTransparency = 1;

export const mergeCurrentHeaderBackground = registerColor('merge.currentHeaderBackground', { dark: currentBaseColor, light: currentBaseColor, hc: null }, true);
export const mergeCurrentContentBackground = registerColor('merge.currentContentBackground', { dark: transparent(mergeCurrentHeaderBackground, contentTransparency), light: transparent(mergeCurrentHeaderBackground, contentTransparency), hc: transparent(mergeCurrentHeaderBackground, contentTransparency) }, true);
export const mergeIncomingHeaderBackground = registerColor('merge.incomingHeaderBackground', { dark: incomingBaseColor, light: incomingBaseColor, hc: null }, true);
export const mergeIncomingContentBackground = registerColor('merge.incomingContentBackground', { dark: transparent(mergeIncomingHeaderBackground, contentTransparency), light: transparent(mergeIncomingHeaderBackground, contentTransparency), hc: transparent(mergeIncomingHeaderBackground, contentTransparency) }, true);
export const mergeCommonHeaderBackground = registerColor('merge.commonHeaderBackground', { dark: commonBaseColor, light: commonBaseColor, hc: null }, true);
export const mergeCommonContentBackground = registerColor('merge.commonContentBackground', { dark: transparent(mergeCommonHeaderBackground, contentTransparency), light: transparent(mergeCommonHeaderBackground, contentTransparency), hc: transparent(mergeCommonHeaderBackground, contentTransparency) }, true);

export const mergeBorder = registerColor('merge.border', { dark: null, light: null, hc: '#C3DF6F' });

export const overviewRulerCurrentContentForeground = registerColor('editorOverviewRuler.currentContentForeground', { dark: transparent(mergeCurrentHeaderBackground, rulerTransparency), light: transparent(mergeCurrentHeaderBackground, rulerTransparency), hc: mergeBorder });
export const overviewRulerIncomingContentForeground = registerColor('editorOverviewRuler.incomingContentForeground', { dark: transparent(mergeIncomingHeaderBackground, rulerTransparency), light: transparent(mergeIncomingHeaderBackground, rulerTransparency), hc: mergeBorder });
export const overviewRulerCommonContentForeground = registerColor('editorOverviewRuler.commonContentForeground', { dark: transparent(mergeCommonHeaderBackground, rulerTransparency), light: transparent(mergeCommonHeaderBackground, rulerTransparency), hc: mergeBorder });

export const overviewRulerFindMatchForeground = registerColor('editorOverviewRuler.findMatchForeground', { dark: '#d186167e', light: '#d186167e', hc: '#AB5A00' }, true);

export const overviewRulerSelectionHighlightForeground = registerColor('editorOverviewRuler.selectionHighlightForeground', { dark: '#A0A0A0CC', light: '#A0A0A0CC', hc: '#A0A0A0CC' }, true);

export const minimapFindMatch = registerColor('minimap.findMatchHighlight', { light: '#d18616', dark: '#d18616', hc: '#AB5A00' }, true);
export const minimapSelection = registerColor('minimap.selectionHighlight', { light: '#ADD6FF', dark: '#264F78', hc: '#ffffff' }, true);

export const problemsErrorIconForeground = registerColor('problemsErrorIcon.foreground', { dark: editorErrorForeground, light: editorErrorForeground, hc: editorErrorForeground });
export const problemsWarningIconForeground = registerColor('problemsWarningIcon.foreground', { dark: editorWarningForeground, light: editorWarningForeground, hc: editorWarningForeground });
export const problemsInfoIconForeground = registerColor('problemsInfoIcon.foreground', { dark: editorInfoForeground, light: editorInfoForeground, hc: editorInfoForeground });

// ----- color functions

export function darken(colorValue: ColorValue, factor: number): ColorFunction {
	return (theme) => {
		let color = resolveColorValue(colorValue, theme);
		if (color) {
			return color.darken(factor);
		}
		return undefined;
	};
}

export function lighten(colorValue: ColorValue, factor: number): ColorFunction {
	return (theme) => {
		let color = resolveColorValue(colorValue, theme);
		if (color) {
			return color.lighten(factor);
		}
		return undefined;
	};
}

export function transparent(colorValue: ColorValue, factor: number): ColorFunction {
	return (theme) => {
		let color = resolveColorValue(colorValue, theme);
		if (color) {
			return color.transparent(factor);
		}
		return undefined;
	};
}

export function oneOf(...colorValues: ColorValue[]): ColorFunction {
	return (theme) => {
		for (let colorValue of colorValues) {
			let color = resolveColorValue(colorValue, theme);
			if (color) {
				return color;
			}
		}
		return undefined;
	};
}

function lessProminent(colorValue: ColorValue, backgroundColorValue: ColorValue, factor: number, transparency: number): ColorFunction {
	return (theme) => {
		let from = resolveColorValue(colorValue, theme);
		if (from) {
			let backgroundColor = resolveColorValue(backgroundColorValue, theme);
			if (backgroundColor) {
				if (from.isDarkerThan(backgroundColor)) {
					return Color.getLighterColor(from, backgroundColor, factor).transparent(transparency);
				}
				return Color.getDarkerColor(from, backgroundColor, factor).transparent(transparency);
			}
			return from.transparent(factor * transparency);
		}
		return undefined;
	};
}

// ----- implementation

/**
 * @param colorValue Resolve a color value in the context of a theme
 */
export function resolveColorValue(colorValue: ColorValue | null, theme: ITheme): Color | undefined {
	if (colorValue === null) {
		return undefined;
	} else if (typeof colorValue === 'string') {
		if (colorValue[0] === '#') {
			return Color.fromHex(colorValue);
		}
		return theme.getColor(colorValue);
	} else if (colorValue instanceof Color) {
		return colorValue;
	} else if (typeof colorValue === 'function') {
		return colorValue(theme);
	}
	return undefined;
}
