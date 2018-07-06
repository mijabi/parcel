;(function(path) {


    /** write UIC-SDK */

    var appendScriptTag = function(path) {

        var a = document.createElement('script')

        var b = document.getElementById('tealeafuicsdk')

        a.async = true

        a.src = path

        b.parentNode.insertBefore(a, b)

    }


    /** check current page is localhost */

    var _isLocalHost = function() {

        if(location.hostname.indexOf('localhost') === -1) {

            return false

        } else {

            return true

        }

    }

    var isLocalHost = _isLocalHost()



    /** check current page is test or prod */

    var _isTestPage = function() {

        var yourRegexpString = /test-/

        // const yourHostname = 'test-r.gnavi.co.jp'
        var yourHostname = location.hostname

        if(yourRegexpString.test(yourHostname)) {

            return true

        } else {

            return false

        }
    }

    var isTestPage = _isTestPage()


    /** append UIC-SDK JS when the current page is target */

    var youAreTargetPageSoWriteDownTheScriptTag = function() {

        if(isLocalHost) {

            var uicsdkPath = '/' + 'tealeaf.min.js'

        } else if(isTestPage) {

            var uicsdkPath = '//c-test-x.gnst.jp/tl/' + 'tealeaf.min.js'

        } else {

            var uicsdkPath = '//c-x.gnst.jp/tl/' + 'tealeaf.min.js'

        }

//        var uicsdkPath =(isTestPage() ? '//c-test-x.gnst.jp/tl/' : '//c.x.gnst.jp/tl/') + 'tealeaf.min.js'
        // var uicsdkPath = '//' + (isTestPage() ? 'test-' : '') + 'x.gnst.jp/tl/tealeaf.min.js'

        appendScriptTag(uicsdkPath)

    }

    /** check localStorage availability */

    var storageAvailable = function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
        }
    };

    var checkWriteTealeafLocalstorageAndCookie = function() {

        if (storageAvailable('localStorage')) {

            var tealeafLocalStorageAndCookieName = 'tllsgssn';

            var yourLocalStorageValue = localStorage.getItem(tealeafLocalStorageAndCookieName);

            // there is no localstorage that tracking as one user
            if (!yourLocalStorageValue) {

                yourLocalStorageValue = 'tluid_' + (+new Date()) + '_' + Math.random().toString().substr(2, 7)

                localStorage.setItem(tealeafLocalStorageAndCookieName, yourLocalStorageValue);

            }

            if(isLocalHost) {

                var targetDomain = ''

            } else {

                var targetDomain = '.gnavi.co.jp'

            }

            // write cookie for tracking as one user to send tealeaf
            document.cookie = tealeafLocalStorageAndCookieName + '=' + yourLocalStorageValue + '; path=/; domain=' + targetDomain + ';';

            return yourLocalStorageValue;

        }
    };

    checkWriteTealeafLocalstorageAndCookie();

    
    /** get shop id from body-tag */

    var _yourShopId = function(){

        if(document.body.hasAttribute('data-r')) {

            if(document.body.getAttribute('data-r').length > 1 && document.body.getAttribute('data-r').charAt(0) === '{') {

                var dataR = JSON.parse(document.body.getAttribute('data-r'))

                return dataR.sid || ''

            }



        }
        return '';
    }
    var yourShopId = _yourShopId();


    /** detect target */

    // detect you are on target page or not
    var restaurantPage_detectRestaurantPageURL = function() {

        if(isLocalHost) {

            var shops = [
                'i900381' // 電話番号が2つある（ぐるなびコールがある）
            ]

        } else if(isTestPage) {

            var shops = [
                'i900381', // 電話番号が2つある（ぐるなびコールがある）
                'i922495', // シークレットクーポン
                'i900398', // メニュー数が5つ
                'i925084', // ネット予約のみ（電話なし）
                'a042600', // 電話のみ（ネット予約なし）
                'i900490', // おすすめコース：なし ネット予約カレンダー：なし
                'i900393',
                'i924718'
            ]

        } else {

            
            var shops = [
                'gaed324','f091911','g984610','g493528','g747761','a644727','g747785','g747778','gezd700','gewg400','g493521','a644755','g528914','gcmd709','ga9m025','g939336','g747794','gbz3502','g493567','g493543','gcb7300','a047102','a604908','b919000','ge8c538','ge4b601','gf3m600','gb0k504','gcc7702','gc2x005','gaur501','gce6401','a116402','g510402','fb89500','gfz9202','e255518','gdth500','gfj6800','fa84629','a188900'
            ]

        }

        // const yourPathname = '/g984610'
        // var yourPathname = location.pathname

        // var yourShopId = yourPathname.substr(1, 7)

        for(var i of shops) {

            if(i === yourShopId) {

                return true

                break

            }

        }

        return false

    }

    // detect you are on especially target reservation page below, or not
    // https://r.gnavi.co.jp/plan/[URL_STRING]/plan-reserve/plan/input/form/
    // https://r.gnavi.co.jp/plan/[URL_STRING]/plan-reserve/inquiry/input/form
    // https://r.gnavi.co.jp/plan/[URL_STRING]/plan-reserve/plan/plan_list/ 系のページで tealeaf.js が読み込まれていない

    var restaurantPage_detectReservationPageURL = function() {

        var yourRegexpStringList = /\/plan\/plan_list/

        var yourRegexpStringPlan = /\/plan\/input\/form/

        var yourRegexpStringImquiry = /\/inquiry\/input\/form/

        if(location.pathname && location.pathname.indexOf('/plan-reserve')) {

            var yourPath = location.pathname.split('/plan-reserve')[1]

            if(yourRegexpStringList.test(yourPath) || yourRegexpStringPlan.test(yourPath) || yourRegexpStringImquiry.test(yourPath)) {

                return true

            } else {

                return false

            }

        } else {

            return false

        }

    }

    // you are on smartphone page or not
    var restaurantPage_isSmartPhonePage = function() {

        if(document.querySelector('meta[content="sma"]')) {

            return true

        } else {

            return false

        }

    }


    /** run */

    if(restaurantPage_isSmartPhonePage() && restaurantPage_detectRestaurantPageURL()) {

        if(document.body.getAttribute('data-pageid') && document.body.getAttribute('data-pageid') === 'reserve') {

            if(restaurantPage_detectReservationPageURL()) {

                // console.log('reserve')

                youAreTargetPageSoWriteDownTheScriptTag()

            }

        } else {

            // console.log('shop')

            youAreTargetPageSoWriteDownTheScriptTag()
        }
    }

    if(location.hostname.indexOf('frontend.gnavi.co.jp') !== -1 && location.pathname.substr(0,4) === '/ux/') {

        youAreTargetPageSoWriteDownTheScriptTag()

    }

    if(isLocalHost) {

        console.log('iLH', isLocalHost)
        console.log('iTP', isTestPage)
        console.log('rP_iSPP()', restaurantPage_isSmartPhonePage())
        console.log('rP_dRestPURL()', restaurantPage_detectRestaurantPageURL())
        console.log('rP_dResePURL()', restaurantPage_detectReservationPageURL())

    }

})();
