"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { useCreateReportMutation } from "@/redux/api/reportsApi";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
    claimSubjects: z.string().min(1, "Claim subject is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddClaimSubjectModal = ({
    open,
    setOpen,
    title
}: {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    title?: string
}) => {
    const [createClaimSubject, { isLoading }] = useCreateReportMutation();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            claimSubjects: "",
        },
    });


    const onSubmit = async (data: FormData) => {
        const formattedData = { title: data.claimSubjects };
        try {
            await createClaimSubject(formattedData).unwrap();
            form.reset();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create claim subject");
        }
    };

    const onError = (errors: any) => {
        console.log("Form validation errors:", errors);
    };
    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}
            style={{
                minWidth: "max-content",
                position: "relative",
            }}
        >
            <div>
                <div className="flex justify-between items-center">
                    <div></div>
                    <div
                        className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine
                            size={14}
                            className="text-red-600 group-hover:text-red-100 group"
                        />
                    </div>
                </div>
                <div className="mx-auto max-w-2xl">
                    <Card className="shadow-none py-0 border-none">
                        <CardContent className="px-0">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit, onError)}
                                    className="space-y-6"
                                >
                                    {/*  Add Claim Subject  Section */}
                                    <FormField
                                        control={form.control}
                                        name="claimSubjects"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xl font-medium text-gray-700">
                                                    {title || "Add Claim Subject"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter claim subject"
                                                        {...field}
                                                        className="w-full border border-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Save Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-main-color"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Modal>
    );
};

export default AddClaimSubjectModal;
