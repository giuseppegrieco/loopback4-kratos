import {KratosResponse} from './services';
import {UserProfile} from '@loopback/security';

/**
 * Interface defining the component's options object
 */
export interface KratosComponentOptions {
  // Add the definitions here
  baseUrl: string;
  extractUserProfileStrategy: (baseUserProfile: UserProfile, response: KratosResponse) => UserProfile;
}