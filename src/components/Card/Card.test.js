import React from 'react';
import Card from './Card';
import {
    settingsText,
    settingsTitle,
    settingsSingleImage,
    settingsCTA,
    settingsSectionTemplate
} from "../../test/mock/fields-data/organism.model.config";
import {render, screen} from '@testing-library/react';


const TemplateMock = {
    content: {
        images : [
            {
                alt : {
                    0 : 'this is the alt of image'
                },
                asset  :{
                    A : {}
                }
            }
        ]
    },
    responsiveSettings:['M', 'T', 'D'],
    settings: settingsSectionTemplate.defaultValue
};

const TitleMock = {
    content: {
        text: {
            0: 'Titre',
            1: 'Title'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsTitle.defaultValue
};

const TaglineMock = {
    content: {
        text: {
            0: 'Tagline',
            1: 'Tagline'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsTitle.defaultValue
};

const ContentMock = {
    content: {
        html: {
            0: '<p>Contenu</p',
            1: '<p>Inner</p>'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsText.defaultValue
};


const ImageMock = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        images : [
            {
                alt : {
                    0 : 'this is the alt of image'
                },
                asset  :{
                    A : {
                        fileName : 'image.png',
                        id : 'ABC123',
                        url : '//images/image.png'
                    }
                }
            }
        ]
    },
    settings: settingsSingleImage.defaultValue
}


const CTAMock = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        text: {
            0: "this is a label of link"
        },
        link: {
            0: "http://test"
        },
        icon: {
            0: ""
        }

    },
    settings: settingsCTA.defaultValue
}

const fieldsMock =  {
    Template: TemplateMock,
    Title: TitleMock,
    Tagline: TaglineMock,
    Content : ContentMock,
    Image : ImageMock,
    CTA : CTAMock
};

const mockLanguage = 0;
const mockAssetsDirectory = '/assets/';


describe('component -  Card', () => {

    it('should render correctly', () => {
        const {container} = render(<Card fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(container.firstChild).toBeTruthy()
    });

    it('should render correctly title with order prop', () => {
        const {container} = render(<Card order={['Title']} fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        const element = screen.getByText('Titre')
        expect(element).toBeTruthy();
    });

    it('should render correctly Title and Tagline with order prop', () => {
        const {container} = render(<Card order={['Title', 'Tagline']} fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
    });

    it('should render correctly Title,Tagline, Content, Image and CTA, according to order prop', () => {
        const {container} = render(<Card order={['Title', 'Tagline', 'Content', 'Image',  'CTA']} fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(container.querySelector('img')).toBeTruthy;
        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
        expect(screen.getByText('Contenu')).toBeTruthy();
        expect(container.querySelector('img')).toBeTruthy;
        expect(container.querySelector('a')).toBeTruthy;
    });

    it('should render correctly order of children', () => {
        const {container} = render(<Card order={['Title', 'Content', 'Tagline',  'CTA', 'Image']} fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(container.firstChild.querySelector(':nth-child(1)').textContent).toEqual('Titre');
        expect(container.firstChild.querySelector(':nth-child(2)').textContent).toEqual('Contenu');
        expect(container.firstChild.querySelector(':nth-child(3)').textContent).toEqual('Tagline');
        expect(container.firstChild.querySelector(':nth-child(4)').textContent).toEqual('this is a label of link');
        expect(container.firstChild.querySelector(':nth-child(5) img').getAttribute('alt')).toEqual('this is the alt of image');
    });

    it('should render only element declare on props order', () => {
        const {container} = render(<Card order={['Title']} fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild.children).toHaveLength(1);
        expect(container.firstChild.querySelector(':nth-child(1)').textContent).toEqual('Titre');
    });

    it('should render all elements without  props order', () => {
        const {container} = render(<Card fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild.children).toHaveLength(5);
        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
        expect(screen.getByText('Contenu')).toBeTruthy();
        expect(container.querySelector('img')).toBeTruthy;
        expect(container.querySelector('a')).toBeTruthy;
    });

});
