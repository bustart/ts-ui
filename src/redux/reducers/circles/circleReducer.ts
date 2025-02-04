import { CircleActionType } from 'constants/circleActionType';
import { List, Map } from 'immutable';

import { CircleState } from './CircleState';
import { ICircleAction } from './ICircleAction';

// - Import domain
// - Import action types
/**
 * Add circle
 */
const addCircle = (state: any, payload: any) => {
    const circle: Map<string, any> = payload.circle;
    return state.setIn(['circleList', circle.get('id')], payload.circle);
};

/**
 * Update circle
 */
const updateCircle = (state: any, payload: any) => {
    const circle: Map<string, any> = payload.circle;
    return state
        .setIn(['openSetting', circle.get('id')], false)
        .setIn(['circleList', circle.get('id')], payload.circle);
};

/**
 * Circle reducer
 * @param state
 * @param action
 */
export const circleReducer = (state = Map(new CircleState() as any), action: ICircleAction) => {
    const { payload } = action;
    switch (action.type) {
        case CircleActionType.CLEAR_ALL_CIRCLES:
            return Map(new CircleState() as any);

        case CircleActionType.ADD_CIRCLE:
            return addCircle(state, payload);
        case CircleActionType.UPDATE_CIRCLE:
            return updateCircle(state, payload);

        case CircleActionType.DELETE_CIRCLE:
            return state.deleteIn(['circleList', payload.circleId]);

        case CircleActionType.ADD_LIST_CIRCLE:
            return state.set('loaded', true).mergeIn(['circleList'], payload.circleList);

        case CircleActionType.ADD_FOLLOWING_USER:
            const userTie: Map<string, any> = payload.userTie;
            return state
                .setIn(['userTies', userTie.get('userId')], payload.userTie)
                .setIn(['selectedCircles', userTie.get('userId')], userTie.get('circleIdList'));

        case CircleActionType.UPDATE_USER_TIE:
            return state.setIn(['userTies', payload.userTie.user.userId], payload.userTie);

        case CircleActionType.ADD_USER_TIE_LIST:
            return state
                .mergeIn(['userTies'], payload.userTies)
                .set('selectedCircles', getSelectedCircles(payload.userTies));

        case CircleActionType.ADD_USER_TIED_LIST:
            return state.mergeIn(['userTieds'], payload.userTieds);

        case CircleActionType.DELETE_USER_FROM_CIRCLE:
            return state.deleteIn(['userTies', payload.userTie.user.userId, 'circleIdList', payload.circleId]);

        case CircleActionType.DELETE_FOLLOWING_USER:
            return state.deleteIn(['userTies', payload.userId]).deleteIn(['selectedCircles', payload.userId]);

        /**
         * User interface stuffs
         */

        case CircleActionType.CLOSE_CIRCLE_SETTINGS:
            return state.setIn(['openSetting', payload.circleId], false);

        case CircleActionType.OPEN_CIRCLE_SETTINGS:
            return state.setIn(['openSetting', payload.circleId], true);

        case CircleActionType.SHOW_SELECT_CIRCLE_BOX:
            return state.setIn(['selectCircleStatus', payload.userId], true);

        case CircleActionType.HIDE_SELECT_CIRCLE_BOX:
            return state.setIn(['selectCircleStatus', payload.userId], false);

        case CircleActionType.SHOW_FOLLOWING_USER_LOADING:
            return state.setIn(['followingLoadingStatus', payload.userId], true);

        case CircleActionType.HIDE_FOLLOWING_USER_LOADING:
            return state.setIn(['followingLoadingStatus', payload.userId], false);

        case CircleActionType.SET_SELECTED_CIRCLES_USER_BOX_COMPONENT:
            return state.setIn(['selectedCircles', payload.userId], payload.circleList);

        case CircleActionType.REMOVE_SELECTED_CIRCLES_USER_BOX_COMPONENT:
            return state.setIn(['selectedCircles', payload.userId], []);

        case CircleActionType.OPEN_SELECT_CIRCLES_USER_BOX_COMPONENT:
            return state.setIn(['ui', 'openSelecteCircles', payload.userId], true);

        case CircleActionType.CLOSE_SELECT_CIRCLES_USER_BOX_COMPONENT:
            return state.setIn(['ui', 'openSelecteCircles', payload.userId], false);

        default:
            return state;
    }
};

/**
 * Map user ties selected to selected circles
 */
const getSelectedCircles = (userTies: Map<string, any>) => {
    if (userTies.isEmpty()) {
        return Map({});
    }
    let selectedCircles: Map<string, List<string>> = Map({});
    userTies.forEach((user) => {
        selectedCircles = selectedCircles.set(user.get('userId'), user.get('circleIdList'));
    });

    return selectedCircles;
};
