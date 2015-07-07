function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getCookieOrCreateYearLong(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    //return (value != null) ? unescape(value[1]) : null;

    if(value==null) {
        var new_value=guid();
        var d = new Date();
        var exdays=365; // Number of days the cookie will persist = 1 year
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie=name+"="+new_value+";"+expires;
        document.cookie="new_"+name+"=true";
        return new_value;
    }
    return (value != null) ? decodeURIComponent(value[1]) : null;
}

function getSessionCookieOrCreate(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    //return (value != null) ? unescape(value[1]) : null;

    if(value==null) {
        var new_value=guid();
        document.cookie=name+"="+new_value;
        return new_value;
    }
    return (value != null) ? decodeURIComponent(value[1]) : null;
}

function changeCookieOrCreateCustom(name, default_value, changed_value, days)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    //return (value != null) ? unescape(value[1]) : null;

    if(value==null) {
        var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie=name+"="+default_value+";"+expires;
        return default_value;
    }
    else if(value!=changed_value){
        var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie=name+"="+changed_value+";"+expires;
        return changed_value;
    }
    return (value != null) ? decodeURIComponent(value[1]) : null;
}

function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? decodeURIComponent(value[1]) : null;
}

function fire_facebook_conversion(){
    window._fbq = window._fbq || [];
    window._fbq.push(['track', '6026784949091', {'value':'0.00','currency':'INR'}]);
}

function fire_ga_conversion(){
    //ga('send', 'pageview');
    ga('send', 'event', 'All', 'Conversion');
}

function fire_adwords_conversion(){
    goog_report_conversion();
}

function fire_segment_conversion(){
    //analytics.track({event:'Segment_Conversion'});
    analytics.track('Segment_Conversion',{event:'Segment_Conversion'});
}

function mixpanel_track(event, params){

    var parameters={};
    parameters.uuid=getCookieOrCreateYearLong('uuid');
    parameters.session_id=getSessionCookieOrCreate('session_id');
    parameters.new_uuid=getCookie('new_uuid');

    if(event=='Conversion' || event=='Conversion2'){
        //fire_facebook_conversion();
        //fire_ga_conversion();
        //fire_adwords_conversion();
        fire_segment_conversion();
        parameters.conversion_type=changeCookieOrCreateCustom('conversion_type','new','old',365);
    }

    if(params!=null) { parameters=merge_options(parameters,params); }

    //mixpanel.track(event, parameters);
}