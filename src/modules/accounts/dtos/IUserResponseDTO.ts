interface IUserResponseDTO {
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  id: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
