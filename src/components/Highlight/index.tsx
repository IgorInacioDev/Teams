import * as S from "./style";


type Props = {
    title: string;
    subtitle: string;
}


export function Highligth({ title, subtitle }: Props) {
    return(
        
        <S.Container>

            <S.Title>
                {title}
            </S.Title>

            <S.SubTitle>
                {subtitle}
            </S.SubTitle>

        </S.Container>

    );
}