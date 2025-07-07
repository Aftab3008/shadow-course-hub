import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ShowAvatar({
  profileUrl,
  name,
  className = "h-8 w-8",
}: {
  profileUrl: string;
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={profileUrl || "/assets/default.jpg"} alt={name} />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n: string) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
