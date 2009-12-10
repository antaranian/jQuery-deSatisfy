jQuery.fn.deSatisfy
--

***deSatisfy*** is a configurable jQuery plugin to get XPath of the given element. 

Markup structure we have:

    <div>First div element</div>
    <div>
        <h1>jQuery deSatisfy plugin</h1>
    </div>
    <div class="container">Third div element</div>
    <div class="container">
        <span class="nested-span-class">
            <p>
                Paragraph 1
            </p>
            <p>
                Paragraph 2
            </p>
            <ul id="the-id" class="link-container">
                <li>
                    <a href="http://james.padolsey.com" rel="met"> James Padolsey </a>
                </li>
                <li>
                    <a id="antaranian-link" href="http://antaranian.com" rel="me">Mushex Antaranian </a>
                </li>
            </ul>
            <p>
                Other paragraph
            </p>
        </span>
    </div>


Example 1:

    $('antaranian-link').deSatisfy();

Will return simple XPath selector:
    
    html/body/div.container/span.nested-span-class/ul#the-id.link-container/li/a#antaranian-link

Example 2. Configuring attributes to match:

    attributes = {rel:"[rel=%rel%]", id:false};
    $('antaranian-link').deSatisfy(attributes);

Will ignore __id__ as attribute and match __rel__ attribute with [rel=%rel%]:

    html/body/div.container/span.nested-span-class/ul.link-container/li/a[rel=me]

You can simply add attributes to match as properties of attributes object by syntax 'something%attrName%other' (%attrName% will be replaced by attribute name)
Passing false as first argument will setup the plugin to ignore all attributes. (there are some issues related __class__ property to use in attribute object)

Example 3. Matching index of element:

    $('antaranian-link').deSatisfy({}, true); // you can pass true also as first argument like $('antaranian-link').deSatisfy(true);

Will return:

     html body div.container(2) span.nested-span-class ul#the-id.link-container li(2) a#antaranian-link

Example 4. Changing selectors separator:

    $('antaranian-link').deSatisfy(false, false, ' ');
    
By default selectors are separated by slashes '/' . In example we are passing space character to separate by. Returns:

    html body div span ul li a

Example 5. Slicing:

    $('antaranian-link').deSatisfy(false, false, ' ', 3);
    $('antaranian-link').deSatisfy(false, false, ' ', 'body');
    $('antaranian-link').deSatisfy(false, false, ' ', $('#the-id'));

In first slicing example we are passing limit of element to traverse. That means traversing will stop in 2nd parent of element. 
In second slicing example we are passing selector to element and in third slicing example we are passing jQuery object (sorry, my english isn't good enought to describe whats goin on in second and third example, it's similiar to first slicing example :) )
Returns (sorted by examples numbers)

    ul li a
    div span ul li a
    li a

Thanks to James Padolsey for idea for name :).
