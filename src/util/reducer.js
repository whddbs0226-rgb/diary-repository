// 상태 변화를 관리하는 Reducer 함수
// state : 현재의 상태 (초기에는 mokData)
// action : dispatch에 담은 내용
export function crudReducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT': // 페이지 로드 시 최초 한번만 실행
      return action.data;

    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }

    case 'UPDATE': {
      // id가 같은 item의 데이터만 교체
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    }

    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }

    default:
      return state;
  }

  // 데이터 변화가 있을 때만 로컬스토리지 업데이트 (또는 DB에 전달)
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}
