$(document).ready(function () {
   $(".taskday").click(function () {
      $(".taskday").removeClass("active");
      $(this).addClass("active");

      $("*[data-day]").hide();
      $("*[data-day='" + $(this).attr("data-dayid") + "']").show();

      $(this).attr("data-taskcount", $("*[data-day='" + $(this).attr("data-dayid") + "']").size());
   });

   var taskcount = 0;

   $(document).on("click", ".task-done", function () {
        $(this).parent(".task").toggleClass("done");
        var f = $("#progressbar").width() / $("#progressbar").parent().width() * 100;

        var total = $(".taskday.active").attr("data-taskcount");

        if($(this).parent(".task").hasClass("done")){
            $("#progressbar").width((f + ((1 / total) * 100)) + '%');
            $("#stats_done").html(++taskcount);
        }else{
            $("#progressbar").width(f - ((1 / total) * 100) + '%');
            $("#stats_done").html( --taskcount);
        }
   });

   $(document).on("focus", ".input_input", function () {
       $(this).parent().addClass("focused").addClass("underline");
   }).on("blur", ".input_input", function () {
       $(this).parent().removeClass("underline");
       if($(this).val().length == 0){
           $(this).parent().removeClass("focused");
       }
   }).on("keydown", ".input_input", function () {
       console.log("key pressed on input");
       if($(this).val().length != 0){
           $(this).parent().addClass("focused");
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
        var hT_c = $('#chart_wrapper').offset().top,
            hH_c = $('#chart_wrapper').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        //cheaty to link #ranking on the chartbox,
        // but no time to make it beautiful
        if (wS > (hT_c+hH_c-wH)){
            $(".chartbox, .rank, #blur").removeClass("hide");
        }else{
            $(".chartbox, .rank, #blur").addClass("hide");
        }
    });


    var d = new Date();
    var n = d.getDay();
    n = ((n - 1) + 7) % 7; //so it starts on monday
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
        if((i) < n){
            $(this).addClass("finished");
        }else if((i) == n){
            $(this).children(".task-helper").addClass("task-done").removeClass("task-helper");
        }
    })

    $(".taskday.active")[0].click();

    $("#opentask").html($(".taskday.active").attr("data-taskcount") + " Übungen");


    $(".task.addnew, #add_new_back").click(function () {
       $("#add_new, #stats_page").toggleClass("hide");
    });

    $(document).on("click", "#add_new_form_submit", function () {
       $(this).addClass("active");
        setTimeout( function(){
            $("#add_new, #stats_page").toggleClass("hide");
            $("#add_new_form_submit").removeClass("active");
        }, 1500);
    });

    $(document).on("click", ".labelselector", function () {
        $(".labelselector").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    }).on("click", ".add_friends_res_item", function () {
        $(this).toggleClass("active");
    });

    $(document).on("click", "#overlay, #add_friends, #safenewfriends", function (e) {
       e.stopPropagation();
       $("#overlay, #add_friends_box_wrapper").toggleClass("active");
    });

});
