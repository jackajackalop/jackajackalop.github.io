$(function() {
    var selectedClass = "0";
    $("#gallery").fadeTo(100, 0.1);
    $("#gallery").find(":not(."+selectedClass+"):not(."+selectedClass+" *)").fadeOut();
    setTimeout(function() {
        $("#gallery").find("."+selectedClass+", ."+selectedClass+" *").fadeIn();
        $("#gallery").fadeTo(300, 1);
    }, 300);

    $(".filter").click(function(){
        selectedClass = $(this).attr("data-rel");
        $("#gallery").fadeTo(100, 0.1);
        $("#gallery").find(":not(."+selectedClass+"):not(."+selectedClass+" *)").fadeOut();
        setTimeout(function() {
            $("#gallery").find("."+selectedClass+", ."+selectedClass+" *").fadeIn();
            $("#gallery").fadeTo(300, 1);
        }, 300);

    });
});
