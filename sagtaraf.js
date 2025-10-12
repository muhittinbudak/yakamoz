$(document).ready(function() {
    var url = "https://muhittinbudak.github.io/oyaksorular/oyaksorular.json";
    var mylistsRow = $("#Mylists");

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(data) {
            // id alanına göre azalan sıralama
            data.sort(function(a, b) {
                return parseInt(b.id) - parseInt(a.id);
            });

            var htmlContent = "";
            $.each(data, function(index, item) {
                var imageUrl = item.image 
                    ? item.image 
                    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5eDNnbeYicApV0dWWrsfuoWSa3o_puXfMKcJb-Qi3Z7nGpNXD6iDk5R8pAmnH2EyIKZoyKtFpdW-0SgEgQcHdJqtUGarEp-cgT393My40oZQ9sy90YZBNDVU3l47nbz2SjmxfUEGAbzHS6icsS6BmT5cGMd72ma6QS8PkQug1hKMM4r1x2h6ookBsE-JP/s1600/oyak-back.jpg" + item.id;
                var title = item.question;
                var link  = item.link;

                htmlContent += `
                    <div class="hidden-xs col-xs-12 col-sm-12 col-md-4">
                        <div class="thumbnail1">
                            <a href="${link}">
                                    <div class="well well-lg arka">
                                        <center><h2 class="habertext1">${title}</h2></center>
                                    </div>
                            </a>
                            <div class="caption1">
                                <div class="btn-group">
                                    <a href="${link}" style="font-size:21px" class="btn btn-lg btn-danger">
                                        CEVABI GÖR <span class="glyphicon glyphicon-chevron-right"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            mylistsRow.html(htmlContent);
        },
        error: function() {
            mylistsRow.html("<p>Veri yüklenirken bir hata oluştu.</p>");
        }
    });
  
 
  
});                   
