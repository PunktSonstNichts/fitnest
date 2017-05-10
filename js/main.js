$(document).ready(function () {
   $(".taskday").click(function () {
      $(".taskday").removeClass("active");
      $(this).addClass("active");

      $("*[data-day]").hide();
      $("*[data-day='" + $(this).attr("data-dayid") + "']").show();

      $(this).attr("data-taskcount", $("*[data-day='" + $(this).attr("data-dayid") + "']").size());
   });

   $(document).on("click", ".task-done", function () {
       console.log("cliick");

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


    var d = new Date();
    var n = d.getDay();
    n = (n - 1) % 7; //so it starts on monday
    console.log(n);
    $(".taskday").eq(n).addClass("active");


    dates = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    $("#date").text(dates[n] + ", " + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear());

    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    var firstofweek = new Date(d.setDate(diff));

    $(".taskday").each(function () {
        $(this).children(".taskdaycontent").text(firstofweek.getDate());
        firstofweek.setDate(firstofweek.getDate() + 1);
    })

    $(".task[data-day]").each(function () {
        i = parseInt($(this).attr("data-day"), 10) - 1;
        console.log(i + " - " + n);
        if((i) < n){
            $(this).addClass("finished");
        }else if((i) == n){
            $(this).children(".task-helper").addClass("task-done").removeClass("task-helper");
        }
    })

    $(".taskday.active")[0].click();

    $("#opentask").html($(".taskday.active").attr("data-taskcount") + " Übungen");


    $(".task.addnew, #add_new").click(function () {
       $("#add_new, #stats_page").toggleClass("hide");
    });
});
