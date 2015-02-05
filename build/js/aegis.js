(function() {
  var Answer, Controller, HitBlow, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Answer = (function() {
    function Answer(a, b, c) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.toString = __bind(this.toString, this);
      this.equals = __bind(this.equals, this);
      this.toArray = __bind(this.toArray, this);
    }

    Answer.prototype.check = function(hitBlow, cand) {
      if (cand == null) {
        cand = allAnswer();
      }
      return _.filter(cand, (function(_this) {
        return function(c) {
          return _this.hitBlow(c).equals(hitBlow);
        };
      })(this));
    };

    Answer.prototype.hitBlow = function(ans) {
      var blow, hit;
      hit = (_.filter([this.a === ans.a, this.b === ans.b, this.c === ans.c], function(x) {
        return x;
      })).length;
      blow = _.intersection(this.toArray(), ans.toArray()).length - hit;
      return new HitBlow(hit, blow);
    };

    Answer.prototype.toArray = function() {
      return [this.a, this.b, this.c];
    };

    Answer.prototype.equals = function(other) {
      if (other instanceof Answer) {
        return this.a === other.a && this.b === other.b && this.c === other.c;
      } else {
        return false;
      }
    };

    Answer.prototype.toString = function() {
      return "" + this.a + this.b + this.c;
    };

    Answer.allAnswer = function(numbers) {
      var xsss;
      if (numbers == null) {
        numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
      xsss = _.map(numbers, function(x) {
        var ys;
        ys = _.filter(numbers, function(y) {
          return y !== x;
        });
        return _.map(ys, function(y) {
          var zs;
          zs = _.filter(ys, function(z) {
            return z !== y;
          });
          return _.map(zs, function(z) {
            return new Answer(x, y, z);
          });
        });
      });
      return _.flatten(xsss);
    };

    Answer.isAnswer = function(str) {
      var nums;
      nums = this.toNums(str);
      return nums.length >= 3;
    };

    Answer.fromStr = function(str) {
      var nums;
      nums = this.toNums(str);
      return new Answer(nums[0], nums[1], nums[2]);
    };

    Answer.toNums = function(str) {
      var numStrs;
      if (_.isString(str)) {
        numStrs = _.filter(str.split(''), function(c) {
          return '0' <= c && c <= '9';
        });
        return _.map(numStrs, Number);
      } else {
        return [];
      }
    };

    return Answer;

  })();

  HitBlow = (function() {
    function HitBlow(hit, blow) {
      this.hit = hit;
      this.blow = blow;
    }

    HitBlow.prototype.equals = function(other) {
      if (other instanceof HitBlow) {
        return this.hit === other.hit && this.blow === other.blow;
      } else {
        return false;
      }
    };

    return HitBlow;

  })();

  app = angular.module('myapp', []);

  this.AegisCtrl = (function() {
    AegisCtrl.$inject = ['$scope'];

    function AegisCtrl(scope) {
      this.scope = scope;
      this.clear = __bind(this.clear, this);
      this.allAnswers = __bind(this.allAnswers, this);
      this.changeResult = __bind(this.changeResult, this);
      this.change = __bind(this.change, this);
      this.clear();
      this.scope.change = this.change;
      this.scope.clear = this.clear;
    }

    AegisCtrl.prototype.change = function() {
      var as, valids;
      valids = [];
      _.map(this.scope.trials, function(trial) {
        if (AegisCtrl.isValid(trial)) {
          return valids.push({
            ans: Answer.fromStr(trial.input),
            hitBlow: new HitBlow(trial.hit, trial.blow)
          });
        }
      });
      if (valids.length === this.scope.trials.length) {
        this.scope.trials.push({});
      }
      as = this.allAnswers();
      _.each(valids, function(v) {
        return as = v.ans.check(v.hitBlow, as);
      });
      return this.changeResult(as);
    };

    AegisCtrl.prototype.changeResult = function(answers) {
      this.scope.view = answers.join(', ');
      return this.scope.count = answers.length;
    };

    AegisCtrl.prototype.allAnswers = function() {
      var initExcs, inits;
      initExcs = Answer.toNums(this.scope.initExc);
      inits = _.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], function(i) {
        return !_.contains(initExcs, i);
      });
      return Answer.allAnswer(inits);
    };

    AegisCtrl.prototype.clear = function() {
      this.scope.trials = [{}];
      this.scope.initExc = "";
      return this.changeResult(this.allAnswers());
    };

    AegisCtrl.isValid = function(trial) {
      var blow, hit;
      hit = trial.hit;
      blow = trial.blow;
      return (trial.input != null) && (hit != null) && (blow != null) && 0 <= hit && hit <= 3 && 0 <= blow && blow <= 3 && Answer.isAnswer(trial.input);
    };

    return AegisCtrl;

  })();

  app.controller('AegisCtrl', AegisCtrl);

  Controller = (function() {
    Controller.register = function(app) {
      return app.controller(this.name, this);
    };

    Controller.inject = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.$inject = args;
    };

    function Controller() {
      var args, index, key, _i, _len, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = this.constructor.$inject;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        key = _ref[index];
        this[key] = args[index];
      }
    }

    return Controller;

  })();

}).call(this);

//# sourceMappingURL=aegis.js.map
