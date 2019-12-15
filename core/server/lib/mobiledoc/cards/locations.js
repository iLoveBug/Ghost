const createCard = require('../create-card');

function uuid(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

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
        div.setAttribute('class', 'kg-locations-container');
        div.setAttribute('style', 'width:100%;');

        let dataId = uuid();
        let data = Buffer.from(opts.payload.locations).toString('base64');
        let code = dom.createElement('code');
        code.setAttribute('id', dataId);
        code.setAttribute('style', 'display: none;');
        code.appendChild(dom.createRawHTMLSection(data));
        div.appendChild(code);

        let locationComponent = dom.createElement('location-list');
        locationComponent.setAttribute('width', '100%');
        locationComponent.setAttribute('height', '500px');
        locationComponent.setAttribute('access-key', '8325164e247e15eea68b59e89200988b');
        locationComponent.setAttribute('data', dataId);
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
