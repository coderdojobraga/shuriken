export enum EUser {
  Guardian = "guardian",
  Mentor = "mentor",
  Ninja = "ninja",
  Organizer = "organizer",
}

export enum EBelt {
  Missing = "",
  White = "white",
  Yellow = "yellow",
  Blue = "blue",
  Green = "green",
  Orange = "orange",
  Red = "red",
  Purple = "purple",
  Black = "black",
}

// TODO: incomplete interface
// We should also have an IGuardian, INinja and a IMentor
export interface IUser {
  first_name?: string;
  last_name?: string;
  email: string;
  photo?: string;
  role: EUser;
  belt?: EBelt;
  birthday?: string;
  verified?: boolean;
  registered?: boolean;
  active?: boolean;
  mentor_id?: string;
  ninja_id?: string;
  guardian_id?: string;
  organizer_id?: string;
}
