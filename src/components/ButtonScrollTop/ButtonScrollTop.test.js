import React from 'react';
import ButtonScrollTop from './ButtonScrollTop';
import {render, screen} from '@testing-library/react'
import {settingsSingleImage, settingsTemplate, settingsSectionTemplate} from "../../test/mock/fields-data/organism.model.config";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

const mockFieldTemplate = {
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

const mockFieldImage = {
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


const mockFieldImageNoFile = {
    responsiveSettings: ['M', 'T', 'D'],
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
    settings: settingsSingleImage.defaultValue
}


const fieldsMock =  {
    Template: mockFieldTemplate,
    Image: mockFieldImage
};


const fieldsMockNoFileImage =  {
    Template: mockFieldTemplate,
    Image: mockFieldImageNoFile
};

const mockLanguage = 0;
const mockAssetsDirectory = '/assets/';



function fireScroll(y) {
    window.scrollY = y;
    window.dispatchEvent(new Event('scroll'))
}

describe('component -  ButtonScrollTop', () => {

    it('should render an empty container when there are nno  file on field Image', () => {
        const {container} = render(<ButtonScrollTop fields={fieldsMockNoFileImage} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(container.firstChild).toBeDefined;
        expect(container.firstChild.childNodes).toBeNull;
    });

    it('should render container with image when field Image property contain file', () => {
        const {container} = render(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);
        expect(container.firstChild).toBeTruthy();
        expect(container.querySelector('img')).toBeTruthy;

    });

    it('should not display component when scroll is not higher than window height', () => {
        const {container,  rerender} = render(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);

        act(() => {
            fireScroll(0);
        })
        rerender(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>)
        expect(container.firstChild.classList.contains('display')).toBeFalsy;
    });

    it('should display component when scroll is higher than window height', () => {
        const {container,  rerender} = render(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);

        window.innerHeight = 300;
        act(() => {
            fireScroll(400);
        })
        rerender(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>)
        expect(container.firstChild.classList.contains('display')).toBeTruthy;
    });

    it('should scroll to top on click to component', () => {
        const {container,  rerender} = render(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>);

        window.innerHeight = 300;
        window.scrollTo = () => {
            window.scrollY = 0;
        }
        act(() => {
            fireScroll(400);
        })
        rerender(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>)

        userEvent.click(container.firstChild)
        rerender(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>)

        expect(window.scrollY).toEqual(0);
    });

    /*

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

    });*/

});