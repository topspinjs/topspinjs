export default function (game, players, groups) {
  const getPlayer = (player_id) => players.byId[player_id];

  if (game.type === 'doubles') {
    let left_group = groups.byId[game.left]
      , right_group = groups.byId[game.right]

    return {
      left: left_group.members.map(getPlayer)
    , right: right_group.members.map(getPlayer)
    , type: 'doubles'
    }
  } else {
    return {
      left: [getPlayer(game.left)]
    , right: [getPlayer(game.right)]
    , type: 'singles'
    }
  }
}
