import React, {Component} from 'react';
import {Container, Contain, IconContainer, ContainerPromo} from './styled';
import {TextCommon, ContainerCommon} from "../../../styles/common.styled";
import SvgElearning from '../../../assets/svg/SvgElearning';
import {getTextProps, getTemplateProps} from "../../../utils/gettersProperties";
import {getFormatedDays} from "../utilsDate";

class ItemSession extends Component {

    render() {
        const {session, settingsSession, settingsPromo, price} = this.props;

        if (session.promo.available) {
            return (
                <ContainerPromo {...getTemplateProps(settingsPromo.Template)} >

                    <Contain>
                        <TextCommon {...getTextProps(settingsPromo.Title)} >
                            {getFormatedDays(session.startTime, session.endTime)}
                        </TextCommon>
                        <TextCommon {...getTextProps(settingsPromo.Tagline)} >{`${ session.promo.price } au lieu ${ price }`}</TextCommon>
                    </Contain>


                    {
                        session.type !== 'a_distance' ? null :
                            <IconContainer
                                responsive={settingsPromo.Title ? settingsPromo.Title.responsiveSettings : []}
                                typography={settingsPromo.Title && settingsPromo.Title.settings ? settingsPromo.Title.settings.typography : null}>
                                <SvgElearning/>
                            </IconContainer>
                    }
                </ContainerPromo>
            )
        } else {
            return (
                <Container {...getTemplateProps(settingsSession.Template)}
                >
                    <Contain>
                        <TextCommon {...getTextProps(settingsSession.Content)} >
                            {getFormatedDays(session.startTime, session.endTime)}
                            {
                                session.type !== 'a_distance' ? null :
                                    <IconContainer
                                        responsive={settingsSession.Content ? settingsSession.Content.responsiveSettings : []}
                                        typography={settingsSession.Content && settingsSession.Content.settings ? settingsSession.Content.settings.typography : null}>
                                        <SvgElearning/>
                                    </IconContainer>
                            }

                        </TextCommon>
                    </Contain>
                </Container>
            );
        }
    }
}

ItemSession.propTypes = {};

export default ItemSession;
