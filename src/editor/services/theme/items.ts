/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ITheme } from "./theme"
import { registerColor, editorBackground, contrastBorder, transparent, editorWidgetBackground, textLinkForeground, lighten, darken, focusBorder, activeContrastBorder, editorWidgetForeground, editorErrorForeground, editorWarningForeground, editorInfoForeground } from './color';
import { Color } from "../../utils"

// < --- Workbench (not customizable) --- >

export function WORKBENCH_BACKGROUND(theme: ITheme): Color {
	switch (theme.type) {
		case 'dark':
			return Color.fromHex('#252526');
		case 'light':
			return Color.fromHex('#F3F3F3');
		default:
			return Color.fromHex('#000000');
	}
}

// < --- Tabs --- >

export const TAB_ACTIVE_BACKGROUND = registerColor('tab.activeBackground', {
	dark: editorBackground,
	light: editorBackground,
	hc: editorBackground
});

export const TAB_UNFOCUSED_ACTIVE_BACKGROUND = registerColor('tab.unfocusedActiveBackground', {
	dark: TAB_ACTIVE_BACKGROUND,
	light: TAB_ACTIVE_BACKGROUND,
	hc: TAB_ACTIVE_BACKGROUND
});

export const TAB_INACTIVE_BACKGROUND = registerColor('tab.inactiveBackground', {
	dark: '#2D2D2D',
	light: '#ECECEC',
	hc: null
});

export const TAB_HOVER_BACKGROUND = registerColor('tab.hoverBackground', {
	dark: null,
	light: null,
	hc: null
});

export const TAB_UNFOCUSED_HOVER_BACKGROUND = registerColor('tab.unfocusedHoverBackground', {
	dark: transparent(TAB_HOVER_BACKGROUND, 0.5),
	light: transparent(TAB_HOVER_BACKGROUND, 0.7),
	hc: null
});

export const TAB_BORDER = registerColor('tab.border', {
	dark: '#252526',
	light: '#F3F3F3',
	hc: contrastBorder
});

export const TAB_ACTIVE_BORDER = registerColor('tab.activeBorder', {
	dark: null,
	light: null,
	hc: null
});

export const TAB_UNFOCUSED_ACTIVE_BORDER = registerColor('tab.unfocusedActiveBorder', {
	dark: transparent(TAB_ACTIVE_BORDER, 0.5),
	light: transparent(TAB_ACTIVE_BORDER, 0.7),
	hc: null
});

export const TAB_ACTIVE_BORDER_TOP = registerColor('tab.activeBorderTop', {
	dark: null,
	light: null,
	hc: null
});

export const TAB_UNFOCUSED_ACTIVE_BORDER_TOP = registerColor('tab.unfocusedActiveBorderTop', {
	dark: transparent(TAB_ACTIVE_BORDER_TOP, 0.5),
	light: transparent(TAB_ACTIVE_BORDER_TOP, 0.7),
	hc: null
});

export const TAB_ACTIVE_MODIFIED_BORDER = registerColor('tab.activeModifiedBorder', {
	dark: '#3399CC',
	light: '#33AAEE',
	hc: null
});

export const TAB_INACTIVE_MODIFIED_BORDER = registerColor('tab.inactiveModifiedBorder', {
	dark: transparent(TAB_ACTIVE_MODIFIED_BORDER, 0.5),
	light: transparent(TAB_ACTIVE_MODIFIED_BORDER, 0.5),
	hc: Color.white
});

export const TAB_UNFOCUSED_ACTIVE_MODIFIED_BORDER = registerColor('tab.unfocusedActiveModifiedBorder', {
	dark: transparent(TAB_ACTIVE_MODIFIED_BORDER, 0.5),
	light: transparent(TAB_ACTIVE_MODIFIED_BORDER, 0.7),
	hc: Color.white
});

export const TAB_UNFOCUSED_INACTIVE_MODIFIED_BORDER = registerColor('tab.unfocusedInactiveModifiedBorder', {
	dark: transparent(TAB_INACTIVE_MODIFIED_BORDER, 0.5),
	light: transparent(TAB_INACTIVE_MODIFIED_BORDER, 0.5),
	hc: Color.white
});

export const TAB_HOVER_BORDER = registerColor('tab.hoverBorder', {
	dark: null,
	light: null,
	hc: null
});

