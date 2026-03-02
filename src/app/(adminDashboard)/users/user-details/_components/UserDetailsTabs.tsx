import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfoForm from "./ProfileInfoForm";
import DocumentsTab from "./DocumentsTab";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  due: number;
  about: string;
}

interface UserDetailsTabsProps {
  userData: UserData;
  userId: string;
}

const UserDetailsTabs = ({ userData, userId }: UserDetailsTabsProps) => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 mb-6">
        <TabsTrigger
          value="profile"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-main-color  data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-muted-foreground data-[state=active]:text-main-color font-medium"
        >
          Profile Info
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-main-color data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-muted-foreground data-[state=active]:text-main-color font-medium"
        >
          Documents
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-0">
        <ProfileInfoForm userData={userData} />
      </TabsContent>

      <TabsContent value="documents" className="mt-0">
        <DocumentsTab userId={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default UserDetailsTabs;
