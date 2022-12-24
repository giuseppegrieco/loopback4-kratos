import {UserProfile} from '@loopback/security';
import {Session} from '@ory/kratos-client';

/**
 * Interface defining the component's options object
 */
export interface KratosComponentOptions {
  // Add the definitions here
  baseUrl: string;
  extractUserProfileStrategy: (
    baseUserProfile: UserProfile,
    response: Session,
  ) => UserProfile;
}
