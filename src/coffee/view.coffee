
app = angular.module 'myapp', []

# class @AegisCtrl extends Controller
#   @register app
class @AegisCtrl
  @$inject: ['$scope']
  constructor: (@scope) ->
    @scope.trials = [{}]
    @scope.change = @change
    @changeResult(@allAnswers())
    # angular.extend @scope,
    #   change: @change

  change: =>
    valids = []
    _.map @scope.trials, (trial) ->
      if AegisCtrl.isValid(trial)
        valids.push
          ans: Answer.fromStr(trial.input)
          hitBlow: new HitBlow(trial.hit, trial.blow)
    @scope.trials.push {} if valids.length == @scope.trials.length

    as = @allAnswers()
    _.each valids, (v) ->
      as = v.ans.check(v.hitBlow, as)
    @changeResult(as)

  changeResult: (answers) =>
    @scope.view = answers.join(', ')
    @scope.count = answers.length

  allAnswers: =>
    initExcs = Answer.toNums(@scope.initExc)
    inits = _.filter [0..9], (i) -> !_.contains(initExcs, i)
    Answer.allAnswer(inits)

  @isValid: (trial) ->
    hit = trial.hit
    blow = trial.blow
    trial.input? && hit? && blow? &&
      0 <= hit && hit <= 3 && 0 <= blow && blow <= 3 &&
      Answer.isAnswer(trial.input)

app.controller 'AegisCtrl', AegisCtrl

# inheritance exemple - just proof of concept
class Controller
  @register: (app) -> app.controller @name, @ # not sure it's cross browser, not minification safe

  @inject: (args...) -> @$inject = args

  constructor: (args...) ->
    for key, index in @constructor.$inject
      @[key] = args[index]
