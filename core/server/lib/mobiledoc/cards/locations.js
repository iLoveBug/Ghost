const createCard = require('../create-card');

module.exports = createCard({
    name: 'locations',
    type: 'dom',
    config: {
        commentWrapper: true
    },
    render(opts) {
        console.log('render');
        if (!opts.payload.locations) {
            return '';
        }

        let dom = opts.env.dom;
        let div = dom.createElement('div');
        div.setAttribute('id', 'locations-view-wrapper');
        div.setAttribute('style', 'width:100%;');

        let data = Buffer.from(opts.payload.locations).toString('base64');
        let code = dom.createElement('code');
        code.setAttribute('id', 'location-view-data');
        code.setAttribute('style', 'display: none;');
        code.appendChild(dom.createRawHTMLSection(data));
        div.appendChild(code);

        let locationComponent = dom.createElement('locations-view');
        locationComponent.setAttribute('width', '100%');
        locationComponent.setAttribute('height', '500px');
        locationComponent.setAttribute('access-key', '8325164e247e15eea68b59e89200988b');
        locationComponent.setAttribute('data', 'location-view-data');
        locationComponent.setAttribute('default-icon', '/assets/poi-marker-default.png');
        locationComponent.setAttribute('closed-icon', '/assets/poi-marker-red.png');

        console.log(locationComponent);

        div.appendChild(locationComponent);

        return div;
    },

    // call before render
    absoluteToRelative(urlUtils, payload, options) {
        console.log('payload');
        console.log(payload);
        console.log('payload.locations');
        console.log(payload.locations);
        console.log('payload.locations after absolute to relative');
        console.log(urlUtils.htmlAbsoluteToRelative(payload.locations, options));
        payload.locations = payload.locations && urlUtils.htmlAbsoluteToRelative(payload.locations, options);
        return payload;
    },

    // call after render
    relativeToAbsolute(urlUtils, payload, options) {
        console.log('payload');
        console.log(payload);
        console.log('payload.locations');
        console.log(payload.locations);
        console.log('payload.locations after relative to absolute');
        console.log(urlUtils.htmlRelativeToAbsolute(payload.locations, options));
        payload.locations = payload.locations && urlUtils.htmlRelativeToAbsolute(payload.locations, options);
        return payload;
    }
});
