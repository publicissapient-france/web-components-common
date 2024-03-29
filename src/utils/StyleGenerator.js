import {getExtensionFileName, isHexadecimal, isNumber} from "./functions";
import {extractFileNameWithoutExtension} from "./functions";
import {hexToRgb, RGBAtoString} from "./functions";

const generatePadding = (prop, size, subProp) => {
    if (subProp) {
        return `
            ${ prop[size].padding && prop[size].padding[subProp].top && prop[size].padding[subProp].top !== '0' ?
            `padding-top : ${ prop[size].padding[subProp].top }px;`
            : ''}
        
            ${ prop[size].padding && prop[size].padding[subProp].bottom && prop[size].padding[subProp].bottom !== '0' ?
            `padding-bottom : ${ prop[size].padding[subProp].bottom }px;`
            : ''}
        
            ${ prop[size].padding && prop[size].padding[subProp].left && prop[size].padding[subProp].left !== '0' ?
            `padding-left : ${ prop[size].padding[subProp].left }px;`
            : ''}
        
              ${ prop[size].padding && prop[size].padding[subProp].right && prop[size].padding[subProp].right !== '0' ?
            `padding-right : ${ prop[size].padding[subProp].right }px;`
            : ''}
        `
    }
    return `
    ${ prop[size].padding && prop[size].padding.top && prop[size].padding.top !== '0' ?
        `padding-top : ${ prop[size].padding.top }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.bottom && prop[size].padding.bottom !== '0' ?
        `padding-bottom : ${ prop[size].padding.bottom }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.left && prop[size].padding.left !== '0' ?
        `padding-left : ${ prop[size].padding.left }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.right && prop[size].padding.right !== '0' ?
        `padding-right : ${ prop[size].padding.right }px;`
        : ''}
    `
}

const generateMargin = (prop, size, subProp) => {
    if (subProp) {
        return `
            ${ prop[size].margin && prop[size].margin[subProp].top && prop[size].margin[subProp].top !== '0' ?
            `margin-top : ${ prop[size].margin[subProp].top }px;`
            : ''}
            
              ${ prop[size].margin && prop[size].margin[subProp].bottom && prop[size].margin[subProp].bottom !== '0' ?
            `margin-bottom : ${ prop[size].margin[subProp].bottom }px;`
            : ''}
            
              ${ prop[size].margin && prop[size].margin[subProp].left && prop[size].margin[subProp].left !== '0' ?
            `margin-left : ${ prop[size].margin[subProp].left }px;`
            : ''}
            
              ${ prop[size].margin && prop[size].margin[subProp].right && prop[size].margin[subProp].right !== '0' ?
            `margin-right : ${ prop[size].margin[subProp].right }px;`
            : ''}
        `
    }
    return `
    ${ prop[size].margin && prop[size].margin.top && prop[size].margin.top !== '0' ?
        `margin-top : ${ prop[size].margin.top }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.bottom && prop[size].margin.bottom !== '0' ?
        `margin-bottom : ${ prop[size].margin.bottom }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.left && prop[size].margin.left !== '0' ?
        `margin-left : ${ prop[size].margin.left }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.right && prop[size].margin.right !== '0' ?
        `margin-right : ${ prop[size].margin.right }px;`
        : ''}
`
}

