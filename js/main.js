$(document).ready(function () {
   $(".taskday").click(function () {
      $(".taskday").removeClass("active");
      $(this).addClass("active");

      $("*[data-day]").hide();
      $("*[data-day='" + $(this).attr("data-dayid") + "']").show();

      $(this).attr("data-taskcount", $("*[data-day='" + $(this).attr("data-dayid") + "']").size());
   });

   $(".task-done").click(function () {
        $(this).parent(".task").toggleClass("done");

        var f = $("#progressbar").width() / $("#progressbar").parent().width() * 100;

        var total = $(".taskday.active").attr("data-taskcount");

        if($(this).parent(".task").hasClass("done")){
            $("#progressbar").width((f + ((1 / total) * 100)) + '%');
        }else{
            $("#progressbar").width(f - ((1 / total) * 100) + '%');
        }
   });

    $('*[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    $(window).scroll(function() {
        var hT = $('#chart_wrapper').offset().top,
            hH = $('#chart_wrapper').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT+hH-wH)){
            $(".chartbox").removeClass("hide");
        }else{
            $(".chartbox").addClass("hide");
        }
    });

    $(".taskday.active")[0].click();
});
