/** write UIC-SDK */

const _appendScriptTag = function(path, targetId) {

    var a = document.createElement('script')

    var b = document.getElementById(targetId)

    a.async = true

    a.src = path

    b.parentNode.insertBefore(a, b)

}

module.exports =  _appendScriptTag

// var isLocalHost = _isLocalHost()