const generateSize = (prop, size, subProp) => {
    if (subProp) {
        return `
            ${prop[size].size && prop[size].size[subProp].width && prop[size].size[subProp].width !== '' ?
            `width :${ isNumber(prop[size].size[subProp].width)
                ? `${ prop[size].size[subProp].width }px`
                : prop[size].size[subProp].width };`
            : ''}
            
            ${ prop[size].size && prop[size].size[subProp].height && prop[size].size[subProp].height !== '' ?
            `height :${ isNumber(prop[size].size[subProp].height)
                ? `${ prop[size].size[subProp].height }px`
                : prop[size].size[subProp].height };`
            : ''}
                
            ${ prop[size].size && prop[size].size[subProp].maxWidth && prop[size].size[subProp].maxWidth !== '' ?
            `max-width :${ isNumber(prop[size].size[subProp].maxWidth)
                ? `${ prop[size].size[subProp].maxWidth }px`
                : prop[size].size[subProp].maxWidth };`
            : ''}
                
            ${ prop[size].size && prop[size].size[subProp].maxHeight && prop[size].size[subProp].maxHeight !== '' ?
            `max-height :${ isNumber(prop[size].size[subProp].maxHeight)
                ? `${ prop[size].size[subProp].maxHeight }px`
                : prop[size].size[subProp].maxHeight };`
            : ''}
                
            ${ prop[size].size && prop[size].size[subProp].minWidth && prop[size].size[subProp].minWidth !== '' ?
            `min-width :${ isNumber(prop[size].size[subProp].minWidth)
                ? `${ prop[size].size[subProp].minWidth }px`
                : prop[size].size[subProp].minWidth };`
            : ''}
                
            ${ prop[size].size && prop[size].size[subProp].minHeight && prop[size].size[subProp].minHeight !== '' ?
            `min-height :${ isNumber(prop[size].size[subProp].minHeight)
                ? `${ prop[size].size[subProp].minHeight }px`
                : prop[size].size[subProp].minHeight };`
            : ''}
            `
    }
    return `
    ${prop[size].size && prop[size].size.width && prop[size].size.width !== '' ?
        `width :${ isNumber(prop[size].size.width)
            ? `${ prop[size].size.width }px`
            : prop[size].size.width };`
        : ''}
    
    ${ prop[size].size && prop[size].size.height && prop[size].size.height !== '' ?
        `height :${ isNumber(prop[size].size.height)
            ? `${ prop[size].size.height }px`
            : prop[size].size.height };`
        : ''}
        
    ${ prop[size].size && prop[size].size.maxWidth && prop[size].size.maxWidth !== '' ?
        `max-width :${ isNumber(prop[size].size.maxWidth)
            ? `${ prop[size].size.maxWidth }px`
            : prop[size].size.maxWidth };`
        : ''}
        
    ${ prop[size].size && prop[size].size.maxHeight && prop[size].size.maxHeight !== '' ?
        `max-height :${ isNumber(prop[size].size.maxHeight)
            ? `${ prop[size].size.maxHeight }px`
            : prop[size].size.maxHeight };`
        : ''}
        
    ${ prop[size].size && prop[size].size.minWidth && prop[size].size.minWidth !== '' ?
        `min-width :${ isNumber(prop[size].size.minWidth)
            ? `${ prop[size].size.minWidth }px`
            : prop[size].size.minWidth };`
        : ''}
        
    ${ prop[size].size && prop[size].size.minHeight && prop[size].size.minHeight !== '' ?
        `min-height :${ isNumber(prop[size].size.minHeight)
            ? `${ prop[size].size.minHeight }px`
            : prop[size].size.minHeight };`
        : ''}
    `
}

const generateFontProperties = (prop, size) => {
    return `
    ${ prop[size].font.size ?
        `font-size :${ prop[size].font.size  }px;`
        : ''}
    
    ${ prop[size].font.family ?
        `font-family :'${ prop[size].font.family }', ${prop[size].font.typeface };`
        : ''}
    
    ${ prop[size].font.style && prop[size].font.style !== '' ?
        `font-style : ${ prop[size].font.style };`
        : ''}
        
    ${ prop[size].font.weight && prop[size].font.weight[1] ?
        `font-weight : ${ prop[size].font.weight[1] };`
        : ''}
        
    ${ prop[size].font.letterSpacing && prop[size].font.letterSpacing !== '0' ?
        `letter-spacing : ${ prop[size].font.letterSpacing }px;`
        : ''}
    
    ${ prop[size].font.lineHeight ?
        `line-height : ${ prop[size].font.lineHeight }px;`
        : ''}
    
    ${ prop[size].text && prop[size].text.align ?
        `text-align : ${ prop[size].text.align };`
        : ''}
    
    ${ prop[size].text && prop[size].text.decoration && prop[size].text.decoration !== '' ?
        `text-decoration : ${ prop[size].text.decoration };`
        : ''}
        
    ${ prop[size].text && prop[size].text.transform && prop[size].text.transform !== '' ?
        `text-transform : ${ prop[size].text.transform };`
        : ''}
    `
}


