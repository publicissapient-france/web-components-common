import React from 'react';
import {
    Formation,
    ContentCard,
    ImageCard,
    Content,
    NextSession,
    IconContainer,
    NextSessionPromo,
    NextSessionDefault, Container, Badges
} from './styled';
import {TextCommon, CTACommon} from '../../../styles/common.styled'
import {fileNameFromUrl} from '../../../utils/functions'
import SvgElearning from '../../../assets/svg/SvgElearning';
import SvgFormation from '../../../assets/svg/SvgFormation';
import SvgPromo from '../../../assets/svg/SvgPromo';
import {generatePictureWebP} from "../../../utils/gettersCommonElement";

const CardFormation = ({data, i, assetsDirectory, configCard, CTA}) => {

    if (!data) return null

    const Settings = configCard && configCard.settings ? configCard.settings : null;
    const Responsive = configCard && configCard.responsiveSettings ? configCard.responsiveSettings : [];


    return <Container
        key={i}
        as={'a'}
        href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
        responsive={Responsive}
        responsiveContent={configCard.responsiveContent}
        basis={Settings ? Settings.basis : {}}
        border={Settings ? Settings.border : {}}
        typographyCTA={CTA.settings.typography}

    >
        <CTACommon
            animateUnderline
            responsive={CTA.responsiveSettings}
            basis={CTA.settings.basis}
            typography={CTA.settings.typography}
            border={CTA.settings.border}
            icon={CTA.settings.icon}
            href={data.slug ? `/${data.category[0].slug}/${data.slug}` : ''}
        >
            <p> {data.name ? data.name : ''}</p>
        </CTACommon>
    </Container>

}

CardFormation.propTypes = {};

export default CardFormation;
