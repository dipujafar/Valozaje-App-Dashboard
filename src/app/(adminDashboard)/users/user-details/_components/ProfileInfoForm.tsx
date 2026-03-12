import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
    label: string;
    value: string;
    placeholder?: string;
    type?: "text" | "textarea";
}

const FormField = ({ label, value, placeholder, type = "text" }: FormFieldProps) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        {type === "textarea" ? (
            <Textarea
                defaultValue={value}
                value={value}
                className="resize-none bg-input-bg border-input-border focus:border-primary min-h-[80px]"
            />
        ) : (
            <Input
                defaultValue={value}
                value={value}
                className="bg-input-bg border-input-border focus:border-primary"
            />
        )}
    </div>
);

interface UserData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    due: number;
    about: string;
}

interface ProfileInfoFormProps {
    userData: UserData;
}

const ProfileInfoForm = ({ userData }: ProfileInfoFormProps) => {
    return (
        <div className="space-y-5">
            {/*  Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                    label="Full Name"
                    value={userData.fullName}
                />
                <FormField
                    label="Email"
                    value={userData.email}
                />
            </div>

            {/*  Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                    label="Phone"
                    value={userData.phone}
                />
                <FormField
                    label="Address"
                    value={userData.address}
                />
            </div>

            {/*  DOB & Due */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                    label="DOB"
                    value={userData.dob}
                />
                <FormField
                    label="Due"
                    value={`$${userData.due}`}
                />
            </div>

            {/*  About */}
            {/* <FormField
                label="About"
                value={userData.about}
                type="textarea"
            /> */}
        </div>
    );
};

export default ProfileInfoForm;