export const TAB_UNFOCUSED_HOVER_BORDER = registerColor('tab.unfocusedHoverBorder', {
	dark: transparent(TAB_HOVER_BORDER, 0.5),
	light: transparent(TAB_HOVER_BORDER, 0.7),
	hc: null
});

export const TAB_ACTIVE_FOREGROUND = registerColor('tab.activeForeground', {
	dark: Color.white,
	light: '#333333',
	hc: Color.white
});

export const TAB_INACTIVE_FOREGROUND = registerColor('tab.inactiveForeground', {
	dark: transparent(TAB_ACTIVE_FOREGROUND, 0.5),
	light: transparent(TAB_ACTIVE_FOREGROUND, 0.7),
	hc: Color.white
});

export const TAB_UNFOCUSED_ACTIVE_FOREGROUND = registerColor('tab.unfocusedActiveForeground', {
	dark: transparent(TAB_ACTIVE_FOREGROUND, 0.5),
	light: transparent(TAB_ACTIVE_FOREGROUND, 0.7),
	hc: Color.white
});

export const TAB_UNFOCUSED_INACTIVE_FOREGROUND = registerColor('tab.unfocusedInactiveForeground', {
	dark: transparent(TAB_INACTIVE_FOREGROUND, 0.5),
	light: transparent(TAB_INACTIVE_FOREGROUND, 0.5),
	hc: Color.white
});

// < --- Editors --- >

export const EDITOR_PANE_BACKGROUND = registerColor('editorPane.background', {
	dark: editorBackground,
	light: editorBackground,
	hc: editorBackground
});

registerColor('editorGroup.background', {
	dark: null,
	light: null,
	hc: null
});

export const EDITOR_GROUP_EMPTY_BACKGROUND = registerColor('editorGroup.emptyBackground', {
	dark: null,
	light: null,
	hc: null
});

export const EDITOR_GROUP_FOCUSED_EMPTY_BORDER = registerColor('editorGroup.focusedEmptyBorder', {
	dark: null,
	light: null,
	hc: focusBorder
});

export const EDITOR_GROUP_HEADER_TABS_BACKGROUND = registerColor('editorGroupHeader.tabsBackground', {
	dark: '#252526',
	light: '#F3F3F3',
	hc: null
});

export const EDITOR_GROUP_HEADER_TABS_BORDER = registerColor('editorGroupHeader.tabsBorder', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const EDITOR_GROUP_HEADER_NO_TABS_BACKGROUND = registerColor('editorGroupHeader.noTabsBackground', {
	dark: editorBackground,
	light: editorBackground,
	hc: editorBackground
});

export const EDITOR_GROUP_BORDER = registerColor('editorGroup.border', {
	dark: '#444444',
	light: '#E7E7E7',
	hc: contrastBorder
});

export const EDITOR_DRAG_AND_DROP_BACKGROUND = registerColor('editorGroup.dropBackground', {
	dark: Color.fromHex('#53595D').transparent(0.5),
	light: Color.fromHex('#2677CB').transparent(0.18),
	hc: null
});

// < --- Resource Viewer --- >

export const IMAGE_PREVIEW_BORDER = registerColor('imagePreview.border', {
	dark: Color.fromHex('#808080').transparent(0.35),
	light: Color.fromHex('#808080').transparent(0.35),
	hc: contrastBorder
});

// < --- Panels --- >

export const PANEL_BACKGROUND = registerColor('panel.background', {
	dark: editorBackground,
	light: editorBackground,
	hc: editorBackground
});

export const PANEL_BORDER = registerColor('panel.border', {
	dark: Color.fromHex('#808080').transparent(0.35),
	light: Color.fromHex('#808080').transparent(0.35),
	hc: contrastBorder
});

export const PANEL_ACTIVE_TITLE_FOREGROUND = registerColor('panelTitle.activeForeground', {
	dark: '#E7E7E7',
	light: '#424242',
	hc: Color.white
});

export const PANEL_INACTIVE_TITLE_FOREGROUND = registerColor('panelTitle.inactiveForeground', {
	dark: transparent(PANEL_ACTIVE_TITLE_FOREGROUND, 0.6),
	light: transparent(PANEL_ACTIVE_TITLE_FOREGROUND, 0.75),
	hc: Color.white
});

export const PANEL_ACTIVE_TITLE_BORDER = registerColor('panelTitle.activeBorder', {
	dark: PANEL_ACTIVE_TITLE_FOREGROUND,
	light: PANEL_ACTIVE_TITLE_FOREGROUND,
	hc: contrastBorder
});

export const PANEL_DRAG_AND_DROP_BACKGROUND = registerColor('panel.dropBackground', {
	dark: Color.white.transparent(0.12),
	light: Color.fromHex('#2677CB').transparent(0.18),
	hc: Color.white.transparent(0.12)
});

export const PANEL_INPUT_BORDER = registerColor('panelInput.border', {
	dark: null,
	light: Color.fromHex('#ddd'),
	hc: null
});

// < --- Status --- >

export const STATUS_BAR_FOREGROUND = registerColor('statusBar.foreground', {
	dark: '#FFFFFF',
	light: '#FFFFFF',
	hc: '#FFFFFF'
});

export const STATUS_BAR_NO_FOLDER_FOREGROUND = registerColor('statusBar.noFolderForeground', {
	dark: STATUS_BAR_FOREGROUND,
	light: STATUS_BAR_FOREGROUND,
	hc: STATUS_BAR_FOREGROUND
});

export const STATUS_BAR_BACKGROUND = registerColor('statusBar.background', {
	dark: '#007ACC',
	light: '#007ACC',
	hc: null
});

export const STATUS_BAR_NO_FOLDER_BACKGROUND = registerColor('statusBar.noFolderBackground', {
	dark: '#68217A',
	light: '#68217A',
	hc: null
});

export const STATUS_BAR_BORDER = registerColor('statusBar.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const STATUS_BAR_NO_FOLDER_BORDER = registerColor('statusBar.noFolderBorder', {
	dark: STATUS_BAR_BORDER,
	light: STATUS_BAR_BORDER,
	hc: STATUS_BAR_BORDER
});

