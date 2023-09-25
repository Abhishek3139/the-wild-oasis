import supabase from "./supabase";
interface formTypes {
  image: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin: formTypes) {
  const imageName = `${Math.random()}-${newCabin.image}`.replace(/\//g, "");
  // https://zypbhladhhcuqaimjufh.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
  // 1. create cabin
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) {
    console.log(error);
    throw new Error("cabins could not be created");
  }

  await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);
  // if (storageError) {
  //   await supabase.from("cabins").delete().eq("id", data.id);

  //   console.log(storageError);
  //   throw new Error(
  //     "cabins could not be uploaded and the cabin was not created"
  //   );
  // }
  return data;
}

export async function delteCabin(id: void) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}
