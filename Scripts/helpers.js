!function() {
  var e = {
    methods: {
      post: function(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}
        ;
        $.ajax({
          headers: {
            RequestVerificationToken: document.getElementsByName("__RequestVerificationToken")
          },
          type: "POST",
          cache: !1,
          url: e,
          data: t,
          dataType: "json",
          success: function(e) {
            n(e)
          },
          error: function() {
            r()
          }
        })
      }
    }
  };
  mixinArray.push(e),
      Array.prototype.groupBy = function(e) {
        return this.reduce((function(t, n) {
              var r = n[e];
              return t[r] = t[r] || [],
                  t[r].push(n),
                  t
            }
        ), {})
      }
      ,
      Array.prototype.remove = function() {
        for (var e, t, n = arguments, r = n.length; r && this.length; )
          for (e = n[--r]; -1 !== (t = this.indexOf(e)); )
            this.splice(t, 1);
        return this
      }
}();
