import styled from 'styled-components';
import {device, theme, size} from "../../styles/constants";
import {
    generatePadding,
    generateBorder, generateSize,
    generateBackgroundImage, generateBackgroundImageWebp, generateBorderColor, generateBackground
} from "../../utils/StyleGenerator";

export const Wrapper = styled.section.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border: props.border,
    asset : props.asset,
    assetsDirectory : props.assetsDirectory

}))`
  display : flex;
  flex-direction : column;
  width: 100%;  
  position : relative;
  overflow : hidden;
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
            ${ props.basis ? generateSize(props.basis, size) : '' }       
            ${ props.basis ? generatePadding(props.basis, size) : '' }
            ${ props.border ?  generateBorder(props.border, size) : '' }        
            ${ props.border ?  generateBorderColor(props.border, size) : '' }   
            
            &:after{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               ${props.basis ? generateBackground(props.basis, size) : ''};
               ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background:${ props.basis[size].color.gradient  };`
    : ''}
            }
         }`)
    }; 
    
    ${ props =>  props.responsiveContent && props.asset ? props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            
            &:before{
               z-index : 0;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               top : 0;
               left : 0;
            }
            .no-webp &:before{
               ${ props.asset ? generateBackgroundImage(props.asset, size, props.assetsDirectory) : ''}  
            }
            .webp &:before{
               ${ props.asset ? generateBackgroundImageWebp(props.asset, size, props.assetsDirectory) : ''}  
            }
         }`) : ''
    };
`;


export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    flex: props.flex

}))`
  max-width : 1280px;
  margin: auto;
  width : inherit;
  display : flex;
  z-index : 2;
  
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             flex-direction : ${ props.flex[size].properties.direction };
             flex-wrap: ${ props.flex[size].properties.wrap };
             justify-content: ${ props.flex[size].properties.justify };
             align-items: ${ props.flex[size].properties.alignItems };
             align-content: ${ props.flex[size].properties.alignContent };
             margin-bottom : -${ props.flex[size].properties.gutterVertical }px;
             
             &>*{
                width: calc(100% / ${ props.flex[size].properties.columns } - ${   ((props.flex[size].properties.columns - 1) * props.flex[size].properties.gutterHorizontal) / props.flex[size].properties.columns }px );
                margin-bottom : ${ props.flex[size].properties.gutterVertical }px;
                
                ${props.flex[size].properties.justify === 'flex-start' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n) ){
                        margin-right : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    
                    `  : ''
    }
                ${props.flex[size].properties.justify === 'flex-end' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
                
                ${props.flex[size].properties.justify === 'center' ? `
                    &:not(:nth-child(${ props.flex[size].properties.columns }n + 1)){
                      margin-left : ${props.flex[size].properties.gutterHorizontal}px;
                    }
                    `  : ''
    }
             }
         }`)
    }; 
`;

export const Loader = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    basis: props.basis,
    border : props.border
}))`

   width : 100%;
   height :auto;
   display:flex !important;
   justify-content : center !important;
   flex-direction : column;
   position : relative;
   overflow : hidden;
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
         
            ${ props.basis ? generateSize(props.basis, size) : '' }
             
            &:after{
               z-index : 1;
               position : absolute;
               width : 100%;
               height : 100%;
               content : ''; 
               ${ props.basis[size].background &&  props.basis[size].background.top ? `
                  top:${ props.basis[size].background.top  }px;
                ` : 'top : 0;'}
               left : 0;
               
               ${props.basis ? generateBackground(props.basis, size): ''}
           
               ${ props.basis[size].color.gradient && props.basis[size].color.gradient !== '' ? `
                  background-image :${ props.basis[size].color.gradient  };
               ` : ''}
            }
         }`)
    };


.lds-ring {
  display: flex;
  position: relative;
  width: 40px;
  height: 40px;
  align-self:center;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid ${theme.grey40};
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color:  ${theme.grey40} transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;