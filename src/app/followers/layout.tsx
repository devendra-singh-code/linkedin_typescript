import Header from "@/components/Header";
import Followers_Right from "./_followers_right/page";


export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <Header />
      <div className=" w-full">{children}</div>
      <div className="md:w-[370px] w-full"><Followers_Right /></div>
    </div>
  );
}
