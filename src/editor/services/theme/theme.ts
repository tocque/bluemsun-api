import { Color, RGBA } from '../../utils'

import { ColorValue } from "./color"

class Theme {

    type: string

    getColor(color :ColorValue): Color {
        return new Color(new RGBA(1, 1, 1, 1))
    }
}

export type ITheme = Theme