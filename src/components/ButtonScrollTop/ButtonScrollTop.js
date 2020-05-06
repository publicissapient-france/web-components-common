import React, {Component} from 'react';
import {Container, ImageContainer} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";
import {getImageProps, getTemplatePropsWithImage} from "../../utils/gettersProperties";

let scrollPositions = null;

class ButtonScrollTop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", this.listener)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("scroll", this.listener)
        }
    }

    listener = () => {
        scrollPositions = window.scrollY;
        this.setState({
            scrollY: window.scrollY
        })
    }

    getImage = (field) => {
        const { language, assetsDirectory } = this.props;
        const responsiveKey = getResponsiveKey(field.content.images[0].asset)[0];
        const image = field.content.images[0];
        const file = image.asset[responsiveKey].fileName ? image.asset[responsiveKey].fileName : null;
        const alt = image.alt && image.alt[language]? image.alt[language] : '';
        if (!file) return null;
        return (
            <ImageContainer {...getImageProps(field)}>
                <img alt={alt} src={`${assetsDirectory || ''}${ file }`}/>
            </ImageContainer>
        )

    }
    scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            localStorage.removeItem('scrollPosition');
        }
    }

    getWindowHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        } else {
            return 0;
        }

    }

    render() {
        const {fields, order, assetsDirectory} = this.props;

        return (
            <Container {...getTemplatePropsWithImage(fields.Template)}
                       assetsDirectory={assetsDirectory}
                       className={this.state.scrollY && this.state.scrollY > this.getWindowHeight() ? 'display' : ''}
                       onClick={() => {
                           this.scrollToTop()
                       }}>
                { this.getImage(fields.Image)}
            </Container>
        );
    }
}


ButtonScrollTop.defaultProps = {};

ButtonScrollTop.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Image: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default ButtonScrollTop;
