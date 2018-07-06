/** check current page is test or prod */

const _isTestPage = function() {

    var yourRegexpString = /test-/

    // const yourHostname = 'test-r.gnavi.co.jp'
    var yourHostname = location.hostname

    if(yourRegexpString.test(yourHostname)) {

        return true

    } else {

        return false

    }
}

module.export = _isTestPage
