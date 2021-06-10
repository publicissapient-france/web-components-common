import React, {useRef, useLayoutEffect, useState} from 'react';
import {Container, ContainerActive, ShortPresentation, IconContent} from './styled';
import IconElement from '../IconElement'

import {TextCommon} from "../../../styles/common.styled";
import {ContentCommon} from "../../../styles/common.styled";

import PropTypes from 'prop-types';
import {getContentProps, getTemplatePropsWithImage, getTextProps} from "../../../utils/gettersProperties";
import {fileNameFromUrl} from "../../../utils/functions";

const CardSpeakerFadeInEffect = ({fields, assetsDirectory, language, speaker}) => {
    const ContentBold = fields.ContentBold ? {...getContentProps(fields.ContentBold)} : null;


    const [isActive, setIsActive] = useState(false);

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    let movement_timer = null;
    const RESET_TIMEOUT = 100;

    const test_dimensions = () => {
       if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });

        }
    }

    useLayoutEffect(() => {
        test_dimensions();
    }, []);

    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        window.addEventListener('resize', () => {
            clearInterval(movement_timer);
            movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
        });
    }

    return (
        <Container dynamicHeight={dimensions.width} fadeAnimation={fields.TemplateCardActive}
                   ref={targetRef}  {...getTemplatePropsWithImage(fields.TemplateCard)} contentBold={ContentBold}
                   assetsDirectory={assetsDirectory} assetSpeaker={speaker.imageURL ? fileNameFromUrl(speaker.imageURL) : ''} className={isActive ? 'active' : 'inactive'}
                   onClick={() => setIsActive(!isActive)}>
            <ShortPresentation>


                {(fields.TextName && speaker.firstName) ?
                    <TextCommon {...getTextProps(fields.TextName)}>{`${speaker.firstName || ''}`}</TextCommon>
                    : null
                }
                {(fields.TextJob && speaker.lastName) ?
                    <TextCommon {...getTextProps(fields.TextJob)}>{`${speaker.lastName || ''}`}</TextCommon>
                    : null
                }
                {
                    speaker.tweetHandle || speaker.Linkedin || speaker.Github ?

                        <IconContent>
                            {fields.CTA && speaker.tweetHandle && speaker.tweetHandle !== '' ?
                                <IconElement field={fields.CTA} property={'icon'}
                                             content={fields.CTA.content.icon}
                                             link={`https://twitter.com/${speaker.tweetHandle}`}

                                />
                                : null}
                            {fields.CTA2 && speaker.Linkedin && speaker.Linkedin !== '' ?
                                <IconElement field={fields.CTA2} property={'icon'}
                                             content={fields.CTA2.content.icon}
                                             link={`https://www.linkedin.com/in/${speaker.Linkedin}`}

                                />
                                : null}
                            {fields.CTA3 && speaker.Github && speaker.Github !== '' ?
                                <IconElement field={fields.CTA3} property={'icon'}
                                             content={fields.CTA3.content.icon}
                                             link={`https://github.com/${speaker.Github}`}

                                />
                                : null}
                        </IconContent> : null
                }
            </ShortPresentation>
            {
                fields.TemplateCardActive &&
                <ContainerActive onClick={() => setIsActive(!isActive)}  {...getTemplatePropsWithImage(fields.TemplateCardActive)} contentBold={ContentBold}
                                  assetsDirectory={assetsDirectory}>
                    {fields.TextNameActive && speaker.firstName ?
                        <TextCommon {...getTextProps(fields.TextNameActive)}>{`${speaker.firstName || ''}`}</TextCommon>  : null
                    }
                    {fields.TextJobActive && speaker.lastName  ?
                        <ContentCommon {...getContentProps(fields.TextJobActive)}>{`${speaker.lastName || ''}`}</ContentCommon>
                        : null
                        }
                        {fields.ContentInfo && speaker.bio  ?
                        <ContentCommon {...getContentProps(fields.ContentInfo)}>{`${speaker.bio || ''}`}</ContentCommon>
                        : null
                        }
                </ContainerActive>
            }

        </Container>
    );
}

CardSpeakerFadeInEffect.defaultProps = {};

CardSpeakerFadeInEffect.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        TemplateCard: PropTypes.object,
        Title: PropTypes.object,
        Tagline: PropTypes.object,
        Content: PropTypes.object,
        Image: PropTypes.object,
        CTA: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default CardSpeakerFadeInEffect;
