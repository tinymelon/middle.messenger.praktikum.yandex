import {JSDOM} from "jsdom";

const jsdom = new JSDOM('<body></body>', {
    url: 'https://example.com'
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
