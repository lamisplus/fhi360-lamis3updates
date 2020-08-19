export interface IMenuItem {
	type: string,       // Possible values: link/dropDown/icon/separator/extLink
	name?: string,      // Used as display text for item and title for separator type
	state?: string,     // Router state
	icon?: string,      // Material icon id
	tooltip?: string,   // Tooltip text
	disabled?: boolean, // If true, item will not be appeared in sidenav.
	subs?: IChildItem[], // Dropdown items
	badges?: IBadge[],
	authorities?: string[]
}

export interface IChildItem {
	type?: string,
	name: string,       // Display text
	state?: string,     // Router state
	icon?: string,
	subs?: IChildItem[],
	authorities?: string[]
}

interface IBadge {
	color: string;      // primary/accent/warn/hex color codes(#fff000)
	value: string;      // Display text
}
