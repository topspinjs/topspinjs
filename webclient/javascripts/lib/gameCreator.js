import process from 'lib/processResponse';
import store from 'store';

export default function ({left, right}) {
  let type = left.length > 1 ? 'doubles' : 'singles';

  //TODO implement find or create group!
  if (type === 'doubles') {
    alert('Doubles not supported yet lolololo');
    return;
  }


  return fetch('/api/games', {
    method: 'post'
  , headers: {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    }
  , body: JSON.stringify({type, left: left[0], right: right[0]})
  }).then(process);
}
