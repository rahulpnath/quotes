import { UserProfileDto } from './api-models';
import http from './http';

export async function getUser(): Promise<UserProfileDto> {
  const response = await http.get<UserProfileDto>('/api/users/me');
  return response.data;
}
