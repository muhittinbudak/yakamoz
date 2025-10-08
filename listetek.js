$(document).ready(function() {
//listetek 
  
  var OBPsayfam = "https://oyakbilgi.blogspot.com/p/obp.html";
  var params = new URLSearchParams(window.location.search);
  var urlkonu = params.get("urlkonu");
  var urlsayfa = params.get("urlsayfa");
  var tespiturlkonu="";
  var tespiturlsayfa="";
  
if(!urlkonu) {
//boş
  
tespiturlkonu = "https://www.ntv.com.tr/ntvpara.rss";  
  
} else {
//dolu

  
switch(urlkonu) {
  case "ekonomi":
    tespiturlkonu = "https://www.ntv.com.tr/ekonomi.rss";
    break;
 case "ntvpara":
    tespiturlkonu = "https://www.ntv.com.tr/ntvpara.rss";      
    break;    
 case "egitim":
    tespiturlkonu = "https://www.ntv.com.tr/egitim.rss";      
    break;
 case "saglik":
    tespiturlkonu = "https://www.ntv.com.tr/saglik.rss";    
    break;
 case "dunya":
    tespiturlkonu = "https://www.ntv.com.tr/dunya.rss";
    break;
 case "otomobil":
    tespiturlkonu = "https://www.ntv.com.tr/otomobil.rss";
    break;
 case "spor":
    tespiturlkonu = "https://www.ntv.com.tr/spor.rss";    
    break;      
 case "teknoloji":
    tespiturlkonu = "https://www.ntv.com.tr/teknoloji.rss";    
    break;      
 case "sanat":
    tespiturlkonu = "https://www.ntv.com.tr/sanat.rss";    
    break;      
 case "oyak":
    //oyaksorucevapAta();    
    break;      
  default:
    // Default olarak "Ekonomi" yükle
    tespiturlkonu = "https://www.ntv.com.tr/ntvpara.rss";
        break;      
   }  
}

//gemini
  

if(!urlsayfa) {
//boş ise
  tespiturlsayfa = "";
   if(urlkonu == null) urlkonu = "ntvpara";  
  
} else {  
  
var rootObpPage = OBPsayfam +"?urlkonu=";
tespiturlsayfa = "https://www.ntv.com.tr/"+ urlsayfa;


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

  // RSS feed URL'si
  const rssUrl = tespiturlkonu;

  // Buraya bir haber ID'si yazarsanız, o haberi arar.
  // Eğer boş bırakırsanız (""), otomatik olarak ilk haberi gösterir.
  const targetId = tespiturlsayfa; 
  // Örnek bir ID ile arama yapmak için aşağıdaki satırı kullanabilirsiniz:
  // const targetId = "https://www.ntv.com.tr/galeri/saglik/kalin-bagirsak-kanserine-neden-oluyor-en-sik-tuketilen-besinlerden-biri,UR0W13pIHkSPUybg1tI3lw";  
        
//gemini
//----------------------------------------------------------------------------------------------==============================================================================<<<<<<<<<<<<<<<<<<<<<< 2
$.ajax({
    url: "https://projeler.eu5.org/proxyrssntv1.php",
    method: "GET",
    data: { url: "https://projeler.eu5.org/proxyrssntv1.php" },
    success: function(response) {
        // çalışıyor
        runProxyRssNtvTek(rssUrl, targetId);
    },
    error: function() {
      // ÇALIŞMIYOR
        runRss2JsonTek(rssUrl, targetId);
    }
}); 
  
//----------------------------------------------------------------------------------------------==============================================================================<<<<<<<<<<<<<<<<<<<<<< 2 
        
function runProxyRssNtvTek(rssUrl, targetId) { 
    $("#loading").show();
    const proxyUrl = `https://projeler.eu5.org/proxyrssntv1.php?url=${encodeURIComponent(rssUrl)}`;

    $.getJSON("https://projeler.eu5.org/proxyrssntv1.php?id=" + encodeURIComponent(targetId) + "&konu=" + urlkonu, function(data) {
        if (data.entry && data.entry.length > 0) {
            renderNewsProxy({
                title: data.entry[0].title,
                link: data.entry[0].link,
                contentHtml: data.entry[0].content,
                publishedDate: data.entry[0].published
            });
        }
    });


    function renderNewsProxy({title, link, contentHtml, publishedDate}) {
        const tempDiv = $('<div>').html(contentHtml);
        const imageUrl = tempDiv.find('img').first().attr('src') || '';
        const formattedDate = new Date(publishedDate).toLocaleDateString("tr-TR", {
            day: "2-digit", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
      
         var asilLink = getUrlRightSide(link);  
         asilLink = OBPsayfam + "?urlkonu=" + urlkonu + "&urlsayfa=" + asilLink ;         

        $("#newsItemContainer").html(`
            <div class="featured-article">
                <a href="${asilLink}" id="manset_url">
                    ${imageUrl ? `<img style="border-radius:5px;margin:10px 0;" src="${imageUrl}" alt="${title}" width="100%"/>` : ''}
                    <div class="block-title">
                        <h2 style="color:#910910;margin-left:10px">${title}</h2>
                    </div>
                </a>
            </div>                
            ${contentHtml}
            <div class="btn-toolbar" style="margin-top:20px">
                <a href="${link}" class="label label-primary pull-left strait" style="margin-left:10px;background-color:#0087C1;color:#D8D8D8">Kaynak : ntv.com.tr</a>
                <div class="pull-right btn-group">
                    <span class="label label-default pull-right strait" style="background-color:#EAF2F7;color:#000">${formattedDate}</span>            
                </div>
            </div>
        `).find('img').css({'border': '1px solid #D6D6D6', 'border-radius': '5px','margin':'8px 0' }).slice(1, 3).remove();
          
             $("#newsItemContainer p:eq(0)").css({
                'font-weight':'bold',
                'background': '#F3F3F3',
                'text-align': 'justify'
            });
          
            $("#newsItemContainer").find('strong').each(function() {
              $(this).before('<br>').after('<br>');
            });
          
            $("#newsItemContainer").find('img').css({
                'border': '1px solid #D6D6D6',
                'border-radius': '5px',
                'margin': '8px 0'
            });

        $("#loading").hide();
        $("#success-message").show();
    }
} //---------------- ===================== runProxyRssNtvTek(rssUrl, targetId) 


function runRss2JsonTek(rssUrl, targetId) {
    $("#loading").show();

    $.getJSON(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .done(function(data) {
            if (data.status === "ok" && data.items && data.items.length > 0) {

                if (targetId) {
                    let found = false;
                    $.each(data.items, function(i, item) {
                        if (item.guid === targetId || item.link === targetId) {
                            found = true;
                            renderNewsRss2Json({
                                title: item.title,
                                link: item.link,
                                contentHtml: item.content || item.description,
                                publishedDate: item.pubDate
                            });
                            return false;
                        }
                    });
                    if (!found) {
                        // burada hata gösterebilirsin
                    }
                } else {
                    const firstItem = data.items[0];
                    renderNewsRss2Json({
                        title: firstItem.title,
                        link: firstItem.link,
                        contentHtml: firstItem.content || firstItem.description,
                        publishedDate: firstItem.pubDate
                    });
                }
            } else {
                //showError("RSS feed boş veya alınamadı.");
            }
        })
        .fail(function() {
            //showError("RSS2JSON API isteği başarısız oldu.");
        });

    function renderNewsRss2Json({title, link, contentHtml, publishedDate}) {
        const tempDiv = $('<div>').html(contentHtml);
        const imageUrl = tempDiv.find('img').first().attr('src') || '';
        const formattedDate = new Date(publishedDate).toLocaleDateString("tr-TR", {
            day: "2-digit", month: "long", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });


         var asilLink = getUrlRightSide(link);  
         asilLink = OBPsayfam + "?urlkonu=" + urlkonu + "&urlsayfa=" + asilLink ;   

      
        $("#newsItemContainer").html(`
            <div class="featured-article">
                <a href="${asilLink}" id="manset_url">
                    ${imageUrl ? `<img style="border-radius:5px;margin:10px 0;" src="${imageUrl}" alt="${title}" width="100%"/>` : ''}
                    <div class="block-title">
                        <h2 style="color:#910910;margin-left:10px">${title}</h2>
                    </div>
                </a>
            </div>                
            ${contentHtml}
            <div class="btn-toolbar" style="margin-top:20px">
                <a href="${link}" class="label label-primary pull-left strait" style="margin-left:10px;background-color:#0087C1;color:#D8D8D8">Kaynak : ntv.com.tr</a>
                <div class="pull-right btn-group">
                    <span class="label label-default pull-right strait" style="background-color:#EAF2F7;color:#000">${formattedDate}</span>            
                </div>
            </div>
        `).find('img').css({'border': '1px solid #D6D6D6', 'border-radius': '5px','margin':'8px 0' }).slice(1, 3).remove();
          
             $("#newsItemContainer p:eq(0)").css({
                'font-weight':'bold',
                'background': '#F3F3F3',
                'text-align': 'justify'
            });
          
            $("#newsItemContainer").find('strong').each(function() {
              $(this).before('<br>').after('<br>');
            });
          
            $("#newsItemContainer").find('img').css({
                'border': '1px solid #D6D6D6',
                'border-radius': '5px',
                'margin': '8px 0'
            });

        $("#loading").hide();
        $("#success-message").show();
    }
  } //---------------------------- runRss2JsonTek(rssUrl, targetId)
});
