import supabase from "./supabase";
interface formTypes {
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
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.log(error);
    throw new Error("cabins could not be created");
  }
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