const generateBorder = (prop, size) => {
    return `
    border-style : solid;
    ${ prop[size].width.top && prop[size].width.top !== '0' ?
        `border-top-width :${ isNumber(prop[size].width.top)
            ? `${ prop[size].width.top }px;`
            : `${ prop[size].width.top };`}`
        : ''}
     
    ${ prop[size].width.right && prop[size].width.right !== '0' ?
        `border-right-width :${ isNumber(prop[size].width.right)
            ? `${ prop[size].width.right }px;`
            : `${ prop[size].width.right };`}`
        : ''}
     
    ${ prop[size].width.bottom && prop[size].width.bottom !== '0' ?
        `border-bottom-width :${ isNumber(prop[size].width.bottom)
            ? `${ prop[size].width.bottom }px;`
            : `${ prop[size].width.bottom };`}`
        : ''}
     
    ${ prop[size].width.left && prop[size].width.left !== '0' ?
        `border-left-width :${ isNumber(prop[size].width.left)
            ? `${ prop[size].width.left }px;`
            : `${ prop[size].width.left };`}`
        : ''}
     
     ${ prop[size].radius ? `
     
        ${ prop[size].radius.topLeft && prop[size].radius.topLeft !== '0' ?
        `border-top-left-radius :${ isNumber(prop[size].radius.topLeft)
            ? `${ prop[size].radius.topLeft }px;`
            : `${ prop[size].radius.topLeft };`}`
        : ''}
         
        ${ prop[size].radius.topRight && prop[size].radius.topRight !== '0' ?
        `border-top-right-radius :${ isNumber(prop[size].radius.topRight)
            ? `${ prop[size].radius.topRight }px;`
            : `${ prop[size].radius.topRight };`}`
        : ''}
         
        ${ prop[size].radius.bottomRight && prop[size].radius.bottomRight !== '0' ?
        `border-bottom-right-radius :${ isNumber(prop[size].radius.bottomRight)
            ? `${ prop[size].radius.bottomRight }px;`
            : `${ prop[size].radius.bottomRight };`}`
        : ''}
         
        ${ prop[size].radius.bottomLeft && prop[size].radius.bottomLeft !== '0' ?
        `border-bottom-left-radius :${ isNumber(prop[size].radius.bottomLeft)
            ? `${ prop[size].radius.bottomLeft }px;`
            : `${ prop[size].radius.bottomLeft };`}`
        : ''}
     
     ` : ''}
`
}

const generateBackground = (prop, size, subProp) => {
    if(subProp){
        return `
            ${( prop[size].color[subProp] && prop[size].color[subProp].hex.startsWith('#')  ?
                `
                background : rgba(0,0,0,0);
                background-color : ${getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp])}; `
            : '' )}
            
            ${( prop[size].color[subProp] &&  prop[size].color[subProp].hex.includes('gradient')  ?
                `background : ${ getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp])};
                 background-origin : border-box;
                ` 
            : '' )}
        `;
    }
    return `
            ${( prop[size].color && prop[size].color.hex.startsWith('#')  ?
                `   background : rgba(0,0,0,0);
                    background-color : ${getFormatedColor(prop[size].color, prop[size].opacity)}; `
            : '' )}
            
            ${( prop[size].color &&  prop[size].color.hex.includes('gradient')  ?
                `background : ${ getFormatedColor(prop[size].color, prop[size].opacity)};
                 background-origin : border-box;
                ` 
            : '' )}
        `;

}

const generateTextColor = (prop, size, subProp) => {
    if(subProp){
        return `
            ${( prop[size].color[subProp] && prop[size].color[subProp].hex.startsWith('#')  ?
                `color : ${getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp])}; `
            : '' )}
            
            ${( prop[size].color[subProp] &&  prop[size].color[subProp].hex.includes('gradient')  ?
                `
                background: ${ getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp])};
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
               ` 
            : '' )}
        `;
    }
    return `
            ${( prop[size].color && prop[size].color.hex.startsWith('#')  ?
                `color : ${getFormatedColor(prop[size].color, prop[size].opacity)}; `
            : '' )}
            
            ${( prop[size].color &&  prop[size].color.hex.includes('gradient')  ?
                `
                background: ${ getFormatedColor(prop[size].color, prop[size].opacity)};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
               ` 
            : '' )}
        `;
}

const generateBorderColor = (prop, size, subProp) => {
    if(subProp){
        return `
            ${(prop[size].color[subProp] && prop[size].color[subProp].hex.startsWith('#')  ?
                `border-color : ${ getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp] ) };
                 border-image-source: none;` 
            : '' )}
            
            ${( prop[size].color[subProp] && prop[size].color[subProp].hex.includes('gradient')  ?
                `border-image-source : ${ getFormatedColor(prop[size].color[subProp], prop[size].opacity[subProp] ) }; 
                 border-image-slice: 1;` 
            : '' )}
        `;
    }
    return `
            ${(prop[size].color && prop[size].color.hex.startsWith('#')  ?
                `border-color : ${ getFormatedColor(prop[size].color, prop[size].opacity) };
                 border-image-source: none;`
        : '' )}
            
            ${( prop[size].color && prop[size].color.hex.includes('gradient')  ?
                `border-image-source : ${ getFormatedColor(prop[size].color, prop[size].opacity) }; 
                 border-image-slice: 1;`
        : '' )}
        `;
}


