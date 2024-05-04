!function() {
  var e = {
    data: function() {
      return {
        active: !1,
        activecode: !1,
        activenum: !1,
        rndAZ: getRndAZArray(),
        rndaz: getRndazArray(),
        rndNum: getRndNumArray(),
        eyeShow: !0,
        eyeShowcode: !0,
        eyeShownum: !1,
        existUserCode: !1,
        url: {
          checkExistUserCodeLink: realUrlConvert("/Login/ajaxCheckExistUserCode"),
          checkKSCLink: realUrlConvert("/Login/ajaxCheckKSC"),
          setCodeLink: realUrlConvert("/Login/SetCode")
        }
      }
    },
    methods: {
      ToUpper: function() {
        console.log("upper"),
            this.userAccount = this.userAccount.toUpperCase()
      },
      SetCode: function() {
        this.existUserCode ? this.alertMessage = "您已設定過使用者代碼，請在登入頁繼續登入。" : location = this.url.setCodeLink + "?R=1"
      },
      checkExistUserCode: function() {
        if (this.existUserCode = !1,
            !this.$v.userAccount.$invalid) {
          var e = this;
          this.post(this.url.checkExistUserCodeLink, {
            userAName: this.userAccount
          }, (function(t) {
                switch (t.Result) {
                  case "1":
                    e.existUserCode = !0;
                    break;
                  case "2":
                    location = e.url.setCodeLink + "?R=1";
                    break;
                  case "3":
                    e.alertMessage = t.Msg
                }
              }
          ))
        }
      },
      checkKSC: function() {
        if (!this.$v.userAccount.$invalid) {
          var e = this;
          this.post(this.url.checkKSCLink, {
            userAName: this.userAccount,
            userKSC: this.userAuth
          }, (function(t) {
                "N" == t.Result && (e.alertNoContinue = !1,
                    e.alertMessage = "為提升帳戶安全，請進行密碼強度設定")
              }
          ))
        }
      },
      pageAlert: function() {
        location = this.url.setCodeLink + "?R=2"
      },
      toggleEye: function(e, t) {
        $elem = $(t.target),
            $elem.toggleClass("hide");
        var i = !$elem.hasClass("hide");
        switch (e) {
          case 0:
            this.eyeShow = i;
            break;
          case 1:
            this.eyeShowcode = i;
            break;
          case 2:
            this.eyeShownum = i
        }
      },
      toggle: function() {
        this.active = !this.active,
        this.activecode && (this.activecode = !1),
        this.activenum && (this.activenum = !1),
        this.active && (this.rndAZ = getRndAZArray(),
            this.rndNum = getRndNumArray())
      },
      togglecode: function() {
        this.activecode = !this.activecode,
        this.active && (this.active = !1),
        this.activenum && (this.activenum = !1),
        this.activecode && (this.rndAZ = getRndAZArray(),
            this.rndaz = getRndazArray(),
            this.rndNum = getRndNumArray())
      },
      togglenum: function() {
        this.activenum = !this.activenum,
        this.active && (this.active = !1),
        this.activecode && (this.activecode = !1),
        this.activenum && (this.rndAZ = getRndAZArray(),
            this.rndaz = getRndazArray(),
            this.rndNum = getRndNumArray())
      },
      addkey: function(e) {
        this.active && (this.userAccount += e),
        this.activecode && (this.userCode += e),
        this.activenum && (this.userAuth += e)
      },
      removekey: function() {
        this.active && (this.userAccount = this.userAccount.slice(0, -1)),
        this.activecode && (this.userCode = this.userCode.slice(0, -1)),
        this.activenum && (this.userAuth = this.userAuth.slice(0, -1))
      },
      cleanall: function() {
        this.active && (this.userAccount = ""),
        this.activecode && (this.userCode = ""),
        this.activenum && (this.userAuth = "")
      }
    }
  };
  mixinArray.push(e)
}();
