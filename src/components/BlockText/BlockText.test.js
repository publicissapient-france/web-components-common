import React from 'react';
import BlockText from './BlockText';
import {settingsTemplate, settingsText, settingsTitle} from "../../test/mock/fields-data/organism.model.config";
import {render, screen} from '@testing-library/react'


const TemplateMock = {
    content: {},
    responsiveSettings: ['A'],
    settings: settingsTemplate
};
const TitleMock = {
    content: {
        text: {
            0: 'Titre',
            1: 'Title'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsTitle
};

const TaglineMock = {
    content: {
        text: {
            0: 'Tagline',
            1: 'Tagline'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsTitle
};

const TextMock = {
    content: {
        text: {
            0: 'Un text',
            1: 'Some text'
        }
    },
    responsiveSettings: ['M', 'T', 'D'],
    settings: settingsTitle
};
const ContentMock = {
    content: {
        html: {
            0: '<p>Contenu</p',
            1: '<p>Inner</p>'
        }
    },
    responsiveSettings: ['A'],
    settings: settingsText
};


const fieldsMock =  {
    Template: TemplateMock,
    Title: TitleMock,
    Tagline: TaglineMock,
    Content : ContentMock
};


const mockLanguage = 0;

describe('component -  BlockText', () => {

    it('should render correctly', () => {
        const {container} = render(<BlockText fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild).toBeTruthy()
    });

    it('should render correctly title with order prop', () => {
        const {container} = render(<BlockText order={['Title']} fields={fieldsMock} language={mockLanguage}/>);
        const element = screen.getByText('Titre')
        expect(element).toBeTruthy();
    });

    it('should render correctly Title and Tagline with order prop', () => {
        const {container} = render(<BlockText order={['Title', 'Tagline']} fields={fieldsMock} language={mockLanguage}/>);
        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
    });

    it('should render correctly Title,Tagline, Content  and respect order prop', () => {
        const {container} = render(<BlockText order={['Title', 'Tagline', 'Content']} fields={fieldsMock} language={mockLanguage}/>);

        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
        expect(screen.getByText('Contenu')).toBeTruthy();
    });

    it('should render correctly order of children', () => {
        const {container} = render(<BlockText order={['Title', 'Content', 'Tagline']} fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild.querySelector(':nth-child(1)').textContent).toEqual('Titre');
        expect(container.firstChild.querySelector(':nth-child(2)').textContent).toEqual('Contenu');
        expect(container.firstChild.querySelector(':nth-child(3)').textContent).toEqual('Tagline');
    });

    it('should render only element declare on props order', () => {
        const {container} = render(<BlockText order={['Title']} fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild.children).toHaveLength(1);
        expect(container.firstChild.querySelector(':nth-child(1)').textContent).toEqual('Titre');
    });

    it('should render all elements without  props order', () => {
        const {container} = render(<BlockText fields={fieldsMock} language={mockLanguage}/>);
        expect(container.firstChild.children).toHaveLength(3);
        expect(screen.getByText('Titre')).toBeTruthy();
        expect(screen.getByText('Tagline')).toBeTruthy();
        expect(screen.getByText('Contenu')).toBeTruthy();

    });
    it('should return null child element if field name contained on  prop is invalid', () => {
        const {container} = render(<BlockText fields={fieldsMock} order={["BBB"]}  language={mockLanguage}/>);
        expect(container.firstChild.children).toHaveLength(0);



    });

});
