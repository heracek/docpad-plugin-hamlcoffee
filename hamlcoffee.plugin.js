var __hasProp = {}.hasOwnProperty
    , __extends = function(child, parent){
        var key
            ;

        for ( key in parent ) {
            if ( __hasProp.call(parent, key) ) child[key] = parent[key]
        }

        function ctor(){ this.constructor = child }
        ctor.prototype = parent.prototype

        child.prototype = new ctor()
        child.__super__ = parent.prototype

        return child
    }
;

module.exports = function(BasePlugin){
    "use strict"
    var HamlCoffeePlugin
    ;

    return HamlCoffeePlugin = (function(_super) {

        function HamlCoffeePlugin(){
            return HamlCoffeePlugin.__super__.constructor.apply(this, arguments)
        }

        __extends(HamlCoffeePlugin, _super)

        HamlCoffeePlugin.prototype.name = 'hamlcoffee'

        HamlCoffeePlugin.prototype.renderHamlC = function(opts, next){
            var templateData = opts.templateData
                , hamlcoffee = require('haml-coffee')
                ;
            opts.content = hamlcoffee.compile(opts.content)()
            next()
        }

        HamlCoffeePlugin.prototype.config = {
            hamlcoffee: { format: false }
            , environments: { development: { hamlcoffee: { format: true } } }
        }

        HamlCoffeePlugin.prototype.render = function(opts, next){
            var inExtension = opts.inExtension
                , outExtension = opts.outExtension
            ;
            if ( (inExtension === 'hamlc') && (outExtension === 'html') ) {
                opts.content = this.renderHamlC(opts, next)
            } else {
                return next()
            }
        }

        //HamlCoffeePlugin.prototype.isEnabled = function(){
        //    return this.enable !== false
        //}

        return HamlCoffeePlugin

    })(BasePlugin)
}
