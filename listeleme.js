$(document).ready(function(){
// v.11
  
  var OBPsayfam ="https://oyakbilgi.blogspot.com/p/rss-test.html";
  var params = new URLSearchParams(window.location.search);
  var urlkonu = params.get("urlkonu");
  var urlsayfa = params.get("urlsayfa");  
  var tespiturlkonu="";
  var wellbaslik ="";
  var backcolor ='#337AB7';
  var obpLink ="";
  
  
if(!urlkonu) {
//boş
  
tespiturlkonu = "https://www.ntv.com.tr/ekonomi.rss";  
wellbaslik ="Ekonomi";
  
} else {
//dolu

  
switch(urlkonu) {
  case "ekonomi":
    tespiturlkonu = "https://www.ntv.com.tr/ekonomi.rss";
    wellbaslik ="Ekonomi";  
    break;
 case "para":
    tespiturlkonu = "https://www.ntv.com.tr/ntvpara.rss";
    wellbaslik ="Para";backcolor ="#03007F";
    break;    
 case "egitim":
    tespiturlkonu = "https://www.ntv.com.tr/egitim.rss"; 
    wellbaslik ="Eğitim";backcolor ="#9C845C";
    break;
 case "saglik":
    tespiturlkonu = "https://www.ntv.com.tr/saglik.rss";
    wellbaslik ="Sağlık"; backcolor ="#2CA7A2";
    break;
 case "dunya":
    tespiturlkonu = "https://www.ntv.com.tr/dunya.rss";
    wellbaslik ="Dünya";backcolor ="#27647C";
    break;
 case "otomobil":
    tespiturlkonu = "https://www.ntv.com.tr/otomobil.rss";
    wellbaslik ="Otomobil";backcolor ="#628DAA";
    break;    
 case "spor":
    tespiturlkonu = "https://www.ntv.com.tr/spor.rss"; 
    wellbaslik ="Spor";backcolor ="#B47A53";
    break;      
 case "teknoloji":
    tespiturlkonu = "https://www.ntv.com.tr/teknoloji.rss"; 
    wellbaslik ="Teknoloji";backcolor ="#2D231F";
    break;      
 case "sanat":
    tespiturlkonu = "https://www.ntv.com.tr/sanat.rss"; 
    wellbaslik ="Sanat";backcolor ="#882DB4";
    break;
 case "oyaksss":
    //tespiturlkonu = "https://www.ntv.com.tr/sanat.rss"; 
    wellbaslik ="OYAK Sıkça Sorulan Sorular";backcolor ="#D63E3B";
    break;    
 case "oyak":
    //oyaksorucevapAta();    
    wellbaslik ="OYAK Haberleri";backcolor ="#D63E3B";
    break;      
  default:
    // Default olarak "Ekonomi" yükle
    tespiturlkonu = "https://www.ntv.com.tr/ekonomi.rss";
    wellbaslik ="Ekonomi";
        break;      
   }  
}
 
$("#haberkonu").text(wellbaslik).css('background', backcolor);

  
  
  

if(!urlsayfa) {
//boş ise
  obpLink = "";
  
} else {  

obpLink = urlsayfa;

}      
  

        
  // GEMINI FONKSIYON Bu fonksiyona istediğiniz ana URL'yi parametre olarak verebilirsiniz.
  function getUrlRightSide(fullUrl) {
    // fullUrl string'inin baseUrl ile başlayıp başlamadığını kontrol eder.
    if (fullUrl.startsWith("https://www.ntv.com.tr/")) {
      // Eğer başlıyorsa, baseUrl'i kaldırır ve geri kalanını döndürür.
      return fullUrl.replace("https://www.ntv.com.tr/", "");
    }
    // Eğer başlamıyorsa boş bir string döndürür.
    return "";
  }
        
//----------------------------------------------------------------------------------------------==============================================================================<<<<<<<<<<<<<<<<<<<<<< 1
$.ajax({
    url: "https://projeler.eu5.org/proxyrssntv.php",
    method: "GET",
    data: { url: "https://projeler.eu5.org/proxyrssntv.php" },
    success: function(response) {
       //alert("çalışıyor");
       runProxyRssNtv();
    },
    error: function() {
       //alert("ÇALIŞMIYOR");
      runRss2Json();
    }
});

//----------------------------------------------------------------------------------------------==============================================================================<<<<<<<<<<<<<<<<<<<<<< php function  
function runProxyRssNtv() {
    var rssUrl = tespiturlkonu; // ör: "https://www.ntv.com.tr/ekonomi.rss";
    var proxyUrl = "https://projeler.eu5.org/proxyrssntv.php";

    if (!rssUrl) {
        console.error("Lütfen bir RSS URL'si girin.");
        return;
    }

    $.getJSON(`${proxyUrl}?url=${encodeURIComponent(rssUrl)}`)
        .done(function(data) {
            if (data && data.entry) {
                displayNewsProxy(data.entry);
            } else {
                console.error("Proxy verisi hatalı veya boş.");
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error("Proxy çekme hatası:", textStatus, error);
        });
}

function displayNewsProxy(items) {
    const container = $('#newsContainer');
    container.empty();

    if (!items || items.length === 0) {
        container.append('<p class="text-center">Hiç haber bulunamadı.</p>');
        return;
    }

    let newsHtml = '';

    $.each(items, function(index, item) {
        const tempDiv = $('<div>').html(item.content || '');
        const firstImg = tempDiv.find('img').first().attr('src') || '';

        const paragraphs = [];
        tempDiv.find('p').each(function() {
            paragraphs.push($(this).text());
        });
        const textContent = paragraphs.join("<br>");

        var finalLink = (item.link && typeof item.link === 'object' && item.link.href) 
                        ? item.link.href 
                        : (item.link || '#');

        var asilLink = getUrlRightSide(finalLink);
        asilLink = OBPsayfam + "?urlkonu=" + urlkonu + "&urlsayfa=" + asilLink;

        newsHtml += `
            <div class="col-xs-12 col-sm-6 col-md-6 obpunsur">
                <div class="thumbnail">
                    <a href="${asilLink}">
                        ${firstImg ? `<img src="${firstImg}" alt="${item.title}">` : ''}
                    </a>
                    <div class="caption">
                        <h3 class="uzunkelime">${(index+1)} - ${item.title}</h3>
                        <h4 class="uzunkelime">${textContent}</h4>
                        <small>${new Date(item.published).toLocaleDateString('tr-TR')}</small>
                        <div class="btn-group" style="margin-top: 10px;">
                            <a href="${asilLink}" class="btn btn-lg btn-danger habertext strait">
                                Habere Git <span class="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.html(newsHtml);
} //------------------------------------------- runProxyRssNtv() fonksiyonu bitiş
  
  
//----------------------------------------------------------------------------------------------==============================================================================<<<<<<<<<<<<<<<<<<<<<< rss2json  
function runRss2Json() {
    var rssUrl = tespiturlkonu; // ör: "https://www.ntv.com.tr/ekonomi.rss";
    if (!rssUrl) {
        console.error("Lütfen bir RSS URL'si girin.");
        return;
    }

    $.getJSON(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .done(function(data) {
            if (data.status === 'ok') {
                const items = data.items;
                displayNewsRss2Json(items);
            } else {
                console.error("rss2json verisi hatalı:", data.message);
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error("rss2json çekme hatası:", textStatus, error);
        });
}

function displayNewsRss2Json(items) {
    const container = $('#newsContainer');
    container.empty();

    if (!items || items.length === 0) {
        container.append('<p class="text-center">Hiç haber bulunamadı.</p>');
        return;
    }

    let newsHtml = '';

    $.each(items, function(index, item) {
        const tempDiv = $('<div>').html(item.content || item.description || '');
        const firstImg = tempDiv.find('img').first().attr('src') || '';

        const paragraphs = [];
        tempDiv.find('p').each(function() {
            paragraphs.push($(this).text());
        });
        const textContent = paragraphs.join("<br>");

        const finalLink = item.link || '#';
        var asilLink = getUrlRightSide(finalLink);
        asilLink = anasayfaUrl + "?urlkonu=" + urlkonu + "&urlsayfa=" + asilLink;

        newsHtml += `
            <div class="col-xs-12 col-sm-6 col-md-6 obpunsur">
                <div class="thumbnail">
                    <a href="${asilLink}">
                        ${firstImg ? `<img src="${firstImg}" alt="${item.title}">` : ''}
                    </a>
                    <div class="caption">
                        <h3 class="uzunkelime">${(index+1)} - ${item.title}</h3>
                        <h4 class="uzunkelime">${textContent}</h4>
                        <small>${new Date(item.pubDate).toLocaleDateString('tr-TR')}</small>
                        <div class="btn-group" style="margin-top: 10px;">
                            <a href="${asilLink}" class="btn btn-lg btn-danger habertext strait">
                                Habere Git <span class="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.html(newsHtml);
} //------------------------------------------- runRss2Json() fonksiyonu bitiş
  

  
  
  
$("#footer").load("https://muhittinbudak.github.io/yakamoz/footer.html", function(responseTxt, statusTxt, xhr){ if(statusTxt == "success") { } if(statusTxt == "error") { $("#footer").html("Yükleniyor...");} });  

$("#ustmenu").load("https://muhittinbudak.github.io/yakamoz/ustmenu.html", function(responseTxt, statusTxt, xhr){ if(statusTxt == "success") { } if(statusTxt == "error") { $("#footer").html("Yükleniyor...");} });    
  
  
});  