export const STATUS_BAR_ITEM_ACTIVE_BACKGROUND = registerColor('statusBarItem.activeBackground', {
	dark: Color.white.transparent(0.18),
	light: Color.white.transparent(0.18),
	hc: Color.white.transparent(0.18)
});

export const STATUS_BAR_ITEM_HOVER_BACKGROUND = registerColor('statusBarItem.hoverBackground', {
	dark: Color.white.transparent(0.12),
	light: Color.white.transparent(0.12),
	hc: Color.white.transparent(0.12)
});

export const STATUS_BAR_PROMINENT_ITEM_FOREGROUND = registerColor('statusBarItem.prominentForeground', {
	dark: STATUS_BAR_FOREGROUND,
	light: STATUS_BAR_FOREGROUND,
	hc: STATUS_BAR_FOREGROUND
});

export const STATUS_BAR_PROMINENT_ITEM_BACKGROUND = registerColor('statusBarItem.prominentBackground', {
	dark: Color.black.transparent(0.5),
	light: Color.black.transparent(0.5),
	hc: Color.black.transparent(0.5),
});

export const STATUS_BAR_PROMINENT_ITEM_HOVER_BACKGROUND = registerColor('statusBarItem.prominentHoverBackground', {
	dark: Color.black.transparent(0.3),
	light: Color.black.transparent(0.3),
	hc: Color.black.transparent(0.3),
});

// < --- Activity Bar --- >

export const ACTIVITY_BAR_BACKGROUND = registerColor('activityBar.background', {
	dark: '#333333',
	light: '#2C2C2C',
	hc: '#000000'
});

export const ACTIVITY_BAR_FOREGROUND = registerColor('activityBar.foreground', {
	dark: Color.white,
	light: Color.white,
	hc: Color.white
});

export const ACTIVITY_BAR_INACTIVE_FOREGROUND = registerColor('activityBar.inactiveForeground', {
	dark: transparent(ACTIVITY_BAR_FOREGROUND, 0.4),
	light: transparent(ACTIVITY_BAR_FOREGROUND, 0.4),
	hc: Color.white
});

export const ACTIVITY_BAR_BORDER = registerColor('activityBar.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const ACTIVITY_BAR_ACTIVE_BORDER = registerColor('activityBar.activeBorder', {
	dark: ACTIVITY_BAR_FOREGROUND,
	light: ACTIVITY_BAR_FOREGROUND,
	hc: null
});

export const ACTIVITY_BAR_ACTIVE_BACKGROUND = registerColor('activityBar.activeBackground', {
	dark: null,
	light: null,
	hc: null
});

