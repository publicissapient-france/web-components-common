import React from 'react';
import {
    Wrapper,
    Container, Loader
} from './styled';
import {removeSpaces} from "../../utils/functions";
import CardSpeakerFadeInEffect from './CardSpeakerFadeInEffect';
import LazyLoad from 'react-lazyload';
import {getTemplateProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";

const ListSpeakersCardFadeInEffect = ({children, fields, name, assetsDirectory, data}) => {
    const FlexContainer = fields.FlexContainer;

    return (
        <Wrapper id={removeSpaces(name)}
                 {...getTemplatePropsWithImage(fields.Template)}
                 assetsDirectory={assetsDirectory}
        >
            <Container
                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                {data.map((speaker, i) => {
                        return <LazyLoad key={i}
                                         placeholder={<Spinner TemplateCard={fields.TemplateCard}/>}

                        ><CardSpeakerFadeInEffect
                            configSpeakers={fields.Speakers}
                            configCard={fields.TemplateCard}
                            speaker={speaker}
                            fields={fields}
                            assetsDirectory={assetsDirectory}/></LazyLoad>
                    })
                }
                {children}
            </Container>
        </Wrapper>
    );
};

const Spinner = ({TemplateCard}) => (<Loader {...getTemplateProps(TemplateCard)}>
    <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div></Loader>);

ListSpeakersCardFadeInEffect.defaultProps = {}

export default ListSpeakersCardFadeInEffect;