const getFormatedColor = (color, opacity) => {
    if (color.hex === 'transparent') {
        return color.hex
    }else if(!isHexadecimal(color.hex)){
        const gradient = color.hex;
        const  gradientType = gradient.split('(')[0];
        const gradientParameters = gradient.substring(gradient.indexOf('(') + 1, gradient.lastIndexOf(')'));
        const arrayParameters = gradientParameters.split( /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/ );

        const formatedGradient = arrayParameters.map(parameter => {
            parameter = parameter.trim();

            if(parameter.startsWith('#')){
                const splited = parameter.split(' ');
                const rgba = RGBAtoString(hexToRgb(splited[0]), opacity.value);
                splited[0] = rgba;
                return  splited.join(' ');
            }else if(parameter.startsWith('rgba') || parameter.startsWith('rgb')){
                const splited = parameter.split(' ');
                var rgb = splited[0].match(/\d+/g);

                const rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${rgb[3] === '0' ? 0 : opacity.value})`
                splited[0] = rgba;
                return splited.join(' ');;
            }
            return parameter;
        })


        return gradientType + '(' + formatedGradient + ')';
    } else {
        return `rgba(${color.rgb},${opacity.value})`
    }
}

const getFirstColorGradient = (gradient) => {


    const  gradientType = gradient.split('(')[0];
    const gradientParameters = gradient.substring(gradient.indexOf('(') + 1, gradient.lastIndexOf(')'));
    const arrayParameters = gradientParameters.split( /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/ );

    let color =  null;

        arrayParameters.forEach(parameter => {
            parameter = parameter.trim();
            if(color !== null){
                return;
            }else if(parameter.startsWith('#')){
                const splited = parameter.split(' ');
                color = splited[0];

            }else if(parameter.startsWith('rgba') || parameter.startsWith('rgb')){
                const splited = parameter.split(' ');
                var rgb = splited[0].match(/\d+/g);

                color = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 1)`;
            }
        })

    return color;
}

const getFormatedSizeProperty = (property, value) => {
    const camelProperty = toCamel(property);
    return `
        ${value[camelProperty] && value[camelProperty] !== '' ?
        `${property} :${ isNumber(value[camelProperty])
            ? `${ value[camelProperty] }px`
            : value[camelProperty] };`
        : ''}
    `
}
const getFormatedPositionProperty = (property, value) => {
    return `
        ${value[property] && value[property] !== '' && value[property] !== '0'  ?
        `${property} :${ isNumber(value[property])
            ? `${ value[property] }px`
            : value[property] } !important;`
        : ''}
    `
}


const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};


const generateBackgroundImage = (prop, size, assetsDirectory) => {
    if (!prop[size].fileName) return '';
    const path = `${assetsDirectory || ''}${  prop[size].fileName }`;
    return `
            background-image : url('${ path }');
            background-size : cover;
            background-position : center;
    `
}

const generateBackgroundImageNoResponsive = (fileName, assetsDirectory) => {
    if (!fileName) return '';
    const path = `${assetsDirectory || ''}${  fileName }`;
    return `
            background-image : url('${ path }');
            background-size : cover;
            background-position : center;
    `
}

const generateBackgroundImageWebp = (prop, size, assetsDirectory) => {
    if (!prop[size].fileName) return '';

    const path = `${assetsDirectory || ''}${  prop[size].fileName }`;
    const extension = getExtensionFileName(path);

    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
        const pathWebp = `${  extractFileNameWithoutExtension(path) }.webp`;

        return `
            background-image : url('${ pathWebp }');
            background-size : cover;
            background-position : center;
    `
    } else {
        return `
            background-image : url('${ path }');
            background-size : cover;
            background-position : center;    
    `
    }
}

const generateBackgroundImageWebpNoResponsive = (fileName, assetsDirectory) => {
    if (!fileName) return '';

    const path = `${assetsDirectory || ''}${  fileName }`;
    const extension = getExtensionFileName(path);

    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
        const pathWebp = `${  extractFileNameWithoutExtension(path) }.webp`;

        return `
            background-image : url('${ pathWebp }');
            background-size : cover;
            background-position : center;
    `
    } else {
        return `
            background-image : url('${ path }');
            background-size : cover;
            background-position : center;    
    `
    }
}

export {
    getFirstColorGradient,
    generatePadding,
    generateMargin,
    generateSize,
    generateFontProperties,
    generateBorder,
    generateBackground,
    generateBackgroundImage,
    getFormatedColor,
    generateTextColor,
    generateBorderColor,
    getFormatedSizeProperty,
    generateBackgroundImageWebp,
    generateBackgroundImageWebpNoResponsive, generateBackgroundImageNoResponsive, toCamel, getFormatedPositionProperty
}