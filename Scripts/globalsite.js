//RWD
var rwdMixin = {
  data: {
    windowWidth: 0,
    windowHeight: 0,
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.windowResize);
      window.addEventListener('scroll', this.windowScroll);

      //Init
      this.windowResize()
      this.windowScroll()
    })
  },
  methods: {
    windowResize: function (event) {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
      //MMENU_大網關閉
      if (this.windowWidth > 767) {
        try {
          $("#menu").data("mmenu").close();
        }
        catch (error) {
        }
      }
      /*-------------------- 頁面最小高度 --------------------*/
      //抓高度
      var headerH = $(".header").outerHeight();
      var footerH = $(".footer").outerHeight();

      $(".container").css('min-height', this.windowHeight - headerH - footerH);

      //頁尾區域
      try {
        var bottomH = $('.JS_Bottom_area').outerHeight();
        if (bottomH !== 0) {
          $('.content').css('padding-bottom', bottomH);
        }
      }
      catch (error) {
      }

    },
    windowScroll: function (event) {
      /*mobile header*/
      if ($(window).scrollTop() > 50) {
        $(".header").addClass('fixed');
      } else {
        $(".header").removeClass('fixed');
      }

      /*-------------------- btn_浮動 --------------------*/
      var footerH = $('.footer_inner').outerHeight();
      //頁面高度-footer高度
      var bottomH = $(".wrapper").outerHeight() - footerH;
      if (this.windowWidth > 768) {
        if (($(window).scrollTop() + this.windowHeight) >= (bottomH + 20)) {
          $(".pageBtn").css('bottom', footerH + 25);
        } else {
          $(".pageBtn").css('bottom', 10);
        }
      } else if (this.windowWidth < 768) {
        if (($(window).scrollTop() + this.windowHeight) >= (bottomH + 50)) {
          $(".pageBtn").css('bottom', footerH + 40);
        } else {
          $(".pageBtn").css('bottom', 10);
        }
      }

    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.windowResize);
    window.removeEventListener('scroll', this.windowScroll);
  }
};
mixinArray.push(rwdMixin);

//swiper套件
Vue.use(VueAwesomeSwiper);
var swiperMixin = {
  methods: {
    swiperOptions: function (target) {
      return {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: '.' + target + ' .swiper-button-next',
          prevEl: '.' + target + ' .swiper-button-prev',
        },
        pagination: {
          el: '.' + target + ' .swiper-pagination',
          type: 'fraction'
        },
      };
    },
    swiperOptionsNoLoop: function (target) {
      return {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: '.' + target + ' .swiper-button-next',
          prevEl: '.' + target + ' .swiper-button-prev',
        },
        pagination: {
          el: '.' + target + ' .swiper-pagination',
          type: 'fraction'
        },
      };
    },
    swiperOptionsRWD: function (target) {
      return {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: '.' + target + ' .swiper-button-next',
          prevEl: '.' + target + ' .swiper-button-prev',
        },
        pagination: {
          el: '.' + target + ' .swiper-pagination',
          type: 'fraction'
        },
        breakpoints: {//當螢幕寬度大於等於
          1281: {
            slidesPerView: 3
          },
          1023: {
            slidesPerView: 2
          },
          767: {
            slidesPerView: 2
          },
          640: {
            slidesPerView: 1
          }
        }
      };
    },
    onSetTranslate: function () {
      //console.log('onSetTranslate')
    },
    onSwiperSlideChangeTransitionStart: function () {
      //console.log('onSwiperSlideChangeTransitionStart')
    },
    onSwiperClickSlide: function (index, reallyIndex) {
      //console.log('Swiper click slide!', reallyIndex)
    },
    onobserverUpdate: function () {
      //console.log('onobserverUpdate');
    }
  },
};
mixinArray.push(swiperMixin);

//取得vuelidate的錯誤訊息
function getFieldErrMsg(validation) {
  if (validation.$error) {
    var rtnMsg = [];
    $.each(validation, function (key, val) {
      if (key.charAt(0) !== "$" && val == false) {
        $.each(validation.$params, function (key2, value) {
          if (key === key2) {
            rtnMsg.push(value["msg"]);
          }
        });
      }
    });
    return rtnMsg.join("<br/>");
  }
}

//共用的
var filtersMixin = {
  filters: {
    fixFormat: function fixFormat(value, digit) {
      if (nullorEmpty(value)) { return "-"; }
      return isNumeric(value) ? parseFloat(value).toFixed(digit) : value;
    },
    commaFormat: function commaFormat(value) {// 加上千分位符號
      if (nullorEmpty(value)) { return "-"; }
      return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, groupOf3Digital) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ',$&');
      });
    },
    transZero: function transZero2NullFormat(value, appendstr) {
      if (nullorEmpty(value) || value == '-') { return "-"; }//空值 or "-" →不顯示 appendstr
      if (nullorEmpty(appendstr)) { appendstr = ""; }
      return !nullorEmpty(value) ? value.toString() + appendstr : "-";
    }
  },
};
mixinArray.push(filtersMixin);

function nullorEmpty(data) {
  if (data == null || data == undefined || data === "" || data === 'undefined' || data === 'NaN' || data === 'null' || data === ' ') {
    return true;
  }
  else {
    return false;
  }
}

function objClone(obj) {
  return jQuery.extend(true, {}, obj)
}

function arrayClone(arr) {
  return jQuery.extend(true, [], arr)
}

function realUrlConvert(url) {
  if (url.match('http') != null) {
    return url
  }
  else {
    return (rootPath == '/') ? url : rootPath + url;
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//JS 浮點數校正
//除法
function floatDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) { }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) { }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}

//乘法
function floatMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//加法
function floatAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//減法
function floatSubtr(arg1, arg2, ot) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) { r1 = 0 }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  if (ot == 1)
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
  else
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
