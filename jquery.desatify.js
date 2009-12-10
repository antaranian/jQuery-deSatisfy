(function($){
/**
 * @author Mushex Antaranian
 * @return XPath selector to current element
 * @type String
 * @TODO There are some issues with input attribute object property class :/
 */

$.fn.deSatisfy = function(attributes, index, separate, slice){
    var
        o = { id: '#%id%', "class": '.%class%' },
        $parents = $(this).add($(this).parents()),
        sliceIf = {
            number: function(slicer){
                if (slicer > 0) { 
                    return $parents.slice( 0, slicer ); 
                }
            },
            string: function(slicer){
                var $slicer = $parents.filter(slicer);
                return this.object($slicer);
            },
            object: function(slicer){
                if ($parents.index(slicer) > 0) {
                    return $parents.slice( 0, $parents.index(slicer) );
                }
            }
        };

    if (typeof attributes === 'object') {
        $.extend(o, attributes);
    } else if ( attributes === true && index === undefined) {
        index = attributes;
    }
    
    separate = separate || '/';

    if (sliceIf[typeof slice]) {
        $parents = sliceIf[typeof slice](slice) || $parents;
    }
    
    return $parents.map(function(j, element){
        var selector = element.tagName.toLowerCase();
        if (attributes && element.hasAttributes()) {
            var attrs = element.attributes,
                count = attrs.length - 1;
            while(count--) {
               var attrName = attrs[count].name;
               if (o[attrName]) {
                   selector += o[attrName].replace('%' + attrName + '%', attrs[count].value);
               }    
            }
        }
        if (index) {
            var
                $plusSiblings = $parents.eq(j+1).find(selector),
                elementIndex = $plusSiblings.index(element) + 1;
            if ( $plusSiblings.length !== 1 && elementIndex > 0) {
                selector += '[' + elementIndex + ']';
            }    
        }
        return selector;
    }).get().reverse().join(separate);
}; // $.fn.deSatisfy()

})(jQuery);
