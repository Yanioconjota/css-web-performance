# Optimizing web performance and critical rendering path

## Prerequisites

- *Option 1:* Install all the required tools and configurations using Microsoft's windows-build-tools by running `npm install -g windows-build-tools` from an elevated PowerShell (run as Administrator).

- *Option 2:* Install dependencies and configuration manually
  - Install Visual C++ Build Environment: [Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools) (using "Visual C++ build tools" workload) or Visual Studio 2017 Community (using the "Desktop development with C++" workload)

  - Install [Python 2.7](https://www.python.org/downloads/release/python-2718/) (v3.x.x is not supported), and run `npm config set python python2.7`

  - Launch cmd, `npm config set msvs_version 2017`

## Run:
- Install [nodejs](https://nodejs.org/en/)
- Check npm (node package manager) is installed via command prompt: npm
- Install npm: `npm install`
- Install gulp: `npm install gulp --global`
- Run gulp: `gulp`

----

The critical rendering path
======================================================

The critical rendering path is the reference of steps the browser goes to convert HTML, CSS, and JavaScript into pixels on the screen.

When we see frame drop or throttling must of the times is JS related bur many times is poorly optimized CSS. We will focus on CSS to improve **Runtime Performance**.

![image001](http://janioisacura.com/pics/owp/image001.png)

Optimize initial rendering by:
==============================

-  Critical resources

-  Critical bytes

CSS is **rendering blocking** by default

WEB Site/Application rendering process:
=======================================

-  HTTP Request to a server and you get an HTML file.

-  Inside the <head> tag is the metadata which includes the CSS files, and the browser fetches them

-  The browser processes the HTML file and builds the DOM (Document Object Model)

-  Parses the CSS and creates the CSSOM (CSS Object Model)

-  DOM and CSSOM are combined, and the Render tree is created. In other words, the browser parses HTML, the DOM tree, and CSS to the CSS object model tree.

-  Then the selectors are matched with all properties and the style are calculated from them

![image002](http://janioisacura.com/pics/owp/image002.png)

-  The browser then calculates position and dimensions of each element, this process is called **Layout.** The layout is the process that calculates the geometry of the elements. The main thread walks through the elements and computes the width, height and information like X and Y positions.

-  All the relative measurements like percentages, ems, or rems are converted into absolute units.

-  Each element will be drawn on the screen one by one. This process is called **paint**. It's the process where the browser engine figures out what layers are needed for the page. It analyzes the style of the elements to figure out how many layers it

![image003](http://janioisacura.com/pics/owp/image003.png)

-  Your application can have multiple layers. The browser can paint each of the layers individually. The process of handling these layers is called a **compositing layers**.

This is how the rendering frame looks. First, the browser engine parses HTML and CSS to create a render tree. Next, it triggers the layout. Layout triggers the paint, and in the last step the layers get composited. And finally, the user can see the frame on the screen. But in the real-world applications, there is one more step: The JavaScript. Understanding this pipeline, can help us to optimize the rendering process, or even eliminate some unnecessary steps.

![image004](http://janioisacura.com/pics/owp/image004.png)

Style Calculations:
===================

After fetching the files, the browser does some interesting stuff with the HTML. It starts passing the HTML document. The HTML parsing algorithm has 4 steps:

**CONVERSION**: The first part is conversion. The browser reads raw bytes from HTML and translates them into individual characters.

![image005](http://janioisacura.com/pics/owp/image005.png)

**TOKENIZING**: The browser converts the string of characters into distinct tokens. Each token has a special meaning.

![image006](http://janioisacura.com/pics/owp/image006.png)

**LEXING:** Next, it converts tokens to nodes.

![image007](http://janioisacura.com/pics/owp/image007.png)

**BUILDING THE DOM TREE**: And finally, it creates the DOM. There's the parent child relationship. Same as in the plain HTML file. So, the final output of this process is the document object model.

![image008](http://janioisacura.com/pics/owp/image008.png)

Parse CSS
=========

![image009](http://janioisacura.com/pics/owp/image009.png)

Having a DOM is not enough to know what the page would look like. That's the responsibility of CSS. Even if you don't provide any CSS each browser has a default style sheet. For example, the H1 tag is displayed bigger than the H2 tag. CSS passing algorithm is very similar to the previous one. The CSS bytes are converted into characters, then tokens, then it creates nodes. Finally, they are linked into a tree structure known as the CSS object model. While the DOM contains all the content of the page. The CSS object model contains all the styles of the page

![image010](http://janioisacura.com/pics/owp/image010.png)

Finally, they are linked into a tree structure known as the CSS object model. While the DOM contains all the content of the page. The CSS object model contains all the styles of the page. In this example for the body element the font size is defined. Paragraph extends font size from the parent and has some on properties. There is a pseudo element. Span extends some properties and defines unique color and display property. And also, there is an image selector. The next part of the process is to combine the document object model and CSS object model. It does selector matching first. The second part of the process involves taking all the style rules from the matching selectors and figuring out what final styles the element has. As a result, we get a new tree - the render tree. The render tree looks pretty similar to the DOM tree. Except, something is missing. For example, the html and the head elements. In fact, every element with display none property, will be removed from the render tree. Elements with display none should not be rendered. So, there is no reason for them to exist in the render tree. Only visible elements exist in the render tree. Equally, when you have a visible pseudo element, it will be added to the render tree, even if it doesn't live in the DOM. There is no DOM element with this content. It's a pseudo element that came from CSS object model. It's important to note that only those elements that will actually be displayed on the screen, will exist in the render tree.

![image011](http://janioisacura.com/pics/owp/image011.png)

Here is a quick recap of the browser steps. Browser engine is parsing HTML markup and builds the DOM tree. It also parses CSS markup and builds that CSS Object Model tree. It combines the DOM and CSS object model into a render tree. Next, it runs layout to compute the geometry of each node. Layout triggers paint. At the end, it composites those layers. There is a whole pipeline that browser runs.

![image012](http://janioisacura.com/pics/owp/image012.png)

![image013](http://janioisacura.com/pics/owp/image013.png)

Optimizing the critical rendering path
======================================

The critical rendering path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. It includes all the steps a browser needs to do to render the page: from the network to the compositing. By optimizing the critical rendering path, we can improve the time to the first render of our page. But page should not only load quickly, but also run well. So, we can improve runtime performance. Users expect the page will be interactive and smooth. And that's why we need to achieve 60 frames per second. You can do a lot of things to optimize the web application: optimize your server, use caching, optimizing the JavaScript, use lazy loading, reloading and many other things. But we will talk only about CSS.�

![image014](http://janioisacura.com/pics/owp/image014.png)

FPS
===

![image015](http://janioisacura.com/pics/owp/image015.png)

In order to have 60fps on animations and when building large content we should avoid specificity war, which means less use of important on properties and creating modular and reusable code.

![image016](http://janioisacura.com/pics/owp/image016.png)

Is your selector are simpler, the faster your CSS will load, because the browser reads every selector from right to left, simple selectors avoids unnecessary DOM travels.

![image017](http://janioisacura.com/pics/owp/image017.png)

![image018](http://janioisacura.com/pics/owp/image018.png)

![image019](http://janioisacura.com/pics/owp/image019.png) ![image020](http://janioisacura.com/pics/owp/image020.png)

![image021](http://janioisacura.com/pics/owp/image021.png)

This sidebar has a performance issue, it�s painted several times on click event, we can notice it by watching the FPS on every time it is painted and address a way to fix it by replacing the left property with a translate property, reaching almost 60FPS on each paint.

How layers work
===============

Previously, we changed the property we animate. First, instead of left property, we tried to animate width, but there was no improvement. The frame rate was still low, and the layout and paint were triggered too many times. Then we used transform and got a significant improvement. It's obvious that different CSS properties have a different effect on the rendering process. We should understand the implication of any property we choose to animate. So, what happens here? We have two elements: the sidebar and the main content. If we want to move the sidebar, we need to repaint the affected area. So, to fix this, I need to paint it again. If we want to move it a bit more, we need to repaint it again. ...and again... if I want to reach 60 frames per second, I have about 12 milliseconds for drawing each frame. If I miss it, the frame rate will drop. But if I moved the sidebar to the new layer, it's very easy to manipulate this. We don't need to repaint all the time. With a separate layer we can slide, rotate, change opacity and all that kind of stuff. Everything is easy. Of course, if the element has its own layer. We painted it only once, and later manipulated it very easily. With no repainting. We have the same approach in the web application. The browser uses layers to make it easy to separate and edit different parts of our application. In general, **_creating Layers is an automated process. And we should let the browser manage layers because it knows what it's doing_**. **_But, if you are having a paint issue, then you might want to promote an element to its own layer_**. Being able to control separate elements, makes it much easier to put together something complex.

![image022](http://janioisacura.com/pics/owp/image022.png)![image023](http://janioisacura.com/pics/owp/image023.png)

![image023](http://janioisacura.com/pics/owp/image023.png)

The best way to create a new layer is to use the "will-change" property. That tells the browser that we intend to change the elements transform at some point. Most browsers react to this by putting an element onto its own layer. And that's what we want here. It's supported by all major browsers. For older browsers that don't support the "will-change", you can use "translateZ". This is the most common form of this hack for older browsers. This forces the browsers to create a new layer.

Now that we promoted some elements layers using "will-cahnge" property. With this simple change, we got performance improvements. The layout and paint were no more triggered and that is really great. There is no more green flashing, no more unnecessary paint. I will try to improve it even more. I will promote every element to a layer. Let's do it. Let's profile the page.

![image024](http://janioisacura.com/pics/owp/image024.png)

But look at this! Just to scroll this page, the frame rate drops down! If you think about it, it makes sense. Now we have a thousands of layers, and the browser has too much work to compose it all layers. The more layers you have, the more time will be spent on layer management and compositing. If you make too many layers you will find that your composite and update layer tree will grow very large. Every layer requires memory and management and it's not free. The more layers you have the more time will be spent on layer compositing. There is a tradeoff between reducing paint time and increasing layer management time.

-  Promote layers only when it makes sense.

-  Promoting element to layers is a good choice to avoiding paint problems.

-  In most cases, let the browser manage layers.

-  As we learned, layer management and compositing are not free.

-  And **_never promote elements without profiling_**. Don�t promote element to a layer until you know that you definitely need to do that.

But how can we know if we should promote an element to a new layer? How can we know If we should animate the �left� property, �width�, or �transform�?�

Properties Impact
=================

We have notice that difference CSS properties have a different effect on the rendering process. So, how can we know which property we should animate? Well, we can always profile the page and see the results. But there is also a useful site you can use to check what will be triggered. Every browser engine may behave differently. Blink is the browser engine used in the Chrome. Next one is a browser engine developed by Mozilla. Webkit is a browser engine used in Safari. And the last one is used in the Edge. Initially, the animated the left property to open sidebar. Let's find it. As you can see changing left property may affect the position or size of other elements on the page which require the browser to perform layout operations. Any effected pixels need to be repainted and the page must then be composited together. Next, we tried to animate the width property.� It also triggers the whole pipeline. At the end, we animated the transform property.� Transform looks different. In most browsers, changing transform does not trigger any geometry changes or a painting, which is very good. So why does transform property work differently for animation? In the rendering process, the main thread handles most of the code we send to the user. The compositor thread rasterizes each layer. A layer could be very large like, so the compositor thread divides them into tiles and sends each tile off to raster threads. It rasterizes each tile and stores them in GPU memory. It�s very easy FOR the GPU to do transformations with these tiles. GPU: is highly optimized for tasks like moving pixels around and changing opacity. Once a layer is created, it�s trivial for the GPU to move those pixels around and composite them together. But GPU is very limited for other things. For example, changing color. In order to do that we need to repaint it on CPU and re-upload to the GPU.� And this might be expensive. On the other hand, transform doesn't trigger the layout, neither paint if the element has its own layer. So, transform is the best property to animate our sidebar. Animating the transform property, if the element has its own layer, looks like this. Actually, we don't need JavaScript to change the style. We can do it for example with hover. It's the cheapest and the most desirable pipeline. We do style calculation and compositing. The GPU moves those pixels and composites them together. Animating left property is different. We still have a layout and paint, and that's what we want to avoid. If we animate any properties that affect the element position like left, right, top, bottom or any properties that affect the element geometry like width, height, padding... they will trigger the layout. If you trigger the layout, any affected pixels will need to be repainted. On the other hand, animating the paint only property will always trigger the paint. No matter if the element has its own layer or not. If you change a visual property like background color, color, visibility, or shadows... it will trigger the paint. Affected area needs to be repainted.� Creating new layer in this situation will be even worse. Because the CPU still has to paint affected area, and you have one extra layer. So, the browser has more work to do in layer management. In this situation, the pipeline looks like this. There is no reason to do layout calculation because we didn't change the geometry of any element. So, if you need to animate background color, you can't eliminate the paint. It will be triggered in any case. But you should always understand the implication of any property you choose to animate. In many situations you have a choice. Properties we change affect the performance in different ways.

![image025](http://janioisacura.com/pics/owp/image025.png)

IMPORTANT INFO: [csstriggers.com](https://csstriggers.com)

JS vs CSS
=========

People are very sensitive to motion. They will notice if the frame rate drops down.� So, animations are incredibly important, and we have two possibilities: CSS animations or JavaScript animations. Can you guess which animation is faster? The faster animation is that which doesn�t trigger the layout, or paint! Most of the time the speed is the same. Animating the width will trigger the Layout, no matter how you do it.� No matter if you use JavaScript or CSS. If you trigger layout, you trigger paint. Or maybe, you animate the background color. That's not going to trigger the Layout but will trigger the paint - and the paint is expensive. You should always understand the implication of any property you choose to animate. The beginning of the frame is the best time to run JavaScript. To achieve this, we should use "request animation frame". Request animation frame is an API that will schedule your JavaScript to run at the right point of every frame. It's the only way to:

-  Guarantee that your JavaScript will run at the start of a frame.

-  That gives the browser as much time as possible to run style calculation, layout, paint, composite.

-  Do not use "setTimeout" or "setInterval" for animations. Always use "requestAnimationFrame"

Instead. Some JavaScript libraries uses "setTimeout" for animations. That's why some JavaScript animations are slow. The problem is the wrong way of using it. Not the JavaScript itself. JavaScript is out of the scope of this course. If you are interested in JavaScript animation, your homework is to investigate the "request animation frame".

Optimizing critical resources and critical bytes
================================================

In previous sections we talked about the browser rendering pipeline and the optimization of the critical rendering path. Our next focus will be critical resources and critical bytes. We saw that our demo page requires 160 milliseconds just to do a layout. This huge CSS requires more than 130 milliseconds to parse. Even if we get cached all the files. This process must be done. But in reality, there is one extra step: the network. Our huge demo CSS files may be loaded in a few seconds or maybe in a few minutes if you use a slow network. And that is not what users want. Don't forget: AliExpress reduced loading time by 36% and saw a 10% increase in the number of orders. Our goal is to create fast web sites.

We talked about those steps in the previous sections, but we haven't talked about the first step:

**The network**. So, to optimize the critical rendering path even more we need to improve download time. We just need critical resources. **_A critical resource is a resource that could block initial rendering of the page_**. To achieve the initial render of the page in the shortest possible period of time, we need to minimize the number of critical resources and the number of critical bytes. **_Critical bytes are the total number of bytes required to complete the initial render of the page_**. So, what is the minimum amount of resources that we can ship to render the page. Do we really need few megabytes of CSS? Today, it seems impossible to render a page in 1 or 2 seconds, because the browser needs to load HTML, load CSS, JavaScript and do all the calculations we have already talked about. But we need to show the user do most important content in the first second or two. We don't want to wait for all files to be downloaded before we can show something on the screen. Two seconds are very difficult speed to achieve. Especially if users have a slow network connection, but we can still optimize it, so that our render times get as close to that goal as possible.

![image026](http://janioisacura.com/pics/owp/image026.png)

Parser blocking JavaScript
==========================

We have the imported CSS and JavaScript. But does it really need all these files to render the page? Are those really critical resources? Because the main blockers for accelerating rendering page are style sheets and scripts**. JavaScript is parser blocking by default**. When the HTML parser finds a script tag, it pauses the parsing of the HTML document and has to load, parse, and execute the JavaScript code. �The browser waits for the script to be fetched from a server, which can add thousands of milliseconds of delay to the critical rendering path. Therefore, synchronous scripts in the HEAD of the HTML, blocks the entire page from rendering until they finish loading.

![image027](http://janioisacura.com/pics/owp/image028.png)![image029](http://janioisacura.com/pics/owp/image029.png)![image028](http://janioisacura.com/pics/owp/image030.png)

**To eliminate unnecessary JavaScript from the critical rendering path, one option is to make your JavaScript "async"**. This allows the browser to continue to construct the DOM and let the script execute when it�s ready. �**You can use it only if your JavaScript doesn't change the DOM structure**. Of course, the script will be downloaded in both cases, but the script is no longer parser blocking. There **is a common rule to put script tag just before closing "body"**. We still block rendering, but hopefully by that point, we have already constructed most of the page. What happens if you have a large image? The good thing is that images do not block the render of the page. Browser will render a page even if images never arrive at all. We reduce the number of critical resources by 1. **Images are not critical resources**. The next resource we want to optimize is CSS� But CSS is tricky. CSS is render blocking. What does that mean and why does it happen?

Async vs defer
--------------

In practice, **defer is used for scripts that need the whole DOM and/or their relative execution order is important.** **And async is used for independent scripts, like counters or ads**. And their relative execution order does not matter.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don�t depend on our scripts, and our scripts shouldn�t wait for them:

![image031](http://janioisacura.com/pics/owp/image031.png)

The async attribute is only for external scripts

Just like defer, the async attribute is ignored if the <script> tag has no src

**Deferred scripts keep their relative order, just like regular scripts.**

Let�s say, we have two deferred scripts: the `long.js` and then `small.js`:

![image032](http://janioisacura.com/pics/owp/image032.png)

Browsers scan the page for scripts and download them in parallel, to improve performance. So, in the example above both scripts download in parallel. The `small.js` probably finishes first.

�But the `defer` attribute, besides telling the browser �not to block�, ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.

The defer attribute is only for external scripts

The defer attribute is ignored if the <script> tag has no src.

[More info](https://javascript.info/script-async-defer)

Render blocking CSS
===================

As we learned before, the browser requires both the DOM and the CSS Object Model to construct the render tree. This creates an important performance implication: **CSS is a render blocking resource**. **The Browser will not start creating CSSOM without fully loaded CSS**. CSS is critical for rendering a page. It will not do Layout or paint. It needs a render tree, and render tree needs CSSOM. Everything is blocked. The browser blocks page rendering with a reason. But why does that happen? Let's say that a browser received the few bytes of style sheet.� Next, the browser gets the next chunk of the code.� Let�s imagine that the browser renders the frame at that moment. And then, the browser gets the next chunk of styles. And it�s almost done.� At the end, the browser gets the last chunk of the code. This rule will break the render tree. That�s why the browser can�t generate Render Tree until it gets a full style sheet. We can�t use partial style sheet! So, CSS is render blocking.

Any delays on the Critical Path leave users looking at a blank screen. Even the spinner will not be rendered. To render the spinner, the browser also needs a render tree. And the render tree needs CSSOM. Users see the blank screen and wait for this process to finish.� We are blocked. We need to get the CSS down to the user as quickly as possible. It was easy to make JavaScript non parser blocking. But with CSS is much more difficult. **The Browser is as quick as your slowest CSS file**. So, we need to ensure that we deliver CSS to the browser as quickly as possible. Secondly, I am pretty sure that we don't need all megabytes to render the page. Initially, we need to load just CSS that really needs to render the pixels.

Imports
=======

We have learned that CSS is render blocking. So, we should get CSS to the client as soon as possible. Let's open the network tab.

![image033](http://janioisacura.com/pics/owp/image033.png)

The Browser sends a HTTP request, and it gets HTML and start parsing it. �Well, there is a CSS file, so it sends a new HTTP request. The Browser received the CSS file, and said: �Great, I can finally render the page��. But� wait a minute. There is one more CSS file. And that file is not imported in HTML.

![image034](http://janioisacura.com/pics/owp/image034.png)

There�s only one style. The issue is that a CSS file is importing another CSS file. There is a CSS inside CSS. The browser sends a new request to get this file. The second file is waiting to be downloaded. To confirm this, let�s open the network section. Don�t forget, CSS is render blocking. And users see only a blank screen. �Finally, the browser gets this second CSS file and continues. The Browser is as quick as your slowest CSS file. And this file - is very slow.

![image035](http://janioisacura.com/pics/owp/image035.png)

![image036](http://janioisacura.com/pics/owp/image036.png)

So, instead of using import, a better solution is to link CSS to HTML: And the browser will download them in the parallel. As a result, you have this: a much nicer waterfall. And much nicer network.

Non render blocking CSS and Unused Styles
=========================================

Previously we improved the network waterfall. Still, we have a render blocking CSS. We can't completely remove CSS. I mean, we can� but the page will look like this. But we can reduce the number of critical bytes. Let's see our styles. We have two huge style sheets. Let's look at our CSS example a bit closer. There are tons of styles... ...styles for media queries� Is all of the CSS necessary to load? What's the minimum amount of resources that we can ship to render the page? Do we really need a print media to render the page? If we are not printing the page, there is no reason to block rendering. It makes sense to split the style sheets into multiple files.

![image037](http://janioisacura.com/pics/owp/image037.png)

So, instead of single file we have multiple smaller files. Not a big deal. The browser assumes that each style sheet is render blocking. However, we can also tell the browser when the style sheet should be applied. The first declaration is render blocking and matches in all conditions. This style sheet is used only for print. Now it's not renderer blocking anymore. This style sheet is used only for small screens. Now, it�s no more render blocking for large screens. This one has a dynamic media query. Depending on the orientation of the device, the style may or may not be rendered blocking. In both cases we downloaded same amount of data. But when we compare these two: we reduced the number of critical bytes from. It still downloads all style sheets, but it will not block rendering on "print.css". And the network looks much different. The Browser downloads multiple files in parallel.

Now that we reduced the critical bytes, but these files are still too large. Larger files take longer to download and longer to parse. I am pretty sure that we can reduce the number of critical bytes. If you have a huge legacy code with thousands of lines, it's a good chance that you have some unused CSS. In a large project every developer adds new styles, imports new files, adds new library... and later no one knows what styles are really needed. CSS lives in a global namespace. So, developers are scared to remove the legacy code. There are many online tools that may help us detect unused styles. But Chrome browser, has its own.

![image038](http://janioisacura.com/pics/owp/image038.png)
I opened another demo page. Click on more tools and find coverage. And then start recording as use the site. The red section of the bar represents unused styles. Cutting down these styles, makes your website more reliable and easier to maintain and simpler to debug. It will reduce the number of critical bytes and optimize critical rendering path. Be careful with libraries like Bootstrap.

![image039](http://janioisacura.com/pics/owp/image039.png)

They come with dozens of styles that you probably don't need. Look at that. I don't use "list-group" or "toasts" neither a "modal" or "tooltip". You should never import a whole library if you don't use it. All styles are downloaded and block the render of the page. Think about whether you really need a CSS library... and if you do, make sure you import only those styles that you really need, because the file size can grow very fast. And don't forget CSS is render blocking.

Base64 images
=============

Previously we improved the critical rendering path. But it would be nice to reduce the number of critical bytes even more. There are lots of icons in the footer. Let's inspect them. They came from a style sheet. You see, SVG is imported directly with Base64 encoding. And this looks like a good choice. Instead of sending multiple http requests for each icon, you get everything in one. �All icons are inside a single CSS file. �We reduce the number of HTTP requests. And both assets, CSS and icons arrive at the same time. �That�s great. But actually� It isn�t! With Base64 encoding, we increase the style sheet file size. The Browser is loading CSS with heavy information. Look at this icon. It's huge. This is a single icon. As we know, CSS is render blocking. That means that the user sees a blank screen until he downloads all the icons. With Base64 encoding images in our CSS, we turned hundreds of kilobytes of non-blocking resources into blocking ones!!! The other problem with Base64 is that it forces all asset bytes to be downloaded, even if they�ll never be used. Only one icon will be rendered. But users will be downloading all those bytes. You should avoid Base64 encoding assets in your CSS. Instead of this, a much better solution is to use font icons... or� embedded SVG directly into HTML. �

Minification and Gzip compression
=================================

Network speed is the bottleneck of any web application. It's important to keep file sizes small, because nothing will render until all render blocking assets download. Minification may come handy**. Minification does things like removing whitespaces, comments, non-required semicolons, and stuff like that**. The browser can read it and use it just like the original file. CSS files are often larger than they need to be. There is a lot of spaces and line breaks.

![image040](http://janioisacura.com/pics/owp/image040.png)

This code can be reduced. From the perspective of the browser, they are identical. But the second one uses less bytes.

![image041](http://janioisacura.com/pics/owp/image041.png)

�We should always minify a style sheet before we deploy it. If we look at some numbers, we see that the bootstrap file size is reduced by almost 17%. There are many ways to minify your files. Some of them are Gulp, Grunt, Webpack, some frameworks or online tools� We can get even better results with file compression. Compression allows your web server to provide smaller file sizes which load faster for users. **Gzip is incredibly efficient at compressing repetitive strings**.

![image042](http://janioisacura.com/pics/owp/image042.png)

Look at the numbers. The same file using Gzip compression takes only 20kb. We save more than 80% for free. Netflix saw a 43% decrease in bandwidth bill, after turning on Gzip. We can confirm this. There is a downloaded bootstrap file. We transferred only 20kb over the network, but the original file size is 156kb. We downloaded less CSS over the wire, just by using Gzip compression. As you see. Gzip is incredible powerful, and you should always enable it on the server.
