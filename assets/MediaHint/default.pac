function FindProxyForURL(url, host){
  var country = 'IE';
  var myip = myIpAddress();
  var ipbits = myip.split('.');
  var myseg = parseInt(ipbits[3]);
  var select = function(pool, ending){
    if(pool.length === 1) return 'PROXY ' + pool[0] + '; DIRECT';
    var v = pool.length-1,
        c = 0,
        pick = function(){
          if(c > v) c = 0;
          return pool[c];
        }
    var results = [];
    for(var i = 0;i <= v;i++){
      var result = '';
      c = i;
      for(var j = 0;j <= v;j++){
        proxy = pick();
        c++;
        result += 'PROXY ' + proxy + '; ';
      }
      result += 'DIRECT';
      results.push(result);
    }
    return results[myseg % pool.length];
  }
  var netflix_proxies_first = 'DIRECT';
  var netflix_proxies_second = 'DIRECT';
  var hulu_proxies = 'DIRECT';
  var proxies = 'DIRECT';
  var uk_proxies = 'DIRECT';
  var au_proxies = 'DIRECT';
  var br_proxies = 'DIRECT';
  var us_nginx = 'DIRECT';
  var us_alt_proxy = 'DIRECT';
  var superbowl = 'DIRECT';
  var nl_proxies = 'DIRECT';
  var lv_proxies = 'DIRECT';
  if(country !== 'US'){
    netflix_proxies_first = select(['us5.mhgs.co:80', 'us8.mhgs.co:80']);
    netflix_proxies_second = select(['us5.mhgs.co:80', 'us8.mhgs.co:80']);
    hulu_proxies = select(['us6.mhgs.co:80','us7.mhgs.co:80']);
    proxies = select(['us1.mhgs.co:80','us2.mhgs.co:80']);
    us_nginx = select(['nginx.mhgs.co:80']);
    us_alt_proxy = select(['us3.mhgs.co:80']);
    if(myseg % 2){
      superbowl = 'PROXY 104.236.220.104:80; PROXY 104.236.220.70:80; DIRECT';
    } else {
      superbowl = 'PROXY 104.236.220.70:80; PROXY 104.236.220.104:80; DIRECT';
    }
  }
  if(country !== 'NL') nl_proxies = 'PROXY 188.166.18.199:80; DIRECT';
  if(country !== 'GB') uk_proxies = select(['uk1.mhgs.co:80','uk2.mhgs.co:80','uk3.mhgs.co:80']);
  if(country !== 'AU') au_proxies = select(['au1.mhgs.co:80']);
  if(country !== 'BR') br_proxies = select(['br.mhgs.co:80']);
  if(country !== 'LV') lv_proxies = 'PROXY 91.224.13.172:80; DIRECT';
  if(
    ((/^ltv\.lsm\.lv$/).test(host))
    ||(/\.tiesraides\.lv$/).test(host)
    ||(/lattelecom\.tv$/).test(host)
    ||(/195\.13\.206/).test(url)
    ||(/\.filmas\.lv$/).test(host)
    ||(/^straume\.lmt\.lv$/).test(host)
    ||(/^tv\.lmt\.lv$/).test(host)
  ) {
    return lv_proxies;
  }
  if((/^s\.ltv\.lv/).test(host)&&(country !== 'LV')) return 'PROXY 91.224.13.174:80; DIRECT';
  if((/atv-(ps|ext)\.amazon\.com/).test(host)) return proxies;
  if((/^www\.army\.mil$/).test(host)) return proxies;
  if((/^pactest\.mediahint\.com$/).test(host)){
    return select(['us1.mhgs.co:80','us2.mhgs.co:80']);
  }
  if(
    (/bbcfmhds\.vo/).test(host)
    ||(/^cp41752\.edgefcs\.net$/).test(host)
    ||(/ais\.channel4\.com/).test(host)
    ||(/bbc\.co\.uk\/mobile\/apps\/iplayer/).test(url)
    ||(/itv\.com\/ukonly/).test(url)
    ||(/^(ned|ted|mercury|tom)\.itv\.com$/).test(host)
    ||(/bbci\.co\.uk/).test(host)
    ||(/bbc\.co\.uk/).test(host)
    ||(/bbcmedia\.fcod/).test(host)
    ||(/\/idle\/[a-zA-Z0-9\-_]{16}\//).test(url)
    ||(/\/send\/[a-zA-Z0-9\-_]{16}\//).test(url)
    ||(/londonlive\.co\.uk$/).test(host)
    ||(/vs-hds-uk-live/).test(url)
    ||(/^(www\.)?tvcatchup\.com$/).test(host)
    ||(/^iplayertokfs\.fplive\.net$/).test(host)
    ||(/\.nowtv\.com$/).test(host)
    ||(/^(player|skyid|payments)\.sky\.com$/).test(host)
    ||((/\.optimizely\.com$/).test(host)&&(/geo2\.js$/).test(url))
    ||(/^dvnnowtvprod\-ls\.akamaihd\.net$/).test(host)
    ||((/^(admin|c)\.brightcove\.com$/).test(host)
      &&(/19582164001|1707001744001|1779174286001|1422653978568|4006647773001|aljazeera_EN|1413813980721|TVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ/).test(url))
    ||(/^(as|ve|vod)\-hds\-uk\-live\.edgesuite\.net$/).test(host)
    ||(/^(as|ve|vod)\-hds\-uk\-live\.bbcfmt\.vo\.llnwd\.net$/).test(host)
    ||(/^(www\.|live\.cdn\.)?tvplayer\.com$/).test(host)
    ||(/^(cassie|deliver\-hls)\.channel5\.com$/).test(host)
    ||(/^aod\-pod\-uk\-live\.bbcfmt\.vo\.llnwd\.net$/).test(host)
    ||(/^open\.live\.bbc\.co\.uk$/).test(host)
    ||(/^aod\-pod\-uk\-live\.edgesuite\.net$/).test(host)
  ){
    return uk_proxies;
  }
  if(
    (/\.omroep\.nl$/).test(host)
  ){
    return nl_proxies;
  }
  if(
    (/^tst\.streaming\.skysports\.com$/).test(host)
    ||(/bsbskynews/i).test(url)
  ){
    return select(['uk1.mhgs.co:80', 'uk2.mhgs.co:80']);
  }
  if(host == 's.hulu.com' && country !== 'US') return 'PROXY 52.34.50.138:8080; DIRECT';
  if((/^startup\.vudu\.com$/).test(host)&&(/kickstart/).test(url)) return 'PROXY 54.149.60.192:8080; DIRECT';
  if(host == 's.hulu.jp' && country !== 'JP') return 'PROXY 103.56.218.142:80; DIRECT';
  if(
      (host == 'localhost')
    ||(shExpMatch(host, 'localhost.*'))
    ||(shExpMatch(host, '*.local'))
    ||(host == '127.0.0.1')
    ||(host == 'ihost.netflix.com')
    ||isPlainHostName(host)
    ||isInNet(dnsResolve(host), '10.0.0.0', '255.0.0.0')
    ||isInNet(dnsResolve(host), '172.16.0.0',  '255.240.0.0')
    ||isInNet(dnsResolve(host), '192.168.0.0',  '255.255.0.0')
    ||isInNet(dnsResolve(host), '127.0.0.0', '255.255.255.0')
  ){
    return 'DIRECT';
  }
  if(shExpMatch(host, '/^\d+\.\d+\.\d+\.\d+$/g')){
    if(isInNet(host, '10.0.0.0', '255.0.0.0')||isInNet(host, '192.168.0.0', '255.255.0.0')) {
      return 'DIRECT';
    }
  }
  if(
      ((/^(admin|c)\.brightcove\.com$/).test(host)&&(/1413817047382|1418072125325|1438205728406|97Dhgyb4Zc4s9cYeSaE6CUQiyZw7oiZz|GmfXBj8vjuTSgJmr7LA/).test(url))
    ||((/abc\.net\.au$/).test(host)&&(/geotest|auth\/flash/).test(url))
    ||(/^iviewmetered\-vh\.akamaihd\.net$/).test(host)
    ||((/federated_f9/).test(url)&&(/3922571709001/).test(url))
    ||((/^link\.theplatform\.com$/).test(host)&&((/sbs\.com\.au/).test(url)||(/Bgtm9B/i).test(url)))
    ||(/^sbsvodns-vh\.akamaihd\.net$/).test(host)
  ){
    return au_proxies;
  }
  if(
      (/(^link\.theplatform\.com$)|(^urs\.pbs\.org$)/).test(host)
    ||(/^(www\.|ext\.)?last\.fm$/).test(host)
  ){
    return us_alt_proxy;
  }
  if((/^content\-ause([1-5]{1})\.uplynk\.com$/).test(host)){
    return 'PROXY 54.174.16.166:8080';
  }
  if(
    (/geolocation/).test(url)&&(/api\.(utils\.)?watchabc\.go\.com/).test(host)
    ||(/theanimenetwork\.com/).test(host)
    ||((/^(www\.)?snagfilms\.com$/).test(host)&&(/embed/).test(url))
    ||(/^(www\.)?encoreplay\.com$/).test(host)
    ||(/^(www\.)?animesols\.com$/).test(host)
    ||(/^(www\.)?viz\.com$/).test(host)
    ||(/^(www\.)?funimation\.com$/).test(host)
    ||((/^playerservices\.streamtheworld\.com$/).test(host)&&(/api/).test(url))
    ||(/^tkx\-prod\.nbc\.anvato\.net$/).test(host)
    ||(/^tvewcau\-i\.akamaihd\.net$/).test(host)
    ||(/^tvenbceast\-i\.akamaihd\.net$/).test(host)
  ) {
    return us_nginx;
  }
  if((
    ((/^(admin|c)\.brightcove\.com$/).test(host)&&(/aljazeera_EN|1413813980721|TVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ/).test(url))
    ||(/^(www\.)?aljazeera\.com$/).test(host)
  ) && country === 'US'){
    return uk_proxies;
  }
  if(
    ((/^olystream/).test(host)&&(/\.nbcolympics\.com$/).test(host))
    ||((/^olyhd/).test(host)&&(/\.akamaihd\.net$/).test(host))
    ||(/^mml2015\-lh\.akamaihd\.net$/).test(host)
  ){
    return superbowl;
  }
  if(
      (/hlsioscwtv\.warnerbros\.com/).test(host)
    ||((/^secure\.footprint\.net$/).test(host)&&(/cwtv/).test(url))
    ||(/(^videocgi\.drt\.cbsig\.net$)|(^media\.cwtv\.com$)/).test(host)
    ||((/^www\.slacker\.com$/).test(host)&&(/\/(xslte\/userContent)|(wsv1\/session)/).test(url))
    ||((/^video\.nbcuni\.com$/).test(host)&&(/geo\.xml/).test(url))
    ||(/songza\.com\/config\.js|songza\.com\/api|geofilter|\/video\/geolocation|geoCountry\.xml|geo-check|\.ism\/manifest|\/services\/viewer\/(htmlFederated|federated_f9)|\/services\/messagebroker\/amf/).test(url)
    ||(/^api\.abc\.com$|^w88\.go\.com$/).test(host)
    ||(/^(www\.)?thewb\.com$/).test(host)
    ||(/^geo\.aspen\.turner\.com$/).test(host)
    ||((/turner\.com$/).test(host)&&(/cnvideo/).test(url))
    ||(/^(www\.)?seetheinterview\.com$/).test(host)
    ||(/^(www|video\.)?flixster\.com$/).test(host)
    ||(/^flashaccess\.roxionow\.com$/).test(host)
    ||(/live\.streamtheworld\.com$/).test(host)
    ||(/\.ooyala\.com$/).test(host)
    ||(/^((order|mf)\.)?hbonow\.com$/).test(host)
    ||(/^cdn\.krxd\.net$/).test(host)
    ||(/^(www\.)?sling\.com$/).test(host)
    ||(/^p\-webapi\.movetv\.com$/).test(host)
    ||(/^www\.cc\.com$/).test(host)
    ||((/gaiamtv\.com$/).test(host)&&(/nodeinfo/).test(url))
  ){
    return proxies;
  }
  if(
      (/^(admin|c)\.brightcove\.com$/).test(host)&&(/1052442703001|mfXAzflB247CGerRRfxphWd1gWb4BuXw/).test(url)
  ){
    return hulu_proxies;
  }
  if(((/^media\.mtvnservices\.com$/).test(host)||(/^intl\.esperanto\.mtvi\.com$/).test(host))&&(/nick\.co\.uk/).test(url)&&(/\.swf/).test(url) === false){
    return uk_proxies;
  }
  if(
    (/^media\.mtvnservices\.com$/).test(host)
    ||(/www\.spike\.com\/feeds\/mediagen/).test(url)
    ||(/\/widgets\/geo\/geoload\.jhtml/).test(url)
    ||(/\/includes\/geo\.jhtml/).test(url)
    ||(/activity\.flux\.com\/geo\.html/).test(url)
    ||(/\/mediaGen\.jhtml/).test(url)
    ||(/geocheck\.turner\.tv\.edgesuite\.net/).test(host)
    ||((/^s\.yimg\.com$/).test(host)&&(/\/assets\/player\.swf/).test(url))
    ||(/^video\.media\.yql\.yahoo\.com$/).test(host)
    ||((/^geo\.yahoo\.com$/).test(host)&&(/cbs\.com/).test(url))
    ||((/^video\.query\.yahoo\.com$/).test(host)&&(/yahoo\.media\.video\.streams/).test(url))
    ||(/^(www\.)?dramafever\.com$/).test(host)
  ){
    return proxies;
  }
  if((/netflix\.com\/FilePackageGetter/i).test(url)) return netflix_proxies_second;
  if((/^(www\.)?fox\.com$/).test(host)&&(country !== 'US')) return hulu_proxies;
  if((/^(www\.)?showtimeanytime\.com$/).test(host)&&(country !== 'US')) return hulu_proxies;
  if((/(www\.|lv3\.)?hbogo\.com$/).test(host)&&(country !== 'US')) return proxies;
  if((/security\.video\.globo\.com$/).test(host)||((/\.globo\.com/).test(host)&&(/voddownload/).test(host))) return br_proxies;
  if(
      (/epixhd\.com/).test(host)
    ||(/epixhds\-f\.akamaihd\.net/).test(host)
    ||(/vevo\.com/).test(host)
    ||(/nextissue\.com/).test(host)
    ||(/account\.beatsmusic\.com$/).test(host)
    ||((/univision\.com$/).test(host)&&!(/^vod\.univision\.com$/).test(host))
  ){
    return proxies;
  }
  if((/songza\.com\/(api|advertising)\/|hulu\.com\/mozart\/.*|\.(ico|jpg|png|gif|mp3|css|mp4|flv|swf)(\?.*)?$|^crackle\.com\/flash\/$/).test(url)||(/(^presentationtracking|blog|signup)\.netflix\.com$|^(r|p|t2|ll\.a|t|t-l3|ads|assets|urlcheck)\.hulu\.com$|^(stats|blog|audio.*|const.*|mediaserver.*|cont.*)\.pandora\.com$/).test(host)){
    return 'DIRECT';
  }
  if((/^gamepass\.nfl\.com$/).test(host)&&(['GB','US','MX','CA','IE'].indexOf(country) !== -1)){
    return 'PROXY 91.224.13.172:80; DIRECT';
  }
  if((/^(www\.)?starzplay\.com$/).test(host)&&(country !== 'US')) return hulu_proxies;
  //if((/^([\w\.-]+\.)?hulu\.com$/).test(host)) return hulu_proxies;
  if((/^southpark\.cc\.com$/).test(host)) return netflix_proxies_first;
  if((/(^([\w\.-]+\.)?(songza|www\.iheart|www\.crackle|ulive)\.com$)/).test(host)) return proxies;
  if((/netflix\.com\/(login|signout|logout|signin)/i).test(url) && ['US','GB','CA'].indexOf(country) >= 0) return 'DIRECT';
  if((/(^([\w\.-]+\.)?pandora\.com$)/).test(host)) return netflix_proxies_first;
  if((/(^([\w\.-]+\.)?netflix\.com$)/).test(host)) return netflix_proxies_second;
  if(['AD','AU','AT','BE','DK','FO','FI','FR','DE','IE','IT','LI','LU','LV','MX','MC','NL','NZ','NO','PL','PT','ES','SE','CH','GB','US','HK','EE','LT','MY','SG','IS'].indexOf(country) === -1){
    if((/^([\w\.-]+\.)?spotify\.com/).test(host)){
      return select(['us3.mhgs.co:80']);
    }
  }
  return 'DIRECT';
}