export const ACTIVITY_BAR_DRAG_AND_DROP_BACKGROUND = registerColor('activityBar.dropBackground', {
	dark: Color.white.transparent(0.12),
	light: Color.white.transparent(0.12),
	hc: Color.white.transparent(0.12),
});

export const ACTIVITY_BAR_BADGE_BACKGROUND = registerColor('activityBarBadge.background', {
	dark: '#007ACC',
	light: '#007ACC',
	hc: '#000000'
});

export const ACTIVITY_BAR_BADGE_FOREGROUND = registerColor('activityBarBadge.foreground', {
	dark: Color.white,
	light: Color.white,
	hc: Color.white
});


// < --- Remote --- >

export const STATUS_BAR_HOST_NAME_BACKGROUND = registerColor('statusBarItem.remoteBackground', {
	dark: ACTIVITY_BAR_BADGE_BACKGROUND,
	light: ACTIVITY_BAR_BADGE_BACKGROUND,
	hc: ACTIVITY_BAR_BADGE_BACKGROUND
});

export const STATUS_BAR_HOST_NAME_FOREGROUND = registerColor('statusBarItem.remoteForeground', {
	dark: ACTIVITY_BAR_BADGE_FOREGROUND,
	light: ACTIVITY_BAR_BADGE_FOREGROUND,
	hc: ACTIVITY_BAR_BADGE_FOREGROUND
});

export const EXTENSION_BADGE_REMOTE_BACKGROUND = registerColor('extensionBadge.remoteBackground', {
	dark: ACTIVITY_BAR_BADGE_BACKGROUND,
	light: ACTIVITY_BAR_BADGE_BACKGROUND,
	hc: ACTIVITY_BAR_BADGE_BACKGROUND
});

export const EXTENSION_BADGE_REMOTE_FOREGROUND = registerColor('extensionBadge.remoteForeground', {
	dark: ACTIVITY_BAR_BADGE_FOREGROUND,
	light: ACTIVITY_BAR_BADGE_FOREGROUND,
	hc: ACTIVITY_BAR_BADGE_FOREGROUND
});


// < --- Side Bar --- >

export const SIDE_BAR_BACKGROUND = registerColor('sideBar.background', {
	dark: '#252526',
	light: '#F3F3F3',
	hc: '#000000'
});

export const SIDE_BAR_FOREGROUND = registerColor('sideBar.foreground', {
	dark: null,
	light: null,
	hc: null
});

export const SIDE_BAR_BORDER = registerColor('sideBar.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const SIDE_BAR_TITLE_FOREGROUND = registerColor('sideBarTitle.foreground', {
	dark: SIDE_BAR_FOREGROUND,
	light: SIDE_BAR_FOREGROUND,
	hc: SIDE_BAR_FOREGROUND
});

export const SIDE_BAR_DRAG_AND_DROP_BACKGROUND = registerColor('sideBar.dropBackground', {
	dark: Color.white.transparent(0.12),
	light: Color.black.transparent(0.1),
	hc: Color.white.transparent(0.3),
});

export const SIDE_BAR_SECTION_HEADER_BACKGROUND = registerColor('sideBarSectionHeader.background', {
	dark: Color.fromHex('#808080').transparent(0.2),
	light: Color.fromHex('#808080').transparent(0.2),
	hc: null
});

export const SIDE_BAR_SECTION_HEADER_FOREGROUND = registerColor('sideBarSectionHeader.foreground', {
	dark: SIDE_BAR_FOREGROUND,
	light: SIDE_BAR_FOREGROUND,
	hc: SIDE_BAR_FOREGROUND
});

export const SIDE_BAR_SECTION_HEADER_BORDER = registerColor('sideBarSectionHeader.border', {
	dark: contrastBorder,
	light: contrastBorder,
	hc: contrastBorder
});


// < --- Quick Input -- >

export const QUICK_INPUT_BACKGROUND = registerColor('quickInput.background', {
	dark: SIDE_BAR_BACKGROUND,
	light: SIDE_BAR_BACKGROUND,
	hc: SIDE_BAR_BACKGROUND
});

export const QUICK_INPUT_FOREGROUND = registerColor('quickInput.foreground', {
	dark: SIDE_BAR_FOREGROUND,
	light: SIDE_BAR_FOREGROUND,
	hc: SIDE_BAR_FOREGROUND
});

// < --- Title Bar --- >

export const TITLE_BAR_ACTIVE_FOREGROUND = registerColor('titleBar.activeForeground', {
	dark: '#CCCCCC',
	light: '#333333',
	hc: '#FFFFFF'
});

