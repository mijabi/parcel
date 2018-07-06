/** check current page is localhost */

const _isLocalHost = function() {

    if(location.hostname.indexOf('localhost') === -1) {

        return false

    } else {

        return true

    }

}

module.exports =  _isLocalHost

// var isLocalHost = _isLocalHost()

