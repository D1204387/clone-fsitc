/*-------------------- page --------------------*/

//卷軸Box
try {
  /* 捲動box */
  $('.scrollBox').mCustomScrollbar({
    theme: "dark"
  });
}
catch (error) {
}

//multiple_choice-點選狀態
$(".multiple_choice a").click(function () {
  if ($(this).hasClass("select")) {
    $(this).removeClass("select");
  } else {
    $(this).addClass("select");
  }
});

//multiple_dayNum-點選狀態
$(".multiple_dayNum a").click(function () {
  if ($(this).hasClass("on")) {
    $(this).removeClass("on");
  } else {
    $(this).addClass("on");
  }
});

// for caption_toggle
$(document).ready(function () {
  $(document).on('click', function (e) {
    if ($(window).width() < 767) {
      $(this).trigger('hover');
    }
  });
  $(document).on('click', function (e) {
    if ($(window).width() < 767 && $(e.target).closest(".caption_toggle").length === 0) {
      $(this).trigger('mouseleave');
    }
  });
});