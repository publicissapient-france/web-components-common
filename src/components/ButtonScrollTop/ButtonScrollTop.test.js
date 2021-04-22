import React from 'react';
import ButtonScrollTop from './ButtonScrollTop';
import {render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import {settingsSingleImage, settingsSectionTemplate} from "../../test/mock/fields-data/organism.model.config";

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


        window.scrollTo = () => {
            window.scrollY = 0;
        }

        window.innerHeight = 300;
        act(() => {
            fireScroll(400);
        })
        rerender(<ButtonScrollTop fields={fieldsMock} language={mockLanguage} assetsDirectory={mockAssetsDirectory}/>)

        userEvent.click(container.firstChild)
        expect(window.scrollY).toEqual(0);
    });

});