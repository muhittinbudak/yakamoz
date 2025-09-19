$(document).ready(function(){

//-- blogspot Ana sayfa ayarları başlangıç
$(".entry-title").addClass("strait-25"); 
$(".blog-posts.hfeed.container").addClass("pmsifir");  
$("#page_body article.post-outer-container").addClass("pmbesifir"); // en dış container sol padding 5px yapıldı
$("Blog1").addClass("pmsifir");  
$("#page_body .post-title.entry-title").css("display", "none");  
$("div.flat-icon-button.ripple").css("display", "none");    //paylaş butonu yokedildi.
$("div#PopularPosts1.widget.PopularPosts").css("display", "none");    //popular paylaşımlar bölümü yokedildi.
$("section#comments.comments.embed").css("display", "none");    //yorumekle bölümü yokedildi.
$("div.blogger").css("display", "none");//blogger 
$(".sidebar-container").css("display", "none"); // yan bar unvisible
$("div.blog-name.container").css("display", "none");  //OBP unvisible
$("button.svg-icon-24-button.back-button.rtl-reversible-icon.flat-icon-button.ripple").css("display", "none");//back icon disable
$(".page_body").css("width", "100%");// ortaki containeri %100 yapıldı
$("div.centered").addClass("pmsifir");// ortaki containeri sıfırlandı  
$("div.copyright").css("display", "none");  //copyright unvisible  
$("div#post-body-672623985775028581.post-body.entry-content.float-container").addClass("pmsifir");  
$("div.search").addClass("pmsifir");  
$("header.centered-top-container").addClass("pmsifir");   
//-- blogspot ana sayfa ayarları bitiş
//-- navbar click 
$('#nav-menu a').on('click', function() {
        if ($('.navbar-toggle').is(':visible')) {
            $('.navbar-collapse').collapse('hide');
        }
}); 
//--- click bitiş     



        
$("#dugme").click(function (e) { 

alert("Merhaba Üzümcü IĞdır.");
    //$("#sonuc").text("eik");
    //h3 id="tarih".
    //  e.preventDefault();
});

/*    
$("button").click(function(){ 

$.post("demo_test_post.asp",{ name: "Donald Duck", city: "Duckburg" }, function(data,status){ alert("Data: " + data + "\nStatus: " + status); }); 

});
$("#sonuc").text("metin");
$http({ method:"GET",url:"./test.php" }).then(function (response){ $scope.Results =response.data.deste; },function(response){ $scope.statuscode = response.status; });
  
*/



}); // end jquery
