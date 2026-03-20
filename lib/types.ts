export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  displayIcon: string;
  role: Role;
  abilities: Ability[];
}

export interface Role {
  displayName: string;
  displayIcon: string;
  description: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}