export const TITLE_BAR_INACTIVE_FOREGROUND = registerColor('titleBar.inactiveForeground', {
	dark: transparent(TITLE_BAR_ACTIVE_FOREGROUND, 0.6),
	light: transparent(TITLE_BAR_ACTIVE_FOREGROUND, 0.6),
	hc: null
});

export const TITLE_BAR_ACTIVE_BACKGROUND = registerColor('titleBar.activeBackground', {
	dark: '#3C3C3C',
	light: '#DDDDDD',
	hc: '#000000'
});

export const TITLE_BAR_INACTIVE_BACKGROUND = registerColor('titleBar.inactiveBackground', {
	dark: transparent(TITLE_BAR_ACTIVE_BACKGROUND, 0.6),
	light: transparent(TITLE_BAR_ACTIVE_BACKGROUND, 0.6),
	hc: null
});

export const TITLE_BAR_BORDER = registerColor('titleBar.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

// < --- Menubar --- >

export const MENUBAR_SELECTION_FOREGROUND = registerColor('menubar.selectionForeground', {
	dark: TITLE_BAR_ACTIVE_FOREGROUND,
	light: TITLE_BAR_ACTIVE_FOREGROUND,
	hc: TITLE_BAR_ACTIVE_FOREGROUND
});

export const MENUBAR_SELECTION_BACKGROUND = registerColor('menubar.selectionBackground', {
	dark: transparent(Color.white, 0.1),
	light: transparent(Color.black, 0.1),
	hc: null
});

export const MENUBAR_SELECTION_BORDER = registerColor('menubar.selectionBorder', {
	dark: null,
	light: null,
	hc: activeContrastBorder
});

// < --- Notifications --- >

export const NOTIFICATIONS_CENTER_BORDER = registerColor('notificationCenter.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const NOTIFICATIONS_TOAST_BORDER = registerColor('notificationToast.border', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const NOTIFICATIONS_FOREGROUND = registerColor('notifications.foreground', {
	dark: editorWidgetForeground,
	light: editorWidgetForeground,
	hc: editorWidgetForeground
});

export const NOTIFICATIONS_BACKGROUND = registerColor('notifications.background', {
	dark: editorWidgetBackground,
	light: editorWidgetBackground,
	hc: editorWidgetBackground
});

export const NOTIFICATIONS_LINKS = registerColor('notificationLink.foreground', {
	dark: textLinkForeground,
	light: textLinkForeground,
	hc: textLinkForeground
});

export const NOTIFICATIONS_CENTER_HEADER_FOREGROUND = registerColor('notificationCenterHeader.foreground', {
	dark: null,
	light: null,
	hc: null
});

export const NOTIFICATIONS_CENTER_HEADER_BACKGROUND = registerColor('notificationCenterHeader.background', {
	dark: lighten(NOTIFICATIONS_BACKGROUND, 0.3),
	light: darken(NOTIFICATIONS_BACKGROUND, 0.05),
	hc: NOTIFICATIONS_BACKGROUND
});

export const NOTIFICATIONS_BORDER = registerColor('notifications.border', {
	dark: NOTIFICATIONS_CENTER_HEADER_BACKGROUND,
	light: NOTIFICATIONS_CENTER_HEADER_BACKGROUND,
	hc: NOTIFICATIONS_CENTER_HEADER_BACKGROUND
});

export const NOTIFICATIONS_ERROR_ICON_FOREGROUND = registerColor('notificationsErrorIcon.foreground', {
	dark: editorErrorForeground,
	light: editorErrorForeground,
	hc: editorErrorForeground
});

export const NOTIFICATIONS_WARNING_ICON_FOREGROUND = registerColor('notificationsWarningIcon.foreground', {
	dark: editorWarningForeground,
	light: editorWarningForeground,
	hc: editorWarningForeground
});

export const NOTIFICATIONS_INFO_ICON_FOREGROUND = registerColor('notificationsInfoIcon.foreground', {
	dark: editorInfoForeground,
	light: editorInfoForeground,
	hc: editorInfoForeground
});

export const WINDOW_ACTIVE_BORDER = registerColor('window.activeBorder', {
	dark: null,
	light: null,
	hc: contrastBorder
});

export const WINDOW_INACTIVE_BORDER = registerColor('window.inactiveBorder', {
	dark: null,
	light: null,
	hc: contrastBorder
});
