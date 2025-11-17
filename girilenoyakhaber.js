$(document).ready(function(){  
// BENİM GİRDİĞİM OYAK OBP YAZILARI  
  
      function haberleriYukle() {

        $.ajax({
          url: "https://projeler.eu5.org/cevap.php", // PHP API URL'n 
          method: "GET",
          dataType: "json",
          success: function(data) {
            let html = '<ul class="media-list main-list" style="border-top: 2px solid red;padding:0" >';
            if (data.length > 0) {

              data.forEach(function(haber, index) { 


            html += "<li class='media'><a class='pull-left' href='" + haber.obp_weburl +"'><div class='image-container'><img class='media-object img-responsive img-rounded !important;' style='border: 1px solid #D6D6D6' src='"+ haber.obp_resim_url +"'></div></a><div class='media-body'><div class='media-heading strait-16 listitem'>" + haber.obp_title + "</div><div class='listitem by-author strait-13'>" + haber.obp_title + "</div><div class='btn-toolbar' style='margin-top:10px;'><a href='"+ haber.obp_weburl + "' class='btn btn-lg btn-primary habertext strait'>Habere Git <span class='glyphicon glyphicon-chevron-right'></span></a></div></li>";         
              });

            } else {
              html += "<li>Henüz haber yok.</li>";
            }
            html += "</ul>";
            $("#haberler").html(html);
          },
          error: function() {
            $("#haberler").html("<p>Could not get data...</p>");
          }
        });    
      } // haberleriYukle() bitiş     

 haberleriYukle();  
}); 
