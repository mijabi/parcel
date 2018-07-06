import _appendScriptTag from './utils/appendScriptTag'
import _isLocalHost from './utils/isLocalHost'
import _isTestPage from './utils/isTestPage'
import _localStorageAvailable from './utils/localStorageAvailable'

;(function(path) {

    /** write UIC-SDK 
     * 
     * call as below
     * appendScriptTag(uicsdkPath, 'tsdk')
     * 
    */

    var appendScriptTag = _appendScriptTag


    /** check current page is localhost 
     * 
     * just check location.hostname contains 'localhost', then return true
     * 
    */

    var isLocalHost = _isLocalHost


    /** check current page is test or prod 
     * 
     * just check location.hostname contains 'test-', then return true
     * 
    */

    var isTestPage = _isTestPage


    /** check localStorage availability 
     * 
     * check availability of localstorage and return boolean
     * 
    */

    var localStorageAvailable = _localStorageAvailable


    console.log('isLocalHost', isLocalHost)
    console.log('isTestPage', isTestPage)
    console.log('localStorageAvailable', localStorageAvailable)

    if((isLocalHost || isTestPage) && localStorageAvailable) {

        appendScriptTag('sdk', 't.js')

    }

})();
