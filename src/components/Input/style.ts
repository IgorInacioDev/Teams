import { TextInput } from 'react-native'
import styled, {css} from 'styled-components/native'




export const Container = styled(TextInput)`
${({ theme }) => css`

color: ${theme.COLORS.WHITE};
background-color: ${theme.COLORS.GRAY_700};

font-size: ${theme.FONT_SIZE.MD}px;
font-family: ${theme.FONT_FAMILY.REGULAR};

`}
flex: 1;
 border-radius: 6px;
 padding: 12px;
 max-height: 56px;
 min-height: 56px;
 //margin-left: 12px;

`   