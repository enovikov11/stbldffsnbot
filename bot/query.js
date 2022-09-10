function parseRequest(request) {
    if (!request || !/@[a-z]+bot/i.test(request)) {
        return null;
    }

    const params = {
        count: 5,
        strength: 0.2,
        scale: 7.5,
        steps: 50
    };

    const [, count] = request.match(/\bcount=(\d+)\b/) || [];
    if (typeof count === 'string' && 0 < +count && +count < 9) {
        params.count = +count;
    }

    const [, strength] = request.match(/\bstrength=(\d+\.\d+)\b/) || [];
    if (typeof strength === 'string' && 0 <= +strength && +strength <= 1) {
        params.strength = +strength;
    }

    const [, scale] = request.match(/\bscale=(\d+(\.\d+)?)\b/) || [];
    if (typeof scale === 'string' && 2 <= +scale && +scale <= 20) {
        params.scale = +scale;
    }

    const [, steps] = request.match(/\bsteps=(\d+)\b/) || [];
    if (typeof steps === 'string' && 20 <= +steps && +steps <= 500) {
        params.steps = +steps;
    }

    params.request = request
        .replace(/@[a-z]+bot/i, '')
        .replace(/\b\w+=[\w.]+\b/g, '')
        .replace(/\n/g, '')
        .replace(/[ ]+/g, ' ')
        .replace(/^ /, '')
        .replace(/ $/, '');

    params.origRequest = request
        .replace(/@[a-z]+bot/i, '')
        .replace(/[ ]+/g, ' ')
        .replace(/^ /, '')
        .replace(/ $/, '');

    return params;
}

module.exports = { parseRequest };