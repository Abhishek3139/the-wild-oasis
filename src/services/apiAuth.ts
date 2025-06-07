/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputsTypes } from "../features/authentication/SignupForm";
import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ email, password, fullName }: InputsTypes) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
};

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  return data.session?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error?.message);
}

export async function UpdateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password: string;
  fullName: string;
  avatar: string;
}) {
  //update password or fullname
  let updatedData:any
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error?.message);
  if (!avatar) return data;

  //upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError?.message);

  //update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2?.message);
  return updatedUser;
}
