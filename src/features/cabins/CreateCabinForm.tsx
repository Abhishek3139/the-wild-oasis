// import { useState } from "react";
// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createCabin } from "../../services/apiCabins";
// import FormRow from "../../ui/FormRow";

// interface formTypes {
//   name: string;
//   maxCapacity: number;
//   regularPrice: number;
//   discount: number;
//   description: string;
//   image: string;
// }
// function CreateCabinForm() {
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const queryClient = useQueryClient();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors },
//   } = useForm<formTypes>();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//     },

//     onError: (error: string) => {
//       toast.error(error);
//     },
//   });

//   const onSubmit: SubmitHandler<formTypes> = (data) => {
//     console.log(data);
//     const i = imageUrl.split("\\")[imageUrl.split("\\").length - 1];
//     mutate({
//       ...data,
//       image: i,
//     });
//     reset();
//   };
//   const onError: SubmitErrorHandler<formTypes> = (err) => {
//     console.log(err);
//   };
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//           disabled={isCreating}
//         />
//       </FormRow>
//       <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be at leat 1",
//             },
//           })}
//           disabled={isCreating}
//         />
//       </FormRow>
//       <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be at leat 1",
//             },
//           })}
//           disabled={isCreating}
//         />
//       </FormRow>

//       <FormRow label={"Discount"} error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value <= getValues().regularPrice ||
//               "Discount should be less than regular price",
//           })}
//           disabled={isCreating}
//         />
//       </FormRow>

//       <FormRow
//         label={"Description for website"}
//         error={errors?.description?.message}
//       >
//         <Textarea
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//           disabled={isCreating}
//         />
//       </FormRow>

//       <FormRow label={"Cabin photo"}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           type="file"
//           {...register("image", {
//             required: "This field is required",
//             onChange: (e) => setImageUrl(e.target.value),
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
