export type ProfilePortraitProps = {
  picture: string;
};

export const ProfilePortrait = ({ picture }: ProfilePortraitProps) => {
  return <img src={picture} alt="profile" className="h-full w-full rounded-full" />;
};
