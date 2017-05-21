import { ApplicationState } from 'app/store/application-state';
import { User } from 'app/core/models/user';

export function mapStatetoUsers(state: ApplicationState) {
  return state.storeData.users;
}
