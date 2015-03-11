openerp.widget_gmaps = function (openerp)
{   
 openerp.web.form.widgets.add('gmap', 'openerp.widget_gmaps.gmap');
 openerp.widget_gmaps.gmap = openerp.web.form.FieldChar.extend(
        {
        template : "gmap",
        init: function (view, code) {
            this._super(view, code);
        },
        render_value: function() {
            var show_value = this.format_value(this.get('value'), '');
            this.$el.find('input').val(show_value);
            
            /*
             * Center
             * Es la latitud y la longitud del mapa
             * 
             * Tipo de Mapas
             * satellite (photographic map)
             * roadmap (normal, default 2D map)
             * hybrid (photographic map + roads and city names)
             * terrain (map with mountains, rivers, etc.)
             * 
             * Zoom
             * Entre 0 y 20
             */
            
            var lt = '', ln = '';
            var API_KEY = 'AIzaSyCQI-OVySMOxJCQFCEux6SDeN_eXk1Uvvo';
            var center = '';
            var zoom = '';
            var maptype = 'roadmap';
            var viewtype = 'view'
            var q = '';
            var vars = [], hash;
            var hashes = show_value.slice(show_value.indexOf('google') + 5).split('/');
            
            for(var i = 0; i < hashes.length; i++){
	            hash = String(hashes[i]);
	            if (hash[0] == '@'){
	            	lt = hash.split('@')[1].split(',')[0]
	            	ln = hash.split('@')[1].split(',')[1];
	            	zoom = hash.split('@')[1].split(',')[2]
	            }
            }
            center = '&center=' + lt + ',' + ln
            if (show_value.indexOf('m/data') != -1){
            	maptype = 'satellite'
            }
            
            // Ver si la vista es de Place
            if (show_value.indexOf('/place') != -1){
            	viewtype = 'search';
            	q = show_value.slice(show_value.indexOf('/place') + 6).split('/')[1];
            	center = '&q=' + q
            }
            
            if (String(lt) == '' || String(ln) == '' || String(zoom) == '')
            	var src_iframe = '';	
            else
            	var src_iframe = 'https://www.google.com/maps/embed/v1/' + viewtype + '?key=' + API_KEY + center + '&zoom=' + zoom + '&maptype=' + maptype;
            
            this.$("#gmap").attr('src', src_iframe)
        },
    });
}