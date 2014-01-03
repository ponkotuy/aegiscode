
class Answer
  constructor: (@a, @b, @c) ->

  check: (hitBlow, cand = allAnswer()) ->
    _.filter cand, (c) =>
      @hitBlow(c).equals(hitBlow)

  hitBlow: (ans) ->
    hit = (_.filter [@a == ans.a, @b == ans.b, @c == ans.c], (x) -> x).length
    blow = _.intersection(this.toArray(), ans.toArray()).length - hit
    new HitBlow(hit, blow)

  toArray: () => [@a, @b, @c]

  equals: (other) =>
    if other instanceof Answer
      @a == other.a && @b == other.b && @c == other.c
    else
      false

  toString: () => "#{@a}#{@b}#{@c}"

  @allAnswer = (numbers = [0..9]) ->
    xsss = _.map numbers, (x) ->
      ys = _.filter numbers, (y) -> y != x
      _.map ys, (y) ->
        zs = _.filter ys, (z) -> z != y
        _.map zs, (z) ->
          new Answer(x, y, z)
    _.flatten xsss

  @isAnswer = (str) ->
    nums = @toNums(str)
    nums.length >= 3

  @fromStr = (str) ->
    nums = @toNums(str)
    new Answer(nums[0], nums[1], nums[2])

  @toNums = (str) ->
    if _.isString(str)
      numStrs = _.filter str.split(''), (c) -> '0' <= c && c <= '9'
      _.map numStrs, Number
    else
      []


class HitBlow
  constructor: (@hit, @blow) ->

  equals: (other) ->
    if other instanceof HitBlow
      @hit == other.hit && @blow == other.blow
    else
      false
